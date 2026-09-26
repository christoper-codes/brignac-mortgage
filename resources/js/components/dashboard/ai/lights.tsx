import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const BLOBS = [
    {
        color: '#5b8def',
        className: 'bottom-[-14%] left-[18%] size-[34rem]',
        x: [0, 70, -30, 0],
        y: [0, -30, 20, 0],
        duration: 9,
    },
    {
        color: '#a78bfa',
        className: 'right-[14%] bottom-[-16%] size-[32rem]',
        x: [0, -60, 40, 0],
        y: [0, -20, 30, 0],
        duration: 11,
    },
    {
        color: '#f0a3c0',
        className: 'bottom-[-10%] left-[42%] size-[22rem]',
        x: [0, 40, -50, 0],
        y: [0, -40, 10, 0],
        duration: 8,
    },
];

/** A soft wash of light that rises from the bottom (behind the composer; the layer covers the viewport with no clipping, so the blur fades out naturally) only while the assistant is
 * thinking, then fades away. Deliberately low-key: blurred, low opacity, slowly drifting. */
export function ThinkingLights({ active }: { active: boolean }) {
    const reduceMotion = useReducedMotion();

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    key="lights"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    // Spans the content column (same insets as the layout's <main>: the floating sidebar
                    // on the left at lg+), not the whole viewport, so the lights sit centered behind the
                    // composer instead of drifting left toward the sidebar.
                    className="pointer-events-none fixed inset-y-0 right-0 left-0 z-0 lg:right-8 lg:left-76"
                >
                    {BLOBS.map((blob) => (
                        <motion.div
                            key={blob.color}
                            className={`absolute rounded-full opacity-[0.3] blur-3xl ${blob.className}`}
                            style={{
                                background: `radial-gradient(circle, ${blob.color} 0%, transparent 68%)`,
                            }}
                            animate={
                                reduceMotion
                                    ? undefined
                                    : {
                                          x: blob.x,
                                          y: blob.y,
                                          scale: [1, 1.1, 0.96, 1],
                                      }
                            }
                            transition={{
                                duration: blob.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
