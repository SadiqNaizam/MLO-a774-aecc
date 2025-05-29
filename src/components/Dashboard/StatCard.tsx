import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { CalendarDays, Info } from 'lucide-react';

interface FunnelItem {
  name: string;
  count: number;
  value: string;
  time: string;
  color: string;
}

interface PieDataItem {
  name: string;
  value: number;
  percentage: number;
  fill: string;
}

interface StatCardProps {
  title: string;
  mainStat?: string;
  statDescription?: string;
  type: 'funnel' | 'pie';
  items?: FunnelItem[];
  pieData?: PieDataItem[];
  footerText?: string;
  showFilter?: boolean;
  filterOptions?: string[];
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  mainStat,
  statDescription,
  type,
  items,
  pieData,
  footerText,
  showFilter = false,
  filterOptions = ['last 6 months'],
  className,
}) => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>(filterOptions[0]);

  const totalFunnelCount = items ? items.reduce((sum, item) => sum + item.count, 0) : 0;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          {showFilter && (
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-auto h-8 text-xs px-2 py-1 focus:ring-0 focus:ring-offset-0">
                <CalendarDays className="h-3 w-3 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map(option => (
                  <SelectItem key={option} value={option} className="text-xs">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {type === 'funnel' && mainStat && (
          <CardDescription className="text-muted-foreground">
            <span className="text-3xl font-bold text-foreground">{mainStat}</span> {statDescription}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {type === 'funnel' && items && (
          <div className="space-y-3 pt-2">
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-muted">
              {items.map((item, index) => (
                <TooltipProvider key={index} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn('h-full', item.color)}
                        style={{ width: `${(item.count / totalFunnelCount) * 100}%` }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}: {item.count}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {items.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={cn('h-2.5 w-2.5 rounded-sm mr-2', item.color)}></span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="w-10 text-right text-foreground font-medium">{item.count}</span>
                    <span className="w-16 text-right">{item.value}</span>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <span className={cn('w-20 text-right', item.name === 'In conversation' ? 'bg-gray-700 text-white px-1.5 py-0.5 rounded text-xs' : '')}>
                                {item.time}
                            </span>
                        </TooltipTrigger>
                         {item.name === 'In conversation' && <TooltipContent><p>Average time on this stage</p></TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {type === 'pie' && pieData && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 pt-2">
            <div className="w-full md:w-1/2 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number, name: string, props) => [`$${value}`, props.payload.name]}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-1.5 text-sm text-muted-foreground pt-2 md:pt-0">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2.5 w-2.5 rounded-sm mr-2" style={{ backgroundColor: entry.fill }}></span>
                    <span>{entry.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-foreground font-medium">${entry.value.toLocaleString()}</span>
                    <span>{entry.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {footerText && (
        <CardFooter className="pt-2 pb-4">
          <p className="text-xs text-muted-foreground text-right w-full">{footerText}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
