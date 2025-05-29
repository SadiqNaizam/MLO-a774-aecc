import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { CalendarDays } from 'lucide-react';

const leadsTrackingData = [
  { name: 'March', closedWon: 65, closedLost: 28 },
  { name: 'April', closedWon: 59, closedLost: 48 },
  { name: 'May', closedWon: 80, closedLost: 40 },
  { name: 'June', closedWon: 31, closedLost: 78 },
  { name: 'July', closedWon: 52, closedLost: 35 },
  { name: 'August', closedWon: 95, closedLost: 20 },
];

const leadsCameData = [
  { name: 'March', leads: 120 }, { name: 'April', leads: 150 }, { name: 'May', leads: 130 }, 
  { name: 'June', leads: 180 }, { name: 'July', leads: 160 }, { name: 'August', leads: 200 },
];

const totalDealsData = [
  { name: 'March', dealSize: 25000 }, { name: 'April', dealSize: 30000 }, { name: 'May', dealSize: 28000 },
  { name: 'June', dealSize: 40000 }, { name: 'July', dealSize: 35000 }, { name: 'August', dealSize: 45000 },
];


interface ChartCardProps {
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ className }) => {
  const [timeFilter, setTimeFilter] = React.useState<string>('last 6 months');
  const filterOptions = ['last 6 months', 'last 3 months', 'last month', 'this year'];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              <span className="text-2xl font-bold text-foreground">680</span> total closed&nbsp;&nbsp;
              <span className="text-2xl font-bold text-foreground">70</span> total lost
            </CardDescription>
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full sm:w-auto h-9 text-xs px-2 py-1 focus:ring-0 focus:ring-offset-0">
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
        </div>
      </CardHeader>
      <CardContent className="pl-0 pr-2 sm:pr-6 pb-6">
        <Tabs defaultValue="leadsConverted" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex mb-4 ml-6 sm:ml-0">
            <TabsTrigger value="leadsCame" className="text-xs px-3 py-1.5">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs px-3 py-1.5">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealsSize" className="text-xs px-3 py-1.5">Total deals size</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leadsConverted">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10}/>
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}/>
                <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary), 0.1)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} activeDot={{ r: 6, fill: 'hsl(var(--secondary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="hsl(var(--accent))" fill="hsl(var(--accent), 0.1)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} activeDot={{ r: 6, fill: 'hsl(var(--accent))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}/>
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="leadsCame">
             <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsCameData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10}/>
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}/>
                <Line type="monotone" dataKey="leads" name="Leads Came" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="totalDealsSize">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={totalDealsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10}/>
                <YAxis tickFormatter={(value) => `$${value/1000}k`} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
                <RechartsTooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Deal Size']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}/>
                <Line type="monotone" dataKey="dealSize" name="Total Deal Size" stroke="hsl(var(--purple-500, var(--primary)))" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} activeDot={{ r: 6, fill: 'hsl(var(--purple-500, var(--primary)))', stroke: 'hsl(var(--card))', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
