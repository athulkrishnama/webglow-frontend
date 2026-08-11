import { Outlet } from '@tanstack/react-router';

export function ProviderLayoutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              P
            </div>
            <span className="font-semibold text-lg tracking-tight">Provider Dashboard</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="/provider" className="text-muted-foreground hover:text-foreground transition-colors">Overview</a>
            <a href="/provider/services/new" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Bookings</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
