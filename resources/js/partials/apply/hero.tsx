import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ApplyHero() {
    return (
        <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-sm font-semibold tracking-wide text-primary uppercase"
            >
                Apply Today
            </motion.p>
            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="mt-4 text-4xl text-foreground sm:text-5xl"
            >
                Meet the People Behind Your Loan
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="mt-5 text-lg text-foreground/60"
            >
                Licensed, NMLS-verified mortgage professionals based in Louisiana. Start your application with the people who will personally guide you from your first question to the day you get your keys.
            </motion.p>
        </section>
    );
}
