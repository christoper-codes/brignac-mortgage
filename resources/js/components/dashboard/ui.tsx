import { router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { FacebookMark, InstagramMark, TikTokMark } from '@/components/platform-marks';
import { cn } from '@/lib/utils';
import type { Platform, Row } from '@/types/dashboard';

const EASE = [0.16, 1, 0.3, 1] as const;

export const number = new Intl.NumberFormat('en-US');

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl text-foreground sm:text-4xl">{title}</h1>
                {description && <p className="mt-2 text-sm text-foreground/60">{description}</p>}
            </div>
            {actions}
        </div>
    );
}

export function Card({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay }}
            className={cn('rounded-4xl border border-border bg-card p-6', className)}
        >
            {children}
        </motion.section>
    );
}

export function CardTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
    return (
        <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="font-sans text-base font-semibold tracking-normal text-foreground">{children}</h2>
            {aside}
        </div>
    );
}

// 7 / 30 / 90 day switch that lives in the URL, so the choice survives reloads and can be shared.
export function RangeTabs({ value }: { value: number }) {
    const { url } = usePage();
    const path = url.split('?')[0];

    return (
        <div className="inline-flex rounded-full border border-border bg-card p-1">
            {[7, 30, 90].map((days) => (
                <button
                    key={days}
                    type="button"
                    onClick={() => router.get(path, { range: days }, { preserveScroll: true, preserveState: true })}
                    className={cn(
                        'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
                        value === days ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground',
                    )}
                >
                    {days}d
                </button>
            ))}
        </div>
    );
}

export function Delta({ change }: { change?: number | null }) {
    if (change === null || change === undefined) {
        return (
            <span className="text-xs text-foreground/40" title="The previous period had no activity to compare against, so a % change can't be calculated yet.">
                No prior data
            </span>
        );
    }

    const up = change >= 0;
    const Arrow = up ? ArrowUpRight : ArrowDownRight;

    return (
        <span className={cn('inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium', up ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500')}>
            <Arrow className="size-3" />
            {Math.abs(change)}%
        </span>
    );
}

export function StatCard({ label, value, change, hint, suffix, delay }: { label: string; value: number; change?: number | null; hint?: string; suffix?: string; delay?: number }) {
    return (
        <Card delay={delay} className="p-4 sm:p-5">
            <p className="text-sm text-foreground/60">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground tabular-nums">
                {number.format(value)}
                {suffix}
            </p>
            {(change !== undefined || hint) && (
                <div className="mt-3">{change !== undefined ? <Delta change={change} /> : <span className="text-xs text-foreground/40">{hint}</span>}</div>
            )}
        </Card>
    );
}

export function BarChart({ data, height = 200, tooltip }: { data: { label: string; value: number; tip?: string }[]; height?: number; tooltip?: string }) {
    const max = Math.max(1, ...data.map((item) => item.value));
    const labelEvery = Math.max(1, Math.ceil(data.length / 8));

    return (
        <div>
            <div className="flex items-end gap-1" style={{ height }}>
                {data.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="group relative flex h-full flex-1 items-end">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(item.value > 0 ? 3 : 0, (item.value / max) * 100)}%` }}
                            transition={{ duration: 0.8, ease: EASE, delay: Math.min(index * 0.012, 0.5) }}
                            className="w-full rounded-full bg-primary/25 transition-colors group-hover:bg-primary"
                        />
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded-2xl border border-border bg-background px-3 py-2 text-xs whitespace-nowrap shadow-lg group-hover:block">
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-foreground/60">{item.tip ?? `${number.format(item.value)} ${tooltip ?? ''}`}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 flex gap-1">
                {data.map((item, index) => (
                    <span key={`${item.label}-${index}`} className="flex-1 text-center text-[10px] text-foreground/40">
                        {index % labelEvery === 0 ? item.label : ''}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Breakdown({ rows, empty = 'No data yet', plain = false }: { rows: Row[]; empty?: string; plain?: boolean }) {
    const max = Math.max(1, ...rows.map((row) => row.total));

    if (rows.length === 0) {
        return <p className="py-6 text-center text-sm text-foreground/40">{empty}</p>;
    }

    return (
        <ul className="space-y-3">
            {rows.map((row, index) => (
                <li key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                        <span className={cn('truncate text-foreground/80', !plain && 'capitalize')}>{row.label}</span>
                        <span className="ml-3 font-medium text-foreground tabular-nums">{number.format(row.total)}</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-foreground/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(row.total / max) * 100}%` }}
                            transition={{ duration: 0.8, ease: EASE, delay: index * 0.05 }}
                            className="h-full rounded-full bg-primary"
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function PlatformMark({ platform, className }: { platform: Platform; className?: string }) {
    if (platform === 'facebook') {
        return <FacebookMark className={cn('text-[#1877F2]', className)} />;
    }

    return platform === 'instagram' ? <InstagramMark className={cn('text-[#E1306C]', className)} /> : <TikTokMark className={cn('text-foreground', className)} />;
}

export function PlatformBadge({ platform, label }: { platform: Platform; label?: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80">
            <PlatformMark platform={platform} className="size-3.5" />
            {label ?? platform}
        </span>
    );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
    return (
        <div className="flex flex-col items-center rounded-4xl border border-dashed border-border px-6 py-16 text-center">
            <h3 className="font-sans text-lg font-semibold tracking-normal text-foreground">{title}</h3>
            <p className="mt-2 max-w-sm text-sm text-foreground/60">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

export function StatePill({ code, name }: { code: string | null; name?: string | null }) {
    if (!code) {
        return <span className="text-xs text-foreground/40">Unknown</span>;
    }

    return (
        <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', code === 'LA' ? 'bg-primary/10 text-primary' : 'bg-foreground/5 text-foreground/70')}>
            {name ?? code}
        </span>
    );
}
