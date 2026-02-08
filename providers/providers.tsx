'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { ThemeProvider } from './theme-provider';
import { Web3Provider } from './wagmi-provider';
import { PrivyProvider } from './privy-provider';
import { isPrivyEnabled } from '@/lib/config/privy';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root Providers
 * 
 * Wraps the application with all necessary providers:
 * - ThemeProvider: Dark/light mode
 * - Web3Provider or PrivyProvider: Wallet connection
 * - Toaster: Toast notifications
 * 
 * Authentication Strategy:
 * - If NEXT_PUBLIC_PRIVY_APP_ID is set, uses Privy (recommended)
 * - Otherwise, falls back to RainbowKit
 * 
 * To force RainbowKit even with Privy configured, set:
 * const usePrivy = false;
 */
export function Providers({ children }: ProvidersProps) {
  // Toggle this to switch between Privy and RainbowKit
  const usePrivy = isPrivyEnabled;

  return (
    <ThemeProvider>
      {usePrivy ? (
        <PrivyProvider>{children}</PrivyProvider>
      ) : (
        <Web3Provider>{children}</Web3Provider>
      )}
      
      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          // Default toast styling
          className: 'font-sans',
          // Duration in milliseconds
          duration: 5000,
        }}
        // Rich colors for different toast types
        richColors
        // Close button on hover
        closeButton
      />
    </ThemeProvider>
  );
}
