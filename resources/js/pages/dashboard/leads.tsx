import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, Mail, MessageSquare, MousePointerClick, Phone } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Card, EmptyState, PageHeader, PlatformBadge, StatePill } from '@/components/dashboard/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, pageLabel } from '@/lib/utils';
import { index, update } from '@/routes/dashboard/leads';
import type { JourneyEvent, Lead } from '@/types/dashboard';

type Props = {
    leads: { data: Lead[]; meta: { current_page: number; last_page: number; total: number }; links: { prev: string | null; next: string | null } };
    journeys: Record<string, JourneyEvent[]>;
    filters: { q?: string; campaign?: string; status?: string; state?: string };
    campaigns: { id: number; name: string }[];
    statuses: string[];
    states: string[];
};

const STATUS_STYLES: Record<string, string> = {
    new: 'bg-primary/10 text-primary',
    contacted: 'bg-blue-500/10 text-blue-600',
    qualified: 'bg-yellow-500/10 text-yellow-600',
    closed: 'bg-foreground text-background',
    lost: 'bg-red-500/10 text-red-500',
};

const ALL = 'all';

// Radix selects can't hold an empty value, so "no filter" is a sentinel that maps back to undefined.
function FilterSelect({ value, placeholder, options, onChange }: { value?: string; placeholder: string; options: { value: string; label: string }[]; onChange: (value: string | undefined) => void }) {
    return (
        <Select value={value ?? ALL} onValueChange={(next) => onChange(next === ALL ? undefined : next)}>
            <SelectTrigger className="h-10 min-w-40 data-[size=default]:h-10 rounded-full border-border bg-card px-4 text-sm capitalize shadow-none focus-visible:border-primary focus-visible:ring-0">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72 rounded-3xl p-1.5">
                <SelectItem value={ALL} className="rounded-full py-2 pl-3">
                    {placeholder}
                </SelectItem>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-full py-2 pl-3 capitalize">
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

const dateTime = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
const time = (iso: string) => new Date(iso).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });

