import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from 'framer-motion';
import {
    Building2,
    ChevronsDown,
    Hammer,
    HandCoins,
    Home,
    Landmark,
    Layers,
    Percent,
    ShieldCheck,
    TreePine,
    Wallet,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Reveal } from '@/components/amicro/reveal';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const PROGRAMS = [
    {
        icon: Home,
        title: 'Conventional and Construction Loans',
        subtitle:
            'From your first home to ground-up construction, financed the right way.',
        tag: 'Conventional',
        spec: '30-Yr Fixed',
        idealFor: 'First-time & repeat buyers',
    },
    {
        icon: Landmark,
        title: 'FHA Loans',
        subtitle:
            'Low down payment options backed by the Federal Housing Administration.',
        tag: 'Government-Backed',
        spec: '3.5% Down',
        idealFor: 'Buyers with limited savings',
    },
    {
        icon: ShieldCheck,
        title: 'VA and VA Construction Loans',
        subtitle:
            'Zero-down financing and construction options for those who served.',
        tag: 'Military Benefit',
        spec: '0% Down',
        idealFor: 'Active-duty & veteran buyers',
    },
    {
        icon: TreePine,
        title: 'RD/USDA',
        subtitle:
            'Zero-down financing for eligible rural and suburban properties.',
        tag: 'Rural Development',
        spec: '0% Down',
        idealFor: 'Rural & suburban buyers',
    },
    {
        icon: Percent,
        title: 'Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns',
        subtitle:
            'Flexible rate structures designed to fit your budget today and tomorrow.',
        tag: 'Rate Options',
        spec: '3-2-1 Buydown',
        idealFor: 'Buyers wanting lower early payments',
    },
    {
        icon: Building2,
        title: 'Jumbo Loan Experts',
        subtitle:
            'Financing above conventional limits for high-value properties.',
        tag: 'Jumbo',
        spec: 'Above Conforming',
        idealFor: 'High-value home buyers',
    },
    {
        icon: Wallet,
        title: 'Home Equity Line of Credit Loans',
        subtitle: "Put your home's equity to work, on your terms.",
        tag: 'HELOC',
        spec: 'Revolving Credit',
        idealFor: 'Homeowners tapping equity',
    },
    {
        icon: HandCoins,
        title: 'Down Payment Assistance',
        subtitle: 'Programs that help bridge the gap to your down payment.',
        tag: 'Assistance',
        spec: 'Grants & Loans',
        idealFor: 'Buyers short on down payment',
    },
    {
        icon: Layers,
        title: 'Non-QM Loans',
        subtitle:
            'Flexible qualification for borrowers outside traditional guidelines — including bank statements instead of tax returns for the self-employed.',
        tag: 'Non-QM',
        spec: 'Flexible Terms',
        idealFor: 'Self-employed & non-traditional income borrowers',
    },
    {
        icon: Hammer,
        title: 'Rehab Loans & Fix-and-Flip',
        subtitle:
            'Finance the purchase and the renovation in a single loan, or short-term funding built for investors moving fast.',
        tag: 'Renovation',
        spec: 'Purchase + Repair',
        idealFor: 'Fixer-upper buyers & investors',
    },
];

// Swapped in behind the floating glass chips on the right, cycling per group. Duplicates are fine
// for now — more will be added later.
const TIMELINE_IMAGES = [
    '/img/loan_timeline/img-3.jpg',
    '/img/loan_timeline/img-2.jpg',
    '/img/loan_timeline/img-1.jpg',
];

// A different silhouette each time the photo changes — plain rounded rectangle, a squircle with
// two sharp corners, and an asymmetric blob — so the frame itself varies, not just the photo in it.
const TIMELINE_SHAPES = [
    { aspect: 'aspect-4/5', radius: 'rounded-[2.5rem]' },
    {
        aspect: 'aspect-square',
        radius: 'rounded-tl-[4rem] rounded-tr-xl rounded-br-[4rem] rounded-bl-xl',
    },
    {
        aspect: 'aspect-3/4',
        radius: 'rounded-[35%_65%_65%_35%/45%_45%_55%_55%]',
    },
];

