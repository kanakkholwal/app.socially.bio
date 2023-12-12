// provider.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { Next13ProgressBar } from 'next13-progressbar';

export function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>
    {children}
    <Next13ProgressBar height="4px" color="hsl(var(--primary))" options={{ showSpinner: true }} showOnShallow />
  </SessionProvider>;
}