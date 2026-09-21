import { DashboardSidebar } from '@/components/dashboard/sidebar';
import type { AppLayoutProps } from '@/types';

// Authenticated shell: a floating frosted sidebar (a pill tab bar on mobile) and a soft canvas that
// the rounded dashboard cards sit on.
export default function AppSidebarLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-dvh bg-background">
            <DashboardSidebar />
            <main className="px-4 pt-6 pb-28 sm:px-6 lg:pt-8 lg:pr-8 lg:pb-10 lg:pl-76">{children}</main>
        </div>
    );
}
