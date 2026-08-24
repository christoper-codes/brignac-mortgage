const STATS = [
    { value: '15+', label: 'Years Lending in Louisiana' },
    { value: '$250M+', label: 'Funded for Families' },
    { value: '1,200+', label: 'Loans Closed' },
    { value: '50+', label: 'Wholesale Lending Partners' },
    { value: '4.9/5', label: 'Client Satisfaction' },
    { value: '24-48h', label: 'Pre-Qualification Turnaround' },
];

export function StatsMarquee() {
    const track = [...STATS, ...STATS];

    return (
        <section className="force-light relative overflow-hidden bg-background py-20 text-foreground">
            <div className="animate-marquee flex w-max items-center">
                {track.map((stat, index) => (
                    <div key={index} className="flex shrink-0 items-center gap-3 px-8">
                        <span className="text-2xl font-semibold text-primary">{stat.value}</span>
                        <span className="text-sm whitespace-nowrap text-foreground/60">{stat.label}</span>
                        <span className="ml-8 size-1.5 rounded-full bg-border" />
                    </div>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background via-background/80 to-transparent sm:w-64" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background via-background/80 to-transparent sm:w-64" />
        </section>
    );
}
