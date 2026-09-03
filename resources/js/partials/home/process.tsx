import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BadgeCheck, KeyRound, ListChecks, Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const STEPS = [
    {
        icon: BadgeCheck,
        title: 'Apply & Get Pre-Qualified',
        description: 'Share a few details about your goals and finances — we give you a clear picture of what you can afford, with no impact to your credit.',
        stat: { label: 'Turnaround', value: '24-48h' },
    },
    {
        icon: ListChecks,
        title: 'Choose Your Program',
        description: 'Pick from 14+ loan programs matched to your income, credit, and homeownership goals.',
        stat: { label: 'Loan Programs', value: '14+' },
    },
    {
        icon: Lock,
        title: 'Lock Your Rate',
        description: "Once you're under contract, we lock your rate to protect you from market fluctuations.",
        stat: { label: 'Rate Lock', value: 'Up to 60 days' },
    },
    {
        icon: KeyRound,
        title: 'Close With Confidence',
        description: 'Sign your documents and get the keys — every step tracked and explained along the way.',
        stat: { label: 'Avg. Closing', value: '18 days' },
    },
];

const RIGHT_OFFSET = 140;

function ProcessCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
    const Icon = step.icon;

    return (
        <div className="relative flex h-95 w-105 shrink-0 flex-col overflow-hidden rounded-[20px] shadow bg-white p-8">
            <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                </span>
                <span className="text-xs font-semibold tracking-widest text-foreground/40 uppercase">Step {index + 1}</span>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">{step.description}</p>

            <div className="mt-auto flex items-center justify-between rounded-2xl bg-background p-4 ring-1 ring-border">
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
