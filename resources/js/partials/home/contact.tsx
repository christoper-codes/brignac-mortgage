import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTACT_INFO = [
    { icon: Phone, label: 'Call or Text', value: '(504) 559-2821', href: 'tel:+15045592821' },
    { icon: Mail, label: 'Email', value: 'info@brignacmortgage.com', href: 'mailto:info@brignacmortgage.com' },
    { icon: MapPin, label: 'Office', value: 'Louisiana, USA', href: undefined },
];

export function Contact() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
                    <div className="lg:col-span-2">
                        <span className="inline-flex rounded-full border border-border bg-card px-5 py-1.5 text-xs font-medium tracking-wide text-foreground/60 uppercase">
                            Contact
                        </span>
                        <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">Let's Talk About Your Loan</h2>
                        <p className="mt-4 text-lg text-foreground/60">
                            Tell us a bit about what you're looking for and a member of our team will reach out shortly.
                        </p>

                        <div className="mt-10 flex flex-col gap-4">
                            {CONTACT_INFO.map((item) => {
                                const Icon = item.icon;
                                const content = (
                                    <>
                                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="size-5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs text-foreground/50">{item.label}</p>
                                            <p className="truncate text-sm font-medium text-foreground">{item.value}</p>
                                        </div>
                                    </>
                                );

                                return item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="flex min-h-[320px] flex-col items-center justify-center text-center"
                                    >
                                        <motion.span
                                            initial={{ scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                                            className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary"
                                        >
                                            <CheckCircle2 className="size-7" />
                                        </motion.span>
                                        <h3 className="mt-5 text-xl font-semibold text-foreground">Message sent</h3>
                                        <p className="mt-2 max-w-sm text-sm text-foreground/60">
                                            Thanks, {fullName.split(' ')[0] || 'there'} — we'll be in touch shortly to talk about your loan
                                            options.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <label className="block">
                                                <span className="mb-1.5 block text-sm font-medium text-foreground/70">Full Name</span>
                                                <input
                                                    type="text"
                                                    required
                                                    value={fullName}
                                                    onChange={(event) => setFullName(event.target.value)}
                                                    placeholder="John Doe"
                                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
                                                />
                                            </label>

                                            <label className="block">
                                                <span className="mb-1.5 block text-sm font-medium text-foreground/70">Phone</span>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(event) => setPhone(event.target.value)}
                                                    placeholder="(504) 555-0123"
                                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
                                                />
                                            </label>
                                        </div>

                                        <label className="block">
                                            <span className="mb-1.5 block text-sm font-medium text-foreground/70">Email</span>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                placeholder="you@email.com"
                                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="mb-1.5 block text-sm font-medium text-foreground/70">Message</span>
                                            <textarea
                                                required
                                                rows={4}
                                                value={message}
                                                onChange={(event) => setMessage(event.target.value)}
                                                placeholder="Tell us a bit about what you're looking for..."
                                                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary"
                                            />
                                        </label>

                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                                        >
                                            Send Message
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
