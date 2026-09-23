import { Head } from '@inertiajs/react';
import { BarChart, Breakdown, Card, CardTitle, PageHeader, RangeTabs, StatCard } from '@/components/dashboard/ui';
import { MEMBERS } from '@/partials/apply/team-members';
import { analytics } from '@/routes/dashboard';
import type { DaySeries, PeriodSeries, Row, States } from '@/types/dashboard';

/** Initials fallback for a team member whose name no longer matches the current roster. */
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

type Props = {
    days: number;
    totals: { visitors: number; pageViews: number; clicks: number; leads: number };
    daily: DaySeries[];
    weekly: PeriodSeries[];
    monthly: PeriodSeries[];
    states: States;
    countries: Row[];
    devices: Row[];
    browsers: Row[];
    systems: Row[];
    sources: Row[];
    pages: Row[];
    ctaLabels: { label: string; total: number }[];
    teamMembers: { member: string; applies: number; total: number }[];
    leadBrowsers: Row[];
    leadDevices: Row[];
};

const shortDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function Analytics({ days, totals, daily, weekly, monthly, states, countries, devices, browsers, systems, sources, pages, ctaLabels, teamMembers, leadBrowsers, leadDevices }: Props) {
    return (
        <>
            <Head title="Analytics" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <PageHeader title="Analytics" description="Who visits, from where, on what, and what they click." actions={<RangeTabs value={days} />} />

                <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                    <StatCard label="Visitors" value={totals.visitors} />
                    <StatCard label="Page views" value={totals.pageViews} />
                    <StatCard label="CTA clicks" value={totals.clicks} />
                    <StatCard label="Leads" value={totals.leads} />
                </div>

                <Card>
                    <CardTitle>Apply Now clicks by team member</CardTitle>
                    {teamMembers.length === 0 ? (
                        <p className="py-6 text-center text-sm text-foreground/40">No clicks on the team page yet</p>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Breakdown rows={teamMembers.map((row) => ({ label: row.member, total: row.applies }))} />
                            <ul className="space-y-2">
                                {teamMembers.map((row) => {
                                    const photo = MEMBERS.find((member) => member.name === row.member)?.image;

                                    return (
                                        <li key={row.member} className="flex items-center justify-between rounded-2xl bg-background px-4 py-3 text-sm">
                                            <span className="flex min-w-0 items-center gap-2.5">
                                                {photo ? (
                                                    <img src={photo} alt={row.member} className="size-8 shrink-0 rounded-full object-cover" />
                                                ) : (
                                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-medium text-foreground/60">{initials(row.member)}</span>
                                                )}
                                                <span className="truncate text-foreground/80">{row.member}</span>
                                            </span>
                                            <span className="ml-3 shrink-0 text-xs text-foreground/50">
                                                {row.applies} apply · {row.total - row.applies} phone / email
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </Card>

                <Card>
                    <CardTitle>Visitors per day</CardTitle>
                    <BarChart data={daily.map((day) => ({ label: shortDate(day.date), value: day.visitors, tip: `${day.visitors} visitors · ${day.pageViews} page views · ${day.clicks} clicks` }))} height={220} />
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardTitle>Visitors per week</CardTitle>
                        <BarChart data={weekly.map((week) => ({ label: week.label, value: week.visitors, tip: `${week.visitors} visitors · ${week.leads} leads` }))} height={170} />
                    </Card>
                    <Card>
                        <CardTitle>Visitors per month</CardTitle>
                        <BarChart data={monthly.map((month) => ({ label: month.label, value: month.visitors, tip: `${month.visitors} visitors · ${month.leads} leads` }))} height={170} />
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardTitle>Visitors by state</CardTitle>
                        {states.homeShare !== null && (
                            <div className="mb-5 grid gap-3 sm:grid-cols-2">
                                <p className="rounded-2xl bg-primary/10 px-4 py-3 text-sm text-foreground/80">
                                    <span className="text-2xl font-semibold text-primary">{states.homeShare}%</span>
                                    <span className="ml-2">from Louisiana (licensed state)</span>
                                </p>
                                <p className="rounded-2xl bg-foreground/5 px-4 py-3 text-sm text-foreground/80">
                                    <span className="text-2xl font-semibold text-foreground">{Math.round((100 - states.homeShare) * 10) / 10}%</span>
                                    <span className="ml-2">from other states or countries</span>
                                </p>
                            </div>
                        )}
                        <Breakdown rows={states.rows.map((row) => ({ label: row.name, total: row.visitors }))} empty="Locations appear once visitors arrive from a public IP." />
                    </Card>
                    <Card>
                        <CardTitle>Countries</CardTitle>
                        <Breakdown rows={countries} />
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardTitle>Traffic sources</CardTitle>
                        <Breakdown rows={sources} />
                    </Card>
                    <Card>
                        <CardTitle>Call to action clicks</CardTitle>
                        <Breakdown rows={ctaLabels} empty="No CTA clicks yet" />
                    </Card>
                    <Card>
                        <CardTitle>Top pages</CardTitle>
                        <Breakdown rows={pages.map((row) => ({ ...row, label: `${window.location.origin}${row.label}` }))} plain />
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardTitle>Devices</CardTitle>
                        <Breakdown rows={devices} />
                    </Card>
                    <Card>
                        <CardTitle>Browsers</CardTitle>
                        <Breakdown rows={browsers} />
                    </Card>
                    <Card>
                        <CardTitle>Operating systems</CardTitle>
                        <Breakdown rows={systems} />
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardTitle>Browsers that become leads</CardTitle>
                        <Breakdown rows={leadBrowsers} empty="No leads yet" />
                    </Card>
                    <Card>
                        <CardTitle>Devices that become leads</CardTitle>
                        <Breakdown rows={leadDevices} empty="No leads yet" />
                    </Card>
                </div>
            </div>
        </>
    );
}

Analytics.layout = {
    breadcrumbs: [{ title: 'Analytics', href: analytics() }],
};
