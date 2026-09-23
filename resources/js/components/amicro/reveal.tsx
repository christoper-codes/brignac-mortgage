import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const TAGS = {
    div: motion.div,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    p: motion.p,
    span: motion.span,
    li: motion.li,
} as const;

interface RevealProps {
    children: ReactNode;
    /** Element to render, so headings/paragraphs keep their semantic tag and layout. */
    as?: keyof typeof TAGS;
    delay?: number;
    duration?: number;
    /** Distance (px) the element rises while fading in. */
    y?: number;
    /** Starting blur (px). Use 0 for a plain soft rise without the blur. */
    blur?: number;
    className?: string;
}

/**
 * Fades in from a blur while rising into place, once, when it scrolls into view. Used for section
 * titles/subtitles (default blur) and, with `blur={0}`, for softer whole-section entrances.
 * Respects `prefers-reduced-motion` by rendering in place with no animation.
 */
export function Reveal({
    children,
    as = 'div',
    delay = 0,
    duration = 0.8,
    y = 24,
    blur = 10,
    className,
}: RevealProps) {
    const Component = TAGS[as];
    const reduceMotion = useReducedMotion();

    return (
        <Component
            initial={
                reduceMotion
                    ? false
                    : {
                          opacity: 0,
                          y,
                          ...(blur > 0 && { filter: `blur(${blur}px)` }),
                      }
            }
            whileInView={{
                opacity: 1,
                y: 0,
                ...(blur > 0 && { filter: 'blur(0px)' }),
            }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </Component>
    );
}
