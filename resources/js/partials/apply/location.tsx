import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

// Weekday index (0 = Sunday) → opening hours label.
const HOURS = [
    { days: 'Monday – Friday', time: '9:00 am – 5:00 pm', weekdays: [1, 2, 3, 4, 5] },
    { days: 'Saturday', time: 'By appointment', weekdays: [6] },
    { days: 'Sunday', time: 'By appointment', weekdays: [0] },
];

// The office is in Louisiana, so "open now" is judged on Central time no matter where the visitor is.
function isOpenNow() {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date());
    const weekday = parts.find((part) => part.type === 'weekday')?.value ?? '';
    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0) % 24;

    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday) && hour >= 9 && hour < 17;
}

function todayIndex() {
    const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(new Date());

    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
}

export function Location() {
    // Computed once on mount (client-rendered app), so no effect is needed to sync it.
    const [open] = useState(isOpenNow);
    const [today] = useState(todayIndex);

    return (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="text-center"
            >
                <span className="inline-flex rounded-full border border-border bg-card px-5 py-1.5 text-xs font-medium tracking-wide text-foreground/60 uppercase">
                    Visit Us
                </span>
                <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">Find Our Office</h2>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: EASE }}
                    className="relative h-[420px] overflow-hidden rounded-4xl border border-border bg-card p-2 sm:h-[540px] lg:col-span-2"
                >
                    <iframe
                        title="Brignac Mortgage office location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.35326397936!2d-90.72841729999999!3d30.227000999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8626cf3dc655337f%3A0x3b15aacf38947f0c!2sBrignac%20Mortgage!5e0!3m2!1sen!2smx!4v1789877647263!5m2!1sen!2smx"
                        className="h-full w-full rounded-3xl border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                    />

                    <div className="pointer-events-none absolute inset-x-6 bottom-6 flex sm:inset-x-8 sm:bottom-8">
                        <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-full border border-white/60 bg-white/80 py-2.5 pr-2.5 pl-3 shadow-xl shadow-black/10 backdrop-blur-xl">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                                <MapPin className="size-5" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-foreground">Brignac Mortgage</p>
                                <p className="truncate text-xs text-foreground/60">21121 Waterfront East Dr, Maurepas, LA</p>
                            </div>
                            <a
                                href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Get directions"
                                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                <ArrowUpRight className="size-4" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: EASE, delay: 0.12 }}
                    className="flex flex-col rounded-4xl border border-border bg-card p-8"
                >
                    <div className="flex items-center gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <Clock className="size-5" />
                        </span>
                        <h3 className="text-xl font-semibold text-foreground">Business Hours</h3>
                    </div>

                    {today >= 0 && (
                        <span
                            className={cn(
                                'mt-5 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium',
                                open ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border bg-background text-foreground/60',
                            )}
                        >
                            <span className={cn('size-1.5 rounded-full', open ? 'animate-pulse bg-primary' : 'bg-foreground/30')} />
                            {open ? 'Open now' : 'Closed right now'}
                        </span>
                    )}

                    <ul className="mt-6 space-y-3">
                        {HOURS.map((row) => {
                            const isToday = row.weekdays.includes(today);

                            return (
                                <li
                                    key={row.days}
                                    className={cn(
                                        'rounded-2xl border p-4 transition-colors',
                                        isToday ? 'border-primary/30 bg-primary/5' : 'border-border bg-background',
                                    )}
                                >
                                    <p className="text-xs text-foreground/40">{row.days}</p>
                                    <p className="mt-0.5 text-sm font-medium text-foreground">{row.time}</p>
                                </li>
                            );
                        })}
                    </ul>

                    <p className="mt-auto pt-6 text-xs text-foreground/40">Central Time (Louisiana)</p>
                </motion.div>
            </div>
        </section>
    );
}
