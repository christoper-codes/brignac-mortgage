import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    AiIcon,
    AnalyticsIcon,
    CampaignsIcon,
    LeadsIcon,
    LogoutIcon,
    OverviewIcon,
    SettingsIcon,
    TrackingIcon,
    UsersIcon,
} from '@/components/dashboard/icons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes';
import { ai, analytics, users } from '@/routes/dashboard';
import { index as campaigns } from '@/routes/dashboard/campaigns';
import { index as leads } from '@/routes/dashboard/leads';
import { edit as tracking } from '@/routes/dashboard/tracking';
import { edit } from '@/routes/profile';

type Item = {
    title: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    exact?: boolean;
    match?: string;
};

const ITEMS: Item[] = [
    {
        title: 'Overview',
        href: dashboard().url,
        icon: OverviewIcon,
        exact: true,
    },
    { title: 'Campaigns', href: campaigns().url, icon: CampaignsIcon },
    { title: 'Leads', href: leads().url, icon: LeadsIcon },
    { title: 'Analytics', href: analytics().url, icon: AnalyticsIcon },
    { title: 'AI', href: ai().url, icon: AiIcon },
    { title: 'Pixels', href: tracking().url, icon: TrackingIcon },
];

// Only owners see this one: who has signed in, and when.
const USERS: Item = { title: 'Users', href: users().url, icon: UsersIcon };

const SETTINGS: Item = {
    title: 'Settings',
    href: edit().url,
    icon: SettingsIcon,
    match: '/settings',
};

function useIsActive() {
    const { currentUrl } = useCurrentUrl();

    return (item: Item) => {
        const path = currentUrl.split('?')[0];
        const base = item.match ?? item.href;

        return item.exact
            ? path === base
            : path === base || path.startsWith(`${base}/`);
    };
}

function Logo() {
    return (
        <Link href={dashboard().url} className="block px-2">
            <img
                src="/img/darklogo.png"
                alt="Brignac Mortgage"
                className="w-32 dark:hidden"
            />
            <img
                src="/img/lightlogo.png"
                alt="Brignac Mortgage"
                className="hidden w-32 dark:block"
            />
        </Link>
    );
}

