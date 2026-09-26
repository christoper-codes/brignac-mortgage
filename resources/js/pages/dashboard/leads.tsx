import { Head, Link, router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import {
    ChevronDown,
    Mail,
    MapPin,
    MessageSquare,
    Monitor,
    MousePointerClick,
    Phone,
    Search,
    Smartphone,
    Tablet,
    X,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
    Card,
    EmptyState,
    PageHeader,
    PlatformBadge,
    StatePill,
} from '@/components/dashboard/ui';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn, pageLabel } from '@/lib/utils';
import { index, update } from '@/routes/dashboard/leads';
import type { JourneyEvent, Journeys, Lead } from '@/types/dashboard';

type Props = {
    leads: {
        data: Lead[];
        meta: { current_page: number; last_page: number; total: number };
        links: { prev: string | null; next: string | null };
    };
    journeys: Journeys;
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

const STATUS_DOTS: Record<string, string> = {
    new: 'bg-primary',
    contacted: 'bg-blue-500',
    qualified: 'bg-yellow-500',
    closed: 'bg-background',
    lost: 'bg-red-500',
};

const DEVICE_ICONS: Record<string, typeof Monitor> = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor,
};

const initials = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

function FieldLabel({ children }: { children: string }) {
    return (
        <p className="mb-2 text-[10px] font-semibold tracking-wider text-foreground/40 uppercase">
            {children}
        </p>
    );
}

const ALL = 'all';

