import { motion } from 'framer-motion';
import { Reveal } from '@/components/amicro/reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

export function TestimonialsHero() {
    return (
        <section className="relative isolate py-8 sm:py-12">
            {/* Flush to the top-left, faded to white on its outer edge so it sits behind the copy
                instead of competing with it — decorative, not a full-bleed hero image. Hidden on
                mobile: the text column fills the width there and it would land right behind the copy. */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="pointer-events-none absolute top-5 -left-16 -z-10 hidden w-105 max-w-none sm:block lg:w-125"
            >
                <img
                    src="/img/testimonials.png"
                    alt=""
                    className="w-full"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent 0%, black 45%)',
                    }}
                />
                {/* The white wash on top of the photo, same mask so it fades out with the image
                    instead of leaving a hard edge. */}
                <div
                    className="absolute inset-0 bg-white/50"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent 0%, black 45%)',
                    }}
                />
            </motion.div>

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
