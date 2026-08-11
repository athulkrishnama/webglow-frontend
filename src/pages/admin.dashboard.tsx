import { List } from 'lucide-react';

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of platform activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/services"
          className="p-6 rounded-2xl border border-border bg-card hover:border-rose-500/40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(244,63,94,0.08)] flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <List className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">All Services</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              View, search, and manage all provider services on the platform.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
