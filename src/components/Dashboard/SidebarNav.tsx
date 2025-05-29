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
  Menu as MenuIcon, // Renamed to avoid conflict with DropdownMenu
  Briefcase // Placeholder for 'bo' logo icon, as 'Bo' or specific brand icons are not in lucide
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  isSub?: boolean; // For potential dropdowns, not used in this basic version
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
  { id: 'helpOld', label: 'Help', icon: HelpCircle, href: '#' }, // Renamed to avoid key conflict if label was unique
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' }, // This is what image shows, with duplicate help icon
];

const SidebarNav: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  return (
    <aside className="w-64 bg-sidebar fixed top-0 left-0 h-screen flex flex-col p-4 text-foreground/80">
      <div className="flex items-center justify-between mb-6 px-2 py-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" /> 
          <span className="font-bold text-xl text-foreground">bo</span>
        </div>
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
                : 'hover:bg-gray-500/10'
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
            key={item.id} // Ensure key is unique, e.g. use item.id if labels can repeat
            variant="ghost"
            className={cn(
              'w-full justify-start text-sm font-normal py-2 px-3 h-auto',
              item.id === activeItem
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'hover:bg-gray-500/10'
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

export default SidebarNav;
