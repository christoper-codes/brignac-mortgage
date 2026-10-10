// value/label pairs here should only be numbers that are actually true and checkable — no
// invented loan volume, years-in-business, or client counts. The Google rating and review count
// match config/site.php's business.rating (the real Google Business Profile figures, also used
// there for AggregateRating structured data); if those ever change, update both places. The
// Facebook count matches the number of reviews actually pulled onto /testimonials from
// facebook.com/BrignacMortgage/reviews (see review-wall.tsx) — update it there too if it changes.
const STATS = [
    { value: '5.0/5', label: 'Google Rating' },
    { value: '15+', label: 'Five-Star Google Reviews' },
    { value: 'NMLS #2401214', label: 'Licensed Mortgage Broker' },
    { value: '10+', label: 'Verified Facebook Reviews' },
];

export function StatsMarquee() {
    const track = [...STATS, ...STATS];

    return (
        <section className="force-light relative overflow-hidden bg-background py-20 text-foreground">
            {/* animate-marquee's default 32s (shared with every other marquee on the site) reads
                as sluggish now that there are only 2 stats instead of 6 — sped up just here via
                an inline override rather than touching the shared duration everyone else uses. */}
            <div
                className="flex w-max animate-marquee items-center"
                style={{ animationDuration: '20s' }}
            >
                {track.map((stat, index) => (
                    <div
                        key={index}
                        className="flex shrink-0 items-center gap-3 px-8"
                    >
                        <span className="text-2xl font-semibold text-primary">
                            {stat.value}
                        </span>
                        <span className="text-sm whitespace-nowrap text-foreground/60">
                            {stat.label}
                        </span>
                        <span className="ml-8 size-1.5 rounded-full bg-border" />
                    </div>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background via-background/80 to-transparent sm:w-64" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background via-background/80 to-transparent sm:w-64" />
        </section>
    );
}
