import { Head, router, useForm } from '@inertiajs/react';
import { Check, Copy, Pencil, Plus, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Card, EmptyState, PageHeader, PlatformBadge, PlatformMark, number } from '@/components/dashboard/ui';
import InputError from '@/components/input-error';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import { destroy, index, store, update } from '@/routes/dashboard/campaigns';
import type { Campaign, Platform } from '@/types/dashboard';

type Props = {
    campaigns: Campaign[];
    platforms: { value: string; label: string }[];
    statuses: string[];
};

const STATUS_STYLES: Record<string, string> = {
    active: 'bg-primary/10 text-primary',
    paused: 'bg-yellow-500/10 text-yellow-600',
    draft: 'bg-foreground/5 text-foreground/60',
    ended: 'bg-red-500/10 text-red-500',
};

const STATUS_DOTS: Record<string, string> = {
    active: 'bg-primary',
    paused: 'bg-yellow-500',
    draft: 'bg-foreground/30',
    ended: 'bg-red-500',
};

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const fieldClass = 'h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary';
const selectTriggerClass = 'h-11 w-full data-[size=default]:h-11 rounded-full border-border bg-background px-5 text-sm shadow-none focus-visible:border-primary focus-visible:ring-0';
const selectContentClass = 'rounded-3xl p-1.5';
const selectItemClass = 'rounded-full py-2.5 pr-8 pl-3';

