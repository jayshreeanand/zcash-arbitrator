'use client';

import { useState, useEffect } from 'react';

interface Opportunity {
  id: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  profit: number;
  profitPercentage: number;
  timestamp: string;
}

const generateMockOpportunities = (): Opportunity[] => {
  const exchanges = ['Binance', 'Kraken', 'Gate.io', 'MEXC'];
  return Array.from({ length: 5 }, (_, i) => {
    const buyExchange = exchanges[Math.floor(Math.random() * exchanges.length)];
    const sellExchange = exchanges.filter(e => e !== buyExchange)[Math.floor(Math.random() * (exchanges.length - 1))];
    const buyPrice = +(Math.random() * 10 + 85).toFixed(2);
    const sellPrice = +(buyPrice * (1 + Math.random() * 0.05)).toFixed(2);
    const profit = +(sellPrice - buyPrice).toFixed(2);
    const profitPercentage = +((profit / buyPrice) * 100).toFixed(2);

    return {
      id: `opp-${i}`,
      buyExchange,
      sellExchange,
      buyPrice,
      sellPrice,
      profit,
      profitPercentage,
      timestamp: new Date().toISOString(),
    };
  });
};

export default function ArbitrageOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    // Initial load
    setOpportunities(generateMockOpportunities());

    // Update every 10 seconds
    const interval = setInterval(() => {
      setOpportunities(generateMockOpportunities());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Buy Exchange
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sell Exchange
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Buy Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sell Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Profit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Profit %
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {opportunities.map((opp) => (
            <tr key={opp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {opp.buyExchange}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {opp.sellExchange}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                ${opp.buyPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                ${opp.sellPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                +${opp.profit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                +{opp.profitPercentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 