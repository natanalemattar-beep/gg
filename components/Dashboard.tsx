'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  ordersProcessed: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  // BUG #45: No loading state for data fetch
  const [error, setError] = useState('');
  // BUG #46: Polling without interval control
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // BUG #47: No cleanup for interval - memory leak
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchStats();
      }, 5000); // Fetches every 5 seconds - poor performance
      // Missing: return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // BUG #48: Hardcoded mock data, should be from API
      const mockStats: DashboardStats = {
        totalUsers: Math.floor(Math.random() * 10000),
        activeUsers: Math.floor(Math.random() * 5000),
        totalRevenue: Math.random() * 100000,
        ordersProcessed: Math.floor(Math.random() * 50000)
      };

      // BUG #49: Simulating network delay without actual delay
      setStats(mockStats);
    } catch (err) {
      // BUG #50: No proper error handling
      setError('Failed to load stats');
    }
  };

  return (
    <div className="py-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button onClick={() => setAutoRefresh(!autoRefresh)}>
          {autoRefresh ? 'Disable' : 'Enable'} Auto-Refresh
        </button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* BUG #51: Grid not responsive - fixed widths */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 250px)', gap: '20px', marginBottom: '30px' }}>
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers || 0}
          // BUG #52: No thousands separator for large numbers
        />
        <StatCard 
          title="Active Users" 
          value={stats?.activeUsers || 0}
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.totalRevenue.toFixed(2) || 0}`}
          // BUG #53: Currency formatting inconsistent
        />
        <StatCard 
          title="Orders Processed" 
          value={stats?.ordersProcessed || 0}
        />
      </div>

      {/* BUG #54: No chart or visualization - just raw numbers */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        {/* BUG #55: Activity log with no pagination - will grow infinitely */}
        <div style={{ height: '400px', overflowY: 'auto' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', fontSize: '14px' }}>
              Activity #{i} - User performed an action
              {/* BUG #56: No timestamps on activities */}
            </div>
          ))}
        </div>
      </div>

      {/* BUG #57: Export button that does nothing */}
      <button 
        onClick={() => console.log('Export clicked')}
        style={{ marginTop: '20px' }}
      >
        Export Data
      </button>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="card">
      {/* BUG #58: Small text not meeting WCAG contrast requirements */}
      <p style={{ color: '#888', fontSize: '12px' }}>{title}</p>
      {/* BUG #59: Large numbers without proper spacing or formatting */}
      <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
        {value}
      </p>
    </div>
  );
}
