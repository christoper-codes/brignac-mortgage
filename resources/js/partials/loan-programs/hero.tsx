import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const STATS = [
    { label: 'Loan Programs', value: '6+' },
    { label: 'Down Payment', value: 'From 0%' },
    { label: 'Pre-Qualification', value: '24-48h' },
];

export function ProgramsHero() {
    return (
        <section data-header-theme="dark" className="force-dark relative overflow-hidden bg-background pt-40 pb-20 sm:pt-48 sm:pb-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                    backgroundImage: 'radial-gradient(rgba(81,176,3,0.18) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 75%)',
                }}
            />

            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
                    Loan Programs
                </span>

                <h1 className="mt-6 text-4xl leading-[1.05] font-medium tracking-tight text-white sm:text-5xl">
                    Find the Right Loan <span className="text-white/40">for Your Home</span>
                </h1>

                <p className="mt-6 max-w-md text-base font-medium text-white/50">
                    From FHA to Jumbo, we match Louisiana homebuyers with the right program — fast, transparent, and built around you.
                </p>

                <div className="mt-8">
                    <Link
                        href="/apply"
                        className="group inline-flex h-11.75 items-center justify-center rounded-[40px] bg-white pr-1.5 pl-5 text-base font-medium tracking-tighter text-neutral-900 shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_4px_16px_rgba(8,10,16,0.35)] ring-1 ring-black/[0.06] transition-transform duration-200 ease-out hover:-translate-y-0.5"
                    >
                        Get Pre-Qualified
                        <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            <ArrowUpRight className="size-3.5" />
                        </span>
                    </Link>
                </div>

                <div className="mt-14 grid w-full max-w-lg grid-cols-3 gap-3">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4"
                        >
                            <p className="text-xl font-semibold text-white">{stat.value}</p>
                            <p className="mt-1 text-xs text-white/50">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
