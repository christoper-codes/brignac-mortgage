import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { cn } from '@/lib/utils';
import type { AppLayoutProps } from '@/types';

// Pages that are always dark, whatever the user's appearance setting (the AI assistant).
const ALWAYS_DARK_PREFIXES = ['/dashboard/ai'];

// Authenticated shell: a floating frosted sidebar (a pill tab bar on mobile) and a soft canvas that
// the rounded dashboard cards sit on.
export default function AppSidebarLayout({ children }: AppLayoutProps) {
    const { url } = usePage();
    const path = url.split('?')[0];
    const alwaysDark = ALWAYS_DARK_PREFIXES.some(
        (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    );

    // `dark` + `force-dark` on the shell themes everything inside it from the very first (server) render.
    // Portaled UI (the log-out confirmation) lives outside the shell, so <html> gets `dark` too while here.
    useEffect(() => {
        if (!alwaysDark) {
            return;
        }

        const root = document.documentElement;
        const wasDark = root.classList.contains('dark');
        root.classList.add('dark');

        return () => {
            if (!wasDark) {
                root.classList.remove('dark');
            }
        };
    }, [alwaysDark]);

    return (
        <div
            className={cn(
                'min-h-dvh bg-background',
                alwaysDark && 'dark force-dark',
            )}
        >
            <DashboardSidebar />
            <main className="px-4 pt-6 pb-28 sm:px-6 lg:pt-8 lg:pr-8 lg:pb-10 lg:pl-76">
                {children}
            </main>
        </div>
    );
}
