'use client';

import Link from 'next/link';
import { FaArrowLeft, FaChartLine, FaShieldAlt, FaPlay } from 'react-icons/fa';
import LiveArbitrageDemo from '@/components/demo/LiveArbitrageDemo';

export default function Demo() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-emerald-600 hover:text-emerald-700">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Interactive Demo</h1>
      </div>

      {/* Demo Content */}
      <div className="space-y-8">
        {/* Live Demo */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Live Arbitrage Analysis</h2>
          <LiveArbitrageDemo />
        </div>

        {/* Demo Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-emerald-600 dark:text-emerald-400 mb-4">
              <FaChartLine className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Cross-Chain Trading</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              See how our AI identifies and executes profitable trades across multiple blockchains.
            </p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              Learn More →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-emerald-600 dark:text-emerald-400 mb-4">
              <FaShieldAlt className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Privacy Features</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Experience how Zcash&apos;s shielded transactions protect your trading privacy.
            </p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              Learn More →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-emerald-600 dark:text-emerald-400 mb-4">
              <FaPlay className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Live Simulation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Test the platform with simulated funds in a real market environment.
            </p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              Learn More →
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Launch the full application to start trading with real assets
          </p>
          <Link href="/dashboard" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );
} 