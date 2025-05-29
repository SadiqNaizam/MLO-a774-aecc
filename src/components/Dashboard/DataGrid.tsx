import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonLostItem {
  percentage: string;
  reason: string;
}

const reasonsLostData: ReasonLostItem[] = [
  { percentage: '40%', reason: 'The proposal is unclear' },
  { percentage: '20%', reason: 'However venture pursuit' },
  { percentage: '10%', reason: 'Other' },
  { percentage: '30%', reason: 'The proposal is unclear' }, // As per image, this reason repeats
];

interface OtherDataItem {
  value: string;
  label: string;
  tooltip?: string;
}

const otherData: OtherDataItem[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days' },
];

const DataGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          {reasonsLostData.map((item, index) => (
            <div key={index}>
              <p className="text-3xl font-semibold text-foreground">{item.percentage}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-around items-start sm:items-center gap-6 pt-2 text-center sm:text-left">
          {otherData.map((item, index) => (
            <div key={index} className="flex-1">
              <p className="text-3xl font-semibold text-foreground">{item.value}</p>
              <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start">
                <span>{item.label}</span>
                {item.tooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataGrid;