function UserChip() {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    const [confirming, setConfirming] = useState(false);

    if (!auth.user) {
        return null;
    }

    const confirmLogout = () => {
        router.flushAll();
        router.post(logout().url);
    };

    return (
        <div className="flex items-center gap-3 rounded-full border border-border bg-background/60 p-2 pr-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
                {getInitials(auth.user.name)}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium text-foreground">
                    {auth.user.name}
                </p>
                <p className="truncate text-xs text-foreground/50">
                    {auth.user.email}
                </p>
            </div>
            <button
                type="button"
                onClick={() => setConfirming(true)}
                aria-label="Log out"
                data-test="logout-button"
                className="grid size-8 shrink-0 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
                <LogoutIcon className="size-4.5" />
            </button>

            <AlertDialog open={confirming} onOpenChange={setConfirming}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You'll need to sign back in to reach the dashboard
                            again.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmLogout}>
                            Log out
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// Two slim bars that slide into an X — same mark the public header uses for its own mobile menu.
function MenuIcon({ open }: { open: boolean }) {
    const bar = 'absolute right-0 h-[1.75px] rounded-full bg-current';

    return (
        <span className="relative block h-5 w-6">
            <motion.span
                className={bar}
                style={{ top: 'calc(50% - 0.875px)' }}
                initial={false}
                animate={{ y: open ? 0 : -4, rotate: open ? 45 : 0, width: 24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
                className={bar}
                style={{ top: 'calc(50% - 0.875px)' }}
                initial={false}
                animate={{
                    y: open ? 0 : 4,
                    rotate: open ? -45 : 0,
                    width: open ? 24 : 15,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
        </span>
    );
}

// Full-screen blurred overlay for the dashboard items, in a portal for the same reason the public
// header's mobile menu is: its own backdrop-filter would otherwise trap a fixed child inside it.
function MobileNavMenu({
    open,
    items,
    onClose,
}: {
    open: boolean;
    items: Item[];
    onClose: () => void;
}) {
    const isActive = useIsActive();

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const item = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/80 backdrop-blur-2xl lg:hidden"
                >
                    <motion.nav
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        transition={{
                            staggerChildren: 0.06,
                            delayChildren: 0.1,
                        }}
                        className="flex w-full max-w-xs flex-col gap-2 px-6"
                    >
                        {items.map((navItem) => {
                            const Icon = navItem.icon;
                            const active = isActive(navItem);

                            return (
                                <motion.div key={navItem.href} variants={item}>
                                    <Link
                                        href={navItem.href}
                                        onClick={onClose}
                                        className={cn(
                                            'flex items-center gap-4 rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors',
                                            active
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-foreground/80 hover:bg-foreground/5',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'grid size-10 shrink-0 place-items-center rounded-full',
                                                active
                                                    ? 'bg-primary/15 text-primary'
                                                    : 'bg-foreground/5',
                                            )}
                                        >
                                            <Icon className="size-5" />
                                        </span>
                                        {navItem.title}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.nav>

                    <motion.div
                        variants={item}
                        initial="hidden"
                        animate="show"
                        className="w-full max-w-xs px-6"
                    >
                        <UserChip />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

// Desktop: a floating frosted panel inset from the screen edges. Mobile: a top bar (logo, settings,
// hamburger) matching the public pages' header, opening a blurred full-screen menu for the rest.
export function DashboardSidebar() {
    const isActive = useIsActive();
    const { auth } = usePage().props;
    const isOwner = auth.user?.role === 'owner';
    const items = isOwner ? [...ITEMS, USERS, SETTINGS] : [...ITEMS, SETTINGS];
    const mobileMenuItems = isOwner ? [...ITEMS, USERS] : ITEMS;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <aside className="fixed inset-y-4 left-4 z-30 hidden w-64 flex-col gap-6 rounded-4xl border border-border bg-card/80 p-4 shadow-xl shadow-black/5 backdrop-blur-xl lg:flex">
                <div className="pt-2">
                    <Logo />
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch
                                className={cn(
                                    'group relative flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-colors',
                                    active
                                        ? 'text-foreground'
                                        : 'text-foreground/55 hover:text-foreground',
                                    item.title === 'Settings' && 'mt-auto',
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="dashboard-active-item"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 380,
                                            damping: 32,
                                        }}
                                        className="absolute inset-0 rounded-full border border-border bg-background shadow-sm"
                                    />
                                )}
                                <span
                                    className={cn(
                                        'relative grid size-9 shrink-0 place-items-center rounded-full transition-colors',
                                        active
                                            ? 'bg-primary/15 text-primary'
                                            : 'bg-foreground/5 group-hover:bg-foreground/10',
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

            <header className="fixed inset-x-4 top-4 z-30 flex items-center justify-between rounded-full border border-border bg-card/80 px-3 py-2 shadow-xl shadow-black/10 backdrop-blur-xl lg:hidden">
                <Logo />

                <div className="flex items-center gap-1">
                    <Link
                        href={SETTINGS.href}
                        aria-label="Settings"
                        className={cn(
                            'grid size-10 place-items-center rounded-full transition-colors',
                            isActive(SETTINGS)
                                ? 'bg-primary/15 text-primary'
                                : 'text-foreground/60 hover:bg-foreground/5 hover:text-foreground',
                        )}
                    >
                        <SettingsIcon className="size-5" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label="Toggle menu"
                        className="grid size-10 place-items-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
                    >
                        <MenuIcon open={mobileOpen} />
                    </button>
                </div>
            </header>

            <MobileNavMenu
                open={mobileOpen}
                items={mobileMenuItems}
                onClose={() => setMobileOpen(false)}
            />
        </>
    );
}
