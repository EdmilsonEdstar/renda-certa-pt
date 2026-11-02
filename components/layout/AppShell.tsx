
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-8">
        {children}
      </main>
    </div>
  );
}
