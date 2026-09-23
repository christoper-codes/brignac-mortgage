import { motion } from 'framer-motion';
import React from 'react';

interface FadeUpProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
    yOffset?: number;
    /** Starting blur (px); 0 keeps the plain fade. */
    blur?: number;
    className?: string;
}

export function FadeUp({ children, duration = 0.6, delay = 0, yOffset = 20, blur = 0, className = '' }: FadeUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, ...(blur > 0 && { filter: `blur(${blur}px)` }) }}
            animate={{ opacity: 1, y: 0, ...(blur > 0 && { filter: 'blur(0px)' }) }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
