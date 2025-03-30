#!/usr/bin/env python3
"""
Basic example of using the NEAR Intents AI Agent to swap NEAR for USDC.
This example demonstrates the simplest way to perform a token swap.
"""

import os
import sys
import logging
from pathlib import Path
from dotenv import load_dotenv

# Add the src directory to the Python path
sys.path.append(str(Path(__file__).parent.parent / "src"))

from near_intents.ai_agent import AIAgent

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def main():
    try:
        # Load environment variables
        load_dotenv()
        
        # Get deposit and swap amounts from .env with defaults
        deposit_amount = float(os.getenv('NEAR_DEPOSIT_AMOUNT', '0.001'))
        swap_amount = float(os.getenv('SWAP_AMOUNT', '0.001'))
        
        # Validate the amounts
        if deposit_amount <= 0 or swap_amount <= 0:
            raise ValueError("NEAR_DEPOSIT_AMOUNT and SWAP_AMOUNT must be greater than 0")
        
        print(f"Using deposit amount: {deposit_amount} NEAR")
        print(f"Using swap amount: {swap_amount} NEAR")
        
        # Initialize the AI agent
        agent = AIAgent("./account_file.json")
        
        # Deposit NEAR
        agent.deposit_near(deposit_amount)
        
        # Execute the swap
        agent.swap_near_to_token("USDC", swap_amount)
        
        logging.info("Swap completed successfully!")
        
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 