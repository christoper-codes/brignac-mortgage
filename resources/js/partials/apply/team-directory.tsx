import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Check, Copy, Download, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MEMBERS, telHref } from '@/partials/apply/team-members';
import type { Member } from '@/partials/apply/team-members';

const EASE = [0.16, 1, 0.3, 1] as const;

const nmlsUrl = (member: Member) => `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/${member.nmls[0].value}`;

// Builds a .vcf on the fly so visitors can save the person straight to their phone or address book.
function downloadVCard(member: Member) {
    const company = member.extras?.find((extra) => extra.startsWith('Owner,'))?.replace('Owner, ', '') ?? 'Brignac Mortgage';
    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${member.name}`,
        `ORG:${company}`,
        `TITLE:${member.title}`,
        `EMAIL:${member.email}`,
        ...member.phones.map((phone) => `TEL;TYPE=${phone.label === 'Cell' ? 'CELL' : 'WORK'}:${phone.value}`),
        `NOTE:NMLS# ${member.nmls[0].value}`,
        'END:VCARD',
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/vcard' }));
    const link = document.createElement('a');

    link.href = url;
    link.download = `${member.name.split(',')[0].replace(/\s+/g, '-').toLowerCase()}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
}

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // Clipboard can be blocked (insecure context / permissions) — the mailto link still works.
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${value}`}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground/50 transition-colors hover:text-foreground"
        >
            {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
        </button>
    );
}

function DetailTile({ icon: Icon, label, children, action }: { icon: typeof Mail; label: string; children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground/40">{label}</p>
                <div className="truncate text-sm font-medium text-foreground">{children}</div>
            </div>
            {action}
        </div>
    );
}

function MemberPanel({ member }: { member: Member }) {
    const item = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid gap-6 rounded-4xl border border-border bg-card p-3 md:grid-cols-5 md:p-4"
        >
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl md:col-span-2 md:aspect-auto md:min-h-[520px]">
                <img src={member.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl" />
                <img src={member.image} alt={member.name} className="absolute inset-0 h-full w-full object-contain" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md">
                    <ShieldCheck className="size-3.5 text-primary" />
                    Licensed in LA
                </span>
            </div>

            <motion.div
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
                className="flex flex-col justify-center p-4 md:col-span-3 md:p-6"
            >
                <motion.p variants={item} className="text-sm font-semibold tracking-wide text-primary uppercase">
                    {member.title}
                </motion.p>
                <motion.h2 variants={item} className="mt-2 text-3xl text-foreground sm:text-4xl">
                    {member.name}
                </motion.h2>

                <motion.div variants={item} className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <DetailTile icon={Mail} label="Email" action={<CopyButton value={member.email} />}>
                            <a href={`mailto:${member.email}`} className="hover:text-primary">
                                {member.email}
                            </a>
                        </DetailTile>
                    </div>
                    {member.phones.map((phone) => (
                        <DetailTile key={phone.label} icon={Phone} label={phone.label}>
                            <a href={telHref(phone.value)} className="hover:text-primary">
                                {phone.value}
                            </a>
                        </DetailTile>
                    ))}
                    {member.nmls.map((entry) => (
                        <DetailTile key={entry.value} icon={BadgeCheck} label={`NMLS#${entry.label ? ` · ${entry.label}` : ''}`}>
                            {entry.value}
                        </DetailTile>
                    ))}
                </motion.div>

                {member.extras && (
                    <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
                        {member.extras.map((extra) => (
                            <span key={extra} className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs text-foreground/60">
                                {extra}
                            </span>
                        ))}
                    </motion.div>
                )}

                <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
                    {member.apply && (
                        <a
                            href={member.apply}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pr-2.5 pl-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Apply Now
                            <span className="grid size-8 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                <ArrowUpRight className="size-4" />
                            </span>
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={() => downloadVCard(member)}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
                    >
                        <Download className="size-4" />
                        Save Contact
                    </button>
                    <a
                        href={nmlsUrl(member)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
                    >
                        Verify on NMLS
                        <ArrowUpRight className="size-3.5" />
                    </a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function TeamDirectory() {
    const [activeIndex, setActiveIndex] = useState(0);
    const member = MEMBERS[activeIndex];

    return (
        <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]"
            >
                <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden" role="tablist">
                    {MEMBERS.map((entry, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={entry.name}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={(event) => {
                                    setActiveIndex(index);
                                    // On phones the tabs scroll sideways: centre the chosen one so its neighbours peek in on both sides.
                                    event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                }}
                                className="relative flex shrink-0 items-center gap-3 rounded-3xl p-3 pr-6 text-left lg:pr-4"
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="team-active-tab"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        className="absolute inset-0 rounded-3xl border border-border bg-card"
                                    />
                                )}
                                <img
                                    src={entry.image}
                                    alt=""
                                    className={cn('relative size-12 shrink-0 rounded-full object-cover transition-opacity', !isActive && 'opacity-60')}
                                />
                                <span className="relative min-w-0">
                                    <span className={cn('block text-sm font-semibold', isActive ? 'text-foreground' : 'text-foreground/50')}>
                                        {entry.name.split(',')[0]}
                                    </span>
                                    <span className="block text-xs text-foreground/40">{entry.title}</span>
                                </span>
                            </button>
                        );
                    })}

                    <div className="mt-4 hidden rounded-3xl border border-border bg-card p-5 lg:block">
                        <MapPin className="size-5 text-primary" />
                        <p className="mt-3 text-sm font-semibold text-foreground">Brignac Mortgage and Consulting Services LLC</p>
                        <p className="mt-1 text-xs text-foreground/50">NMLS #2401214</p>
                        <p className="mt-1 text-xs text-foreground/50">Louisiana, USA</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <MemberPanel key={member.name} member={member} />
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
