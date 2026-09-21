import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { BarChart, Breakdown, Card, CardTitle, EmptyState, PageHeader, PlatformBadge, RangeTabs, StatCard, StatePill } from '@/components/dashboard/ui';
import { dashboard } from '@/routes';
import { analytics } from '@/routes/dashboard';
import { index as campaignsIndex } from '@/routes/dashboard/campaigns';
import { index as leadsIndex } from '@/routes/dashboard/leads';
import type { DaySeries, Kpi, Lead, Platform, States } from '@/types/dashboard';

type Props = {
    days: number;
    kpis: { visitors: Kpi; leads: Kpi; clicks: Kpi; conversion: Kpi };
    series: DaySeries[];
    topCampaigns: { name: string; platform: Platform; leads: number; visits: number }[];
    states: States;
    recentLeads: Lead[];
};

const shortDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function Dashboard({ days, kpis, series, topCampaigns, states, recentLeads }: Props) {
    return (
        <>
            <Head title="Overview" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <PageHeader title="Overview" description="How your campaigns are performing." actions={<RangeTabs value={days} />} />

                <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                    <StatCard label="Visitors" value={kpis.visitors.value} change={kpis.visitors.change} delay={0} />
                    <StatCard label="Leads" value={kpis.leads.value} change={kpis.leads.change} delay={0.05} />
                    <StatCard label="CTA clicks" value={kpis.clicks.value} change={kpis.clicks.change} delay={0.1} />
                    <StatCard label="Conversion" value={kpis.conversion.value} suffix="%" hint="Leads ÷ visitors" delay={0.15} />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2" delay={0.2}>
                        <CardTitle aside={<Link href={analytics().url} className="inline-flex items-center gap-1 text-xs font-medium text-primary">All analytics <ArrowUpRight className="size-3" /></Link>}>
                            Visitors per day
                        </CardTitle>
                        <BarChart
                            data={series.map((day) => ({
                                label: shortDate(day.date),
                                value: day.visitors,
                                tip: `${day.visitors} visitors · ${day.leads} leads · ${day.clicks} clicks`,
                            }))}
                        />
                    </Card>

                    <Card delay={0.25}>
                        <CardTitle>Where visitors are</CardTitle>
                        {states.homeShare !== null && (
                            <p className="mb-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm text-foreground/80">
                                <span className="font-semibold text-primary">{states.homeShare}%</span> of located visitors are in Louisiana.
                            </p>
                        )}
                        <Breakdown rows={states.rows.map((row) => ({ label: row.name, total: row.visitors }))} empty="Locations appear once visitors arrive from a public IP." />
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card delay={0.3}>
                        <CardTitle aside={<Link href={campaignsIndex().url} className="inline-flex items-center gap-1 text-xs font-medium text-primary">Manage <ArrowUpRight className="size-3" /></Link>}>
                            Top campaigns
                        </CardTitle>
                        {topCampaigns.length === 0 ? (
                            <EmptyState title="No campaigns yet" description="Create your first campaign to start attributing leads." />
                        ) : (
                            <ul className="space-y-3">
                                {topCampaigns.map((campaign) => (
                                    <li key={campaign.name} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">{campaign.name}</p>
                                            <div className="mt-1.5">
                                                <PlatformBadge platform={campaign.platform} />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-semibold tabular-nums text-foreground">{campaign.leads}</p>
                                            <p className="text-xs text-foreground/50">leads · {campaign.visits} visits</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>

                    <Card delay={0.35}>
                        <CardTitle aside={<Link href={leadsIndex().url} className="inline-flex items-center gap-1 text-xs font-medium text-primary">All leads <ArrowUpRight className="size-3" /></Link>}>
                            Latest leads
                        </CardTitle>
                        {recentLeads.length === 0 ? (
                            <EmptyState title="No leads yet" description="Leads sent from the contact form show up here with their campaign and location." />
                        ) : (
                            <ul className="space-y-3">
                                {recentLeads.map((lead) => (
                                    <li key={lead.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">{lead.full_name}</p>
                                            <p className="truncate text-xs text-foreground/50">{lead.email}</p>
                                        </div>
                                        <div className="flex shrink-0 flex-col items-end gap-1">
                                            <StatePill code={lead.region_code} name={lead.region} />
                                            <span className="text-xs text-foreground/40">{lead.campaign?.name ?? lead.source ?? 'Direct'}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Overview', href: dashboard() }],
};
