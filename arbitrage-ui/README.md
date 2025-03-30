# ZCash Arbitrator Frontend

The frontend dashboard for the ZCash Arbitrator project. Built with Next.js, TypeScript, and TailwindCSS.

## Features

- Real-time price monitoring
- Interactive charts and statistics
- Transaction history tracking
- Dark/Light mode support
- Responsive design

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── PriceMonitor.tsx
│   ├── ArbitrageOpportunities.tsx
│   └── TransactionHistory.tsx
└── python/          # Backend integration
```

## Dependencies

- Next.js 14
- TypeScript
- TailwindCSS
- Chart.js
- React Icons

For the complete project documentation, please refer to the [main README](../README.md) in the root directory.
