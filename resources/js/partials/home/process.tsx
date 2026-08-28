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
        <div className="relative flex h-95 w-105 shrink-0 flex-col overflow-hidden rounded-[20px] border border-border bg-card p-8">
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
    const sectionRef = useRef<HTMLDivElement>(null);
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

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const rawX = useTransform(scrollYProgress, [0, 1], [range.start, range.end]);
    const x = useSpring(rawX, { stiffness: 300, damping: 40, mass: 0.5 });

    return (
        <section ref={sectionRef} className="force-light relative overflow-hidden bg-background py-20 sm:py-24">
            <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="/img/features-glow.svg"
                className="pointer-events-none absolute top-12.5 left-0 h-126.5 w-full object-cover select-none sm:top-[calc(429px-50vh)] sm:h-screen"
            />

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

            <div ref={containerRef} className="relative mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
                <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-4">
                    {STEPS.map((step, index) => (
                        <ProcessCard key={step.title} step={step} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
