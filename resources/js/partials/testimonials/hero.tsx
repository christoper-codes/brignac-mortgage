import { motion, useReducedMotion } from 'framer-motion';
import {
    Heart,
    House,
    MessageCircle,
    Quote,
    Star,
    ThumbsUp,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Reveal } from '@/components/amicro/reveal';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

type FloatingBadge = {
    icon?: ComponentType<{ className?: string }>;
    /** Renders five stars instead of a single icon. */
    stars?: boolean;
    /** Tailwind position classes (percentages keep them inside the gutters beside the copy). */
    position: string;
    tone: string;
    rotate: number;
    delay: number;
    duration: number;
};

// Testimonial-flavoured badges (quotes, comments, stars, likes) that drift in the gutters on either
// side of the copy. Large screens only — below `lg` the text column fills the width and they'd overlap it.
const BADGES: FloatingBadge[] = [
    {
        icon: Quote,
        position: 'top-[4%] left-[6%]',
        tone: 'text-primary',
        rotate: -8,
        delay: 0,
        duration: 5.5,
    },
    {
        icon: MessageCircle,
        position: 'top-[42%] left-[13%]',
        tone: 'text-sky-500',
        rotate: 6,
        delay: 0.6,
        duration: 6.5,
    },
    {
        icon: Heart,
        position: 'bottom-[2%] left-[5%]',
        tone: 'text-rose-500',
        rotate: -5,
        delay: 1.1,
        duration: 6,
    },
    {
        stars: true,
        position: 'top-[6%] right-[5%]',
        tone: 'text-yellow-500',
        rotate: 5,
        delay: 0.3,
        duration: 6,
    },
    {
        icon: ThumbsUp,
        position: 'top-[46%] right-[12%]',
        tone: 'text-primary',
        rotate: -6,
        delay: 0.9,
        duration: 5.5,
    },
    {
        icon: House,
        position: 'bottom-[2%] right-[6%]',
        tone: 'text-foreground/70',
        rotate: 8,
        delay: 1.4,
        duration: 7,
    },
];

function Badge({
    badge,
    reduceMotion,
}: {
    badge: FloatingBadge;
    reduceMotion: boolean;
}) {
    const Icon = badge.icon;

    return (
        <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6, rotate: badge.rotate }}
            animate={{ opacity: 1, scale: 1, rotate: badge.rotate }}
            transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.3 + badge.delay * 0.3,
            }}
            className={cn(
                'pointer-events-none absolute hidden lg:block',
                badge.position,
            )}
        >
            <motion.div
                animate={
                    reduceMotion
                        ? undefined
                        : {
                              y: [0, -12, 0],
                              rotate: [0, badge.rotate > 0 ? 3 : -3, 0],
                          }
                }
                transition={{
                    duration: badge.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: badge.delay,
                }}
                className={cn(
                    'grid h-14 place-items-center rounded-2xl border border-border bg-card shadow-lg shadow-black/5',
                    badge.stars ? 'px-3.5' : 'w-14',
                    badge.tone,
                )}
            >
                {badge.stars ? (
                    <span className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, index) => (
                            <Star key={index} className="size-4 fill-current" />
                        ))}
                    </span>
                ) : (
                    Icon && <Icon className="size-6" />
                )}
            </motion.div>
        </motion.div>
    );
}

export function TestimonialsHero() {
    const reduceMotion = useReducedMotion() ?? false;

    return (
        <section className="relative isolate py-8 sm:py-12">
            {BADGES.map((badge) => (
                <Badge
                    key={badge.position}
                    badge={badge}
                    reduceMotion={reduceMotion}
                />
            ))}

            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <Reveal
                    as="p"
                    className="text-sm font-semibold tracking-wide text-primary uppercase"
                >
                    Testimonials
                </Reveal>
                <Reveal
                    as="h1"
                    delay={0.08}
                    className="mt-4 text-3xl text-foreground sm:text-4xl"
                >
                    What Our Clients Say
                </Reveal>
                <Reveal
                    as="p"
                    delay={0.16}
                    className="mt-4 text-lg text-foreground/60"
                >
                    Real reviews from real homeowners we've helped finance
                    across Louisiana.
                </Reveal>
            </div>
        </section>
    );
}
