import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarCheck, Handshake, ListChecks, Percent, Star, Timer } from 'lucide-react';

const STATS = [
    { icon: ListChecks, label: 'Loan Programs', value: '6+' },
    { icon: Percent, label: 'Down Payment', value: 'From 0%' },
    { icon: Timer, label: 'Pre-Qualification', value: '24-48h' },
    { icon: CalendarCheck, label: 'Avg. Closing', value: '18 days' },
    { icon: Star, label: 'Client Rating', value: '4.9/5' },
    { icon: Handshake, label: 'Wholesale Partners', value: '50+' },
];

const GLYPHS = ['Ω', 'β', 'λ', 'μ', 'φ', 'δ', 'Σ', 'π', 'θ', 'Δ', 'α', 'χ', '&', '+', '*', '%', '§', 'Ψ'];

function StatChip({ stat }: { stat: (typeof STATS)[number] }) {
    const Icon = stat.icon;

    return (
        <div className="flex h-[150px] w-[230px] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-4.5" />
            </span>
            <div>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-white/50">{stat.label}</p>
            </div>
        </div>
    );
}

// A generated "cipher" tile — a scramble of symbols standing in for encrypted text, no image asset
// needed. Each glyph is scattered with its own offset, rotation, size and opacity so it reads as
// noise rather than a tidy table.
function CipherChip() {
    const cells = Array.from({ length: 34 }, (_, i) => {
        const glyph = GLYPHS[(i * 7 + 5) % GLYPHS.length];
        const seed = (i * 37 + 11) % 100;

        return {
            glyph,
            top: `${(seed * 3.7) % 92}%`,
            left: `${(seed * 5.3 + i * 13) % 92}%`,
            rotate: ((seed % 20) - 10) * 1.6,
            size: 9 + (seed % 3) * 2,
            opacity: 0.2 + (seed % 5) * 0.09,
        };
    });

    return (
        <div className="relative h-[150px] w-[230px] shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01]">
            {cells.map((cell, index) => (
                <span
                    key={index}
                    className="absolute font-mono text-white"
                    style={{
                        top: cell.top,
                        left: cell.left,
                        fontSize: cell.size,
                        opacity: cell.opacity,
                        transform: `rotate(${cell.rotate}deg)`,
                    }}
                >
                    {cell.glyph}
                </span>
            ))}
        </div>
    );
}

const DIVIDER_PARTICLES = [
    { top: '4%', side: -12, size: 3, glow: 0.9, duration: 2.2, delay: 0 },
    { top: '16%', side: 9, size: 2, glow: 0.6, duration: 2.6, delay: 0.5 },
    { top: '30%', side: -8, size: 2.5, glow: 0.75, duration: 2.1, delay: 1 },
    { top: '46%', side: 11, size: 2, glow: 0.55, duration: 2.8, delay: 0.2 },
    { top: '62%', side: -10, size: 3, glow: 0.85, duration: 2.3, delay: 0.8 },
    { top: '78%', side: 8, size: 2, glow: 0.6, duration: 2.5, delay: 1.3 },
    { top: '92%', side: -9, size: 2.5, glow: 0.7, duration: 2.4, delay: 0.4 },
    { top: '98%', side: 10, size: 2, glow: 0.5, duration: 2.7, delay: 1.1 },
];

// A tall primary-colored light bar that spills past the row above and below, tapering to
// nothing at both ends. Each glow layer is a single blurred box shaped by an elliptical mask
// (soft in every direction) instead of nested rectangles, so no straight, flat-opacity edges show
// through — a scatter of sparking particles finishes the effect. Pure CSS/SVG, no image asset.
function GlowDivider() {
    return (
        <div className="pointer-events-none absolute -top-20 -bottom-20 z-10" style={{ left: '48%' }}>
            {/* wide soft cloud */}
            <div
                className="absolute inset-0 left-0 w-32 -translate-x-1/2 bg-primary blur-3xl"
                style={{ maskImage: 'radial-gradient(ellipse 30% 46% at 50% 50%, black 0%, transparent 100%)', opacity: 0.55 }}
            />
            {/* medium glow */}
            <div
                className="absolute inset-0 left-0 w-14 -translate-x-1/2 bg-primary blur-xl"
                style={{ maskImage: 'radial-gradient(ellipse 30% 47% at 50% 50%, black 0%, transparent 100%)', opacity: 0.8 }}
            />
            {/* bright hairline core */}
            <div
                className="absolute inset-0 left-0 w-px -translate-x-1/2 bg-white shadow-[0_0_10px_2px_rgba(81,176,3,0.9)]"
                style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)' }}
            />

            {DIVIDER_PARTICLES.map((particle, index) => (
                <motion.span
                    key={index}
                    className="absolute rounded-full bg-primary"
                    style={{
                        top: particle.top,
                        left: particle.side,
                        width: particle.size,
                        height: particle.size,
                        boxShadow: `0 0 6px 2px rgba(81,176,3,${particle.glow})`,
                    }}
                    animate={{ opacity: [particle.glow * 0.25, particle.glow, particle.glow * 0.25], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}

export function ProgramsHero() {
    const track = [...STATS, ...STATS, ...STATS];

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
                <h1 className="text-4xl leading-[1.1] sm:text-5xl text-white">
                    Find the Right Loan <span className="font-elegant text-primary italic">for Your Home</span>
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
            </div>

            <div className="relative z-10 mx-auto mt-36 w-full max-w-2xl">
                <div className="relative h-[150px] overflow-hidden">
                    <div
                        className="absolute inset-0"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, transparent 48%, black 48%, black 88%, transparent 100%)',
                        }}
                    >
                        <div className="animate-marquee-reverse flex h-full w-max items-center gap-3">
                            {track.map((stat, index) => (
                                <StatChip key={`${stat.label}-${index}`} stat={stat} />
                            ))}
                        </div>
                    </div>

                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 48%, transparent 48%)' }}
                    >
                        <div className="animate-marquee-reverse flex h-full w-max items-center gap-3">
                            {track.map((_, index) => (
                                <CipherChip key={index} />
                            ))}
                        </div>
                    </div>
                </div>

                <GlowDivider />
            </div>
        </section>
    );
}
