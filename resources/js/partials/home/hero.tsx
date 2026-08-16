import { router } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import { FadeUp } from '@/components/amicro/fade-up';
import { MagneticButton } from '@/components/amicro/magnetic-button';
import { ZoomIn } from '@/components/amicro/zoom-in';

export function Hero() {
    return (
        <section className="relative isolate overflow-hidden">
            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-36 pb-12 text-center sm:px-6 sm:pt-44 sm:pb-16 lg:px-8">
                <FadeUp>
                    <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Your next home starts with the right{' '}
                        <span className="font-serif text-primary italic">partner</span>
                    </h1>
                </FadeUp>

                <FadeUp delay={0.1}>
                    <p className="mt-6 max-w-xl text-lg text-foreground/60">
                        From your first home to your next investment property, Brignac Mortgage connects you with the wholesale
                        lenders and loan programs that fit your goals — with a team that guides you through every step.
                    </p>
                </FadeUp>

                <FadeUp delay={0.2} className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <MagneticButton onClick={() => router.visit('/apply')}>Get Pre-Qualified</MagneticButton>
                    <a
                        href="tel:+15045592821"
                        className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-foreground/3 px-6 text-sm font-medium tracking-tight text-foreground transition-colors hover:bg-foreground/6"
                    >
                        <Phone className="size-4" />
                        Talk to a Loan Officer
                    </a>
                </FadeUp>

                <FadeUp delay={0.3} className="mt-10 flex items-center gap-3 text-sm text-foreground/50">
                    <div className="flex -space-x-3">
                        {['JO', 'TH', 'AS', 'EM'].map((initials) => (
                            <span
                                key={initials}
                                className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-semibold text-secondary-foreground"
                            >
                                {initials}
                            </span>
                        ))}
                    </div>
                    <span>Trusted by hundreds of Louisiana families</span>
                </FadeUp>
            </div>

            <ZoomIn delay={0.15} className="relative h-[56vw] min-h-80 w-full">
                <img
                    src="/img/hero.png"
                    alt="Modern home financed through Brignac Mortgage"
                    className="absolute inset-0 h-full w-full object-contain object-bottom"
                    fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
            </ZoomIn>
        </section>
    );
}
