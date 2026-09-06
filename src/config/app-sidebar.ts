import { BarChartIcon, LayoutDashboard, SettingsIcon, ChartCandlestick } from 'lucide-react';

export const appSidebar = {
  mainMenuItems: [
    {
      title: 'Overview',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Trades',
      url: '/trades',
      icon: ChartCandlestick,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChartIcon,
    },
    // {
    //   title: 'Projects',
    //   url: '#',
    //   icon: FolderIcon,
    // },
    // {
    //   title: 'Team',
    //   url: '#',
    //   icon: UsersIcon,
    // },
  ],
  secondaryMenuItems: [
    {
      title: 'Settings',
      url: '/settings',
      icon: SettingsIcon,
    },
    // {
    //   title: 'Get Help',
    //   url: '#',
    //   icon: HelpCircleIcon,
    // },
    // {
    //   title: 'Search',
    //   url: '#',
    //   icon: SearchIcon,
    // },
  ],
};
