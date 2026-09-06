const TILES_PER_COLUMN = 6;

const CLIENT_IMAGES = Array.from({ length: 10 }, (_, index) => `/img/facebook_clients/${index + 1}.jpg`);

const COLUMNS = [
    { direction: 'up', duration: 22, offset: 0 },
    { direction: 'down', duration: 27, offset: 3 },
    { direction: 'up', duration: 19, offset: 6 },
    { direction: 'down', duration: 24, offset: 8 },
] as const;

function AvatarTile({ src }: { src: string }) {
    return (
        <div className="size-28 shrink-0 overflow-hidden rounded-[26px] ring-1 ring-border">
            <img src={src} alt="Happy Brignac Mortgage client" loading="lazy" className="h-full w-full object-cover" />
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
                {tiles.map((src, index) => (
                    <AvatarTile key={`a-${index}`} src={src} />
                ))}
                {tiles.map((src, index) => (
                    <AvatarTile key={`b-${index}`} src={src} />
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
            </div>

            <div
                className="relative mx-auto mt-12 flex h-105 max-w-2xl justify-center gap-4 overflow-hidden px-4"
                style={{ maskImage: 'linear-gradient(transparent 0%, black 50%, transparent 100%)' }}
            >
                {COLUMNS.map((column, index) => (
                    <AvatarColumn key={index} direction={column.direction} duration={column.duration} offset={column.offset} />
                ))}
            </div>
        </section>
    );
}
