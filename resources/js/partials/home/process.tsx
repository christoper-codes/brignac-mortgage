import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BadgeCheck, KeyRound, ListChecks, Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const STEPS = [
    {
        icon: BadgeCheck,
        title: 'Apply & Get Pre-Qualified',
        description: 'Takes just a few minutes online.',
        stat: { label: 'Turnaround', value: '24-48h' },
        background: 'glow' as const,
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

// A branching node network fanning out from the bottom-left corner — echoes "choosing a path"
// among several programs, while staying just as restrained (white first, green accent second).
function CardNetworkBackdrop() {
    const nodes = [
        { x: 14, y: 468, r: 5 },
        { x: 78, y: 402, r: 4 },
        { x: 64, y: 452, r: 3.5 },
        { x: 150, y: 356, r: 4.5 },
        { x: 136, y: 414, r: 3 },
        { x: 158, y: 452, r: 3.5 },
        { x: 224, y: 320, r: 3 },
    ];
    const edges: [number, number][] = [
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4],
        [2, 5],
        [3, 6],
    ];

    return (
        <svg viewBox="0 0 336 480" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id="process-card-network-glow" cx="0%" cy="100%" r="75%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill="url(#process-card-network-glow)" />

            {edges.map(([from, to]) => (
                <line
                    key={`${from}-${to}`}
                    x1={nodes[from].x}
                    y1={nodes[from].y}
                    x2={nodes[to].x}
                    y2={nodes[to].y}
                    stroke="rgb(81,176,3)"
                    strokeOpacity="0.2"
                />
            ))}

            {nodes.map((node, index) => (
                <circle key={index} cx={node.x} cy={node.y} r={node.r} fill="rgb(81,176,3)" fillOpacity="0.4" />
            ))}
        </svg>
    );
}

// A soft glow layered with concentric rings and a few accent dots radiating from the corner —
// more detail than a flat wash, while white still reads as the dominant surface.
function CardGlowBackdrop() {
    const rings = [50, 85, 120, 155, 190];
    const dots = [
        { angle: 100, radius: 70 },
        { angle: 125, radius: 130 },
        { angle: 145, radius: 90 },
        { angle: 160, radius: 165 },
        { angle: 175, radius: 115 },
    ];

    return (
        <svg viewBox="0 0 336 480" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id="process-card-glow" cx="100%" cy="0%" r="75%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill="url(#process-card-glow)" />

            {rings.map((radius) => (
                <circle key={radius} cx="336" cy="0" r={radius} fill="none" stroke="rgb(81,176,3)" strokeOpacity="0.14" />
            ))}

            {dots.map(({ angle, radius }) => {
                const theta = (angle * Math.PI) / 180;
                const cx = 336 + radius * Math.cos(theta);
                const cy = radius * Math.sin(theta);

                return <circle key={angle} cx={cx} cy={cy} r="3" fill="rgb(81,176,3)" fillOpacity="0.4" />;
            })}
        </svg>
    );
}

function ProcessCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
    const Icon = step.icon;

    return (
        <div className="relative flex h-120 w-84 shrink-0 flex-col overflow-hidden rounded-4xl bg-white p-8 shadow-sm">
            {step.background === 'glow' && <CardGlowBackdrop />}
            {step.background === 'gradient' && <CardNetworkBackdrop />}

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
