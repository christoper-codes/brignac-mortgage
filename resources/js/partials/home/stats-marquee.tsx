import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STATS = [
    { value: '15+', label: 'Years Lending in Louisiana' },
    { value: '$250M+', label: 'Funded for Families' },
    { value: '1,200+', label: 'Loans Closed' },
    { value: '50+', label: 'Wholesale Lending Partners' },
    { value: '4.9/5', label: 'Client Satisfaction' },
    { value: '24-48h', label: 'Pre-Qualification Turnaround' },
];

const SCROLL_SPEED = 0.5;

export function StatsMarquee() {
    const trackRef = useRef<HTMLDivElement>(null);
    const track = [...STATS, ...STATS];

    const { scrollY } = useScroll();
    const rawX = useTransform(scrollY, (latest) => {
        const half = (trackRef.current?.scrollWidth ?? 0) / 2;

        if (!half) {
return 0;
}

        const wrapped = (((latest * SCROLL_SPEED) % half) + half) % half;

        return -wrapped;
    });
    const x = useSpring(rawX, { stiffness: 300, damping: 40, mass: 0.5 });

    return (
        <section className="force-light relative overflow-hidden bg-background py-20 text-foreground">
            <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center">
                {track.map((stat, index) => (
                    <div key={index} className="flex shrink-0 items-center gap-3 px-8">
                        <span className="text-2xl font-semibold text-primary">{stat.value}</span>
                        <span className="text-sm whitespace-nowrap text-foreground/60">{stat.label}</span>
                        <span className="ml-8 size-1.5 rounded-full bg-border" />
                    </div>
                ))}
            </motion.div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background via-background/80 to-transparent sm:w-64" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background via-background/80 to-transparent sm:w-64" />
        </section>
    );
}
