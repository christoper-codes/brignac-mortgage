import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Star } from 'lucide-react';
import { FadeUp } from '@/components/amicro/fade-up';

const INITIALS = ['SM', 'DF', 'MR'];

function ReviewMockup() {
    return (
        <div className="w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3.5 fill-primary text-primary" />
                ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">"Best mortgage experience we've ever had."</p>
            <div className="mt-3 flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">PB</span>
                <span className="text-xs font-medium text-neutral-800">Pamela B.</span>
            </div>
        </div>
    );
}

function ClosingMockup() {
    return (
        <div className="w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <p className="text-[11px] font-medium text-neutral-400">Closing Progress</p>
            <div className="mt-3 flex items-center">
                {['Applied', 'Underwriting', 'Closed'].map((step, index) => (
                    <div key={step} className="flex flex-1 items-center last:flex-none">
                        <span
                            className={`grid size-5 shrink-0 place-items-center rounded-full ${index < 2 ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-400'}`}
                        >
                            <CheckCircle2 className="size-3" />
                        </span>
                        {index < 2 && <span className="mx-1 h-px flex-1 bg-neutral-200" />}
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
    return (
        <div className="w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <div className="flex items-end gap-1.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-500">
                    S
                </span>
                <div className="rounded-2xl rounded-bl-md bg-neutral-100 px-3 py-1.5 text-[11px] text-neutral-700">How's my rate looking?</div>
            </div>
            <div className="mt-2 flex items-end justify-end gap-1.5">
                <div className="rounded-2xl rounded-br-md bg-primary px-3 py-1.5 text-[11px] text-white">Locked at 6.2%! 🎉</div>
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                    SB
                </span>
            </div>
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
            <div className="mt-3 w-full rounded-full bg-neutral-900 py-1.5 text-center text-[11px] font-medium text-white">Book a Call</div>
        </div>
    );
}

function MatchMockup() {
    return (
        <div className="w-full max-w-56 rounded-2xl bg-linear-to-br from-primary to-emerald-700 p-4 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
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
    );
}

function LoanTypeMockup() {
    return (
        <div className="w-full max-w-56 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
            <div className="flex gap-1 rounded-full bg-neutral-100 p-1 text-[10px] font-medium">
                <span className="flex-1 rounded-full bg-neutral-900 py-1 text-center text-white">Residential</span>
                <span className="flex-1 py-1 text-center text-neutral-500">Investment</span>
            </div>
            <p className="mt-3 text-[11px] text-neutral-400">Loan Amount</p>
            <p className="text-lg font-semibold text-neutral-900">$385,000</p>
        </div>
    );
}

const FEATURES = [
    { title: 'Excellent Customer Experience!', description: 'We are dedicated to providing you with the best customer experience in the industry.', Mockup: ReviewMockup },
    { title: 'Fast Closing Times', description: 'Our streamlined process ensures you can close your loan quickly and efficiently, saving you time and hassle.', Mockup: ClosingMockup },
    { title: 'Open Line of Communication', description: 'We keep communication open throughout the process, so you’re always informed and your questions are answered promptly.', Mockup: ChatMockup },
    { title: 'Free Consulting Services', description: 'Take advantage of our free consulting services to get expert advice tailored to your specific financial goals.', Mockup: BookingMockup },
    { title: 'Access to Wholesale Lenders, Investors, and Products', description: 'Gain exclusive access to a wide range of wholesale lenders, investors, and products to find the best options for your needs.', Mockup: MatchMockup },
    { title: 'Residential, Investment & Commercial Loans', description: 'A variety of loan options to meet your residential, investment, and commercial needs at the best terms available.', Mockup: LoanTypeMockup },
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
                                className="flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-6 pt-10 ring-1 ring-border"
                            >
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
                                    className="flex justify-center"
                                >
                                    <Mockup />
                                </motion.div>

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
