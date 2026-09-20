import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Mail, Phone } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export type Member = {
    name: string;
    title: string;
    image: string;
    email: string;
    phones: { label: string; value: string }[];
    nmls: { label?: string; value: string }[];
    extras?: string[];
    apply?: string;
};

export const MEMBERS: Member[] = [
    {
        name: 'Shaun Brignac, MBA',
        title: 'President and CEO',
        image: '/img/team/shaun_brignac.jpg',
        email: 'Shaun@brignacmortgage.com',
        phones: [
            { label: 'Cell', value: '504-559-2821' },
            { label: 'Office', value: '504-559-2821' },
        ],
        nmls: [{ value: '1928157' }],
        apply: 'https://2401214.my1003app.com',
    },
    {
        name: 'Allison Ratcliff',
        title: 'Chief of Operations',
        image: '/img/team/allison_ratcliff.png',
        email: 'Allie@brignacmortgage.com',
        phones: [{ label: 'Cell', value: '225-718-3978' }],
        nmls: [{ value: '2405703' }],
        apply: 'https://allieratcliff.my1003app.com',
    },
    {
        name: 'Jennifer McMinn-Griffin',
        title: 'Loan Processor',
        image: '/img/team/jennifer_mcminn-griffin.jpg',
        email: 'Jen@tigerprocessingllc.com',
        phones: [{ label: 'Office', value: '225-469-6858' }],
        nmls: [
            { label: 'Individual', value: '1409144' },
            { label: 'Company', value: '2407930' },
        ],
        extras: ['Owner, Tiger Processing Services LLC', 'Role: Third Party Processor', 'Licensed in LA'],
    },
];

export const telHref = (value: string) => `tel:+1${value.replace(/\D/g, '')}`;

function MemberCard({ member, index }: { member: Member; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.1 }}
            className="group flex flex-col rounded-4xl border border-border bg-card p-3 transition-shadow duration-500 hover:shadow-xl hover:shadow-black/5"
        >
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/75 px-4 py-3 backdrop-blur-md">
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">{member.title}</p>
                    <h2 className="mt-0.5 text-xl leading-tight text-foreground">{member.name}</h2>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <ul className="space-y-2.5">
                    <li>
                        <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-foreground">
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                <Mail className="size-4" />
                            </span>
                            <span className="min-w-0 break-all">{member.email}</span>
                        </a>
                    </li>
                    {member.phones.map((phone) => (
                        <li key={phone.label}>
                            <a href={telHref(phone.value)} className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-foreground">
                                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                    <Phone className="size-4" />
                                </span>
                                <span>
                                    <span className="text-foreground/40">{phone.label}: </span>
                                    {phone.value}
                                </span>
                            </a>
                        </li>
                    ))}
                    {member.nmls.map((entry) => (
                        <li key={entry.value} className="flex items-center gap-3 text-sm text-foreground/70">
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                <BadgeCheck className="size-4" />
                            </span>
                            <span>
                                <span className="text-foreground/40">NMLS#{entry.label ? ` (${entry.label})` : ''}: </span>
                                {entry.value}
                            </span>
                        </li>
                    ))}
                </ul>

                {member.extras && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {member.extras.map((extra) => (
                            <span key={extra} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/60">
                                {extra}
                            </span>
                        ))}
                    </div>
                )}

                {member.apply && (
                    <a
                        href={member.apply}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn mt-auto inline-flex items-center justify-between gap-2 self-stretch rounded-full bg-primary py-2 pr-2 pl-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Apply Now
                        <span className="grid size-8 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-200 ease-out group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
                            <ArrowUpRight className="size-4" />
                        </span>
                    </a>
                )}
            </div>
        </motion.article>
    );
}

export function TeamMembers() {
    return (
        <section className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {MEMBERS.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index} />
            ))}
        </section>
    );
}
