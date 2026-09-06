import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Building2, ChevronDown, Home, Landmark, Percent, ShieldCheck, TreePine } from 'lucide-react';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOW_DOTS = [
    { cx: 323.84, cy: 68.94 },
    { cx: 261.44, cy: 106.49 },
    { cx: 262.28, cy: 51.62 },
    { cx: 180.95, cy: 56.43 },
    { cx: 221.44, cy: 10.02 },
];

// A soft corner glow with concentric rings and a scatter of accent dots — a "space" backdrop
// standing in for a flat dotted pattern, reused across every program card.
function CardSpaceBackdrop({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id={id} cx="100%" cy="0%" r="75%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill={`url(#${id})`} />

            {[50, 85, 120, 155, 190].map((radius) => (
                <circle key={radius} cx="336" cy="0" r={radius} fill="none" stroke="rgb(81,176,3)" strokeOpacity="0.14" />
            ))}

            {GLOW_DOTS.map((dot, index) => (
                <circle key={index} cx={dot.cx} cy={dot.cy} r="3" fill="rgb(81,176,3)" fillOpacity="0.4" />
            ))}
        </svg>
    );
}

const NETWORK_NODES = [
    { x: 14, y: 468, r: 5 },
    { x: 78, y: 402, r: 4 },
    { x: 64, y: 452, r: 3.5 },
    { x: 150, y: 356, r: 4.5 },
    { x: 136, y: 414, r: 3 },
    { x: 158, y: 452, r: 3.5 },
    { x: 224, y: 320, r: 3 },
];
const NETWORK_EDGES: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 6],
];

// A branching node network fanning out from the bottom-left corner.
function CardNetworkBackdrop({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id={id} cx="0%" cy="100%" r="75%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill={`url(#${id})`} />

            {NETWORK_EDGES.map(([from, to]) => (
                <line
                    key={`${from}-${to}`}
                    x1={NETWORK_NODES[from].x}
                    y1={NETWORK_NODES[from].y}
                    x2={NETWORK_NODES[to].x}
                    y2={NETWORK_NODES[to].y}
                    stroke="rgb(81,176,3)"
                    strokeOpacity="0.2"
                />
            ))}

            {NETWORK_NODES.map((node, index) => (
                <circle key={index} cx={node.x} cy={node.y} r={node.r} fill="rgb(81,176,3)" fillOpacity="0.4" />
            ))}
        </svg>
    );
}

// A minimal soft wash from the top-left corner — just a gradient and a single thin line.
function CardDiagonalBackdrop({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </linearGradient>
            </defs>

            <rect width="336" height="480" fill={`url(#${id})`} />

            <line x1="-20" y1="0" x2="140" y2="480" stroke="rgb(81,176,3)" strokeOpacity="0.12" strokeWidth="1.5" />
        </svg>
    );
}

const SCATTER_DOTS = [
    { cx: 300, cy: 420, r: 4 },
    { cx: 250, cy: 380, r: 2.5 },
    { cx: 280, cy: 320, r: 3 },
    { cx: 200, cy: 440, r: 2 },
    { cx: 320, cy: 300, r: 2.5 },
    { cx: 230, cy: 260, r: 3.5 },
    { cx: 150, cy: 400, r: 2 },
];

// A scatter of accent dots glowing up from the bottom-right corner — no lines, no rings.
function CardScatterBackdrop({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id={id} cx="100%" cy="100%" r="70%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill={`url(#${id})`} />

            {SCATTER_DOTS.map((dot, index) => (
                <circle key={index} cx={dot.cx} cy={dot.cy} r={dot.r} fill="rgb(81,176,3)" fillOpacity="0.4" />
            ))}
        </svg>
    );
}

