import Link from 'next/link';
import { FaChartLine } from 'react-icons/fa'; // Using chart icon for trading

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
                <FaChartLine className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                ZCash Arbitrator
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 