// The chronological trail that led to a lead: every page view and CTA click from the same browser
// (matched by visitor_id), ending with the form submission itself.
function JourneyTimeline({ events, lead }: { events: JourneyEvent[]; lead: Lead }) {
    if (events.length === 0) {
        return <p className="text-xs text-foreground/50">No earlier page views or clicks were recorded for this visitor before they submitted the form.</p>;
    }

    return (
        <ol className="space-y-2">
            {events.map((event, index) => {
                const isApply = event.type === 'click' && event.label === 'Apply Now';

                return (
                    <li key={index} className="flex items-start gap-2.5 text-xs">
                        <span className={cn('mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full', isApply ? 'bg-primary text-primary-foreground' : event.type === 'click' ? 'bg-foreground/10 text-foreground/60' : 'bg-foreground/5 text-foreground/40')}>
                            {event.type === 'click' ? <MousePointerClick className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
                        </span>
                        <span className="text-foreground/70">
                            {event.type === 'visit' ? (
                                <>Visited <span className="font-medium text-foreground">{pageLabel(event.path)}</span></>
                            ) : (
                                <>
                                    Clicked <span className={cn('font-medium', isApply ? 'text-primary' : 'text-foreground')}>{event.label}</span>
                                    {event.team_member && <> for <span className="font-medium text-foreground">{event.team_member}</span></>}
                                    {' '}on <span className="text-foreground/60">{pageLabel(event.path)}</span>
                                </>
                            )}
                        </span>
                        <span className="ml-auto shrink-0 text-foreground/30">{time(event.created_at)}</span>
                    </li>
                );
            })}
            <li className="flex items-start gap-2.5 text-xs">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <MessageSquare className="size-3" />
                </span>
                <span className="font-medium text-foreground">Submitted the contact form</span>
                <span className="ml-auto shrink-0 text-foreground/30">{time(lead.created_at)}</span>
            </li>
        </ol>
    );
}

export default function Leads({ leads, journeys, filters, campaigns, statuses, states }: Props) {
    const [search, setSearch] = useState(filters.q ?? '');
    const [expanded, setExpanded] = useState<Set<number>>(new Set());

    const toggleJourney = (leadId: number) => {
        setExpanded((current) => {
            const next = new Set(current);

            if (next.has(leadId)) {
                next.delete(leadId);
            } else {
                next.add(leadId);
            }

            return next;
        });
    };

    const filter = (next: Partial<Props['filters']>) => {
        router.get(index().url, { ...filters, ...next }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const submitSearch = (event: FormEvent) => {
        event.preventDefault();
        filter({ q: search || undefined });
    };

    const setStatus = (lead: Lead, status: string) => {
        router.patch(update(lead.id).url, { status }, { preserveScroll: true, preserveState: true });
    };

    return (
        <>
            <Head title="Leads" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <PageHeader title="Leads" description={`${leads.meta.total} people who reached out through the site.`} />

                <div className="flex flex-wrap items-center gap-3">
                    <form onSubmit={submitSearch} className="min-w-56 flex-1">
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search name, email or phone"
                            className="h-10 w-full rounded-full border border-border bg-card px-5 text-sm text-foreground outline-none focus:border-primary"
                        />
                    </form>
                    <FilterSelect
                        value={filters.campaign}
                        placeholder="All campaigns"
                        onChange={(campaign) => filter({ campaign })}
                        options={campaigns.map((campaign) => ({ value: String(campaign.id), label: campaign.name }))}
                    />
                    <FilterSelect value={filters.status} placeholder="Any status" onChange={(status) => filter({ status })} options={statuses.map((status) => ({ value: status, label: status }))} />
                    <FilterSelect value={filters.state} placeholder="Any state" onChange={(state) => filter({ state })} options={states.map((state) => ({ value: state, label: state }))} />
                </div>

                {leads.data.length === 0 ? (
                    <EmptyState title="No leads found" description="Leads sent from the contact form appear here with the campaign, location and device they came from." />
                ) : (
                    <div className="flex flex-col gap-3">
                        {leads.data.map((lead, position) => (
                            <Card key={lead.id} delay={Math.min(position * 0.03, 0.3)} className="p-5">
                                <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate text-base font-semibold text-foreground">{lead.full_name}</p>
                                            {lead.sms_consent && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">SMS OK</span>}
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60">
                                            <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="size-3.5" />{lead.email}</a>
                                            <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Phone className="size-3.5" />{lead.phone}</a>
                                        </div>
                                        {lead.message && (
                                            <p className="mt-2 flex gap-1.5 text-xs text-foreground/50"><MessageSquare className="mt-0.5 size-3.5 shrink-0" /><span className="line-clamp-2">{lead.message}</span></p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5 text-xs text-foreground/60">
                                        {lead.campaign ? <PlatformBadge platform={lead.campaign.platform} label={lead.campaign.name} /> : <span className="rounded-full bg-foreground/5 px-3 py-1">{lead.source ?? 'Direct'}</span>}
                                        <p>{dateTime(lead.created_at)}</p>
                                    </div>

                                    <div className="space-y-1.5 text-xs text-foreground/60">
                                        <StatePill code={lead.region_code} name={lead.city ? `${lead.city}, ${lead.region_code}` : lead.region} />
                                        <p className="capitalize">{[lead.device_type, lead.browser, lead.os].filter(Boolean).join(' · ') || '—'}</p>
                                        {lead.ip_address && <p className="text-foreground/40">{lead.ip_address}</p>}
                                    </div>

                                    <Select value={lead.status} onValueChange={(status) => setStatus(lead, status)}>
                                        <SelectTrigger className={cn('h-9 w-32 rounded-full border-0 px-4 text-xs font-medium capitalize shadow-none focus-visible:ring-0', STATUS_STYLES[lead.status])}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-3xl p-1.5" align="end">
                                            {statuses.map((status) => (
                                                <SelectItem key={status} value={status} className="rounded-full py-2 pl-3 capitalize">
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => toggleJourney(lead.id)}
                                    className="mt-3 flex items-center gap-1.5 text-xs font-medium text-foreground/50 hover:text-foreground"
                                >
                                    <ChevronDown className={cn('size-3.5 transition-transform', expanded.has(lead.id) && 'rotate-180')} />
                                    {expanded.has(lead.id) ? 'Hide journey' : 'View journey'}
                                </button>

                                {expanded.has(lead.id) && (
                                    <div className="mt-3 rounded-2xl bg-background p-4">
                                        <JourneyTimeline events={lead.visitor_id ? (journeys[lead.visitor_id] ?? []) : []} lead={lead} />
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}

                {leads.meta.last_page > 1 && (
                    <div className="flex items-center justify-center gap-3">
                        {leads.links.prev ? <Link href={leads.links.prev} preserveScroll className="rounded-full border border-border bg-card px-5 py-2 text-sm">Previous</Link> : <span className="rounded-full px-5 py-2 text-sm text-foreground/30">Previous</span>}
                        <span className="text-sm text-foreground/60">Page {leads.meta.current_page} of {leads.meta.last_page}</span>
                        {leads.links.next ? <Link href={leads.links.next} preserveScroll className="rounded-full border border-border bg-card px-5 py-2 text-sm">Next</Link> : <span className="rounded-full px-5 py-2 text-sm text-foreground/30">Next</span>}
                    </div>
                )}
            </div>
        </>
    );
}

Leads.layout = {
    breadcrumbs: [{ title: 'Leads', href: index() }],
};
