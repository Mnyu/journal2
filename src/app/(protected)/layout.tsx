import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { requireSessionOrRedirect } from '@/lib/auth-session';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSessionOrRedirect();
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar user={session.user} />
      <main className='w-full h-full flex flex-col p-3'>{children}</main>
    </SidebarProvider>
  );
}
