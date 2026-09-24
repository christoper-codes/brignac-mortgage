import { motion } from 'framer-motion';
import { AiIcon } from '@/components/dashboard/icons';
import { cn } from '@/lib/utils';

const OFF = '0 0 0px rgba(139,124,246,0)';
const ON = '0 0 22px rgba(139,124,246,0.65)';

/** The assistant's mark: a sparkle in a soft, quiet circle. With `glow` it breathes a faint violet
 * light (used while thinking). Size it with a `size-*` class. */
export function AiMark({
    className,
    glow = false,
}: {
    className?: string;
    glow?: boolean;
}) {
    return (
        <motion.span
            animate={{ boxShadow: glow ? [OFF, ON, OFF] : OFF }}
            transition={
                glow
                    ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.4 }
            }
            className={cn(
                'grid shrink-0 place-items-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/10',
                className,
            )}
        >
            <AiIcon className="size-1/2" />
        </motion.span>
    );
}
