import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, MousePointer2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FadeUp } from '@/components/amicro/fade-up';

const INITIALS = ['SM', 'DF', 'MR'];
const CLOSING_STEPS = ['Applied', 'Underwriting', 'Closed'];
const LOAN_AMOUNTS = ['$385,000', '$412,000', '$350,000', '$460,000'];
const WORD_DELAY = 0.12;

const TYPING_CURSOR = <span className="ml-px inline-block h-3 w-px animate-pulse bg-current align-middle" />;

function TypedText({ text }: { text: string }) {
    const words = text.split(' ');

    return (
        <>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: index * WORD_DELAY }}
                    className="inline-block"
                >
                    {word}
                    {index < words.length - 1 ? ' ' : ''}
                </motion.span>
            ))}
        </>
    );
}

function ReviewMockup() {
    return (
        <div className="relative w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <motion.span
                        key={index}
                        animate={{ color: ['#d4d4d4', '#d4d4d4', '#facc15', '#facc15', '#d4d4d4'], scale: [1, 1, 1.25, 1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2, times: [0, 0.05, 0.15, 0.85, 1] }}
                    >
                        <Star className="size-3.5 fill-current" />
                    </motion.span>
                ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">"Best mortgage experience we've ever had."</p>
            <div className="mt-3 flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">PB</span>
                <span className="text-xs font-medium text-neutral-800">Pamela B.</span>
            </div>

            <motion.span
                animate={{ x: [0, -18, -18, 0], y: [0, -18, -18, 0], scale: [1, 1, 0.85, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 0.65, 1] }}
                className="pointer-events-none absolute -right-3 -bottom-3"
            >
                <MousePointer2 className="h-4 w-4 fill-neutral-900 text-neutral-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
            </motion.span>
        </div>
    );
}

function ClosingMockup() {
    return (
        <div className="w-full max-w-56 p-2">
            <p className="text-[11px] font-medium text-neutral-400">Closing Progress</p>
            <div className="mt-3 flex items-center">
                {CLOSING_STEPS.map((step, index) => (
                    <div key={step} className="flex flex-1 items-center last:flex-none">
                        <motion.span
                            animate={{
                                backgroundColor: ['#e5e5e5', '#e5e5e5', '#51b003', '#51b003', '#e5e5e5'],
                                color: ['#a3a3a3', '#a3a3a3', '#ffffff', '#ffffff', '#a3a3a3'],
                            }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6, times: [0, 0.05, 0.15, 0.85, 1] }}
                            className="grid size-5 shrink-0 place-items-center rounded-full"
                        >
                            <CheckCircle2 className="size-3" />
                        </motion.span>
                        {index < CLOSING_STEPS.length - 1 && (
                            <span className="relative mx-1 h-px flex-1 overflow-hidden bg-neutral-200">
                                <motion.span
                                    animate={{ scaleX: [0, 0, 1, 1, 0] }}
                                    transition={{
                                        duration: 4.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: index * 0.6 + 0.3,
                                        times: [0, 0.05, 0.2, 0.85, 1],
                                    }}
                                    style={{ transformOrigin: 'left' }}
                                    className="absolute inset-0 bg-primary"
                                />
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <p className="mt-3 text-2xl font-bold text-neutral-900">
                18 <span className="text-xs font-normal text-neutral-400">days avg.</span>
            </p>
        </div>
    );
}

function ChatMockup() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        let alive = true;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const after = (fn: () => void, ms: number) => {
            timers.push(setTimeout(() => alive && fn(), ms));
        };

        function playCycle() {
            setStage(0);
            after(() => setStage(1), 900);
            after(() => setStage(2), 900 + 1000);
            after(() => setStage(3), 900 + 1000 + 900);
            after(playCycle, 900 + 1000 + 900 + 900 + 2400);
        }

        playCycle();

        return () => {
            alive = false;
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="w-full max-w-56 p-2">
            <div className="flex items-end gap-1.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-500">
                    S
                </span>
                <div className="rounded-2xl rounded-bl-md bg-neutral-100 px-3 py-1.5 text-[11px] text-neutral-700">
                    {stage >= 1 ? <TypedText text="How's my rate looking?" /> : TYPING_CURSOR}
                </div>
            </div>

            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 flex items-end justify-end gap-1.5"
                >
                    <div className="rounded-2xl rounded-br-md bg-primary px-3 py-1.5 text-[11px] text-white">
                        {stage >= 3 ? <TypedText text="Locked at 6.2%! 🎉" /> : TYPING_CURSOR}
                    </div>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                        SB
                    </span>
                </motion.div>
            )}
        </div>
    );
}

function BookingMockup() {
    return (
        <div className="w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-neutral-400" />
                <p className="text-[11px] font-medium text-neutral-500">Free Consultation</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
                {['10:00', '11:30', '2:00'].map((slot, index) => (
                    <span
                        key={slot}
                        className={`rounded-lg py-1.5 text-center text-[10px] font-medium ${index === 1 ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'}`}
                    >
                        {slot}
                    </span>
                ))}
            </div>
            <div className="relative mt-3 w-full rounded-full bg-neutral-900 py-1.5 text-center text-[11px] font-medium text-white">
                Book a Call
                <motion.span
                    animate={{ x: [0, -14, -14, 0], y: [0, -14, -14, 0], scale: [1, 1, 0.85, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 0.65, 1] }}
                    className="pointer-events-none absolute -right-2 -bottom-2"
                >
                    <MousePointer2 className="h-4 w-4 fill-white text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                </motion.span>
            </div>
        </div>
    );
}

function MatchMockup() {
    return (
        <div className="relative w-full max-w-56">
            <motion.div
                animate={{ y: [0, -4, 0], rotate: [-7, -9, -7] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-3 -top-2 -z-10 h-full rounded-2xl bg-primary/25"
            />
            <motion.div
                animate={{ y: [0, -3, 0], rotate: [5, 7, 5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute inset-x-2 -top-1 -z-10 h-full rounded-2xl bg-primary/15"
            />

            <div className="relative rounded-2xl bg-linear-to-br from-primary to-emerald-700 p-4 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
                <p className="text-[11px] text-white/75">Matched Lenders</p>
                <div className="mt-5 flex items-center justify-between">
                    <span className="text-3xl font-bold">50+</span>
                    <div className="flex -space-x-2">
                        {INITIALS.map((initials) => (
                            <span
                                key={initials}
                                className="grid size-7 place-items-center rounded-full bg-white/15 text-[9px] font-semibold ring-2 ring-primary"
                            >
                                {initials}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoanTypeMockup() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIndex((current) => (current + 1) % LOAN_AMOUNTS.length), 1800);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <div className="flex gap-1 rounded-full bg-neutral-100 p-1 text-[10px] font-medium">
                <span className="flex-1 rounded-full bg-neutral-900 py-1 text-center text-white">Residential</span>
                <span className="flex-1 py-1 text-center text-neutral-500">Investment</span>
            </div>
            <p className="mt-3 text-[11px] text-neutral-400">Loan Amount</p>
            <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={LOAN_AMOUNTS[index]}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg font-semibold text-neutral-900"
                    >
                        {LOAN_AMOUNTS[index]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}

const FEATURES = [
    {
        title: 'Excellent Customer Experience!',
        description: 'We are dedicated to providing you with the best customer experience in the industry.',
        Mockup: ReviewMockup,
    },
    {
        title: 'Fast Closing Times',
        description: 'Our streamlined process ensures you can close your loan quickly and efficiently, saving you time and hassle.',
        Mockup: ClosingMockup,
    },
    {
        title: 'Open Line of Communication',
        description: 'We keep communication open throughout the process, so you’re always informed and your questions are answered promptly.',
        Mockup: ChatMockup,
    },
    {
        title: 'Free Consulting Services',
        description: 'Take advantage of our free consulting services to get expert advice tailored to your specific financial goals.',
        Mockup: BookingMockup,
    },
    {
        title: 'Access to Wholesale Lenders, Investors, and Products',
        description: 'Gain exclusive access to a wide range of wholesale lenders, investors, and products to find the best options for your needs.',
        Mockup: MatchMockup,
    },
    {
        title: 'Residential, Investment & Commercial Loans',
        description: 'A variety of loan options to meet your residential, investment, and commercial needs at the best terms available.',
        Mockup: LoanTypeMockup,
    },
];

export function WhatWeProvide() {
    return (
        <section className="force-light relative bg-background py-24 text-foreground sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <FadeUp className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl sm:text-4xl">What We Provide</h2>
                    <p className="mt-4 text-lg text-foreground/60">
                        Everything you need for a smooth, transparent lending experience from application to closing.
                    </p>
                </FadeUp>

                <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map(({ title, description, Mockup }, index) => (
                        <FadeUp key={title} delay={index * 0.08}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                className="flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-6 pt-10"
                            >
                                <div className="flex justify-center">
                                    <Mockup />
                                </div>

                                <p className="mt-8 text-sm leading-relaxed text-foreground/70">
                                    <span className="font-semibold text-foreground">{title}</span> – {description}
                                </p>
                            </motion.div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}
