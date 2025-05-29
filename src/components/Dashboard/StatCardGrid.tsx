import React from 'react';
import { cn } from '@/lib/utils';
import StatCard from './StatCard'; // Assuming StatCard is in the same directory
import { CalendarDays } from 'lucide-react';

// Data for Funnel Count StatCard
const funnelCountData = {
  title: 'Funnel count',
  mainStat: '600',
  statDescription: 'active leads',
  type: 'funnel' as const,
  items: [
    { name: 'Discovery', count: 200, value: '$ 200', time: '2 days', color: 'bg-accent' }, // red
    { name: 'Qualified', count: 100, value: '$ 100', time: '2 days', color: 'bg-yellow-400' },
    { name: 'In conversation', count: 50, value: '$ 100', time: 'average time on this stage', color: 'bg-indigo-500' },
    { name: 'Negotiations', count: 20, value: '$ 50', time: '8 days', color: 'bg-secondary' }, // teal
    { name: 'Closed won', count: 20, value: '$ 50', time: '10 days', color: 'bg-purple-500' },
  ],
};

// Data for Sources StatCard
const sourcesData = {
  title: 'Sources',
  type: 'pie' as const,
  footerText: 'from leads total',
  filterOptions: ['last 6 months', 'last 3 months', 'last month'],
  pieData: [
    { name: 'Clutch', value: 3000, percentage: 50, fill: 'hsl(var(--accent))' }, // Red
    { name: 'Behance', value: 1000, percentage: 40, fill: '#FBBF24' }, // Tailwind yellow-400
    { name: 'Instagram', value: 1000, percentage: 10, fill: 'hsl(var(--secondary))' }, // Teal
    { name: 'Dribbble', value: 1000, percentage: 10, fill: '#34D399' }, // Tailwind green-400
  ],
};

const StatCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StatCard
        title={funnelCountData.title}
        mainStat={funnelCountData.mainStat}
        statDescription={funnelCountData.statDescription}
        type={funnelCountData.type}
        items={funnelCountData.items}
      />
      <StatCard
        title={sourcesData.title}
        type={sourcesData.type}
        pieData={sourcesData.pieData}
        footerText={sourcesData.footerText}
        showFilter={true}
        filterOptions={sourcesData.filterOptions}
      />
    </div>
  );
};

export default StatCardGrid;
