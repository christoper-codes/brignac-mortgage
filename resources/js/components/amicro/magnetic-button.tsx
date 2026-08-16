import { motion, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

interface MagneticButtonProps {
    children: React.ReactNode;
    range?: number;
    strength?: number;
    className?: string;
    onClick?: () => void;
}

export function MagneticButton({ children, range = 45, strength = 0.35, className = '', onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.6 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) {
return;
}

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const dist = Math.hypot(clientX - centerX, clientY - centerY);

        if (dist < range) {
            x.set((clientX - centerX) * strength);
            y.set((clientY - centerY) * strength);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x, y }}
            className={`relative inline-flex h-11 cursor-pointer items-center justify-center rounded-full border-0 bg-neutral-900 px-6 text-sm font-semibold text-white shadow transition-all hover:scale-[1.03] select-none dark:bg-white dark:text-black ${className}`}
        >
            <span className="pointer-events-none relative z-10 block">{children}</span>
        </motion.button>
    );
}
