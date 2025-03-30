import PriceMonitor from '@/components/PriceMonitor';
import ArbitrageOpportunities from '@/components/ArbitrageOpportunities';
import TransactionHistory from '@/components/TransactionHistory';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">ZCash Arbitrator Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Profit</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$1.23</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">+0.05% from last 24h</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Active Opportunities</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Across 3 chains</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Privacy Score</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">All transactions shielded</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Cross-Chain Price Monitor</h2>
          <PriceMonitor />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Arbitrage Opportunities</h2>
          <ArbitrageOpportunities />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Transaction History</h2>
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
} 