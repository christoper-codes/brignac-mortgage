import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

// Real photos clients have shared with us, packed into a tight cluster like a stack of prints on a
// corkboard — close enough that they overlap — instead of spread out with gaps between them.
const TILES: Tile[] = [
    {
        src: '1.jpg',
        top: '8%',
        left: '6%',
        size: 200,
        rotate: -6,
        scaleRange: [0.85, 1.5],
    },
    {
        src: '2.jpg',
        top: '2%',
        left: '32%',
        size: 170,
        rotate: 5,
        scaleRange: [0.9, 1.45],
    },
    {
        src: '3.jpg',
        top: '10%',
        left: '54%',
        size: 220,
        rotate: -3,
        scaleRange: [0.85, 1.55],
    },
    {
        src: '4.jpg',
        top: '4%',
        left: '74%',
        size: 175,
        rotate: 8,
        scaleRange: [0.9, 1.45],
    },
    {
        src: '5.jpg',
        top: '30%',
        left: '18%',
        size: 185,
        rotate: 5,
        scaleRange: [0.85, 1.45],
    },
    {
        src: '6.jpg',
        top: '32%',
        left: '58%',
        size: 195,
        rotate: -7,
        scaleRange: [0.9, 1.5],
    },
    {
        src: '7.jpg',
        top: '52%',
        left: '36%',
        size: 205,
        rotate: 3,
        scaleRange: [0.85, 1.5],
    },
    {
        src: '8.jpg',
        top: '54%',
        left: '10%',
        size: 165,
        rotate: -4,
        scaleRange: [0.9, 1.45],
    },
    {
        src: '9.jpg',
        top: '55%',
        left: '70%',
        size: 180,
        rotate: 6,
        scaleRange: [0.85, 1.45],
    },
    {
        src: '10.jpg',
        top: '68%',
        left: '44%',
        size: 195,
        rotate: -5,
        scaleRange: [0.9, 1.4],
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
    const rawScale = useTransform(progress, [0, 1], tile.scaleRange);
    // Smooths the frame-to-frame jump so the zoom reads as motion rather than a near-static value
    // that only visibly differs at the very top and bottom of the scroll range.
    const scale = useSpring(rawScale, {
        stiffness: 120,
        damping: 24,
        mass: 0.5,
    });

    return (
        // A printed-photo frame — white border, heavier at the bottom, two-layer shadow, a slight
        // tilt — rather than a plain rounded-corner crop. Only `width` is set; height follows from
        // the padding plus the square photo inside, like a real print.
        <motion.div
            aria-hidden="true"
            style={{
                top: tile.top,
                left: tile.left,
                width: tile.size,
                rotate: tile.rotate,
                scale,
                zIndex: index,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="absolute bg-white p-2 pb-5 shadow-[0_2px_6px_rgba(0,0,0,0.12),0_12px_24px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
        >
            <img
                src={`/img/facebook_clients/${tile.src}`}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
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
