import PriceMonitor from '@/components/PriceMonitor';
import ArbitrageOpportunities from '@/components/ArbitrageOpportunities';
import TransactionHistory from '@/components/TransactionHistory';
import { FaRobot, FaChartLine, FaShieldAlt, FaCode } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          ZCash Arbitrator
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100">
          AI-Powered Cross-Chain Arbitrage Bot for ZEC/NEAR Trading
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
            View Demo
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <FaRobot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">AI-Powered</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Machine learning algorithms predict price movements and identify profitable opportunities
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <FaChartLine className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Real-time Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Continuous monitoring of prices across multiple exchanges for instant arbitrage detection
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <FaShieldAlt className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Risk Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced risk controls and configurable safety parameters for secure trading
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <FaCode className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Open Source</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Transparent, community-driven development with customizable strategies
            </p>
          </div>
        </div>
      </div>

      {/* Live Dashboard */}
      <div id="dashboard" className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Live Dashboard
        </h2>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Profit</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$1.23</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">+0.05% from last 24h</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Active Opportunities</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Testing on 3 exchanges</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Success Rate</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">80%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last 5 test transactions</p>
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

      {/* How It Works */}
      <div id="how-it-works" className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Monitor</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Continuously track ZEC and NEAR prices across multiple exchanges
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Analyze</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI algorithms identify profitable arbitrage opportunities
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Execute</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically execute trades when profitable opportunities arise
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="text-xl mb-8">
          Join the future of automated cross-chain arbitrage trading
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Get Started Now
        </button>
      </div>
    </div>
  );
}
