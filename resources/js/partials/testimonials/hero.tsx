import { Reveal } from '@/components/amicro/reveal';

export function TestimonialsHero() {
    return (
        <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal as="p" className="text-sm font-semibold tracking-wide text-primary uppercase">Testimonials</Reveal>
            <Reveal as="h1" delay={0.08} className="mt-4 text-3xl text-foreground sm:text-4xl">What Our Clients Say</Reveal>
            <Reveal as="p" delay={0.16} className="mt-4 text-lg text-foreground/60">Real reviews from real homeowners we've helped finance across Louisiana.</Reveal>
        </section>
    );
}
