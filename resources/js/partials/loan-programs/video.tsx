import { Play } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '@/components/amicro/reveal';

const VIDEO_ID = '9p-Zy2bd2uc';

// A static thumbnail + play button instead of an always-loaded iframe — the YouTube player (and
// its scripts/cookies) only load once the admin actually clicks to watch.
export function ProgramsVideo() {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="force-dark relative bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
                                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                                onError={(event) => {
                                    event.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                                }}
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
    );
}
