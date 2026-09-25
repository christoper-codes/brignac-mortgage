import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Card, CardTitle, PageHeader } from '@/components/dashboard/ui';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { users as usersRoute } from '@/routes/dashboard';
import type { TeamMember } from '@/types/dashboard';

type Slice = { key: string; label: string; count: number };

type Props = {
    users: TeamMember[];
    summary: { total: number; roles: Slice[]; activity: Slice[] };
};

// Colors are per slice key, so the same word always has the same color on both bars.
const SLICE_COLORS: Record<string, string> = {
    owner: 'bg-foreground',
    admin: 'bg-foreground/30',
    last_24_hours: 'bg-primary',
    this_week: 'bg-yellow-500',
    earlier: 'bg-foreground/30',
    never: 'bg-foreground/10',
};

/** A proportional bar plus a legend (dot, label, count) — one row of the "total users" breakdown. */
function Breakdown({ slices, total }: { slices: Slice[]; total: number }) {
    return (
        <div>
            <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-foreground/5">
                {slices
                    .filter((slice) => slice.count > 0)
                    .map((slice, index) => (
                        <motion.div
                            key={slice.key}
                            initial={{ width: 0 }}
                            animate={{ width: `${(slice.count / total) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className={cn('h-full rounded-full', SLICE_COLORS[slice.key])}
                        />
                    ))}
            </div>

            <ul className="mt-4 space-y-2">
                {slices.map((slice) => (
                    <li key={slice.key} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2.5 text-foreground/70">
                            <span className={cn('size-2.5 rounded-full', SLICE_COLORS[slice.key])} />
                            {slice.label}
                        </span>
                        <span className="font-medium text-foreground tabular-nums">{slice.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const fullDate = (iso: string) => new Date(iso).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

/** "Just now", "12 min ago", "3 h ago", "Yesterday", "3 days ago", then the date. */
function relative(iso: string): string {
    const elapsed = Date.now() - new Date(iso).getTime();

    if (elapsed < MINUTE) {
        return 'Just now';
    }

    if (elapsed < HOUR) {
        return `${Math.floor(elapsed / MINUTE)} min ago`;
    }

    if (elapsed < DAY) {
        return `${Math.floor(elapsed / HOUR)} h ago`;
    }

    if (elapsed < 2 * DAY) {
        return 'Yesterday';
    }

    if (elapsed < 14 * DAY) {
        return `${Math.floor(elapsed / DAY)} days ago`;
    }

    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// A dot that says how recently the person was active: green within a day, amber within a week, grey after
// that, and hollow when they never have been.
function activityDot(lastActive: string | null): string {
    if (!lastActive) {
        return 'border border-foreground/25';
    }

    const elapsed = Date.now() - new Date(lastActive).getTime();

    return elapsed < DAY ? 'bg-primary' : elapsed < 7 * DAY ? 'bg-yellow-500' : 'bg-foreground/30';
}

export default function Users({ users, summary }: Props) {
    const getInitials = useInitials();

    return (
        <>
            <Head title="Users" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <PageHeader title="Users" description="Everyone with access to the dashboard, when they last were active, and when they signed in." />

                <Card>
                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
                        <div>
                            <CardTitle>Total users</CardTitle>
                            <p className="text-5xl font-semibold tracking-tight text-foreground tabular-nums sm:text-6xl">{summary.total}</p>
                            <p className="mt-1 mb-6 text-sm text-foreground/50">{summary.total === 1 ? 'account' : 'accounts'} with dashboard access</p>
                            <Breakdown slices={summary.roles} total={summary.total} />
                        </div>

                        <div>
                            <CardTitle>Sign-in activity</CardTitle>
                            <Breakdown slices={summary.activity} total={summary.total} />
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col gap-3">
                    {users.map((user, position) => (
                        <Card key={user.id} delay={Math.min(0.2 + position * 0.04, 0.5)} className="p-5">
                            <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center">
                                <div className="flex min-w-0 items-center gap-3.5">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">{getInitials(user.name)}</span>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="min-w-0 truncate text-base font-semibold text-foreground">{user.name}</p>
                                            {user.is_you && <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">You</span>}
                                        </div>
                                        <p className="truncate text-xs text-foreground/50">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-sm text-foreground">
                                        <span className={cn('size-2 shrink-0 rounded-full', activityDot(user.last_seen_at ?? user.last_login_at))} />
                                        {user.last_seen_at ?? user.last_login_at ? (
                                            <span title={fullDate((user.last_seen_at ?? user.last_login_at) as string)}>Active {relative((user.last_seen_at ?? user.last_login_at) as string)}</span>
                                        ) : (
                                            <span className="text-foreground/50">Never signed in</span>
                                        )}
                                    </p>
                                    <p className="pl-4 text-xs text-foreground/45">
                                        {user.last_login_at
                                            ? `Signed in ${fullDate(user.last_login_at)}${user.last_login_ip ? ` · ${user.last_login_ip}` : ''}`
                                            : 'No sign-in recorded yet'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 sm:justify-end">
                                    <span className="text-xs text-foreground/50 tabular-nums">
                                        {user.login_count} {user.login_count === 1 ? 'sign-in' : 'sign-ins'}
                                    </span>
                                    <span className={cn('rounded-full px-3 py-1 text-xs font-medium', user.role === 'owner' ? 'bg-foreground text-background' : 'bg-foreground/5 text-foreground/70')}>{user.role_label}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

Users.layout = {
    breadcrumbs: [{ title: 'Users', href: usersRoute() }],
};
