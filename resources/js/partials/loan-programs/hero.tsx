import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/amicro/reveal';

export function ProgramsHero() {
    return (
        <section
            data-header-theme="dark"
            className="force-dark relative overflow-hidden bg-background pt-40 pb-20 sm:pt-48 sm:pb-24"
        >
            <img
                src="/img/programs-bg.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 w-full max-w-none select-none"
                style={{
                    maskImage:
                        'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                }}
            />

            {/* The image itself is much taller than the section and gets clipped by overflow-hidden
                before its own fade (above) ever kicks in — this second fade, pinned to the section's
                own bottom edge, blends that hard clip into the dark background instead. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background sm:h-56"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center">
                <Reveal
                    as="h1"
                    className="text-4xl leading-[1.1] text-white sm:text-5xl"
                >
                    Find the Right Loan{' '}
                    <span className="font-elegant text-primary italic">
                        for Your Home
                    </span>
                </Reveal>

                <Reveal
                    as="p"
                    delay={0.1}
                    className="mt-6 max-w-md text-base font-medium text-white/50"
                >
                    From FHA to Jumbo, we match Louisiana homebuyers with the
                    right program — fast, transparent, and built around you.
                </Reveal>

                <div className="mt-8">
                    <Link
                        href="/apply"
                        className="group inline-flex h-11.75 items-center justify-center rounded-[40px] bg-white pr-1.5 pl-5 text-base font-medium tracking-tighter text-neutral-900 shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_4px_16px_rgba(8,10,16,0.35)] ring-1 ring-black/[0.06] transition-transform duration-200 ease-out hover:-translate-y-0.5"
                    >
                        Get Pre-Qualified
                        <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <ArrowUpRight className="size-3.5" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
