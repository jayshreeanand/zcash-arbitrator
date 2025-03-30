import Link from 'next/link';
import { FaArrowLeft, FaPlay, FaChartLine, FaShieldAlt } from 'react-icons/fa';

export default function Demo() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Interactive Demo</h1>
      </div>

      {/* Demo Content */}
      <div className="space-y-8">
        {/* Demo Video */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Watch How It Works</h2>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <button className="text-white flex items-center space-x-2 bg-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-700">
              <FaPlay />
              <span>Play Demo</span>
            </button>
          </div>
        </div>

        {/* Demo Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-indigo-600 mb-4">
              <FaChartLine className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Cross-Chain Trading</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              See how our AI identifies and executes profitable trades across multiple blockchains.
            </p>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700">
              Try Demo →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-indigo-600 mb-4">
              <FaShieldAlt className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Privacy Features</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Experience how Zcash&apos;s shielded transactions protect your trading privacy.
            </p>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700">
              Try Demo →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-indigo-600 mb-4">
              <FaPlay className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Live Simulation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Test the platform with simulated funds in a real market environment.
            </p>
            <button className="text-indigo-600 font-semibold hover:text-indigo-700">
              Try Demo →
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Launch the full application to start trading with real assets
          </p>
          <Link href="/dashboard" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );
} 