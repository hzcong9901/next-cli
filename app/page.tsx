import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Wallet, Zap, Shield, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConnectWalletButton } from '@/components/wallet/connect-button';
import { NetworkStatus } from '@/components/wallet/network-status';

// Enable Partial Prerendering for this page
export const experimental_ppr = true;

/**
 * Home Page
 * 
 * This is a Server Component by default.
 * Interactive elements are Client Components imported above.
 */
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Build the Future of{' '}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Web3
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A production-ready, pure frontend dApp starter with Next.js 15, React 19, 
          wagmi v2, and RainbowKit. No backend required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <ConnectWalletButton />
          
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/your-username/next-web3-pure-frontend">
              View on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Network Status - Client Component with Suspense */}
        <Suspense fallback={<div className="h-6" />}>
          <NetworkStatus />
        </Suspense>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Wallet className="h-8 w-8" />}
            title="Wallet Integration"
            description="RainbowKit + Privy for seamless wallet connection and social login."
          />
          
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Lightning Fast"
            description="Next.js 15 with PPR and React Compiler for optimal performance."
          />
          
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Type Safe"
            description="Full TypeScript support with wagmi v2 and viem v2."
          />
          
          <FeatureCard
            icon={<Globe className="h-8 w-8" />}
            title="Multi-Chain"
            description="Support for Ethereum, Arbitrum, Base, Polygon, and Optimism."
          />
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get up and running in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Clone the repository
git clone https://github.com/your-username/next-web3-pure-frontend.git

# Install dependencies
cd next-web3-pure-frontend && pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

/**
 * Feature Card Component
 */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="mb-2 text-primary">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
