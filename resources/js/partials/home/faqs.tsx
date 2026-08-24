import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQ_ITEMS = [
    {
        question: 'How do I get pre-qualified for a mortgage?',
        answer: "Getting pre-qualified takes just a few minutes online. Share some basic financial information and we'll give you a clear picture of what you can afford — with no impact to your credit score.",
    },
    {
        question: 'What credit score do I need to qualify?',
        answer: "It depends on the loan program. Conventional loans typically start around 620, while FHA loans can go as low as 580. We'll help you find the right program for your credit profile.",
    },
    {
        question: 'How much do I need for a down payment?',
        answer: 'Down payments range from 0% for VA and USDA loans to as little as 3% for conventional loans. We also offer down payment assistance programs for qualified buyers.',
    },
    {
        question: 'What documents do I need to apply?',
        answer: 'Typically pay stubs, W-2s or tax returns, bank statements, and a photo ID. Self-employed borrowers may qualify using bank statements instead of tax returns.',
    },
    {
        question: 'How long does closing take?',
        answer: 'Our streamlined process averages 18 days from application to closing, though timelines can vary based on the loan program and property.',
    },
    {
        question: 'Can I lock in my interest rate?',
        answer: "Yes. Once you're under contract, we can lock your rate for a set period to protect you from market fluctuations while your loan is processed.",
    },
    {
        question: 'Do you work with first-time homebuyers?',
        answer: 'Absolutely. We offer FHA, conventional, and down payment assistance programs specifically designed to make homeownership more accessible for first-time buyers.',
    },
    {
        question: "What if I don't see the loan program I need?",
        answer: 'Give us a call. We work with a wide network of wholesale lenders and can often find or structure a solution that fits your specific situation.',
    },
];

export function Faqs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex rounded-full border border-border bg-card px-5 py-1.5 text-xs font-medium tracking-wide text-foreground/60 uppercase">
                        FAQ
                    </span>
                    <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-foreground/60">
                        Answers to the questions we hear most from homebuyers and homeowners across Louisiana.
                    </p>
                </div>

                <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={item.question}
                                className={`overflow-hidden rounded-2xl bg-card transition-colors duration-300 ${
                                    isOpen ? '' : ''
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base font-medium text-foreground sm:text-lg">{item.question}</span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                        className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                                            isOpen ? 'bg-primary/15 text-primary' : 'bg-background text-foreground/60'
                                        }`}
                                    >
                                        <ChevronDown className="size-4" />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: EASE }}
                                            className="overflow-hidden"
                                        >
                                            <p className="border-t border-border px-6 pt-4 pb-6 text-sm leading-relaxed text-foreground/60 sm:px-8 sm:text-base">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
