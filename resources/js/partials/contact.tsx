import { Link, router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCircle2, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { getAttribution, getVisitorId } from '@/lib/tracking';
import { store } from '@/routes/leads';

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTACT_INFO = [
    { icon: Phone, label: 'Call or Text', value: '(504) 559-2821', href: 'tel:+15045592821' },
    { icon: Mail, label: 'Email', value: 'Shaun@brignacmortgage.com', href: 'mailto:Shaun@brignacmortgage.com' },
    { icon: MapPin, label: 'Office', value: 'Louisiana, USA', href: undefined },
];

export function Contact() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [consentOpen, setConsentOpen] = useState(false);

    const [consent, setConsent] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Saves the lead together with the campaign (UTM tags) that brought this visitor.
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const attribution = getAttribution();

        router.post(
            store().url,
            {
                full_name: fullName,
                email,
                phone,
                message,
                sms_consent: consent,
                visitor_id: getVisitorId(),
                landing_path: attribution.landing_path ?? window.location.pathname,
                referrer: attribution.referrer ?? document.referrer,
                utm_source: attribution.utm_source,
                utm_medium: attribution.utm_medium,
                utm_campaign: attribution.utm_campaign,
                utm_content: attribution.utm_content,
                utm_term: attribution.utm_term,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => {
                    setProcessing(true);
                    setErrors({});
                },
                onSuccess: () => setSubmitted(true),
                onError: (formErrors) => setErrors(formErrors),
                onFinish: () => setProcessing(false),
            },
        );
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
                                                {errors.full_name && <span className="mt-1 block text-xs text-red-500">{errors.full_name}</span>}
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
                                                {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
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
                                            {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
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

                                        <div className="rounded-2xl border border-border bg-background p-4">
                                            <label className="flex cursor-pointer items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    checked={consent}
                                                    onChange={(event) => setConsent(event.target.checked)}
                                                    className="peer sr-only"
                                                />
                                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-foreground/25 bg-card text-primary-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 [&>svg]:scale-50 [&>svg]:opacity-0 [&>svg]:transition-all peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100">
                                                    <Check className="size-3.5" strokeWidth={3} />
                                                </span>
                                                <span className="text-sm font-medium text-foreground/80">Terms of Use &amp; Privacy Policy</span>
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => setConsentOpen((open) => !open)}
                                                aria-expanded={consentOpen}
                                                className="mt-2 ml-8 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                            >
                                                {consentOpen ? 'Hide details' : 'Read full consent'}
                                                <ChevronDown className={`size-3.5 transition-transform duration-300 ${consentOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {consentOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: EASE }}
                                                        className="ml-8 overflow-hidden text-xs leading-relaxed text-foreground/60"
                                                    >
                                                        <p className="pt-2">
                                                            By checking this box, you agree to Brignac Mortgage's{' '}
                                                            <Link href="/terms-and-conditions" className="text-primary hover:underline">
                                                                Terms of Use
                                                            </Link>{' '}
                                                            and{' '}
                                                            <Link href="/privacy-policy" className="text-primary hover:underline">
                                                                Privacy Policy
                                                            </Link>
                                                            , and provide consent to receive text messages for important notifications about our services, updates
                                                            on upcoming meetings, and replies from your dedicated representative.
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {errors.sms_consent && <p className="mt-2 ml-8 text-xs text-red-500">{errors.sms_consent}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                                        >
                                            {processing ? 'Sending…' : 'Send Message'}
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