function CampaignForm({ campaign, platforms, statuses, onDone }: { campaign: Campaign | null; platforms: Props['platforms']; statuses: string[]; onDone: () => void }) {
    const form = useForm({
        name: campaign?.name ?? '',
        code: campaign?.code ?? '',
        platform: campaign?.platform ?? platforms[0]?.value ?? 'facebook',
        status: campaign?.status ?? 'draft',
        budget: campaign?.budget?.toString() ?? '',
        starts_at: campaign?.starts_at ?? '',
        ends_at: campaign?.ends_at ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        const options = { preserveScroll: true, onSuccess: onDone };

        if (campaign) {
            form.put(update(campaign.id).url, options);
        } else {
            form.post(store().url, options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className={fieldClass} placeholder="Spring FHA – Baton Rouge" required />
                <InputError message={form.errors.name} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={form.data.platform} onValueChange={(value) => form.setData('platform', value as Platform)}>
                        <SelectTrigger id="platform" className={selectTriggerClass}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                            {platforms.map((platform) => (
                                <SelectItem key={platform.value} value={platform.value} className={selectItemClass}>
                                    <PlatformMark platform={platform.value as Platform} className="size-4" />
                                    {platform.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={form.errors.platform} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={form.data.status} onValueChange={(value) => form.setData('status', value)}>
                        <SelectTrigger id="status" className={cn(selectTriggerClass, 'capitalize')}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status} className={cn(selectItemClass, 'capitalize')}>
                                    <span className={cn('size-2 rounded-full', STATUS_DOTS[status])} />
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={form.errors.status} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="budget">Budget</Label>
                <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-sm text-foreground/50">$</span>
                    <Input id="budget" type="number" inputMode="decimal" min="0" step="0.01" value={form.data.budget} onChange={(event) => form.setData('budget', event.target.value)} className={cn(fieldClass, 'pl-9')} placeholder="500" />
                </div>
                <InputError message={form.errors.budget} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="starts_at">Starts</Label>
                    <DatePicker id="starts_at" value={form.data.starts_at} onChange={(value) => form.setData('starts_at', value)} placeholder="Start date" />
                    <InputError message={form.errors.starts_at} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="ends_at">Ends (optional)</Label>
                    <DatePicker id="ends_at" value={form.data.ends_at} onChange={(value) => form.setData('ends_at', value)} placeholder="End date" min={form.data.starts_at || undefined} />
                    <InputError message={form.errors.ends_at} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="code">Tracking code</Label>
                <Input id="code" value={form.data.code} onChange={(event) => form.setData('code', event.target.value.toLowerCase())} className={fieldClass} placeholder="Auto-generated from the name" />
                <p className="text-xs text-foreground/50">Goes in the ad link as utm_campaign. Lowercase letters, numbers, - and _.</p>
                <InputError message={form.errors.code} />
            </div>

            <button type="submit" disabled={form.processing} className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50">
                {campaign ? 'Save changes' : 'Create campaign'}
            </button>
        </form>
    );
}

function TrackingLink({ url }: { url: string }) {
    const [copied, copy] = useClipboard();

    return (
        <div className="flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pr-1.5 pl-4">
            <span className="min-w-0 flex-1 truncate text-xs text-foreground/60">{url}</span>
            <button
                type="button"
                onClick={() => copy(url)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? 'Copied' : 'Copy link'}
            </button>
        </div>
    );
}

export default function Campaigns({ campaigns, platforms, statuses }: Props) {
    const [editing, setEditing] = useState<Campaign | 'new' | null>(null);
    const [deleting, setDeleting] = useState<Campaign | null>(null);
    const close = () => setEditing(null);

    const confirmDelete = () => {
        if (deleting) {
            router.delete(destroy(deleting.id).url, { preserveScroll: true, onFinish: () => setDeleting(null) });
        }
    };

    return (
        <>
            <Head title="Campaigns" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <PageHeader
                    title="Campaigns"
                    description="Create the link for each ad and see what it brings in."
                    actions={
                        <button type="button" onClick={() => setEditing('new')} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                            <Plus className="size-4" />
                            New campaign
                        </button>
                    }
                />

                {campaigns.length === 0 ? (
                    <EmptyState
                        title="No campaigns yet"
                        description="Create one per ad: you get a tracking link, and every visit, click and lead that comes through it is counted here."
                        action={
                            <button type="button" onClick={() => setEditing('new')} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
                                <Plus className="size-4" />
                                New campaign
                            </button>
                        }
                    />
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {campaigns.map((campaign, cardIndex) => (
                            <Card key={campaign.id} delay={cardIndex * 0.05} className="flex flex-col gap-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-lg font-semibold text-foreground">{campaign.name}</p>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <PlatformBadge platform={campaign.platform} label={campaign.platform_label} />
                                            <span className={cn('rounded-full px-3 py-1 text-xs font-medium capitalize', STATUS_STYLES[campaign.status])}>{campaign.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 gap-1">
                                        <button type="button" onClick={() => setEditing(campaign)} aria-label="Edit campaign" className="grid size-9 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground">
                                            <Pencil className="size-4" />
                                        </button>
                                        <button type="button" onClick={() => setDeleting(campaign)} aria-label="Delete campaign" className="grid size-9 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-red-500/10 hover:text-red-500">
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <dl className="grid grid-cols-4 gap-2">
                                    {[
                                        ['Visits', number.format(campaign.visits_count)],
                                        ['Leads', number.format(campaign.leads_count)],
                                        ['Clicks', number.format(campaign.clicks_count)],
                                        ['Conv.', `${campaign.conversion}%`],
                                    ].map(([label, value]) => (
                                        <div key={label} className="rounded-2xl bg-background p-3 text-center">
                                            <dd className="text-lg font-semibold text-foreground tabular-nums">{value}</dd>
                                            <dt className="text-[11px] text-foreground/50">{label}</dt>
                                        </div>
                                    ))}
                                </dl>

                                {campaign.budget !== null && (
                                    <p className="text-xs text-foreground/50">
                                        Budget {money.format(campaign.budget)}
                                        {campaign.cost_per_lead !== null && <> · {money.format(campaign.cost_per_lead)} per lead</>}
                                    </p>
                                )}

                                <TrackingLink url={campaign.tracking_url} />
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={editing !== null} onOpenChange={(open) => !open && close()}>
                <DialogContent className="max-h-[90vh] overflow-y-auto rounded-4xl sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{editing === 'new' ? 'New campaign' : 'Edit campaign'}</DialogTitle>
                        <DialogDescription>Each campaign gets its own tracking link to use in the ad.</DialogDescription>
                    </DialogHeader>
                    {editing !== null && <CampaignForm key={editing === 'new' ? 'new' : editing.id} campaign={editing === 'new' ? null : editing} platforms={platforms} statuses={statuses} onDone={close} />}
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this campaign?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="font-medium text-foreground">{deleting?.name}</span> and its tracking link will be removed. The visits, clicks and leads it already brought in are kept, just no longer tied to a campaign.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete campaign</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

Campaigns.layout = {
    breadcrumbs: [{ title: 'Campaigns', href: index() }],
};
