import { Link } from '@inertiajs/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
    ArrowUpRight,
    BadgeCheck,
    KeyRound,
    ListChecks,
    Lock,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/amicro/reveal';

const STEPS = [
    {
        icon: BadgeCheck,
        title: 'Apply & Get Pre-Qualified.',
        description: 'Takes just a few minutes online.',
        stat: { label: 'Turnaround', value: '24-48h' },
    },
    {
        icon: ListChecks,
        title: 'Choose Your Program.',
        description: 'Matched to your goals and credit.',
        stat: { label: 'Loan Programs', value: '14+' },
    },
    {
        icon: Lock,
        title: 'Lock Your Rate.',
        description: 'Protected from market swings.',
        stat: { label: 'Rate Lock', value: 'Up to 60 days' },
    },
    {
        icon: KeyRound,
        title: 'Close With Confidence.',
        description: 'Every step tracked and explained.',
        stat: { label: 'Avg. Closing', value: '18 days' },
    },
];

const RIGHT_OFFSET = 140;

// Where the soft green light falls on each card, so the row doesn't read as four copies of one tile.
const GLOWS = [
    'bg-[radial-gradient(ellipse_80%_55%_at_100%_100%,rgba(81,176,3,0.14),transparent_70%)]',
    'bg-[radial-gradient(ellipse_80%_55%_at_0%_100%,rgba(81,176,3,0.14),transparent_70%)]',
    'bg-[radial-gradient(ellipse_80%_55%_at_100%_60%,rgba(81,176,3,0.12),transparent_70%)]',
    'bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgba(81,176,3,0.14),transparent_70%)]',
];

// Light, Apple-style tile: a small dark icon chip, a bold headline that trails off into grey, a big
// faded step number, and one dark pill at the bottom holding the stat and the action button.
function ProcessCard({
    step,
    index,
}: {
    step: (typeof STEPS)[number];
    index: number;
}) {
    const Icon = step.icon;

    return (
        <div className="group relative flex h-120 w-84 shrink-0 flex-col overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 transition-transform duration-500 ease-out hover:scale-[1.02]">
            <div
                className={`pointer-events-none absolute inset-0 ${GLOWS[index % GLOWS.length]}`}
            />

            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 bottom-16 text-[10rem] leading-none font-semibold tracking-tighter text-foreground/4 select-none"
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            <div className="relative flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-neutral-100 text-primary ring-1 ring-black/5">
                    <Icon className="size-5" />
                </span>
                <span className="text-xs font-semibold tracking-widest text-foreground/40 uppercase">
                    Step {index + 1}
                </span>
            </div>

            <h3 className="relative mt-8 text-[26px] leading-[1.12] font-semibold tracking-tight">
                <span className="text-foreground">{step.title}</span>{' '}
                <span className="text-foreground/45">{step.description}</span>
            </h3>

            <div className="relative mt-auto flex items-center justify-between rounded-full bg-neutral-100 p-1.5 pl-6 text-foreground ring-1 ring-black/5">
                <div className="leading-tight">
                    <p className="text-[11px] text-foreground/50">
                        {step.stat.label}
                    </p>
                    <p className="text-sm font-semibold">{step.stat.value}</p>
                </div>

                <Link
                    href="/apply"
                    aria-label="Apply now"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 hover:scale-105"
                >
                    <ArrowUpRight className="size-5" />
                </Link>
            </div>
        </div>
    );
}

export function Process() {
    const driverRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState({
        start: RIGHT_OFFSET,
        end: -RIGHT_OFFSET,
    });

    useEffect(() => {
        const measure = () => {
            const trackWidth = trackRef.current?.scrollWidth ?? 0;
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const overflow = Math.max(0, trackWidth - containerWidth);

            setRange({ start: RIGHT_OFFSET, end: -(overflow + RIGHT_OFFSET) });
        };

        measure();
        window.addEventListener('resize', measure);

        return () => window.removeEventListener('resize', measure);
    }, []);

    // Pinning the row for a fixed viewport-relative scroll distance (rather than tying progress
    // to the row's own short natural height) keeps the reveal pace consistent across screen sizes —
    // on a short laptop viewport the row's own enter/exit window is tiny, which used to burn through
    // the whole animation before card 1 was even fully visible.
    const { scrollYProgress } = useScroll({
        target: driverRef,
        offset: ['start start', 'end end'],
    });
    const rawX = useTransform(
        scrollYProgress,
        [0, 1],
        [range.start, range.end],
    );
    const x = useSpring(rawX, { stiffness: 300, damping: 40, mass: 0.5 });

    return (
        <section className="force-light relative bg-background py-20 sm:py-24">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left">
                    <Reveal
                        as="p"
                        className="text-sm font-semibold tracking-wide text-primary uppercase"
                    >
                        Process
                    </Reveal>
                    <Reveal
                        as="h2"
                        delay={0.08}
                        className="mx-auto mt-4 max-w-xs text-4xl text-foreground sm:mx-0 sm:max-w-sm sm:text-5xl"
                    >
                        How Financing Your Home Works
                    </Reveal>
                    <Reveal
                        as="p"
                        delay={0.16}
                        className="mx-auto mt-4 max-w-sm text-base font-medium text-foreground/60 sm:mx-0"
                    >
                        From application to closing, our streamlined process
                        keeps you informed and confident every step of the way.
                    </Reveal>
                </div>
            </div>

            <div
                ref={driverRef}
                className="relative mt-12"
                style={{ height: '180vh' }}
            >
                <div className="sticky top-8 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
                    <img
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        src="/img/features-glow.svg"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
                    />

                    <div
                        ref={containerRef}
                        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
                    >
                        <motion.div
                            ref={trackRef}
                            style={{ x }}
                            className="flex items-stretch gap-4"
                        >
                            {STEPS.map((step, index) => (
                                <ProcessCard
                                    key={step.title}
                                    step={step}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
