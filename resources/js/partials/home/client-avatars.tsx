import { Link } from '@inertiajs/react';
import { ArrowUpRight, Star, ThumbsUp } from 'lucide-react';
import { FacebookMark, GoogleMark } from '@/components/platform-marks';

const TILES_PER_COLUMN = 6;

// Google and Facebook reviews share the same client photo set, so the wall mixes both sources:
// every tile carries a small badge for the platform its review came from, alternating between them.
const CLIENT_IMAGES = Array.from({ length: 10 }, (_, index) => ({
    src: `/img/facebook_clients/${index + 1}.jpg`,
    platform: index % 2 === 0 ? ('google' as const) : ('facebook' as const),
}));

const COLUMNS = [
    { direction: 'up', duration: 22, offset: 0 },
    { direction: 'down', duration: 27, offset: 3 },
    { direction: 'up', duration: 19, offset: 6 },
    { direction: 'down', duration: 24, offset: 8 },
] as const;

function AvatarTile({ image }: { image: (typeof CLIENT_IMAGES)[number] }) {
    return (
        <div className="relative size-28 shrink-0">
            <div className="size-full overflow-hidden rounded-[26px] ring-1 ring-border">
                <img src={image.src} alt="Happy Brignac Mortgage client" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <span className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full bg-white shadow-md ring-1 ring-black/5">
                {image.platform === 'google' ? (
                    <GoogleMark className="size-4" />
                ) : (
                    <FacebookMark className="size-4 text-[#1877F2]" />
                )}
            </span>
        </div>
    );
}

function AvatarColumn({ direction, duration, offset }: { direction: 'up' | 'down'; duration: number; offset: number }) {
    const tiles = Array.from({ length: TILES_PER_COLUMN }, (_, index) => CLIENT_IMAGES[(index + offset) % CLIENT_IMAGES.length]);

    return (
        <div className="relative h-full w-28 shrink-0 overflow-hidden">
            <div
                className="flex flex-col gap-3"
                style={{ animation: `avatars-${direction} ${duration}s linear infinite` }}
            >
                {tiles.map((image, index) => (
                    <AvatarTile key={`a-${index}`} image={image} />
                ))}
                {tiles.map((image, index) => (
                    <AvatarTile key={`b-${index}`} image={image} />
                ))}
            </div>
        </div>
    );
}

export function ClientAvatars() {
    return (
        <section className="force-light relative overflow-hidden bg-background py-20 sm:py-24">
            <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">Testimonials</p>
                <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">Trusted by Homeowners Across Louisiana</h2>
                <p className="mx-auto mt-4 max-w-xs text-base font-medium text-foreground/60">
                    Join the hundreds of families who found the right loan with Brignac Mortgage.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                        <GoogleMark className="size-4" />
                        5.0
                        <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                        <FacebookMark className="size-4 text-[#1877F2]" />
                        100% recommend
                        <ThumbsUp className="size-3.5 fill-primary text-primary" />
                    </span>
                </div>
            </div>

            <div
                className="relative mx-auto mt-12 flex h-105 max-w-2xl justify-center gap-4 overflow-hidden px-4"
                style={{ maskImage: 'linear-gradient(transparent 0%, black 50%, transparent 100%)' }}
            >
                {COLUMNS.map((column, index) => (
                    <AvatarColumn key={index} direction={column.direction} duration={column.duration} offset={column.offset} />
                ))}
            </div>

            <div className="relative mt-6 flex justify-center">
                <Link
                    href="/testimonials"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pr-2.5 pl-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    Read All Reviews
                    <span className="grid size-8 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight className="size-4" />
                    </span>
                </Link>
            </div>
        </section>
    );
}