// Where a floating chip can land, each with its own drift so two chips on screen together never
// move in lockstep. Picked per group below so the pair of spots (and the direction each drifts)
// changes from one group to the next instead of always being "top-left" and "bottom-right".
const CHIP_SPOTS = [
    {
        className: 'top-6 -left-8',
        float: { x: [0, 10, -4, 0], y: [0, -14, 6, 0] },
    },
    {
        className: 'top-6 -right-8',
        float: { x: [0, -10, 4, 0], y: [0, -10, -4, 0] },
    },
    {
        className: 'bottom-8 -left-10',
        float: { x: [0, 12, -6, 0], y: [0, 10, -8, 0] },
    },
    {
        className: 'bottom-8 -right-10',
        float: { x: [0, -12, 6, 0], y: [0, 12, -6, 0] },
    },
    {
        className: 'top-1/2 -left-12 -translate-y-1/2',
        float: { x: [0, 14, 0, -6, 0], y: [0, -10, 10, 0] },
    },
    {
        className: 'top-1/3 -right-12',
        float: { x: [0, -8, 10, 0], y: [0, 8, -12, 0] },
    },
];

const GROUP_SIZE = 2;
const PROGRAM_GROUPS = Array.from(
    { length: Math.ceil(PROGRAMS.length / GROUP_SIZE) },
    (_, i) => PROGRAMS.slice(i * GROUP_SIZE, i * GROUP_SIZE + GROUP_SIZE),
);

const TICK_COUNT = 32;

