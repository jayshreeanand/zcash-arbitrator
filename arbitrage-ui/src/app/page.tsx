import PriceMonitor from '@/components/PriceMonitor';
import ArbitrageOpportunities from '@/components/ArbitrageOpportunities';
import TransactionHistory from '@/components/TransactionHistory';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Profit</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$12,345.67</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">+2.5% from last 24h</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Active Opportunities</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">7</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Across 3 exchanges</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Success Rate</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">98.2%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 100 transactions</p>
        </div>
      </div>

      {/* Price Monitor */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Price Monitor</h2>
        <PriceMonitor />
      </div>

      {/* Arbitrage Opportunities */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Arbitrage Opportunities</h2>
        <ArbitrageOpportunities />
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Transaction History</h2>
        <TransactionHistory />
      </div>
    </div>
  );
}
