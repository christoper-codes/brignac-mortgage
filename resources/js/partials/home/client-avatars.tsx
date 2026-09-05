import { User } from 'lucide-react';

const TILES_PER_COLUMN = 6;

const COLUMNS = [
    { direction: 'up', duration: 22 },
    { direction: 'down', duration: 27 },
    { direction: 'up', duration: 19 },
    { direction: 'down', duration: 24 },
] as const;

function AvatarTile() {
    return (
        <div className="grid size-28 shrink-0 place-items-center rounded-[26px] bg-gradient-to-b from-black/6 to-black/2 text-foreground/30 ring-1 ring-border">
            <User className="size-10" />
        </div>
    );
}

function AvatarColumn({ direction, duration }: { direction: 'up' | 'down'; duration: number }) {
    const tiles = Array.from({ length: TILES_PER_COLUMN });

    return (
        <div className="relative h-full w-28 shrink-0 overflow-hidden">
            <div
                className="flex flex-col gap-3"
                style={{ animation: `avatars-${direction} ${duration}s linear infinite` }}
            >
                {tiles.map((_, index) => (
                    <AvatarTile key={`a-${index}`} />
                ))}
                {tiles.map((_, index) => (
                    <AvatarTile key={`b-${index}`} />
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
                    <AvatarColumn key={index} direction={column.direction} duration={column.duration} />
                ))}
            </div>
        </section>
    );
}