export function LoanTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });
    const groupProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, PROGRAM_GROUPS.length - 0.001],
    );
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
    const panelScale = useTransform(scrollYProgress, [0, 0.06], [0.85, 1]);
    const panelRadius = useTransform(scrollYProgress, [0, 0.06], [60, 48]);

    useMotionValueEvent(groupProgress, 'change', (value) => {
        const next = Math.min(
            PROGRAM_GROUPS.length - 1,
            Math.max(0, Math.floor(value)),
        );
        setActiveIndex((current) => (current === next ? current : next));
    });

    const group = PROGRAM_GROUPS[activeIndex];
    const rangeStart = activeIndex * GROUP_SIZE + 1;
    const rangeEnd = rangeStart + group.length - 1;

    return (
        <div className="force-light bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                <Reveal
                    as="h2"
                    className="text-3xl text-foreground sm:text-4xl"
                >
                    Our Services &amp; Products
                </Reveal>
                <Reveal
                    as="p"
                    delay={0.1}
                    className="mt-4 text-base text-foreground/60"
                >
                    From your first home to investment properties, explore
                    everything we can finance for you.
                </Reveal>
            </div>

            <div className="mx-auto mt-16 max-w-384 px-4 sm:px-6 lg:px-8">
                <div
                    ref={sectionRef}
                    data-header-theme="dark"
                    className="relative"
                    style={{ height: `${PROGRAM_GROUPS.length * 60}vh` }}
                >
                    <motion.div
                        style={{
                            scale: panelScale,
                            borderRadius: panelRadius,
                            transformOrigin: 'center top',
                        }}
                        className="force-dark sticky top-8 h-[calc(100vh-4rem)] overflow-hidden bg-background text-foreground"
                    >
                        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
                            <div className="relative flex h-full flex-col justify-center sm:pl-10">
                                <div className="absolute inset-y-0 left-0 hidden w-px bg-white/10 sm:block">
                                    {Array.from({ length: TICK_COUNT }).map(
                                        (_, index) => (
                                            <span
                                                key={index}
                                                className="absolute left-1/2 h-px w-2 -translate-x-1/2 bg-white/15"
                                                style={{
                                                    top: `${(index / (TICK_COUNT - 1)) * 100}%`,
                                                }}
                                            />
                                        ),
                                    )}

                                    {PROGRAM_GROUPS.map((_, index) => (
                                        <span
                                            key={index}
                                            className="absolute left-1/2 -translate-x-1/2"
                                            style={{
                                                top: `${(index / (PROGRAM_GROUPS.length - 1)) * 100}%`,
                                            }}
                                        >
                                            <span
                                                className={`block rounded-full transition-all duration-300 ${
                                                    index === activeIndex
                                                        ? 'size-3.5 bg-primary shadow-[0_0_0_6px_rgba(81,176,3,0.2)]'
                                                        : 'size-2 bg-white/25'
                                                }`}
                                            />
                                        </span>
                                    ))}
                                </div>

                                <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                                    {rangeStart === rangeEnd
                                        ? `Service ${rangeStart}`
                                        : `Services ${rangeStart}–${rangeEnd}`}
                                </span>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-3"
                                    >
                                        {group.map((p, i) => (
                                            <motion.div
                                                key={p.title}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: EASE,
                                                    delay: i * 0.15,
                                                }}
                                                className={
                                                    i > 0
                                                        ? 'mt-5 border-t border-white/10 pt-5'
                                                        : ''
                                                }
                                            >
                                                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                                                    {p.title}
                                                </h3>
                                                <p className="mt-2 max-w-sm text-sm text-white/60">
                                                    {p.subtitle}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                <motion.div
                                    style={{ opacity: indicatorOpacity }}
                                    className="absolute bottom-0 left-0 flex items-center gap-2 text-xs font-medium text-white/50 sm:pl-10"
                                >
                                    <span className="grid size-8 place-items-center rounded-full bg-white/10">
                                        <ChevronsDown className="size-4" />
                                    </span>
                                    Scroll Down
                                </motion.div>
                            </div>

                            <div className="relative flex h-full items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full max-w-sm"
                                    >
                                        {/* One photo instead of two data cards — a different
                                            silhouette each time (see TIMELINE_SHAPES), with the
                                            per-service info now living in the floating glass chips
                                            below, iOS-style. */}
                                        <div
                                            className={cn(
                                                'relative w-full overflow-hidden ring-1 ring-white/10 transition-[border-radius] duration-500',
                                                TIMELINE_SHAPES[
                                                    activeIndex %
                                                        TIMELINE_SHAPES.length
                                                ].aspect,
                                                TIMELINE_SHAPES[
                                                    activeIndex %
                                                        TIMELINE_SHAPES.length
                                                ].radius,
                                            )}
                                        >
                                            <img
                                                src={
                                                    TIMELINE_IMAGES[
                                                        activeIndex %
                                                            TIMELINE_IMAGES.length
                                                    ]
                                                }
                                                alt=""
                                                aria-hidden="true"
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                                        </div>

                                        {/* Floating, frosted-glass chips — one per service in the
                                            group (3 of them, not just 2). Which spots they land in
                                            (and which way each one drifts) comes from CHIP_SPOTS,
                                            keyed off the group index, so the trio changes from one
                                            group to the next instead of always landing in the same
                                            three corners. */}
                                        {group.map((p, i) => {
                                            const Icon = p.icon;
                                            const spot =
                                                CHIP_SPOTS[
                                                    (activeIndex * GROUP_SIZE +
                                                        i) %
                                                        CHIP_SPOTS.length
                                                ];

                                            return (
                                                <motion.div
                                                    key={p.title}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                        scale: 0.9,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: spot.float.x,
                                                        y: spot.float.y,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        opacity: {
                                                            duration: 0.5,
                                                            ease: EASE,
                                                            delay:
                                                                0.2 + i * 0.15,
                                                        },
                                                        scale: {
                                                            duration: 0.5,
                                                            ease: EASE,
                                                            delay:
                                                                0.2 + i * 0.15,
                                                        },
                                                        x: {
                                                            duration:
                                                                7 + i * 1.5,
                                                            repeat: Infinity,
                                                            ease: 'easeInOut',
                                                            delay: 1,
                                                        },
                                                        y: {
                                                            duration:
                                                                6 + i * 1.5,
                                                            repeat: Infinity,
                                                            ease: 'easeInOut',
                                                            delay: 1,
                                                        },
                                                    }}
                                                    className={cn(
                                                        'absolute z-10 flex w-52 items-center gap-3 rounded-2xl border border-white/30 bg-white/20 p-3 shadow-xl shadow-black/20 backdrop-blur-2xl',
                                                        spot.className,
                                                    )}
                                                >
                                                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                                                        <Icon className="size-5" />
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-xs font-semibold text-white">
                                                            {p.title}
                                                        </p>
                                                        <p className="truncate text-[11px] text-white/60">
                                                            {p.tag}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
