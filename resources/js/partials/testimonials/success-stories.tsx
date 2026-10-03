import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Reveal } from '@/components/amicro/reveal';
import {
    Dialog,
    DialogClose,
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

// Testimonials' own closing section: real closing-day photos, each kept at its own natural shape,
// in iOS-style continuously-rounded frames that scale up smoothly on hover — opening into a
// blurred-glass viewer (no light or dark panel of its own, just the blur) with a filmstrip below.
export function SuccessStories() {
    const [active, setActive] = useState<number | null>(null);

    const show = (index: number) =>
        setActive(((index % IMAGE_COUNT) + IMAGE_COUNT) % IMAGE_COUNT);

    // The site already has a global cursor (components/amicro/cursor.tsx) that inverts itself via
    // mix-blend-difference — great for most of the site, but it turns black over light photos. So
    // rather than drawing a second cursor here, tell that one to go solid white for as long as the
    // lightbox is open.
    useEffect(() => {
        if (active === null) {
            return;
        }

        window.dispatchEvent(
            new CustomEvent('cursor:force-white', { detail: true }),
        );

        return () => {
            window.dispatchEvent(
                new CustomEvent('cursor:force-white', { detail: false }),
            );
        };
    }, [active]);

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

            {/* Masonry via CSS columns, not a uniform grid: each photo keeps its own real aspect
                ratio (h-auto) instead of being cropped to fit a fixed box. */}
            <div className="mx-auto mt-16 max-w-5xl columns-2 gap-5 px-4 sm:columns-3 sm:px-6 lg:columns-4 lg:px-8">
                {IMAGES.map((src, index) => (
                    <Reveal
                        key={src}
                        blur={0}
                        y={24}
                        delay={Math.min(index * 0.05, 0.3)}
                        className="mb-5 break-inside-avoid"
                    >
                        <button
                            type="button"
                            onClick={() => show(index)}
                            aria-label={`Open photo ${index + 1}`}
                            className="group block w-full overflow-hidden rounded-4xl shadow-md ring-1 shadow-black/10 ring-black/5 transition-shadow duration-500 ease-out hover:z-10 hover:shadow-xl hover:shadow-black/20"
                        >
                            <img
                                src={src}
                                alt=""
                                loading="lazy"
                                className="h-auto w-full origin-center object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                        </button>
                    </Reveal>
                ))}
            </div>

            <Dialog
                open={active !== null}
                onOpenChange={(open) => !open && setActive(null)}
            >
                {/* No light or dark panel of its own — just the blur, so whatever's behind (the
                    page, the overlay) shows through softly instead of sitting on a tinted card. */}
                <DialogContent
                    showCloseButton={false}
                    className="flex h-[92vh] w-[95vw] max-w-5xl flex-col gap-0 overflow-hidden rounded-4xl border-none bg-transparent p-0 shadow-none backdrop-blur-2xl sm:max-w-5xl"
                >
                    <DialogTitle className="sr-only">
                        Success story photo
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        A closing-day photo, with the rest of the gallery below
                        it.
                    </DialogDescription>

                    <DialogClose className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20">
                        <X className="size-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    {active !== null && (
                        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6 sm:p-12">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={active}
                                    src={IMAGES[active]}
                                    alt=""
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className="max-h-[70vh] max-w-full rounded-4xl object-contain shadow-2xl"
                                />
                            </AnimatePresence>

                            <button
                                type="button"
                                onClick={() => show(active - 1)}
                                aria-label="Previous photo"
                                className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:left-6"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => show(active + 1)}
                                aria-label="Next photo"
                                className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:right-6"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    )}

                    {/* The filmstrip — every other photo, scrollable, the active one picked out.
                        justify-start on mobile: centering a row that overflows its scroll
                        container clips the leading/trailing padding in some browsers, flushing the
                        first and last thumbnails against the modal's edge. It only switches to
                        centered once the row is wide enough (sm:) to not need scrolling. */}
                    <div className="flex shrink-0 [scrollbar-width:none] items-center justify-start gap-3 overflow-x-auto p-4 sm:justify-center [&::-webkit-scrollbar]:hidden">
                        {IMAGES.map((src, index) => (
                            <button
                                key={src}
                                type="button"
                                onClick={() => show(index)}
                                aria-label={`Show photo ${index + 1}`}
                                aria-current={index === active}
                                className={cn(
                                    'size-14 shrink-0 overflow-hidden rounded-2xl transition-all duration-200 sm:size-18',
                                    index === active
                                        ? 'opacity-100 ring-2 ring-primary'
                                        : 'opacity-50 hover:opacity-90',
                                )}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
