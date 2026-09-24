import { AnimatePresence, motion } from 'framer-motion';
import { AiMark } from '@/components/dashboard/ai/mark';
import type { AiSource } from '@/lib/ai';

export type Phase = 'idle' | 'planning' | 'answering';

const LABELS: Record<Exclude<Phase, 'idle'>, string> = {
    planning: 'Choosing the data I need',
    answering: 'Analyzing',
};

/** The "thinking" state: three softly pulsing dots and a quiet shimmering status line that changes
 * with the phase. Once the plan is known, the data being pulled shows up as small pills. */
export function Thinking({
    phase,
    sources,
}: {
    phase: Exclude<Phase, 'idle'>;
    sources: AiSource[];
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-3"
            role="status"
            aria-live="polite"
        >
            <AiMark glow className="mt-0.5 size-8" />

            <div className="pt-1.5">
                <div className="flex items-center gap-2.5">
                    <span className="flex gap-1" aria-hidden="true">
                        {[0, 1, 2].map((dot) => (
                            <motion.span
                                key={dot}
                                className="size-1.5 rounded-full bg-white/70"
                                animate={{
                                    opacity: [0.25, 1, 0.25],
                                    scale: [0.85, 1, 0.85],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: dot * 0.18,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </span>

                    <AnimatePresence mode="wait">
                        <motion.span
                            key={phase}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                            className="animate-ai-shimmer bg-[linear-gradient(90deg,rgba(255,255,255,0.35),rgba(255,255,255,0.9),rgba(255,255,255,0.35))] bg-size-[200%_100%] bg-clip-text text-sm text-transparent"
                        >
                            {LABELS[phase]}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {phase === 'answering' && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {sources.length === 0 ? (
                            <span className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] text-white/50">
                                No website data needed
                            </span>
                        ) : (
                            sources.map((source, index) => (
                                <motion.span
                                    key={source.id}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.3,
                                    }}
                                    className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] text-white/60"
                                >
                                    {source.label}
                                </motion.span>
                            ))
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
