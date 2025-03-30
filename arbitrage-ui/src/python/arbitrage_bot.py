#!/usr/bin/env python3
"""
AI-powered arbitrage bot for ZEC/NEAR trading.
Uses machine learning to predict profitable opportunities and executes trades automatically.
"""

import os
import sys
import logging
import time
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Tuple
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import ccxt
import json

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ArbitrageBot:
    def __init__(self, config_path: str = "config.json"):
        """Initialize the arbitrage bot with configuration."""
        self.exchanges = {}
        self.price_history: Dict[str, List[Dict]] = {}
        self.model = RandomForestRegressor(n_estimators=100)
        self.scaler = StandardScaler()
        self.min_profit_threshold = 0.001  # 0.1% minimum profit
        self.load_config(config_path)
        self.setup_exchanges()

    def load_config(self, config_path: str):
        """Load configuration from JSON file."""
        try:
            with open(config_path, 'r') as f:
                self.config = json.load(f)
        except FileNotFoundError:
            logger.warning("Config file not found, using default settings")
            self.config = {
                "exchanges": ["binance", "kraken", "gate"],
                "trading_pairs": ["ZEC/USDT", "NEAR/USDT"],
                "update_interval": 5,  # seconds
                "history_window": 24,  # hours
                "test_mode": True
            }

    def setup_exchanges(self):
        """Initialize exchange connections."""
        for exchange_id in self.config["exchanges"]:
            try:
                exchange_class = getattr(ccxt, exchange_id)
                self.exchanges[exchange_id] = exchange_class({
                    'enableRateLimit': True,
                    'options': {'defaultType': 'spot'}
                })
                logger.info(f"Connected to {exchange_id}")
            except Exception as e:
                logger.error(f"Failed to connect to {exchange_id}: {str(e)}")

    async def fetch_prices(self) -> Dict[str, Dict[str, float]]:
        """Fetch current prices from all exchanges."""
        prices = {}
        for exchange_id, exchange in self.exchanges.items():
            try:
                prices[exchange_id] = {}
                for pair in self.config["trading_pairs"]:
                    ticker = await exchange.fetch_ticker(pair)
                    prices[exchange_id][pair] = {
                        'bid': ticker['bid'],
                        'ask': ticker['ask'],
                        'timestamp': ticker['timestamp']
                    }
            except Exception as e:
                logger.error(f"Error fetching prices from {exchange_id}: {str(e)}")
        return prices

    def update_price_history(self, current_prices: Dict[str, Dict[str, float]]):
        """Update price history with new data."""
        timestamp = datetime.now()
        for exchange_id, pairs in current_prices.items():
            if exchange_id not in self.price_history:
                self.price_history[exchange_id] = []
            self.price_history[exchange_id].append({
                'timestamp': timestamp,
                'prices': pairs
            })
            
            # Remove old data
            cutoff = timestamp - timedelta(hours=self.config["history_window"])
            self.price_history[exchange_id] = [
                entry for entry in self.price_history[exchange_id]
                if entry['timestamp'] > cutoff
            ]

    def prepare_features(self, exchange_id: str, pair: str) -> np.ndarray:
        """Prepare features for ML model."""
        if not self.price_history.get(exchange_id):
            return np.array([])

        df = pd.DataFrame([
            {
                'timestamp': entry['timestamp'],
                'price': entry['prices'][pair]['bid']
            }
            for entry in self.price_history[exchange_id]
            if pair in entry['prices']
        ])

        if df.empty:
            return np.array([])

        # Calculate technical indicators
        df['SMA_5'] = df['price'].rolling(window=5).mean()
        df['SMA_20'] = df['price'].rolling(window=20).mean()
        df['price_change'] = df['price'].pct_change()
        df['volatility'] = df['price_change'].rolling(window=10).std()

        # Drop NaN values
        df = df.dropna()

        if df.empty:
            return np.array([])

        features = df[['SMA_5', 'SMA_20', 'price_change', 'volatility']].values
        return self.scaler.fit_transform(features)

    def predict_price_movement(self, exchange_id: str, pair: str) -> float:
        """Predict price movement using ML model."""
        features = self.prepare_features(exchange_id, pair)
        if len(features) < 2:
            return 0.0

        X = features[:-1]
        y = features[1:, 0]  # Use next price as target

        try:
            self.model.fit(X, y)
            next_prediction = self.model.predict([features[-1]])[0]
            return next_prediction
        except Exception as e:
            logger.error(f"Error in price prediction: {str(e)}")
            return 0.0

    def find_arbitrage_opportunities(self, current_prices: Dict[str, Dict[str, float]]) -> List[Dict]:
        """Find arbitrage opportunities across exchanges."""
        opportunities = []
        
        for pair in self.config["trading_pairs"]:
            for buy_exchange in self.exchanges:
                for sell_exchange in self.exchanges:
                    if buy_exchange != sell_exchange:
                        try:
                            buy_price = current_prices[buy_exchange][pair]['ask']
                            sell_price = current_prices[sell_exchange][pair]['bid']
                            
                            # Calculate profit percentage
                            profit_pct = (sell_price - buy_price) / buy_price
                            
                            if profit_pct > self.min_profit_threshold:
                                # Get price predictions
                                buy_prediction = self.predict_price_movement(buy_exchange, pair)
                                sell_prediction = self.predict_price_movement(sell_exchange, pair)
                                
                                opportunities.append({
                                    'pair': pair,
                                    'buy_exchange': buy_exchange,
                                    'sell_exchange': sell_exchange,
                                    'buy_price': buy_price,
                                    'sell_price': sell_price,
                                    'profit_pct': profit_pct,
                                    'confidence': (sell_prediction - buy_prediction) / buy_prediction
                                })
                        except Exception as e:
                            logger.error(f"Error calculating arbitrage for {pair}: {str(e)}")
        
        return sorted(opportunities, key=lambda x: x['profit_pct'], reverse=True)

    async def execute_trade(self, opportunity: Dict) -> bool:
        """Execute an arbitrage trade."""
        if self.config["test_mode"]:
            logger.info(f"TEST MODE: Would execute trade: {json.dumps(opportunity, indent=2)}")
            return True

        try:
            # Place buy order
            buy_exchange = self.exchanges[opportunity['buy_exchange']]
            buy_order = await buy_exchange.create_order(
                symbol=opportunity['pair'],
                type='limit',
                side='buy',
                amount=0.01,  # Small test amount
                price=opportunity['buy_price']
            )
            
            # Place sell order
            sell_exchange = self.exchanges[opportunity['sell_exchange']]
            sell_order = await sell_exchange.create_order(
                symbol=opportunity['pair'],
                type='limit',
                side='sell',
                amount=0.01,  # Small test amount
                price=opportunity['sell_price']
            )
            
            logger.info(f"Successfully executed arbitrage trade: {json.dumps(opportunity, indent=2)}")
            return True
            
        except Exception as e:
            logger.error(f"Error executing trade: {str(e)}")
            return False

    async def run(self):
        """Main bot loop."""
        logger.info("Starting arbitrage bot...")
        
        while True:
            try:
                # Fetch current prices
                current_prices = await self.fetch_prices()
                
                # Update price history
                self.update_price_history(current_prices)
                
                # Find opportunities
                opportunities = self.find_arbitrage_opportunities(current_prices)
                
                # Execute trades for good opportunities
                for opp in opportunities:
                    if opp['profit_pct'] > self.min_profit_threshold and opp['confidence'] > 0:
                        await self.execute_trade(opp)
                
                # Wait before next iteration
                await asyncio.sleep(self.config["update_interval"])
                
            except Exception as e:
                logger.error(f"Error in main loop: {str(e)}")
                await asyncio.sleep(self.config["update_interval"])

if __name__ == "__main__":
    import asyncio
    
    # Create and run the bot
    bot = ArbitrageBot()
    asyncio.run(bot.run()) 