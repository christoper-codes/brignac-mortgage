import { Head, usePage } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowUp,
    Landmark,
    Lightbulb,
    Megaphone,
    MonitorSmartphone,
    MousePointerClick,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import {
    FormattedText,
    useWordReveal,
} from '@/components/dashboard/ai/formatted-text';
import { ThinkingLights } from '@/components/dashboard/ai/lights';
import { AiMark } from '@/components/dashboard/ai/mark';
import { Thinking } from '@/components/dashboard/ai/thinking';
import type { Phase } from '@/components/dashboard/ai/thinking';
import { recentHistory, requestAnswer, requestPlan } from '@/lib/ai';
import type { AiSource } from '@/lib/ai';
import { cn } from '@/lib/utils';
import { ai } from '@/routes/dashboard';
import type { Auth } from '@/types';

type Message = {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    sources?: AiSource[];
    days?: number;
    error?: boolean;
    animate?: boolean;
};

const SUGGESTIONS: { icon: LucideIcon; label: string; question: string }[] = [
    {
        icon: Megaphone,
        label: 'Campaigns',
        question: 'Which campaign is generating the most leads?',
    },
    {
        icon: MousePointerClick,
        label: 'Apply Now',
        question: 'Which team member gets the most Apply Now clicks?',
    },
    {
        icon: MonitorSmartphone,
        label: 'Devices',
        question: 'Which browser and device convert best?',
    },
    {
        icon: Users,
        label: 'Leads',
        question: 'Which lead should I contact first, and why?',
    },
    {
        icon: Lightbulb,
        label: 'Campaign ideas',
        question: 'How can I improve my Meta ads for FHA leads?',
    },
    {
        icon: Landmark,
        label: 'Mortgage',
        question: 'What documents does an FHA borrower usually need?',
    },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const sleep = (ms: number) =>
    new Promise((resolve) => window.setTimeout(resolve, ms));

function AssistantMessage({
    message,
    onReveal,
}: {
    message: Message;
    onReveal: () => void;
}) {
    const reduceMotion = useReducedMotion();
    const text = useWordReveal(
        message.content,
        Boolean(message.animate) && !reduceMotion && !message.error,
        onReveal,
    );

    return (
        <div className="flex gap-3">
            <AiMark className="mt-0.5 size-8" />
            <div className="max-w-[min(100%,40rem)] min-w-0 pt-1">
                {message.error ? (
                    <p className="text-[15px] leading-relaxed text-red-300/90">
                        {message.content}
                    </p>
                ) : (
                    <FormattedText text={text} />
                )}

                {message.sources && (
                    <p className="mt-3 text-xs text-white/35">
                        {message.sources.length === 0
                            ? 'No website data needed'
                            : `Based on ${message.sources.map((source) => source.label).join(', ')} · last ${message.days} days`}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Ai({ configured }: { configured: boolean }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [phase, setPhase] = useState<Phase>('idle');
    const [plannedSources, setPlannedSources] = useState<AiSource[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const nextId = useRef(1);
    const busy = phase !== 'idle';
    const { auth } = usePage<{ auth: Auth }>().props;
    const firstName = auth.user?.name?.split(' ')[0] ?? 'there';

    const scrollToBottom = useCallback(() => {
        const element = scrollRef.current;
        element?.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }, []);

    useEffect(scrollToBottom, [messages, phase, scrollToBottom]);

    useEffect(() => {
        const element = inputRef.current;

        if (element) {
            element.style.height = 'auto';
            element.style.height = `${Math.min(element.scrollHeight, 160)}px`;
        }
    }, [input]);

    const ask = async (question: string) => {
        const text = question.trim();

        if (!text || busy) {
            return;
        }

        const history = recentHistory(
            messages
                .filter((message) => !message.error)
                .map((message) => ({
                    role: message.role,
                    content: message.content,
                    sources: message.sources?.map((source) => source.id),
                })),
        );

        setMessages((current) => [
            ...current,
            { id: nextId.current++, role: 'user', content: text },
        ]);
        setInput('');
        setPlannedSources([]);
        setPhase('planning');

        try {
            // A short minimum so the thinking state is readable even when the plan comes back instantly.
            const [plan] = await Promise.all([
                requestPlan(text, history),
                sleep(800),
            ]);

            setPlannedSources(plan.sources);
            setPhase('answering');

            const answer = await requestAnswer(text, history, plan);

            setMessages((current) => [
                ...current,
                {
                    id: nextId.current++,
                    role: 'assistant',
                    content: answer,
                    sources: plan.sources,
                    days: plan.days,
                    animate: true,
                },
            ]);
        } catch (error) {
            setMessages((current) => [
                ...current,
                {
                    id: nextId.current++,
                    role: 'assistant',
                    error: true,
                    content:
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong. Please try again.',
                },
            ]);
        } finally {
            setPhase('idle');
            inputRef.current?.focus();
        }
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        void ask(input);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void ask(input);
        }
    };

    const empty = messages.length === 0 && !busy;

    return (
        <>
            <Head title="AI assistant" />

            {/* The theme's own dark background (not a hardcoded near-black) with a barely-there glow
                at the top — the dashboard shell (and its frosted sidebar) sits on top of it. This
                page is always forced dark (see AppSidebarLayout's ALWAYS_DARK_PREFIXES), so
                bg-background resolves to the dark token here regardless of the site-wide toggle. */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-0 bg-background bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.06),transparent)]"
            />

            <ThinkingLights active={busy} />

            <div className="relative z-10 mx-auto flex h-[calc(100dvh-8.5rem)] max-w-3xl flex-col lg:h-[calc(100dvh-4.5rem)]">
                {/* Lives here (not inside the scrolling list) so the scroll container's overflow can't clip it. */}
                {empty && (
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.6, ease: 'easeOut' }}
                        className="pointer-events-none absolute top-[-35%] -left-44 -z-10 size-[29rem] rounded-full bg-[radial-gradient(circle,rgba(120,140,255,0.2),transparent_68%)] blur-2xl"
                    />
                )}

                <div className="flex items-center justify-between pb-3">
                    <span className="text-sm font-medium text-white/85">
                        Ask AI
                    </span>

                    {messages.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setMessages([]);
                                setPhase('idle');
                            }}
                            disabled={busy}
                            className="rounded-full px-3 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/8 hover:text-white disabled:opacity-40"
                        >
                            New chat
                        </button>
                    )}
                </div>

                <div
                    ref={scrollRef}
                    className="-mx-6 flex-1 [scrollbar-width:none] overflow-y-auto px-6 [&::-webkit-scrollbar]:hidden"
                >
                    {!configured && (
                        <p className="mb-4 rounded-2xl bg-white/6 px-4 py-3 text-sm leading-relaxed text-white/60">
                            AI isn&apos;t connected yet. Add{' '}
                            <span className="font-mono text-white/80">
                                OPENAI_API_KEY
                            </span>{' '}
                            to your{' '}
                            <span className="font-mono text-white/80">
                                .env
                            </span>{' '}
                            file and restart the server.
                        </p>
                    )}

                    {empty ? (
                        <div className="flex min-h-full flex-col justify-center pb-6">
                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    className="relative flex items-center gap-3"
                                >
                                    <AiMark className="size-9" />
                                    <span className="text-[15px] text-white/50">
                                        Hi {firstName}
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.1,
                                        ease: EASE,
                                    }}
                                    className="relative mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl"
                                >
                                    What would you
                                    <br />
                                    like to know?
                                </motion.h1>
                            </div>

                            <div className="mt-10 grid gap-2.5 sm:grid-cols-2">
                                {SUGGESTIONS.map((suggestion, index) => (
                                    <motion.button
                                        key={suggestion.question}
                                        type="button"
                                        onClick={() =>
                                            void ask(suggestion.question)
                                        }
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.55,
                                            delay: 0.25 + index * 0.06,
                                            ease: EASE,
                                        }}
                                        className="group flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/4 p-4 text-left transition-colors hover:border-white/15 hover:bg-white/8"
                                    >
                                        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/8 text-white/70 transition-colors group-hover:text-white">
                                            <suggestion.icon className="size-4" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-xs text-white/40">
                                                {suggestion.label}
                                            </span>
                                            <span className="mt-0.5 block text-sm leading-snug text-white/80">
                                                {suggestion.question}
                                            </span>
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-7 pb-4" aria-live="polite">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                >
                                    {message.role === 'user' ? (
                                        <div className="flex justify-end">
                                            <p className="max-w-[85%] rounded-[22px] bg-white/10 px-4 py-2.5 text-[15px] leading-relaxed text-white">
                                                {message.content}
                                            </p>
                                        </div>
                                    ) : (
                                        <AssistantMessage
                                            message={message}
                                            onReveal={scrollToBottom}
                                        />
                                    )}
                                </motion.div>
                            ))}

                            <AnimatePresence>
                                {busy && (
                                    <Thinking
                                        key="thinking"
                                        phase={
                                            phase === 'answering'
                                                ? 'answering'
                                                : 'planning'
                                        }
                                        sources={plannedSources}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                <form onSubmit={submit} className="pt-3">
                    <div
                        className={cn(
                            'flex items-end gap-2 rounded-[26px] border bg-white/6 py-1.5 pr-1.5 pl-5 backdrop-blur-xl transition-colors focus-within:border-white/25 focus-within:bg-white/8',
                            busy
                                ? 'border-white/25 shadow-[0_0_44px_-10px_rgba(139,124,246,0.55)]'
                                : 'border-white/10',
                        )}
                    >
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={onKeyDown}
                            rows={1}
                            maxLength={1000}
                            placeholder="Ask about campaigns, clicks, leads…"
                            aria-label="Ask a question about your website data"
                            className="max-h-40 min-h-10 flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-white outline-none placeholder:text-white/35"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || busy}
                            aria-label="Send"
                            className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-black transition-[transform,opacity] hover:scale-105 active:scale-95 disabled:opacity-25 disabled:hover:scale-100"
                        >
                            <ArrowUp
                                className="size-[18px]"
                                strokeWidth={2.4}
                            />
                        </button>
                    </div>
                    <p className="mt-2 text-center text-[11px] text-white/25">
                        AI can make mistakes — double-check important numbers in
                        Analytics.
                    </p>
                </form>
            </div>
        </>
    );
}

Ai.layout = {
    breadcrumbs: [{ title: 'AI assistant', href: ai() }],
};
