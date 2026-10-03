import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '@/components/amicro/reveal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const IMAGE_COUNT = 8;
const IMAGES = Array.from(
    { length: IMAGE_COUNT },
    (_, i) => `/img/success_stories/img-${i + 1}.jpg`,
);

const EASE = [0.16, 1, 0.3, 1] as const;

// Testimonials' own closing section: a grid of frosted-glass photo frames — real closing-day
// photos — that open into a big view with a filmstrip of the others below it, iOS-style.
export function SuccessStories() {
    const [active, setActive] = useState<number | null>(null);

    const show = (index: number) =>
        setActive(((index % IMAGE_COUNT) + IMAGE_COUNT) % IMAGE_COUNT);

    return (
        <div className="force-light relative bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <Reveal
                    as="p"
                    className="text-sm font-semibold tracking-wide text-primary uppercase"
                >
                    Success Stories
                </Reveal>
                <Reveal
                    as="h2"
                    delay={0.08}
                    className="mt-4 text-3xl text-foreground sm:text-4xl"
                >
                    Closing Day,{' '}
                    <span className="font-elegant text-primary italic">
                        Captured
                    </span>
                </Reveal>
                <Reveal
                    as="p"
                    delay={0.16}
                    className="mt-4 text-lg text-foreground/60"
                >
                    A few of the keys we've handed over. Tap a photo to see the
                    rest.
                </Reveal>
            </div>

            <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {IMAGES.map((src, index) => (
                        <Reveal
                            key={src}
                            blur={0}
                            y={24}
                            delay={Math.min(index * 0.05, 0.3)}
                        >
                            <button
                                type="button"
                                onClick={() => show(index)}
                                aria-label={`Open photo ${index + 1}`}
                                className="group relative block aspect-3/4 w-full overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/15 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full rounded-[1.25rem] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-1.5 rounded-[1.25rem] bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <Dialog
                open={active !== null}
                onOpenChange={(open) => !open && setActive(null)}
            >
                <DialogContent className="force-light max-h-[92vh] w-full overflow-y-auto border-white/30 bg-background/70 p-4 shadow-2xl backdrop-blur-2xl sm:max-w-2xl sm:p-6">
                    <DialogTitle className="sr-only">
                        Success story photo
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        A closing-day photo, with the rest of the gallery below
                        it.
                    </DialogDescription>

                    {active !== null && (
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={active}
                                    src={IMAGES[active]}
                                    alt=""
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className="max-h-[60vh] w-full rounded-2xl border border-white/30 object-contain shadow-lg"
                                />
                            </AnimatePresence>

                            <button
                                type="button"
                                onClick={() => show(active - 1)}
                                aria-label="Previous photo"
                                className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/30 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-white/50"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => show(active + 1)}
                                aria-label="Next photo"
                                className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/30 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-white/50"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    )}

                    {/* The filmstrip — every other photo, scrollable, the active one picked out. */}
                    <div className="mt-4 flex [scrollbar-width:none] gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                        {IMAGES.map((src, index) => (
                            <button
                                key={src}
                                type="button"
                                onClick={() => show(index)}
                                aria-label={`Show photo ${index + 1}`}
                                aria-current={index === active}
                                className={cn(
                                    'size-16 shrink-0 overflow-hidden rounded-xl border p-0.5 backdrop-blur-xl transition-all duration-200 sm:size-20',
                                    index === active
                                        ? 'border-primary bg-primary/10 opacity-100'
                                        : 'border-white/30 bg-white/15 opacity-60 hover:opacity-90',
                                )}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
