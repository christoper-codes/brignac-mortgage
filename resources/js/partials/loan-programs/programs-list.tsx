import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronDown, Home, Landmark, Percent, ShieldCheck, TreePine } from 'lucide-react';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

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
    },
];

export function ProgramsList() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="force-dark relative bg-background py-20 sm:py-28">
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
                            <div
                                key={program.name}
                                className={`overflow-hidden rounded-3xl border bg-white/5 transition-colors duration-300 ${
                                    isOpen ? 'border-primary/30' : 'border-white/10'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
                                    aria-expanded={isOpen}
                                >
                                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                                        <Icon className="size-6" />
                                    </span>
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
                                            <div className="border-t border-white/10 px-6 pt-5 pb-7 sm:px-8">
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
