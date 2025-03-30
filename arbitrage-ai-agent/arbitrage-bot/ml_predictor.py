import numpy as np
import tensorflow as tf
from typing import Dict, List
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class MLPredictor:
    def __init__(self):
        self.model = self._build_model()
        self.price_history = {}
        self.window_size = 24  # Hours of historical data to consider
        self.feature_columns = ['price', 'volume', 'volatility']

    def _build_model(self) -> tf.keras.Model:
        """Build and compile the LSTM model for price prediction"""
        model = tf.keras.Sequential([
            tf.keras.layers.LSTM(64, input_shape=(24, len(self.feature_columns)), return_sequences=True),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.LSTM(32),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(1, activation='tanh')  # Output between -1 and 1 for price movement
        ])
        
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
            loss='mse',
            metrics=['mae']
        )
        return model

    def update_price_history(self, chain: str, price_data: Dict):
        """Update historical price data for a chain"""
        if chain not in self.price_history:
            self.price_history[chain] = []
            
        self.price_history[chain].append({
            'timestamp': datetime.utcnow(),
            'price': price_data['price'],
            'volume': price_data.get('volume', 0),
            'volatility': self._calculate_volatility(chain)
        })
        
        # Keep only recent history
        cutoff_time = datetime.utcnow() - timedelta(hours=self.window_size)
        self.price_history[chain] = [
            entry for entry in self.price_history[chain]
            if entry['timestamp'] > cutoff_time
        ]

    def _calculate_volatility(self, chain: str) -> float:
        """Calculate price volatility for a chain"""
        if chain not in self.price_history or len(self.price_history[chain]) < 2:
            return 0.0
            
        prices = [entry['price'] for entry in self.price_history[chain][-12:]]  # Last hour
        return np.std(prices) if len(prices) > 0 else 0.0

    def _prepare_features(self, chain: str) -> np.ndarray:
        """Prepare feature matrix for prediction"""
        if chain not in self.price_history:
            return np.zeros((1, self.window_size, len(self.feature_columns)))
            
        features = []
        for entry in self.price_history[chain][-self.window_size:]:
            features.append([
                entry['price'],
                entry['volume'],
                entry['volatility']
            ])
            
        # Pad if we don't have enough history
        while len(features) < self.window_size:
            features.insert(0, [0.0] * len(self.feature_columns))
            
        return np.array([features])

    def predict_movements(self, current_prices: Dict) -> Dict[str, float]:
        """Predict price movements for each chain"""
        predictions = {}
        
        for chain, price_data in current_prices.items():
            # Update historical data
            self.update_price_history(chain, price_data)
            
            # Prepare features
            features = self._prepare_features(chain)
            
            try:
                # Get prediction (-1 to 1 range)
                prediction = self.model.predict(features, verbose=0)[0][0]
                
                # Convert to percentage
                predictions[chain] = float(prediction)
                
                logger.debug(f"Price movement prediction for {chain}: {prediction:.2%}")
                
            except Exception as e:
                logger.error(f"Error predicting price movement for {chain}: {e}")
                predictions[chain] = 0.0
                
        return predictions

    def train_model(self, training_data: Dict[str, List[Dict]]):
        """Train the model with historical data"""
        X = []
        y = []
        
        for chain, data in training_data.items():
            for i in range(len(data) - self.window_size):
                window = data[i:i + self.window_size]
                features = []
                for entry in window:
                    features.append([
                        entry['price'],
                        entry['volume'],
                        entry['volatility']
                    ])
                X.append(features)
                
                # Target is the actual price movement that occurred
                actual_movement = (data[i + self.window_size]['price'] - data[i + self.window_size - 1]['price'])
                actual_movement = actual_movement / data[i + self.window_size - 1]['price']  # Convert to percentage
                y.append(actual_movement)
        
        X = np.array(X)
        y = np.array(y)
        
        # Train the model
        self.model.fit(
            X, y,
            epochs=10,
            batch_size=32,
            validation_split=0.2,
            verbose=1
        ) 