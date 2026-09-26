import { motion } from 'framer-motion';
import { Reveal } from '@/components/amicro/reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

export function TestimonialsHero() {
    return (
        <section className="relative isolate py-8 sm:py-12">
            {/* Flush to the top-left, faded to white at the edges so it sits behind the copy instead
                of competing with it — decorative, not a full-bleed hero image. No overflow-hidden here:
                the image is taller than the text block on its own, and the mask already fades it out
                well before its edges, so letting it overflow slightly looks intentional instead of
                getting clipped. `isolate` gives this section its own stacking context — without it the
                negative z-index below paints behind the page's own opaque ancestor backgrounds instead
                of just behind this section's text, making the image invisible. */}
            <motion.img
                src="/img/testimonials.png"
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="pointer-events-none absolute top-0 left-0 -z-10 w-95 max-w-none sm:w-120 lg:w-140"
                style={{
                    maskImage:
                        'linear-gradient(to right, transparent 0%, black 45%)',
                }}
            />

            {/* Mirror of the left image: flush to the top-right, faded on its outer (right) edge
                where it meets the screen edge, solid on the side facing the copy. */}
            <motion.img
                src="/img/testimonials2.png"
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="pointer-events-none absolute top-10 right-0 -z-10 w-95 max-w-none sm:top-14 sm:w-120 lg:w-140"
                style={{
                    maskImage:
                        'linear-gradient(to left, transparent 0%, black 45%)',
                }}
            />

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
