import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, MousePointer2, Search, Sparkle, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const LOAN_TYPES = ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Construction', 'Investment Property', 'Cash-Out Refinance'];

const PROGRAM_CARDS = [
    { initials: 'SM', name: 'Sarah Mitchell', detail: 'First-Time Buyer · Conventional' },
    { initials: 'DF', name: 'The Doucet Family', detail: 'VA Loan · Zero Down' },
    { initials: 'MR', name: 'Marcus Reyes', detail: 'Investment Property · DSCR' },
];

const PROGRAM_TAGS = ['Purchase', 'Refinance', 'Cash-Out', 'New Construction', 'Manufactured Home', 'Commercial'];

function ProgramCard({ initials, name, detail }: { initials: string; name: string; detail: string }) {
    return (
        <div className="flex w-[170px] shrink-0 items-center gap-2 rounded-xl bg-white/[0.06] p-2 ring-1 ring-white/10">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-[10px] font-semibold text-white ring-1 ring-white/15">
                {initials}
            </span>
            <div className="min-w-0 leading-tight">
                <p className="truncate text-[10px] font-medium text-white">{name}</p>
                <p className="truncate text-[8px] text-white/45">{detail}</p>
            </div>
        </div>
    );
}

function TagPill({ label, keyPrefix }: { label: string; keyPrefix: string }) {
    return (
        <span key={`${keyPrefix}-${label}`} className="shrink-0 rounded-full bg-white/[0.05] px-3 py-1.5 text-[10px] text-white/45 ring-1 ring-white/10">
            {label}
        </span>
    );
}

const TYPING_CURSOR = <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-white/70 align-middle" />;

const VISITOR_QUESTION = 'What loan programs do you offer?';
const SHAUN_ANSWER =
    "We've got a program for just about every path — conventional, FHA, VA, jumbo, and more. Let's find the right fit for you.";

const WORD_DELAY = 0.11;
const questionWordCount = VISITOR_QUESTION.split(' ').length;
const answerWordCount = SHAUN_ANSWER.split(' ').length;
const questionTypeMs = questionWordCount * WORD_DELAY * 1000 + 300;
const answerTypeMs = answerWordCount * WORD_DELAY * 1000 + 300;

function TypedWords({ text }: { text: string }) {
    const words = text.split(' ');

    return (
        <>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: index * WORD_DELAY }}
                    className="inline-block"
                >
                    {word}
                    {index < words.length - 1 ? ' ' : ''}
                </motion.span>
            ))}
        </>
    );
}

