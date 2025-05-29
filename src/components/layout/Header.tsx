import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusCircle } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard' }) => {
  return (
    <header className={cn(
      'fixed top-0 left-64 right-0 z-10 h-[70px]', // Adjusted left from md:left-64 to left-64
      'flex items-center justify-between px-6',
      'bg-card border-b border-border' // bg-card is 'surface', border is for separation
      // Styles from layoutRequirements: fixed, top-0, left-64, right-0, z-10, h-[70px], flex, items-center, justify-between, px-6, bg-surface (via bg-card)
    )}>
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Lead</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Proposal</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Customer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
