import { Link } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import { FadeUp } from '@/components/amicro/fade-up';
import { ZoomIn } from '@/components/amicro/zoom-in';

export function Hero() {
    return (
        <section className="relative isolate overflow-hidden max-h-[950px] 2xl:max-h-[1000px]">
            <ZoomIn delay={0.15} className="absolute inset-x-0 bottom-0 -z-10 h-[56vw] min-h-80 w-full">
                <img
                    src="/img/hero.png"
                    alt="Modern home financed through Brignac Mortgage"
                    className="absolute inset-0 h-full w-full object-contain object-bottom"
                    fetchPriority="high"
                />
            </ZoomIn>

            <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-background to-transparent" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-36 pb-[46vw] text-center sm:px-6 sm:pt-44 lg:px-8">
                <FadeUp>
                    <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
                        Your next home with the <br />
                        <span className="font-elegant text-primary italic">right partner</span>
                    </h1>
                </FadeUp>

                <FadeUp delay={0.1}>
                    <p className="mt-6 max-w-xl text-lg text-foreground/60">
                        From your first home to your next investment property, Brignac Mortgage connects you with the wholesale
                    </p>
                </FadeUp>

                <FadeUp delay={0.2} className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/apply"
                        className="group inline-flex h-11.75 items-center justify-center rounded-[40px] bg-[#080a10] pr-1.5 pl-5 text-base font-medium tracking-tighter text-white shadow-[inset_0_4px_19px_rgba(255,255,255,0.55),0_2px_14px_rgba(129,141,151,0.35)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:shadow-[inset_0_4px_19px_rgba(255,255,255,0.65),0_6px_20px_rgba(129,141,151,0.45)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        Get Pre-Qualified
                        <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.6}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="size-3.5"
                            >
                                <path d="M5 11 11 5" />
                                <path d="M5.5 5H11v5.5" />
                            </svg>
                        </span>
                    </Link>

                    <a
                        href="tel:+15045592821"
                        className="group inline-flex h-11.75 items-center justify-center rounded-[40px] border border-border bg-transparent pr-1.5 pl-5 text-base font-medium tracking-tighter text-foreground transition-[transform,box-shadow,filter] duration-200 ease-out hover:bg-foreground/3 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        Talk to a Loan Officer
                        <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-foreground/5 text-foreground ring-1 ring-foreground/10 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            <Phone className="size-3.5" />
                        </span>
                    </a>
                </FadeUp>
            </div>
        </section>
    );
}
