'use client';

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarCollapseTrigger {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarCollapseTrigger = ({ open, setOpen }: SidebarCollapseTrigger) => {
  return (
    <Button
      variant='ghost'
      className='w-full flex items-center justify-start cursor-pointer hover:!bg-sidebar-accent mx-0 px-2'
      onClick={() => setOpen(!open)}
    >
      {open ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      {open && `Collapse Sidebar`}
    </Button>
  );
};
export default SidebarCollapseTrigger;
