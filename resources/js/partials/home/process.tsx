import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BadgeCheck, KeyRound, ListChecks, Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const STEPS = [
    {
        icon: BadgeCheck,
        title: 'Apply & Get Pre-Qualified',
        description: 'Takes just a few minutes online.',
        stat: { label: 'Turnaround', value: '24-48h' },
        background: 'grid' as const,
    },
    {
        icon: ListChecks,
        title: 'Choose Your Program',
        description: 'Matched to your goals and credit.',
        stat: { label: 'Loan Programs', value: '14+' },
        background: 'gradient' as const,
    },
    {
        icon: Lock,
        title: 'Lock Your Rate',
        description: 'Protected from market swings.',
        stat: { label: 'Rate Lock', value: 'Up to 60 days' },
    },
    {
        icon: KeyRound,
        title: 'Close With Confidence',
        description: 'Every step tracked and explained.',
        stat: { label: 'Avg. Closing', value: '18 days' },
    },
];

const RIGHT_OFFSET = 140;

function CardGradientBackdrop() {
    return (
        <svg
            viewBox="0 0 335 420"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full"
        >
            <defs>
                <linearGradient id="process-card-gradient" gradientUnits="userSpaceOnUse" x1="337.85" y1="170.758" x2="337.5" y2="0">
                    <stop offset="0%" stopColor="rgb(246,249,246)" />
                    <stop offset="100%" stopColor="rgb(219,240,201)" />
                </linearGradient>
            </defs>
            <g transform="matrix(-0.793034, 0.609177, -0.609177, -0.793034, 444.447, 7.608)">
                <path fill="url(#process-card-gradient)" d="M675,0 C675,0 0,0 0,0 C0,0 0,299 0,299 C0,299 675,299 675,299 C675,299 675,0 675,0z" />
            </g>
        </svg>
    );
}

// Simulates process-bg-card-1.png's fading grid pattern in the brand green instead of blue.
function CardGridBackdrop() {
    const rowOpacities = [1, 0.65, 0.35];
    const cellWidth = 92;
    const cellHeight = 36;
    const gap = 3;

    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <linearGradient id="process-card-grid" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </linearGradient>
            </defs>
            {rowOpacities.map((rowOpacity, row) =>
                [0, 1, 2].map((col) => (
                    <rect
                        key={`${row}-${col}`}
                        x={col * (cellWidth + gap)}
                        y={row * (cellHeight + gap)}
                        width={cellWidth}
                        height={cellHeight}
                        fill="url(#process-card-grid)"
                        opacity={rowOpacity}
                    />
                )),
            )}
        </svg>
    );
}

function ProcessCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
    const Icon = step.icon;

    return (
        <div className="relative flex h-120 w-84 shrink-0 flex-col overflow-hidden rounded-4xl bg-white p-8 shadow-sm">
            {step.background === 'grid' && <CardGridBackdrop />}
            {step.background === 'gradient' && <CardGradientBackdrop />}

            <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                </span>
                <span className="text-xs font-semibold tracking-widest text-foreground/40 uppercase">Step {index + 1}</span>
            </div>

            <div className="relative flex flex-1 flex-col justify-center">
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{step.description}</p>
            </div>

            <div className="relative flex items-center justify-between rounded-2xl bg-background p-4 ring-1 ring-border">
                <span className="text-xs text-foreground/50">{step.stat.label}</span>
                <span className="text-sm font-semibold text-foreground">{step.stat.value}</span>
            </div>
        </div>
    );
}

export function Process() {
    const driverRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState({ start: RIGHT_OFFSET, end: -RIGHT_OFFSET });

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
    const { scrollYProgress } = useScroll({ target: driverRef, offset: ['start start', 'end end'] });
    const rawX = useTransform(scrollYProgress, [0, 1], [range.start, range.end]);
    const x = useSpring(rawX, { stiffness: 300, damping: 40, mass: 0.5 });

    return (
        <section className="force-light relative bg-background py-20 sm:py-24">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left">
                    <p className="text-sm font-semibold tracking-wide text-primary uppercase">Process</p>
                    <h2 className="mx-auto mt-4 max-w-xs text-4xl text-foreground sm:mx-0 sm:max-w-sm sm:text-5xl">
                        How Financing Your Home Works
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-base font-medium text-foreground/60 sm:mx-0">
                        From application to closing, our streamlined process keeps you informed and confident every step of the way.
                    </p>
                </div>
            </div>

            <div ref={driverRef} className="relative mt-12" style={{ height: '180vh' }}>
                <div className="sticky top-8 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
                    <img
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        src="/img/features-glow.svg"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
                    />

                    <div ref={containerRef} className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                        <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-4">
                            {STEPS.map((step, index) => (
                                <ProcessCard key={step.title} step={step} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
