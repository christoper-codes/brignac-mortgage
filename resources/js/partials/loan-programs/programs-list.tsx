import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Building2, Home, Landmark, Percent, ShieldCheck, TreePine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const PROGRAMS = [
    {
        icon: Landmark,
        name: 'FHA Loan',
        tagline: 'Federal Housing Administration Loan',
        image: '/img/loan_programs/general_fha_loans_program.webp',
        facts: [
            { label: 'Credit Score', value: '500+' },
            { label: 'Down Payment', value: 'As low as 3.5%' },
        ],
        lists: [
            { label: 'Down Payment Tiers', items: ['Credit Score 500-560: 10% Down', 'Credit Score 560+: 3.5% Down'] },
            {
                label: 'Loan Options',
                items: [
                    'Primary Home Residence',
                    'Refinance Options',
                    'Fixed Rate Loan',
                    'Adjustable Rate Mortgage (ARM)',
                    'Energy Efficient Mortgage',
                    'Home Equity Loans',
                    'Streamlines',
                    'Graduated Payment Mortgage',
                ],
            },
            {
                label: 'Special Programs For',
                items: ['Law Enforcement', 'Teachers', 'Firefighters', 'Emergency Medical Technicians (EMT)', 'and More'],
            },
        ],
        cta: { label: 'See More', href: 'https://www.hud.gov/buying/loans', external: true },
    },
    {
        icon: Home,
        name: 'Conventional Loan',
        tagline: 'General Conventional Loan Program',
        image: '/img/loan_programs/general_conventional_loan_program.webp',
        facts: [
            { label: 'FICO Score', value: '620+' },
            { label: 'Down Payment', value: 'As low as 0%' },
        ],
        lists: [
            {
                label: 'Down Payment Options',
                items: [
                    '3% down for first-time homebuyers',
                    'Conventional 1% Down Program',
                    '0% Down Purchase Program',
                    'Second Home Purchase: 5%',
                ],
            },
            { label: 'Eligible Properties', items: ['Primary, second, and investment properties', 'Manufactured Homes'] },
            {
                label: 'Loan Options',
                items: [
                    'Adjustable Rate Program (ARM)',
                    'Fixed Rate Programs',
                    'Jumbo Loans',
                    'Low Down Payment Conventional Options',
                    'Renovation Loans',
                    'and More',
                ],
            },
        ],
        cta: { label: 'See More', href: 'https://www.consumerfinance.gov/owning-a-home/conventional-loans/', external: true },
    },
    {
        icon: ShieldCheck,
        name: 'VA Loan',
        tagline: 'Veteran Affairs Loan',
        image: '/img/loan_programs/general_eligibility_requirements.webp',
        facts: [
            { label: 'Down Payment', value: '0%' },
            { label: 'Funding Fee', value: '2.3% - 3.3%' },
        ],
        lists: [
            {
                label: 'General Eligibility',
                items: [
                    'Active Duty Service (Army, Navy, Air Force, Marine Corps, Coast Guard)',
                    'Discharged Veterans (DD214 Form)',
                    'Surviving Spouses',
                    'Current Reserve/Guard Members',
                ],
            },
            {
                label: 'Funding Fee',
                items: ['First Time Homebuyer: 2.3%', 'Subsequent Use: 3.3%', 'Waived for Purple Heart, Service-Connected Disabilities, Surviving Spouses'],
            },
            {
                label: 'Eligible Properties',
                items: [
                    'Single Family Home',
                    'Condo',
                    'Manufactured Home',
                    'Building a New Home (Construction)',
                    'Refinancing',
                    'Cash Out',
                    'Energy Efficient Homes',
                    'And More',
                ],
            },
        ],
        cta: { label: 'See More', href: 'https://www.va.gov/housing-assistance/home-loans/eligibility/', external: true },
    },
    {
        icon: TreePine,
        name: 'USDA Loan',
        tagline: 'General USDA Loan Program',
        image: '/img/loan_programs/general_usda_loan_program.webp',
        facts: [
            { label: 'Credit Score', value: '620+' },
            { label: 'Down Payment', value: '0%' },
        ],
        lists: [
            {
                label: 'Requirements',
                items: [
                    'Under 620 might qualify under conditions',
                    'Funding Fee: 1%',
                    'Property must be located in an eligible area (per the USDA eligibility website)',
                ],
            },
            { label: 'Eligible Properties', items: ['Primary Residence', 'Single Family Homes', 'Manufactured Properties', 'And More'] },
        ],
        cta: { label: 'Click to Apply', href: '/apply', external: false },
    },
    {
        icon: Percent,
        name: 'ARM Loan',
        tagline: 'General Adjustable Rate Mortgage Program',
        image: '/img/loan_programs/general_adjustable_rate_mortgage_program.webp',
        facts: [
            { label: 'Credit Score', value: '580+' },
            { label: 'Down Payment', value: '3% - 5%' },
        ],
        lists: [
            {
                label: 'Credit Score Requirements',
                items: ['Minimum: 580+', 'Conventional ARM: 620', 'FHA ARM: 580', 'VA ARM: No requirements'],
            },
            {
                label: 'About This Program',
                items: [
                    'Features an initial lower monthly payment, which increases over time',
                    'Buy-down options: 3-2-1, 2-1, 1-1, and 1-0 tiers',
                ],
            },
            {
                label: 'Eligible Properties',
                items: [
                    'Primary Residence',
                    'Second Home Properties',
                    'Investment Properties',
                    'Purchase',
                    'Rate/Term Refinance',
                    'Cash-Out Refinance Options',
                    'Jumbo Loans',
                    'and More',
                ],
            },
        ],
        cta: { label: 'Click to Apply', href: '/apply', external: false },
    },
    {
        icon: Building2,
        name: 'Jumbo Loan',
        tagline: 'General Jumbo Mortgage Program',
        image: '/img/loan_programs/general_jumbo_mortgage_program.webp',
        facts: [
            { label: 'Credit Score', value: '680+ (avg. 700+)' },
            { label: 'Down Payment', value: '3-5% (avg. 10%)' },
        ],
        lists: [
            {
                label: 'About This Program',
                items: ['For home purchases that exceed the conforming loan limit — set at $766,550 for 2026'],
            },
            {
                label: 'Eligible Properties',
                items: [
                    'Single Family Home Outside Conforming Limit',
                    'Vacation Properties',
                    'Investment Properties',
                    'Primary & Secondary Properties',
                    'Cash-out Refinances',
                    'Rate/Term Refinances',
                    'And More',
                ],
            },
        ],
        cta: { label: 'Click to Apply', href: '/apply', external: false },
    },
];

