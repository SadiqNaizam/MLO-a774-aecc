import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Users,
  FileText,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu as MenuIcon,
  Briefcase // Used as a placeholder for the 'bo' logo
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  // isSub?: boolean; // For potential dropdowns, not used in this basic version
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: Users, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: FileText, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingCart, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const bottomNavItems: NavItem[] = [
  // Original example had two 'Help' items with different IDs.
  // To ensure unique keys and match common patterns, consolidating or using unique IDs is best.
  // Assuming 'Help' and 'Settings' are the distinct items needed at the bottom.
  // If the image's depiction of two 'Help' icons is strict, they'd need unique IDs.
  // For this, using IDs 'helpOld' and 'help' from context example.
  { id: 'helpOld', label: 'Help', icon: HelpCircle, href: '#' }, 
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' }, 
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  return (
    <aside className={cn(
      'w-64 bg-sidebar fixed top-0 left-0 h-screen',
      'flex flex-col p-4 text-foreground/80'
      // Styles from layoutRequirements: w-64, fixed, top-0, left-0, h-screen, bg-sidebar, flex, flex-col
      // Additional styles from context: p-4, text-foreground/80
    )}>
      <div className="flex items-center justify-between mb-6 px-2 py-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" /> 
          <span className="font-bold text-xl text-foreground">bo</span>
        </div>
        {/* This button is for mobile contexts, hidden on md+ screens where full sidebar is shown */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>

      <nav className="flex-grow space-y-1">
        {mainNavItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              'w-full justify-start text-sm font-normal py-2 px-3 h-auto',
              item.id === activeItem
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'hover:bg-muted hover:text-foreground/90' // Using muted for hover as gray-500/10 is not standard
            )}
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto space-y-1">
        {bottomNavItems.map((item) => (
           <Button
            key={item.id} 
            variant="ghost"
            className={cn(
              'w-full justify-start text-sm font-normal py-2 px-3 h-auto',
              item.id === activeItem
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'hover:bg-muted hover:text-foreground/90' // Using muted for hover
            )}
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
