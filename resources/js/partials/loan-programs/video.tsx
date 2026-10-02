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
        // top than the usual symmetric py- to not read as glued to it.
        <div className="force-dark relative bg-background pt-32 pb-24 sm:pt-40 sm:pb-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* `isolate` gives this its own stacking context — without it the glow's negative
                    z-index paints behind the page's own opaque ancestor backgrounds instead of
                    just behind the card, making it invisible. */}
                <div className="relative isolate">
                    {/* The same cover, blurred and bled past the card's own edges, so the card reads
                        as glowing against the dark section instead of sitting on a flat background. */}
                    <img
                        src={COVER}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-8 -z-10 scale-110 object-cover opacity-60 blur-3xl sm:-inset-12"
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
                                    <span className="grid size-20 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-xl shadow-black/30 transition-transform duration-300 ease-out group-hover:scale-110">
                                        <Play className="size-8 fill-current" />
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
