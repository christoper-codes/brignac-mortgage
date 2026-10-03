import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/amicro/reveal';

type Tile = {
    src: string;
    top: string;
    left: string;
    size: number;
    rotate: number;
    /** Scale at the start vs. the end of this section's own scroll — every tile grows, just by a
     * slightly different amount, so the collage reads as one cluster zooming in together. */
    scaleRange: [number, number];
};

// Real photos clients have shared with us, clustered close together like a corkboard rather than
// spread across the whole section.
const TILES: Tile[] = [
    {
        src: '1.jpg',
        top: '6%',
        left: '4%',
        size: 150,
        rotate: -6,
        scaleRange: [0.6, 1.15],
    },
    {
        src: '2.jpg',
        top: '2%',
        left: '27%',
        size: 118,
        rotate: 5,
        scaleRange: [0.65, 1.1],
    },
    {
        src: '3.jpg',
        top: '9%',
        left: '47%',
        size: 168,
        rotate: -3,
        scaleRange: [0.6, 1.2],
    },
    {
        src: '4.jpg',
        top: '4%',
        left: '71%',
        size: 128,
        rotate: 8,
        scaleRange: [0.65, 1.15],
    },
    {
        src: '5.jpg',
        top: '31%',
        left: '14%',
        size: 138,
        rotate: 5,
        scaleRange: [0.6, 1.1],
    },
    {
        src: '6.jpg',
        top: '33%',
        left: '58%',
        size: 148,
        rotate: -7,
        scaleRange: [0.65, 1.18],
    },
    {
        src: '7.jpg',
        top: '55%',
        left: '35%',
        size: 158,
        rotate: 3,
        scaleRange: [0.6, 1.15],
    },
    {
        src: '8.jpg',
        top: '57%',
        left: '6%',
        size: 118,
        rotate: -4,
        scaleRange: [0.65, 1.1],
    },
    {
        src: '9.jpg',
        top: '58%',
        left: '72%',
        size: 132,
        rotate: 6,
        scaleRange: [0.6, 1.15],
    },
    {
        src: '10.jpg',
        top: '76%',
        left: '44%',
        size: 148,
        rotate: -5,
        scaleRange: [0.65, 1.1],
    },
];

function CollageTile({
    tile,
    index,
    progress,
}: {
    tile: Tile;
    index: number;
    progress: MotionValue<number>;
}) {
    const scale = useTransform(progress, [0, 1], tile.scaleRange);

    return (
        <motion.div
            aria-hidden="true"
            style={{
                top: tile.top,
                left: tile.left,
                width: tile.size,
                height: tile.size,
                rotate: tile.rotate,
                scale,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="absolute overflow-hidden rounded-3xl shadow-xl ring-1 shadow-black/15 ring-border"
        >
            <img
                src={`/img/facebook_clients/${tile.src}`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
            />
        </motion.div>
    );
}

// Testimonials' own closing section — replaces the shared footer's lion photo with a scroll-driven
// collage of real clients (pulled from Facebook): a tight cluster of photos that all grow larger
// together as the section scrolls through the viewport.
export function FacebookCollage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    return (
        <div className="force-light relative overflow-hidden bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <Reveal
                    as="p"
                    className="text-sm font-semibold tracking-wide text-primary uppercase"
                >
                    From Our Community
                </Reveal>
                <Reveal
                    as="h2"
                    delay={0.08}
                    className="mt-4 text-3xl text-foreground sm:text-4xl"
                >
                    Real Families,{' '}
                    <span className="font-elegant text-primary italic">
                        Real Homes
                    </span>
                </Reveal>
                <Reveal
                    as="p"
                    delay={0.16}
                    className="mt-4 text-lg text-foreground/60"
                >
                    Moments shared by the clients we've helped get the keys.
                </Reveal>
            </div>

            <div
                ref={sectionRef}
                className="relative mx-auto mt-16 h-screen max-h-screen max-w-6xl px-4 sm:px-6 lg:px-8"
            >
                {TILES.map((tile, index) => (
                    <CollageTile
                        key={tile.src}
                        tile={tile}
                        index={index}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}