// The same ring-radar as CardSpaceBackdrop, mirrored into the bottom-right corner.
function CardMirrorRingsBackdrop({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id={id} cx="100%" cy="100%" r="75%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill={`url(#${id})`} />

            {[50, 85, 120, 155, 190].map((radius) => (
                <circle key={radius} cx="336" cy="480" r={radius} fill="none" stroke="rgb(81,176,3)" strokeOpacity="0.14" />
            ))}

            {GLOW_DOTS.map((dot, index) => (
                <circle key={index} cx={336 - dot.cx} cy={480 - dot.cy} r="3" fill="rgb(81,176,3)" fillOpacity="0.4" />
            ))}
        </svg>
    );
}

// A pair of tilted orbit rings crossing near the top of the card, with a couple of accent dots.
function CardOrbitBackdrop({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 336 480" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <radialGradient id={id} cx="50%" cy="25%" r="60%">
                    <stop offset="0%" stopColor="rgb(81,176,3)" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="rgb(81,176,3)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="336" height="480" fill={`url(#${id})`} />

            <ellipse cx="168" cy="140" rx="150" ry="60" fill="none" stroke="rgb(81,176,3)" strokeOpacity="0.15" transform="rotate(-18 168 140)" />
            <ellipse cx="168" cy="140" rx="190" ry="80" fill="none" stroke="rgb(81,176,3)" strokeOpacity="0.1" transform="rotate(-18 168 140)" />
            <circle cx="60" cy="110" r="3.5" fill="rgb(81,176,3)" fillOpacity="0.45" />
            <circle cx="270" cy="165" r="3" fill="rgb(81,176,3)" fillOpacity="0.4" />
        </svg>
    );
}

const CARD_BACKDROPS = [
    CardSpaceBackdrop,
    CardNetworkBackdrop,
    CardDiagonalBackdrop,
    CardScatterBackdrop,
    CardMirrorRingsBackdrop,
    CardOrbitBackdrop,
];

const PROGRAMS = [
    {
        icon: Landmark,
        name: 'FHA Loan',
        tagline: 'Federal Housing Administration Loan',
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
        cta: { label: 'Click to Apply', href: '/our-team', external: false },
    },
    {
        icon: Percent,
        name: 'ARM Loan',
        tagline: 'General Adjustable Rate Mortgage Program',
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
        cta: { label: 'Click to Apply', href: '/our-team', external: false },
    },
    {
        icon: Building2,
        name: 'Jumbo Loan',
        tagline: 'General Jumbo Mortgage Program',
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
        cta: { label: 'Click to Apply', href: '/our-team', external: false },
    },
];

export function ProgramsList() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div data-header-theme="dark" className="force-dark relative bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold tracking-wide text-primary uppercase">Details</p>
                    <h2 className="mt-4 text-3xl text-white sm:text-4xl">Explore Every Program</h2>
                    <p className="mt-4 text-lg text-white/50">
                        Credit score ranges, down payment tiers, and eligible property types for each loan program we offer.
                    </p>
                </div>

                <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
                    {PROGRAMS.map((program, index) => {
                        const Icon = program.icon;
                        const isOpen = openIndex === index;

                        return (
                            <div key={program.name} className="relative overflow-hidden rounded-4xl bg-white/5">
                                {(() => {
                                    const Backdrop = CARD_BACKDROPS[index % CARD_BACKDROPS.length];

                                    return <Backdrop id={`program-glow-${index}`} />;
                                })()}

                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="relative flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
                                    aria-expanded={isOpen}
                                >
                                    <motion.span
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 3.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary"
                                    >
                                        <Icon className="size-6" />
                                    </motion.span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-base font-semibold text-white sm:text-lg">{program.name}</span>
                                        <span className="block truncate text-sm text-white/50">{program.tagline}</span>
                                    </span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                        className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                                            isOpen ? 'bg-primary/15 text-primary' : 'bg-white/5 text-white/50'
                                        }`}
                                    >
                                        <ChevronDown className="size-4" />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: EASE }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative border-t border-white/10 px-6 pt-5 pb-7 sm:px-8">
                                                <div className="grid grid-cols-2 gap-3">
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
                                                            <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
                                                                {list.label}
                                                            </p>
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
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