// Which program block is nearest the vertical center of the viewport becomes the "active" one
// that drives the sticky image and the progress rail — more reliable across uneven block
// heights than deriving the index from raw scroll position.
function useActiveProgramIndex(count: number) {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = itemRefs.current.findIndex((el) => el === entry.target);

                        if (index !== -1) {
                            setActiveIndex(index);
                        }
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
        );

        itemRefs.current.slice(0, count).forEach((el) => {
            if (el) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, [count]);

    return { activeIndex, itemRefs };
}

function ScrollProgressRail({ activeIndex }: { activeIndex: number }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative h-72 w-px rounded-full bg-white/10">
                <motion.div
                    className="absolute inset-x-0 top-0 w-px rounded-full bg-primary"
                    animate={{ height: `${((activeIndex + 1) / PROGRAMS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: EASE }}
                />

                {PROGRAMS.map((program, index) => (
                    <span
                        key={program.name}
                        style={{ top: `${(index / (PROGRAMS.length - 1)) * 100}%` }}
                        className={cn(
                            'absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300',
                            index <= activeIndex ? 'bg-primary' : 'bg-white/20',
                        )}
                    />
                ))}
            </div>

            <p className="text-[11px] tabular-nums text-white/40">
                {String(activeIndex + 1).padStart(2, '0')} / {String(PROGRAMS.length).padStart(2, '0')}
            </p>
        </div>
    );
}

// Scroll-driven program directory: a sticky program image + progress rail on the left, full
// details scrolling past on the right. The sticky image crossfades in place as each program
// block crosses the vertical center of the viewport.
export function ProgramsList() {
    const { activeIndex, itemRefs } = useActiveProgramIndex(PROGRAMS.length);
    const activeProgram = PROGRAMS[activeIndex];

    return (
        <div data-header-theme="dark" className="force-dark relative bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold tracking-wide text-primary uppercase">Details</p>
                    <h2 className="mt-4 text-3xl text-white sm:text-4xl">Explore Every Program</h2>
                    <p className="mt-4 text-lg text-white/50">
                        Credit score ranges, down payment tiers, and eligible property types for each loan program we offer.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[340px_auto_1fr] lg:items-start lg:gap-12">
                    <div className="hidden lg:sticky lg:top-32 lg:block">
                        <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl bg-white/5">
                            <AnimatePresence>
                                <motion.div
                                    key={activeProgram.image}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                    className="absolute inset-0"
                                >
                                    <img src={activeProgram.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl" />
                                    <img src={activeProgram.image} alt={activeProgram.name} className="absolute inset-0 h-full w-full object-contain" />
                                </motion.div>
                            </AnimatePresence>
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">{activeProgram.tagline}</p>
                                <p className="mt-1 text-lg font-semibold text-white">{activeProgram.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:sticky lg:top-32 lg:flex lg:justify-center">
                        <ScrollProgressRail activeIndex={activeIndex} />
                    </div>

                    <div className="flex flex-col gap-20 lg:gap-28">
                        {PROGRAMS.map((program, index) => {
                            const Icon = program.icon;

                            return (
                                <div
                                    key={program.name}
                                    ref={(el) => {
                                        itemRefs.current[index] = el;
                                    }}
                                    className="lg:min-h-[60vh] lg:py-8"
                                >
                                    <div className="relative mb-6 aspect-3/2 overflow-hidden rounded-3xl border border-white/10 lg:hidden">
                                        <img src={program.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl" />
                                        <img src={program.image} alt={program.name} className="absolute inset-0 h-full w-full object-contain" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                                            <Icon className="size-6" />
                                        </span>
                                        <div>
                                            <p className="text-base font-semibold text-white sm:text-lg">{program.name}</p>
                                            <p className="text-sm text-white/50">{program.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        {program.facts.map((fact) => (
                                            <div key={fact.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                                <p className="text-xs text-white/40">{fact.label}</p>
                                                <p className="mt-1 text-lg font-semibold text-white">{fact.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                        {program.lists.map((list) => (
                                            <div key={list.label}>
                                                <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">{list.label}</p>
                                                <ul className="mt-3 space-y-2">
                                                    {list.items.map((item) => (
                                                        <li key={item} className="flex gap-2 text-sm text-white/70">
                                                            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        {program.cta.external ? (
                                            <a
                                                href={program.cta.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
                                            >
                                                {program.cta.label}
                                                <ArrowUpRight className="size-4" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={program.cta.href}
                                                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                            >
                                                {program.cta.label}
                                                <ArrowUpRight className="size-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
