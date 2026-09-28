import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ApplyHero() {
    return (
        <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-2xl lg:px-8">
            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="text-4xl leading-[1.1] text-foreground sm:text-5xl"
            >
                Meet Your{' '}
                <span className="font-elegant text-primary italic">
                    Mortgage Team
                </span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="mt-6 text-lg text-foreground/60"
            >
                Licensed, NMLS-verified professionals ready to guide you from
                application to closing.
            </motion.p>
        </section>
    );
}
