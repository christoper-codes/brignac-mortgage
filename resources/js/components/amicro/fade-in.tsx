import { motion } from 'framer-motion';
import React from 'react';

interface FadeInProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
    className?: string;
}

export function FadeIn({ children, duration = 0.5, delay = 0, className = '' }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration,
                delay,
                ease: [0.215, 0.61, 0.355, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
