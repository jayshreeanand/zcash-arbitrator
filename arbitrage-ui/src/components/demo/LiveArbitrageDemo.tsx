import { useState, useEffect } from 'react';
import { FaArrowRight, FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';

interface PriceData {
  exchange: string;
  chain: string;
  price: number;
  change: number;
}

export default function LiveArbitrageDemo() {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [opportunity, setOpportunity] = useState<{
    buyAt: PriceData;
    sellAt: PriceData;
    profit: number;
  } | null>(null);
  const [analyzing, setAnalyzing] = useState(true);

  // Simulate real-time price updates
  useEffect(() => {
    const generateRandomPrice = (base: number) => {
      return base + (Math.random() - 0.5) * 2;
    };

    const updatePrices = () => {
      const newPrices: PriceData[] = [
        {
          exchange: 'Binance',
          chain: 'BTC',
          price: generateRandomPrice(30.5),
          change: (Math.random() - 0.5) * 0.5,
        },
        {
          exchange: 'Kraken',
          chain: 'ETH',
          price: generateRandomPrice(31.2),
          change: (Math.random() - 0.5) * 0.5,
        },
        {
          exchange: 'FTX',
          chain: 'SOL',
          price: generateRandomPrice(29.8),
          change: (Math.random() - 0.5) * 0.5,
        },
      ];

      setPrices(newPrices);

      // Find arbitrage opportunity
      const sortedPrices = [...newPrices].sort((a, b) => a.price - b.price);
      const priceDiff = sortedPrices[2].price - sortedPrices[0].price;
      
      if (priceDiff > 0.5) {
        setOpportunity({
          buyAt: sortedPrices[0],
          sellAt: sortedPrices[2],
          profit: priceDiff,
        });
      } else {
        setOpportunity(null);
      }
    };

    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, []);

  const getChainIcon = (chain: string) => {
    switch (chain) {
      case 'BTC':
        return <FaBitcoin className="w-6 h-6" />;
      case 'ETH':
        return <FaEthereum className="w-6 h-6" />;
      case 'SOL':
        return <SiSolana className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600 dark:text-gray-400">
            {analyzing ? 'Analyzing market conditions...' : 'Analysis complete'}
          </span>
        </div>
        <button 
          onClick={() => setAnalyzing(!analyzing)}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {analyzing ? 'Stop Analysis' : 'Start Analysis'}
        </button>
      </div>

      {/* Price Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {prices.map((price) => (
          <div 
            key={price.chain}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {getChainIcon(price.chain)}
                </span>
                <span className="font-medium">{price.chain}</span>
              </div>
              <span className="text-sm text-gray-500">{price.exchange}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">${price.price.toFixed(2)}</span>
              <span className={`text-sm ${
                price.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Arbitrage Opportunity */}
      {opportunity && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
            Arbitrage Opportunity Detected!
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Buy at {opportunity.buyAt.exchange}</div>
                <div className="text-xl font-bold">${opportunity.buyAt.price.toFixed(2)}</div>
              </div>
              <FaArrowRight className="text-green-500" />
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Sell at {opportunity.sellAt.exchange}</div>
                <div className="text-xl font-bold">${opportunity.sellAt.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Potential Profit</div>
              <div className="text-xl font-bold text-green-600">
                ${opportunity.profit.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Details */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Analysis Parameters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500 dark:text-gray-400">Chains Monitored</div>
            <div className="font-medium">3</div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Update Frequency</div>
            <div className="font-medium">5s</div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Min. Profit Threshold</div>
            <div className="font-medium">$0.50</div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Privacy Level</div>
            <div className="font-medium text-green-600">Shielded</div>
          </div>
        </div>
      </div>
    </div>
  );
} 