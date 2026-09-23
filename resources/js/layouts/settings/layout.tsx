import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { PageHeader } from '@/components/dashboard/ui';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <PageHeader
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col gap-6 lg:flex-row">
                <aside className="lg:w-52 lg:shrink-0">
                    <nav
                        className="flex gap-1.5 overflow-x-auto rounded-full border border-border bg-card p-1.5 lg:flex-col lg:overflow-visible lg:rounded-3xl"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => {
                            const active = isCurrentOrParentUrl(item.href);

                            return (
                                <Link
                                    key={`${toUrl(item.href)}-${index}`}
                                    href={item.href}
                                    className={cn(
                                        'shrink-0 rounded-full px-4 py-2.5 text-center text-sm font-medium whitespace-nowrap transition-colors lg:text-left',
                                        active
                                            ? 'bg-foreground text-background'
                                            : 'text-foreground/60 hover:bg-foreground/5 hover:text-foreground',
                                    )}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div className="min-w-0 flex-1 space-y-6">{children}</div>
            </div>
        </div>
    );
}
