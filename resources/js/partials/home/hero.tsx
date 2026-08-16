import { Link } from '@inertiajs/react';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { FadeUp } from '@/components/amicro/fade-up';
import { ZoomIn } from '@/components/amicro/zoom-in';
import { Button } from '@/components/ui/button';

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
            <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[36rem] w-[36rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/15 blur-3xl" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div className="flex flex-col items-start text-left">
                    <FadeUp>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/70">
                            <ShieldCheck className="size-3.5 text-primary" />
                            Licensed Mortgage Lending in Louisiana
                        </span>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h1 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Finance your next chapter with confidence
                        </h1>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="mt-6 max-w-xl text-lg text-foreground/60">
                            From your first home to your next investment property, Brignac Mortgage connects you with the wholesale
                            lenders and loan programs that fit your goals — with a team that guides you through every step.
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.3} className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button asChild size="lg" className="rounded-full px-7 text-base">
                            <Link href="/apply">
                                Get Pre-Qualified
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full px-7 text-base">
                            <a href="tel:+15045592821">
                                <PhoneCall className="size-4" />
                                Talk to a Loan Officer
                            </a>
                        </Button>
                    </FadeUp>

                    <FadeUp delay={0.4} className="mt-10 flex items-center gap-3 text-sm text-foreground/50">
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

                <ZoomIn delay={0.15} className="relative mx-auto w-full max-w-xl lg:max-w-none">
                    <img
                        src="/img/hero.png"
                        alt="Modern home financed through Brignac Mortgage"
                        className="w-full drop-shadow-2xl"
                        fetchPriority="high"
                    />
                </ZoomIn>
            </div>
        </section>
    );
}
