import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { AnalyticsIcon, CampaignsIcon, LeadsIcon, LogoutIcon, OverviewIcon, SettingsIcon } from '@/components/dashboard/icons';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes';
import { analytics } from '@/routes/dashboard';
import { index as campaigns } from '@/routes/dashboard/campaigns';
import { index as leads } from '@/routes/dashboard/leads';
import { edit } from '@/routes/profile';

type Item = { title: string; href: string; icon: ComponentType<{ className?: string }>; exact?: boolean; match?: string };

const ITEMS: Item[] = [
    { title: 'Overview', href: dashboard().url, icon: OverviewIcon, exact: true },
    { title: 'Campaigns', href: campaigns().url, icon: CampaignsIcon },
    { title: 'Leads', href: leads().url, icon: LeadsIcon },
    { title: 'Analytics', href: analytics().url, icon: AnalyticsIcon },
];

const SETTINGS: Item = { title: 'Settings', href: edit().url, icon: SettingsIcon, match: '/settings' };

function useIsActive() {
    const { currentUrl } = useCurrentUrl();

    return (item: Item) => {
        const path = currentUrl.split('?')[0];
        const base = item.match ?? item.href;

        return item.exact ? path === base : path === base || path.startsWith(`${base}/`);
    };
}

function Logo() {
    return (
        <Link href={dashboard().url} className="block px-2">
            <img src="/img/darklogo.png" alt="Brignac Mortgage" className="w-32 dark:hidden" />
            <img src="/img/lightlogo.png" alt="Brignac Mortgage" className="hidden w-32 dark:block" />
        </Link>
    );
}

function UserChip() {
    const { auth } = usePage().props;
    const getInitials = useInitials();

    if (!auth.user) {
        return null;
    }

    return (
        <div className="flex items-center gap-3 rounded-full border border-border bg-background/60 p-2 pr-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
                {getInitials(auth.user.name)}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium text-foreground">{auth.user.name}</p>
                <p className="truncate text-xs text-foreground/50">{auth.user.email}</p>
            </div>
            <Link
                href={logout().url}
                method="post"
                as="button"
                onClick={() => router.flushAll()}
                aria-label="Log out"
                data-test="logout-button"
                className="grid size-8 shrink-0 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
                <LogoutIcon className="size-4.5" />
            </Link>
        </div>
    );
}

// Desktop: a floating frosted panel inset from the screen edges. Mobile: a floating pill tab bar.
export function DashboardSidebar() {
    const isActive = useIsActive();

    return (
        <>
            <aside className="fixed inset-y-4 left-4 z-30 hidden w-64 flex-col gap-6 rounded-4xl border border-border bg-card/80 p-4 shadow-xl shadow-black/5 backdrop-blur-xl lg:flex">
                <div className="pt-2">
                    <Logo />
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {[...ITEMS, SETTINGS].map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch
                                className={cn(
                                    'group relative flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-colors',
                                    active ? 'text-foreground' : 'text-foreground/55 hover:text-foreground',
                                    item.title === 'Settings' && 'mt-auto',
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="dashboard-active-item"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        className="absolute inset-0 rounded-full border border-border bg-background shadow-sm"
                                    />
                                )}
                                <span
                                    className={cn(
                                        'relative grid size-9 shrink-0 place-items-center rounded-full transition-colors',
                                        active ? 'bg-primary/15 text-primary' : 'bg-foreground/5 group-hover:bg-foreground/10',
                                    )}
                                >
                                    <Icon className="size-5" />
                                </span>
                                <span className="relative">{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                <UserChip />
            </aside>

            <nav className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-around rounded-full border border-border bg-card/80 p-2 shadow-xl shadow-black/10 backdrop-blur-xl lg:hidden">
                {[...ITEMS, SETTINGS].map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-label={item.title}
                            className={cn(
                                'relative grid size-12 place-items-center rounded-full transition-colors',
                                active ? 'text-primary' : 'text-foreground/50',
                            )}
                        >
                            {active && (
                                <motion.span
                                    layoutId="dashboard-active-tab"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    className="absolute inset-0 rounded-full bg-primary/15"
                                />
                            )}
                            <Icon className="relative size-6" />
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