// Radix selects can't hold an empty value, so "no filter" is a sentinel that maps back to undefined.
function FilterSelect({
    value,
    placeholder,
    options,
    onChange,
}: {
    value?: string;
    placeholder: string;
    options: { value: string; label: string }[];
    onChange: (value: string | undefined) => void;
}) {
    return (
        <Select
            value={value ?? ALL}
            onValueChange={(next) => onChange(next === ALL ? undefined : next)}
        >
            <SelectTrigger className="h-10 min-w-40 rounded-full border-border bg-card px-4 text-sm capitalize shadow-none focus-visible:border-primary focus-visible:ring-0 data-[size=default]:h-10">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72 rounded-3xl p-1.5">
                <SelectItem value={ALL} className="rounded-full py-2 pl-3">
                    {placeholder}
                </SelectItem>
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        className="rounded-full py-2 pl-3 capitalize"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

const dateTime = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
const time = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

// The chronological trail that led to a lead: every page view and CTA click from the same browser
// (matched by visitor_id), ending with the form submission itself, joined by a vertical line.
function JourneyTimeline({
    events,
    lead,
}: {
    events: JourneyEvent[];
    lead: Lead;
}) {
    if (events.length === 0) {
        return (
            <p className="text-xs text-foreground/50">
                No earlier page views or clicks were recorded for this visitor
                before they submitted the form.
            </p>
        );
    }

    return (
        <ol className="relative space-y-3 before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-px before:bg-border">
            {events.map((event, index) => {
                const isApply =
                    event.type === 'click' && event.label === 'Apply Now';

                return (
                    <li
                        key={index}
                        className="relative flex items-start gap-3 text-xs"
                    >
                        <span
                            className={cn(
                                'relative flex size-5 shrink-0 items-center justify-center rounded-full border',
                                isApply
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : event.type === 'click'
                                      ? 'border-foreground bg-foreground text-background'
                                      : 'border-border bg-card text-foreground/40',
                            )}
                        >
                            {event.type === 'click' ? (
                                <MousePointerClick className="size-3" />
                            ) : (
                                <span className="size-1.5 rounded-full bg-current" />
                            )}
                        </span>
                        <span className="pt-0.5 text-foreground/70">
                            {event.type === 'visit' ? (
                                <>
                                    Visited{' '}
                                    <span className="font-medium text-foreground">
                                        {pageLabel(event.path)}
                                    </span>
                                </>
                            ) : (
                                <>
                                    Clicked{' '}
                                    <span
                                        className={cn(
                                            'font-medium',
                                            isApply
                                                ? 'text-primary'
                                                : 'text-foreground',
                                        )}
                                    >
                                        {event.label}
                                    </span>
                                    {event.team_member && (
                                        <>
                                            {' '}
                                            for{' '}
                                            <span className="font-medium text-foreground">
                                                {event.team_member}
                                            </span>
                                        </>
                                    )}{' '}
                                    on{' '}
                                    <span className="text-foreground/60">
                                        {pageLabel(event.path)}
                                    </span>
                                </>
                            )}
                        </span>
                        <span className="ml-auto shrink-0 pt-0.5 text-foreground/30 tabular-nums">
                            {time(event.created_at)}
                        </span>
                    </li>
                );
            })}
            <li className="relative flex items-start gap-3 text-xs">
                <span className="relative flex size-5 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
                    <MessageSquare className="size-3" />
                </span>
                <span className="pt-0.5 font-medium text-foreground">
                    Submitted the contact form
                </span>
                <span className="ml-auto shrink-0 pt-0.5 text-foreground/30 tabular-nums">
                    {time(lead.created_at)}
                </span>
            </li>
        </ol>
    );
}

export default function Leads({
    leads,
    journeys,
    filters,
    campaigns,
    statuses,
    states,
}: Props) {
    const [search, setSearch] = useState(filters.q ?? '');
    const [expanded, setExpanded] = useState<Set<number>>(new Set());
    const hasFilters = Object.values(filters).some(Boolean);

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
        router.get(
            index().url,
            { ...filters, ...next },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const submitSearch = (event: FormEvent) => {
        event.preventDefault();
        filter({ q: search || undefined });
    };

    const clearFilters = () => {
        setSearch('');
        router.get(
            index().url,
            {},
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const setStatus = (lead: Lead, status: string) => {
        router.patch(
            update(lead.id).url,
            { status },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <>
            <Head title="Leads" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <PageHeader
                    title="Leads"
                    description={`${leads.meta.total} people who reached out through the site.`}
                />

                <div className="flex flex-wrap items-center gap-3">
                    <form
                        onSubmit={submitSearch}
                        className="relative min-w-56 flex-1"
                    >
                        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/40" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search name, email or phone"
                            className="h-10 w-full rounded-full border border-border bg-card pr-5 pl-10 text-sm text-foreground outline-none focus:border-primary"
                        />
                    </form>
                    <FilterSelect
                        value={filters.campaign}
                        placeholder="All campaigns"
                        onChange={(campaign) => filter({ campaign })}
                        options={campaigns.map((campaign) => ({
                            value: String(campaign.id),
                            label: campaign.name,
                        }))}
                    />
                    <FilterSelect
                        value={filters.status}
                        placeholder="Any status"
                        onChange={(status) => filter({ status })}
                        options={statuses.map((status) => ({
                            value: status,
                            label: status,
                        }))}
                    />
                    <FilterSelect
                        value={filters.state}
                        placeholder="Any state"
                        onChange={(state) => filter({ state })}
                        options={states.map((state) => ({
                            value: state,
                            label: state,
                        }))}
                    />
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
                        >
                            <X className="size-4" />
                            Clear
                        </button>
                    )}
                </div>

                {leads.data.length === 0 ? (
                    <EmptyState
                        title="No leads found"
                        description="Leads sent from the contact form appear here with the campaign, location and device they came from."
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        {leads.data.map((lead, position) => {
                            const DeviceIcon =
                                DEVICE_ICONS[lead.device_type ?? ''] ?? Monitor;
                            const device = [
                                lead.device_type,
                                lead.browser,
                                lead.os,
                            ]
                                .filter(Boolean)
                                .join(' · ');
                            const open = expanded.has(lead.id);

                            return (
                                <Card
                                    key={lead.id}
                                    delay={Math.min(position * 0.03, 0.3)}
                                    className="overflow-hidden p-0 transition-shadow hover:shadow-lg hover:shadow-black/5"
                                >
                                    <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-start">
                                        <div className="flex min-w-0 gap-4">
                                            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                {initials(lead.full_name) ||
                                                    '?'}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="min-w-0 truncate text-base font-semibold text-foreground">
                                                        {lead.full_name}
                                                    </p>
                                                    {lead.sms_consent && (
                                                        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                                            SMS OK
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-0.5 text-xs text-foreground/40">
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            lead.created_at,
                                                        ),
                                                        { addSuffix: true },
                                                    )}
                                                </p>
                                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                                    <a
                                                        href={`mailto:${lead.email}`}
                                                        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-foreground/70 transition-colors hover:border-primary hover:text-foreground"
                                                    >
                                                        <Mail className="size-3.5 shrink-0" />
                                                        <span className="truncate">
                                                            {lead.email}
                                                        </span>
                                                    </a>
                                                    <a
                                                        href={`tel:${lead.phone}`}
                                                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-foreground/70 transition-colors hover:border-primary hover:text-foreground"
                                                    >
                                                        <Phone className="size-3.5 shrink-0" />
                                                        {lead.phone}
                                                    </a>
                                                </div>
                                                {lead.message && (
                                                    <p className="mt-3 flex gap-2 border-l-2 border-primary/30 pl-3 text-xs leading-relaxed text-foreground/60">
                                                        <span className="line-clamp-3">
                                                            {lead.message}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <FieldLabel>Source</FieldLabel>
                                            <div className="space-y-2 text-xs text-foreground/60">
                                                {lead.campaign ? (
                                                    <PlatformBadge
                                                        platform={
                                                            lead.campaign
                                                                .platform
                                                        }
                                                        label={
                                                            lead.campaign.name
                                                        }
                                                    />
                                                ) : (
                                                    <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 font-medium text-foreground/70">
                                                        {lead.source ??
                                                            'Direct'}
                                                    </span>
                                                )}
                                                <p>
                                                    {dateTime(lead.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <FieldLabel>Location</FieldLabel>
                                            <div className="space-y-2 text-xs text-foreground/60">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="size-3.5 shrink-0 text-foreground/40" />
                                                    <StatePill
                                                        code={lead.region_code}
                                                        name={
                                                            lead.city
                                                                ? `${lead.city}, ${lead.region_code}`
                                                                : lead.region
                                                        }
                                                    />
                                                </div>
                                                <p className="flex items-center gap-1.5 capitalize">
                                                    <DeviceIcon className="size-3.5 shrink-0 text-foreground/40" />
                                                    {device || '—'}
                                                </p>
                                                {lead.ip_address && (
                                                    <p className="pl-5 text-foreground/40">
                                                        {lead.ip_address}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <FieldLabel>Status</FieldLabel>
                                            <Select
                                                value={lead.status}
                                                onValueChange={(status) =>
                                                    setStatus(lead, status)
                                                }
                                            >
                                                <SelectTrigger
                                                    className={cn(
                                                        'h-9 w-36 rounded-full border-0 px-4 text-xs font-medium capitalize shadow-none focus-visible:ring-0',
                                                        STATUS_STYLES[
                                                            lead.status
                                                        ],
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            'size-1.5 shrink-0 rounded-full',
                                                            STATUS_DOTS[
                                                                lead.status
                                                            ],
                                                        )}
                                                    />
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent
                                                    className="rounded-3xl p-1.5"
                                                    align="end"
                                                >
                                                    {statuses.map((status) => (
                                                        <SelectItem
                                                            key={status}
                                                            value={status}
                                                            className="rounded-full py-2 pl-3 capitalize"
                                                        >
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => toggleJourney(lead.id)}
                                        className="flex w-full items-center gap-1.5 border-t border-border bg-background/60 px-5 py-3 text-xs font-medium text-foreground/50 transition-colors hover:text-foreground sm:px-6"
                                    >
                                        <ChevronDown
                                            className={cn(
                                                'size-3.5 transition-transform',
                                                open && 'rotate-180',
                                            )}
                                        />
                                        {open ? 'Hide journey' : 'View journey'}
                                    </button>

                                    {open && (
                                        <div className="border-t border-border bg-background/60 px-5 pt-4 pb-5 sm:px-6">
                                            <JourneyTimeline
                                                events={journeys[lead.id] ?? []}
                                                lead={lead}
                                            />
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                )}

                {leads.meta.last_page > 1 && (
                    <div className="flex items-center justify-center gap-3">
                        {leads.links.prev ? (
                            <Link
                                href={leads.links.prev}
                                preserveScroll
                                className="rounded-full border border-border bg-card px-5 py-2 text-sm"
                            >
                                Previous
                            </Link>
                        ) : (
                            <span className="rounded-full px-5 py-2 text-sm text-foreground/30">
                                Previous
                            </span>
                        )}
                        <span className="text-sm text-foreground/60">
                            Page {leads.meta.current_page} of{' '}
                            {leads.meta.last_page}
                        </span>
                        {leads.links.next ? (
                            <Link
                                href={leads.links.next}
                                preserveScroll
                                className="rounded-full border border-border bg-card px-5 py-2 text-sm"
                            >
                                Next
                            </Link>
                        ) : (
                            <span className="rounded-full px-5 py-2 text-sm text-foreground/30">
                                Next
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

Leads.layout = {
    breadcrumbs: [{ title: 'Leads', href: index() }],
};