function ChatTestimonial() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        let alive = true;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const after = (fn: () => void, ms: number) => {
            timers.push(setTimeout(() => alive && fn(), ms));
        };

        function playCycle() {
            setStage(0);

            const questionStart = 1000;
            const shaunTypingStart = questionStart + questionTypeMs + 900;
            const shaunAnswerStart = shaunTypingStart + 1300;
            const cycleEnd = shaunAnswerStart + answerTypeMs + 2600;

            after(() => setStage(1), questionStart);
            after(() => setStage(2), shaunTypingStart);
            after(() => setStage(3), shaunAnswerStart);
            after(playCycle, cycleEnd);
        }

        playCycle();

        return () => {
            alive = false;
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="relative flex min-h-[260px] flex-col overflow-hidden rounded-[20px] bg-[rgba(243,245,248,0.05)] p-7 sm:p-10 md:h-[280px] md:min-h-0 md:p-[43px]">
            <h3 className="hidden text-[26px] font-medium leading-tight tracking-[-0.04em] text-white md:block">
                A message from our <span className="text-primary"> founder</span>
            </h3>

            <div className="space-y-3 pt-1 md:mt-auto md:pt-6">
                <div className="flex items-end gap-2">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white/70 ring-1 ring-white/10">
                        <User className="h-4 w-4" />
                    </span>

                    <div className="rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-[13px] text-white">
                        {stage >= 1 ? <TypedWords text={VISITOR_QUESTION} /> : TYPING_CURSOR}
                    </div>
                </div>

                {stage >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-end justify-end gap-2"
                    >
                        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.09] px-4 py-2.5 text-[13px] leading-snug text-white/85">
                            {stage >= 3 ? (
                                <>
                                    <p>
                                        <TypedWords text={SHAUN_ANSWER} />
                                    </p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: answerWordCount * WORD_DELAY + 0.2 }}
                                        className="mt-2.5 text-[11px] font-medium text-white/50"
                                    >
                                        Shaun Brignac
                                        <span className="block text-[10px] font-normal text-white/35">President and CEO · Brignac Mortgage</span>
                                    </motion.p>
                                </>
                            ) : (
                                TYPING_CURSOR
                            )}
                        </div>

                        <img
                            src="/img/shaun-ceo.jpg"
                            alt="Shaun Brignac"
                            className="h-9 w-9 shrink-0 rounded-xl object-cover ring-2 ring-background"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export function LoanPrograms() {
    const track = [...PROGRAM_CARDS, ...PROGRAM_CARDS];
    const tags = [...PROGRAM_TAGS, ...PROGRAM_TAGS];

    return (
        <section data-header-theme="dark" className="force-dark relative bg-background py-24 text-foreground sm:py-32">
            <svg
                aria-hidden="true"
                viewBox="0 0 1120 330"
                preserveAspectRatio="none"
                className="pointer-events-none absolute top-0 right-0 z-0 h-[115px] w-full md:h-[330px] md:w-[78vw] md:max-w-[1120px]"
            >
                <path d="M0 0H1120V330C853 63 635 0 0 0Z" fill="#ffffff" />
            </svg>

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl">Loan Products &amp; Programs</h2>
                    <p className="mt-4 text-lg text-white/60">
                        Whatever you're financing, there's a program built for it — explore the options below.
                    </p>
                </div>

                <div className="mt-[54px] overflow-hidden rounded-[20px] bg-white/[0.05] p-2.5 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px]">
                    <div className="flex flex-col gap-2.5 md:h-[518px] md:flex-row">
                        <div className="relative flex min-h-[381px] flex-col overflow-hidden rounded-[15px] md:h-full md:min-h-0 md:w-[52.2%] md:shrink-0">
                            <img
                                src="/img/bg-card-1.jpg"
                                alt="Modern home financed through a Brignac Mortgage loan program"
                                loading="lazy"
                                decoding="async"
                                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                            <div className="relative flex h-full flex-col p-[50px]">
                                <h3 className="text-[24px] leading-[0.95] text-[#eaf2fb] md:text-[26px]">
                                    Pre-qualify in minutes,
                                    <br />
                                    not days
                                </h3>

                                <motion.div
                                    animate={{ y: [0, -8, 0], rotate: [0.4, -0.6, 0.4] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                    className="mt-[29px] w-[328px] origin-top scale-[0.7561] self-center md:mt-[69px] md:w-full md:max-w-[328px] md:scale-100"
                                >
                                    <div className="relative flex w-full flex-col gap-4 rounded-[15px] bg-white/95 pt-[11px] pr-[17px] pb-[11px] pl-[12px] shadow-[0_30px_60px_-25px_rgba(8,10,16,0.6)] backdrop-blur">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-[7px] bg-neutral-100 px-2 py-[5px] text-[10px] font-medium leading-[12px] text-neutral-600">
                                                Ready in 90 sec
                                            </span>

                                            <span className="inline-flex items-center gap-[4px] rounded-[7px] bg-primary/10 py-[5px] pr-2 pl-[7px] text-[10px] font-medium leading-[12px] text-primary ring-1 ring-primary/25">
                                                <BadgeCheck className="h-[13px] w-[13px]" />
                                                Pre-Qualified
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-[10px]">
                                                <span className="grid h-[48px] w-[48px] place-items-center rounded-[11px] bg-neutral-100 text-sm font-semibold text-neutral-500">
                                                    SM
                                                </span>

                                                <div className="flex flex-col gap-[2px]">
                                                    <p className="text-[16px] font-medium leading-[1.2] tracking-[-0.02em] text-neutral-900">
                                                        Sarah Mitchell
                                                    </p>
                                                    <p className="text-[14px] font-medium leading-[1.2] text-neutral-400">
                                                        First-Time Buyer
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-[2px] text-right">
                                                <p className="text-[16px] font-medium leading-[1.2] text-neutral-900">$385,000</p>
                                                <p className="text-[14px] font-medium leading-[1.2] text-neutral-400">Loan Amount</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-[7px] text-[10px] font-medium leading-[12px] text-neutral-600">
                                                <span className="rounded-[7px] bg-white px-2 py-[5px] ring-1 ring-neutral-900/10">30-Yr Fixed</span>
                                                <span className="rounded-[7px] bg-white px-2 py-[5px] ring-1 ring-neutral-900/10">6.375% APR</span>
                                            </div>

                                            <span className="relative inline-flex items-center rounded-[7px] bg-neutral-900 px-2 py-[5px] text-[10px] font-medium leading-[12px] text-white">
                                                View Offer
                                                <motion.span
                                                    animate={{ x: [0, -30, -30, 0], y: [0, -30, -30, 0], scale: [1, 1, 0.85, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 0.65, 1] }}
                                                    className="pointer-events-none absolute -right-10 -bottom-10"
                                                >
                                                    <MousePointer2 className="h-5 w-5 fill-white text-white drop-shadow-[0_2px_4px_rgba(8,10,16,0.5)]" />
                                                </motion.span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="relative flex min-w-0 flex-col p-5 md:h-full md:flex-1 md:pt-[20px] md:pr-[30px] md:pb-[20px] md:pl-[10px]">
                            <div className="mt-auto flex flex-col items-start text-left md:items-end md:text-right">
                                <h3 className="text-[23px] leading-[0.95] tracking-[-0.05em] text-white">
                                    Every path to
                                    <br className="md:hidden" /> homeownership, covered
                                </h3>

                                <p className="mt-5 max-w-none text-[14px] leading-[1.2] text-white/55 md:max-w-[256px]">
                                    Purchase, refinance, or invest — matched with wholesale lenders and programs built for your
                                    goals.
                                </p>
                            </div>

                            <div className="mt-5 flex items-center gap-[10px]">
                                <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_30%,#000_77.4%,transparent_100%)]">
                                    <div className="animate-marquee flex w-max items-center gap-[10px]">
                                        {[...LOAN_TYPES, ...LOAN_TYPES].map((label, index) => (
                                            <span
                                                key={`${label}-${index}`}
                                                className="inline-flex shrink-0 items-center gap-[7px] rounded-[13px] bg-white/[0.05] py-[5px] pr-[12px] pl-[10px] text-[14px] leading-[1.2] text-white/60"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href="/programs"
                                    className="inline-flex shrink-0 items-center gap-[4px] rounded-[30px] bg-white py-[11px] pr-[15px] pl-[16px] text-[16px] leading-[17px] font-normal text-neutral-900 transition-transform duration-200 hover:scale-[1.03]"
                                >
                                    Explore Programs
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-[14px] grid gap-[14px] md:grid-cols-2 md:items-stretch">
                    <div className="order-last flex flex-col gap-[14px] md:order-none">
                        <div className="relative flex min-h-[260px] flex-col overflow-hidden rounded-[20px] bg-[rgba(243,245,248,0.05)] p-7 sm:p-10 md:h-[280px] md:min-h-0 md:p-[43px]">
                            <h3 className="relative z-10 text-[24px] leading-[0.95] text-white md:text-[26px] md:leading-tight">
                                Programs matched to your goals.
                            </h3>

                            <div className="relative mt-5 flex-1">
                                <div className="absolute inset-0 flex flex-col justify-center gap-2.5 overflow-hidden opacity-50 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
                                    <div className="animate-marquee flex w-max items-center gap-2.5">
                                        {track.slice(0, 3).map((program, index) => (
                                            <ProgramCard key={`fwd-a-${index}`} {...program} />
                                        ))}
                                        {tags.slice(0, 6).map((label, index) => (
                                            <TagPill key={`fwd-tag-${index}`} label={label} keyPrefix="fwd" />
                                        ))}
                                        {track.slice(0, 3).map((program, index) => (
                                            <ProgramCard key={`fwd-b-${index}`} {...program} />
                                        ))}
                                    </div>

                                    <div className="animate-marquee-reverse flex w-max items-center gap-2.5">
                                        {tags.slice(0, 6).map((label, index) => (
                                            <TagPill key={`rev-tag-a-${index}`} label={label} keyPrefix="rev-a" />
                                        ))}
                                        {track.slice(0, 3).map((program, index) => (
                                            <ProgramCard key={`rev-${index}`} {...program} />
                                        ))}
                                        {tags.slice(0, 6).map((label, index) => (
                                            <TagPill key={`rev-tag-b-${index}`} label={label} keyPrefix="rev-b" />
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute top-1/2 left-1/2 flex w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5">
                                    <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-[0_24px_50px_-18px_rgba(8,10,16,0.8)]">
                                        <Search className="h-3.5 w-3.5 text-neutral-400" strokeWidth={1.6} />

                                        <span className="text-[13px] text-neutral-500">
                                            Search loan progra
                                            <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-neutral-500/60" />
                                        </span>

                                        <span className="ml-auto flex items-center gap-1 text-[10px] text-neutral-400">
                                            <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">⌘</kbd>
                                            <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">F</kbd>
                                        </span>
                                    </div>

                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white shadow-lg">
                                        <Sparkle className="h-4 w-4 fill-primary text-primary" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ChatTestimonial />
                    </div>

                    <div className="relative flex min-h-[450px] flex-col overflow-hidden rounded-[20px] ring-1 ring-white/10 md:h-full md:min-h-0">
                        <img
                            src="/img/bg-card-2.jpg"
                            alt="Modern home financed through a Brignac Mortgage loan program"
                            loading="lazy"
                            decoding="async"
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

                        <div className="relative flex h-full flex-col p-7 sm:p-10 md:p-[45px]">
                            <motion.div
                                animate={{ y: [0, -24, 0], rotate: [-3, -1.5, -3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="pointer-events-none absolute top-[63px] left-[-18px] z-0 flex w-[242px] items-center gap-2.5 rounded-[11px] bg-white/60 p-2.5 backdrop-blur-sm md:top-[172px] md:left-[18px]"
                            >
                                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_1px_5px_0_rgba(90,91,107,0.09),inset_2px_7px_2px_0_rgba(255,255,255,0.4)]">
                                    <BadgeCheck className="h-4 w-4" />
                                </span>

                                <div className="min-w-0 leading-tight">
                                    <p className="truncate text-[13px] font-semibold text-neutral-800">Rate Locked</p>
                                    <p className="truncate text-[11px] text-neutral-500">30-Yr Fixed</p>
                                </div>

                                <div className="ml-auto shrink-0 text-right leading-tight">
                                    <p className="text-[13px] font-semibold text-primary">6.375%</p>
                                    <p className="text-[11px] text-neutral-500">Today</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -16, 0], rotate: [1.2, 2.6, 1.2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                                className="pointer-events-none absolute top-[204px] right-[-6px] z-0 flex w-[242px] items-center gap-2.5 rounded-[11px] bg-white/60 p-2.5 backdrop-blur-sm md:top-[194px] md:right-[20px]"
                            >
                                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_1px_5px_0_rgba(90,91,107,0.09),inset_2px_7px_2px_0_rgba(255,255,255,0.4)]">
                                    <Sparkle className="h-4 w-4 fill-primary" />
                                </span>

                                <div className="min-w-0 leading-tight">
                                    <p className="truncate text-[13px] font-semibold text-neutral-800">Clear to Close</p>
                                    <p className="truncate text-[11px] text-neutral-500">Underwriting complete</p>
                                </div>

                                <div className="ml-auto shrink-0 text-right leading-tight">
                                    <p className="text-[13px] font-semibold text-neutral-800">$412,000</p>
                                    <p className="text-[11px] text-neutral-500">2 days ago</p>
                                </div>
                            </motion.div>

                            <div className="relative z-10 mt-[19px] w-[313px] self-center [zoom:0.7827] md:mt-[45px] md:w-full md:max-w-[313px] md:[zoom:1]">
                                <div className="w-full rounded-[17px] bg-white/95 p-5 shadow-[0_30px_60px_-25px_rgba(8,10,16,0.6)] backdrop-blur">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[14px] font-semibold text-neutral-900">Payment Estimate</p>
                                            <p className="text-[10px] text-neutral-400">No-obligation, updates live</p>
                                        </div>

                                        <span className="grid h-6 w-6 place-items-center rounded-full bg-neutral-100 text-[11px] text-neutral-400">
                                            ×
                                        </span>
                                    </div>

                                    <p className="mt-4 text-[10px] font-medium text-neutral-400">Loan Amount</p>

                                    <div className="mt-1 flex items-center gap-1.5 rounded-xl border border-neutral-900/[0.06] bg-neutral-50 px-3.5 py-2.5">
                                        <span className="text-[13px] text-neutral-400">$</span>
                                        <span className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900">412,000</span>
                                    </div>

                                    <div className="mt-2.5 flex items-center justify-between text-[10px]">
                                        <span className="text-neutral-400">Est. Monthly Payment:</span>
                                        <span className="font-semibold text-neutral-900">$2,540</span>
                                    </div>

                                    <p className="mt-3.5 text-[10px] font-medium text-neutral-400">Program</p>

                                    <div className="mt-1 flex items-center justify-between rounded-xl border border-neutral-900/[0.06] bg-neutral-50 px-3.5 py-2.5">
                                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-900">
                                            Conventional · 30-Yr Fixed
                                        </span>
                                        <span className="text-[11px] font-semibold text-neutral-900">6.375%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8">
                                <p className="text-[30px] leading-[1.16] tracking-[-0.04em] text-white">
                                    Closing made simple.
                                    <br />
                                    Zero surprises.
                                </p>

                                <p className="mt-3.5 max-w-[320px] text-[13px] leading-[1.55] text-white/60">
                                    Every step — appraisal, underwriting, funding — tracked and explained, so you always know
                                    where your loan stands.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <svg
                aria-hidden="true"
                viewBox="122 0 390 122"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[122px] left-0 z-0 h-[122px] w-full md:hidden"
            >
                <path d="M633.705 0.002C473.853 0.002 316.853 -1.998 316.853 121.93C316.853 -0.998 163.853 0.002 0 0.002H633.705Z" fill="var(--background)" />
            </svg>

            <svg
                aria-hidden="true"
                viewBox="0 0 634 122"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[122px] left-1/2 z-0 hidden h-[122px] w-[634px] max-w-[44vw] -translate-x-1/2 md:block"
            >
                <path d="M633.705 0.002C473.853 0.002 316.853 -1.998 316.853 121.93C316.853 -0.998 163.853 0.002 0 0.002H633.705Z" fill="var(--background)" />
            </svg>
        </section>
    );
}
