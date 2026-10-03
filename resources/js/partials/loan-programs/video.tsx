import { Play } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '@/components/amicro/reveal';

const VIDEO_ID = '9p-Zy2bd2uc';
const COVER = '/img/cover-youtube-video.png';

// A static cover + play button instead of an always-loaded iframe — the YouTube player (and its
// scripts/cookies) only load once the admin actually clicks to watch.
export function ProgramsVideo() {
    const [playing, setPlaying] = useState(false);

    return (
        // Extra top padding (vs. the bottom) on purpose: ProgramsList right above ends its own
        // content fairly close to its section edge, so this section needs more breathing room on
        // top than the usual symmetric py- to not read as glued to it. `data-header-theme="dark"`
        // so the header stays dark while scrolling past this section too — without it, the gap
        // between ProgramsList's dark zone and Footer's briefly has no dark zone covering it, and
        // the header flashes light while scrolling through it.
        <div
            data-header-theme="dark"
            className="force-dark relative bg-background pt-32 pb-20 sm:pt-40 sm:pb-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Reveal
                        as="p"
                        className="text-sm font-semibold tracking-wide text-primary uppercase"
                    >
                        Watch
                    </Reveal>
                    <Reveal
                        as="h2"
                        delay={0.08}
                        className="mt-4 text-3xl text-white sm:text-4xl"
                    >
                        See How We Make It Simple
                    </Reveal>
                    <Reveal
                        as="p"
                        delay={0.16}
                        className="mt-4 text-lg text-white/50"
                    >
                        A quick look at how Brignac Mortgage guides you from
                        application to closing.
                    </Reveal>
                </div>

                {/* `isolate` gives this its own stacking context — without it the glow's negative
                    z-index paints behind the page's own opaque ancestor backgrounds instead of
                    just behind the card, making it invisible. max-w-3xl (smaller than the section's
                    own max-w-6xl) keeps the card modest instead of a huge full-width block. */}
                <div className="relative isolate mx-auto mt-12 max-w-3xl sm:mt-16">
                    {/* A soft primary-colored glow instead of a blurred photo — simpler, and reads
                        as a light bled past the card's own edges against the dark section. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-8 -z-10 sm:-inset-12"
                        style={{
                            background:
                                'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(81,176,3,0.25), transparent 70%)',
                        }}
                    />

                    <Reveal
                        blur={0}
                        y={40}
                        className="relative aspect-video w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5"
                    >
                        {playing ? (
                            <iframe
                                title="Brignac Mortgage"
                                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
                                className="absolute inset-0 h-full w-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setPlaying(true)}
                                aria-label="Play video"
                                className="group absolute inset-0 h-full w-full"
                            >
                                <img
                                    src={COVER}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

                                <span className="absolute inset-0 grid place-items-center">
                                    <span className="grid size-16 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-xl shadow-black/30 transition-transform duration-300 ease-out group-hover:scale-110">
                                        <Play className="size-6 fill-current" />
                                    </span>
                                </span>
                            </button>
                        )}
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
