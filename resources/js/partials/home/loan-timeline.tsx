import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
    Building2,
    ChevronsDown,
    FileText,
    Hammer,
    HandCoins,
    Home,
    Landmark,
    Layers,
    Percent,
    Repeat,
    ShieldCheck,
    Store,
    TreePine,
    Users,
    Warehouse,
    Wallet,
} from 'lucide-react';
import { useRef, useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const PROGRAMS = [
    {
        icon: Home,
        title: 'Conventional and Construction Loans',
        subtitle: 'From your first home to ground-up construction, financed the right way.',
        tag: 'Conventional',
        spec: '30-Yr Fixed',
        idealFor: 'First-time & repeat buyers',
    },
    {
        icon: Landmark,
        title: 'FHA Loans',
        subtitle: 'Low down payment options backed by the Federal Housing Administration.',
        tag: 'Government-Backed',
        spec: '3.5% Down',
        idealFor: 'Buyers with limited savings',
    },
    {
        icon: ShieldCheck,
        title: 'VA and VA Construction Loans',
        subtitle: 'Zero-down financing and construction options for those who served.',
        tag: 'Military Benefit',
        spec: '0% Down',
        idealFor: 'Active-duty & veteran buyers',
    },
    {
        icon: TreePine,
        title: 'RD/USDA',
        subtitle: 'Zero-down financing for eligible rural and suburban properties.',
        tag: 'Rural Development',
        spec: '0% Down',
        idealFor: 'Rural & suburban buyers',
    },
    {
        icon: Percent,
        title: 'Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns',
        subtitle: 'Flexible rate structures designed to fit your budget today and tomorrow.',
        tag: 'Rate Options',
        spec: '3-2-1 Buydown',
        idealFor: 'Buyers wanting lower early payments',
    },
    {
        icon: Building2,
        title: 'Jumbo Loan Experts',
        subtitle: 'Financing above conventional limits for high-value properties.',
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
        icon: FileText,
        title: 'Bank Statement Loans',
        subtitle: 'Qualify using bank statements instead of tax returns — built for the self-employed.',
        tag: 'Self-Employed',
        spec: '12-24 Mo. Statements',
        idealFor: 'Self-employed borrowers',
    },
    {
        icon: Layers,
        title: 'Non-QM Loans',
        subtitle: 'Flexible qualification for borrowers outside traditional guidelines.',
        tag: 'Non-QM',
        spec: 'Flexible Terms',
        idealFor: 'Non-traditional income borrowers',
    },
    {
        icon: Store,
        title: 'Commercial Loans',
        subtitle: 'Financing for investment and commercial properties.',
        tag: 'Commercial',
        spec: 'Investment Property',
        idealFor: 'Investors & business owners',
    },
    {
        icon: Warehouse,
        title: 'Mobile Home Loans - Single and Double Wide',
        subtitle: 'Single and double wide manufactured homes, financed with confidence.',
        tag: 'Manufactured',
        spec: 'Single/Double Wide',
        idealFor: 'Manufactured home buyers',
    },
    {
        icon: Hammer,
        title: 'Rehab Loans',
        subtitle: 'Finance the purchase and the renovation in a single loan.',
        tag: 'Renovation',
        spec: 'Purchase + Repair',
        idealFor: 'Fixer-upper buyers',
    },
    {
        icon: Repeat,
        title: 'Fix and Flip',
        subtitle: 'Short-term financing built for investors moving fast.',
        tag: 'Investor',
        spec: 'Short-Term',
        idealFor: 'Real estate investors',
    },
];

const GROUP_SIZE = 2;
const PROGRAM_GROUPS = Array.from({ length: Math.ceil(PROGRAMS.length / GROUP_SIZE) }, (_, i) =>
    PROGRAMS.slice(i * GROUP_SIZE, i * GROUP_SIZE + GROUP_SIZE),
);

const TICK_COUNT = 32;

const cardVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fromLeft: Variants = {
    hidden: { opacity: 0, x: -28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const fromBottomLeft: Variants = {
    hidden: { opacity: 0, y: 20, x: -14 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const fromBottomRight: Variants = {
    hidden: { opacity: 0, y: 20, x: 14 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const fromRight: Variants = {
    hidden: { opacity: 0, x: 28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

function ProgramIllustration({ program, compact = false }: { program: (typeof PROGRAMS)[number]; compact?: boolean }) {
    const Icon = program.icon;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className={`w-full max-w-sm rounded-3xl bg-white/4 ring-1 ring-white/10 backdrop-blur ${compact ? 'p-5' : 'p-6'}`}
        >
            <motion.div variants={fromLeft} className="flex items-center gap-3">
                <span
                    className={`grid shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ${compact ? 'size-10' : 'size-12'}`}
                >
                    <Icon className={compact ? 'size-5' : 'size-6'} />
                </span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{program.title}</p>
                    <p className="text-xs text-white/50">Brignac Mortgage</p>
                </div>
            </motion.div>

            <div className={`grid grid-cols-2 gap-3 ${compact ? 'mt-4' : 'mt-6'}`}>
                <motion.div
                    variants={fromBottomLeft}
                    className={`rounded-2xl bg-white/4 ring-1 ring-white/10 ${compact ? 'p-3' : 'p-4'}`}
                >
                    <p className="text-xs text-white/40">Category</p>
                    <p className={`mt-1 font-semibold text-white ${compact ? 'text-base' : 'text-lg'}`}>{program.tag}</p>
                </motion.div>
                <motion.div
                    variants={fromBottomRight}
                    className={`rounded-2xl bg-white/4 ring-1 ring-white/10 ${compact ? 'p-3' : 'p-4'}`}
                >
                    <p className="text-xs text-white/40">Highlight</p>
                    <p className={`mt-1 font-semibold text-white ${compact ? 'text-base' : 'text-lg'}`}>{program.spec}</p>
                </motion.div>
            </div>

            <motion.div
                variants={fromRight}
                className={`mt-3 flex items-center gap-3 rounded-2xl bg-white/4 ring-1 ring-white/10 ${compact ? 'p-3' : 'p-4'}`}
            >
                <span className={`grid shrink-0 place-items-center rounded-xl bg-white/10 text-white/70 ${compact ? 'size-8' : 'size-9'}`}>
                    <Users className={compact ? 'size-3.5' : 'size-4'} />
                </span>
                <div className="min-w-0">
                    <p className="text-xs text-white/40">Ideal For</p>
                    <p className={`truncate font-medium text-white ${compact ? 'text-xs' : 'text-sm'}`}>{program.idealFor}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function LoanTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
    const groupProgress = useTransform(scrollYProgress, [0, 1], [0, PROGRAM_GROUPS.length - 0.001]);
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
    const panelScale = useTransform(scrollYProgress, [0, 0.06], [0.85, 1]);
    const panelRadius = useTransform(scrollYProgress, [0, 0.06], [40, 24]);

    useMotionValueEvent(groupProgress, 'change', (value) => {
        const next = Math.min(PROGRAM_GROUPS.length - 1, Math.max(0, Math.floor(value)));
        setActiveIndex((current) => (current === next ? current : next));
    });

    const group = PROGRAM_GROUPS[activeIndex];
    const rangeStart = activeIndex * GROUP_SIZE + 1;
    const rangeEnd = rangeStart + group.length - 1;

    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl text-foreground sm:text-4xl">Loan Products &amp; Programs</h2>
                <p className="mt-4 text-lg text-foreground/60">
                    Explore our diverse range of loan products and programs designed to meet your unique financial needs. Whether you're
                    looking for a residential mortgage, an investment loan, or a commercial financing solution, we have the right options
                    for you.
                </p>
            </div>

            <div className="mx-auto mt-16 max-w-384 px-4 sm:px-6 lg:px-8">
                <div
                    ref={sectionRef}
                    data-header-theme="dark"
                    className="relative"
                    style={{ height: `${PROGRAM_GROUPS.length * 60}vh` }}
                >
                    <motion.div
                        style={{ scale: panelScale, borderRadius: panelRadius, transformOrigin: 'center top' }}
                        className="force-dark sticky top-8 h-[calc(100vh-4rem)] overflow-hidden bg-background text-foreground"
                    >
                        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
                            <div className="relative flex h-full flex-col justify-center sm:pl-10">
                                <div className="absolute inset-y-0 left-0 hidden w-px bg-white/10 sm:block">
                                    {Array.from({ length: TICK_COUNT }).map((_, index) => (
                                        <span
                                            key={index}
                                            className="absolute left-1/2 h-px w-2 -translate-x-1/2 bg-white/15"
                                            style={{ top: `${(index / (TICK_COUNT - 1)) * 100}%` }}
                                        />
                                    ))}

                                    {PROGRAM_GROUPS.map((_, index) => (
                                        <span
                                            key={index}
                                            className="absolute left-1/2 -translate-x-1/2"
                                            style={{ top: `${(index / (PROGRAM_GROUPS.length - 1)) * 100}%` }}
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
                                    {rangeStart === rangeEnd ? `Program ${rangeStart}` : `Programs ${rangeStart}–${rangeEnd}`}
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
                                                transition={{ duration: 0.4, ease: EASE, delay: i * 0.15 }}
                                                className={i > 0 ? 'mt-5 border-t border-white/10 pt-5' : ''}
                                            >
                                                <h3 className="text-xl font-semibold text-white sm:text-2xl">{p.title}</h3>
                                                <p className="mt-2 max-w-sm text-sm text-white/60">{p.subtitle}</p>
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
                                        className="flex w-full max-w-sm flex-col gap-4"
                                    >
                                        {group.map((p, i) => (
                                            <motion.div
                                                key={p.title}
                                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.18 }}
                                            >
                                                <ProgramIllustration program={p} compact />
                                            </motion.div>
                                        ))}
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
