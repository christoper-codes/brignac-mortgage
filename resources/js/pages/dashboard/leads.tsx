import { Head, Link, router } from '@inertiajs/react';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Card, EmptyState, PageHeader, PlatformBadge, StatePill } from '@/components/dashboard/ui';
import { cn } from '@/lib/utils';
import { index, update } from '@/routes/dashboard/leads';
import type { Lead } from '@/types/dashboard';

type Props = {
    leads: { data: Lead[]; meta: { current_page: number; last_page: number; total: number }; links: { prev: string | null; next: string | null } };
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

const selectClass = 'h-10 rounded-full border border-border bg-card px-4 text-sm capitalize text-foreground outline-none focus:border-primary';

const dateTime = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function Leads({ leads, filters, campaigns, statuses, states }: Props) {
    const [search, setSearch] = useState(filters.q ?? '');

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
                    <select value={filters.campaign ?? ''} onChange={(event) => filter({ campaign: event.target.value || undefined })} className={selectClass}>
                        <option value="">All campaigns</option>
                        {campaigns.map((campaign) => (
                            <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                        ))}
                    </select>
                    <select value={filters.status ?? ''} onChange={(event) => filter({ status: event.target.value || undefined })} className={selectClass}>
                        <option value="">Any status</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <select value={filters.state ?? ''} onChange={(event) => filter({ state: event.target.value || undefined })} className={selectClass}>
                        <option value="">Any state</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
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

                                    <select
                                        value={lead.status}
                                        onChange={(event) => setStatus(lead, event.target.value)}
                                        className={cn('h-9 rounded-full border-0 px-4 text-xs font-medium capitalize outline-none', STATUS_STYLES[lead.status])}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
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
