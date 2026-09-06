'use client';
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';

interface LogoutProps {
  showText: boolean;
}

const Logout = ({ showText }: LogoutProps) => {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/signin');
        },
      },
    });
  };
  return (
    <Button
      variant='ghost'
      onClick={handleLogout}
      className='w-full flex items-center justify-start cursor-pointer hover:!bg-sidebar-accent'
    >
      <LogOut />
      {showText && `Logout`}
    </Button>
  );
};
export default Logout;
