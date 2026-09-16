import { ThumbsUp } from 'lucide-react';

export function TestimonialsHero() {
    return (
        <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Testimonials</p>
            <h1 className="mt-4 text-3xl text-foreground sm:text-4xl">What Our Clients Say</h1>
            <p className="mt-4 text-lg text-foreground/60">Real reviews from real homeowners we've helped finance across Louisiana.</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground">
                    <ThumbsUp className="size-4 fill-primary text-primary" />
                    100% recommend Brignac Mortgage
                    <span className="text-foreground/40">· 10 reviews</span>
                </span>

                <a
                    href="https://www.facebook.com/BrignacMortgage/reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    See all reviews on Facebook
                </a>
            </div>
        </section>
    );
}
