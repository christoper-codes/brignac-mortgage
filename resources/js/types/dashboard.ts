export type Platform = 'facebook' | 'instagram' | 'tiktok';

export type Campaign = {
    id: number;
    name: string;
    code: string;
    platform: Platform;
    platform_label: string;
    status: string;
    budget: number | null;
    starts_at: string | null;
    ends_at: string | null;
    tracking_url: string;
    visits_count: number;
    leads_count: number;
    clicks_count: number;
    conversion: number;
    cost_per_lead: number | null;
};

export type Lead = {
    id: number;
    visitor_id: string | null;
    full_name: string;
    email: string;
    phone: string;
    message: string | null;
    status: string;
    campaign: { id: number; name: string; platform: Platform } | null;
    source: string | null;
    region_code: string | null;
    region: string | null;
    city: string | null;
    country_code: string | null;
    ip_address: string | null;
    device_type: string | null;
    browser: string | null;
    os: string | null;
    landing_path: string | null;
    sms_consent: boolean;
    created_at: string;
};

export type JourneyEvent = { type: 'visit' | 'click'; path: string; label: string | null; team_member: string | null; created_at: string };

export type Kpi = { value: number; change?: number | null };
export type Row = { label: string; total: number };

export type DaySeries = { date: string; visitors: number; pageViews: number; clicks: number; leads: number };
export type PeriodSeries = { label: string; visitors: number; leads: number };

export type States = {
    rows: { code: string; name: string; visitors: number }[];
    homeShare: number | null;
    located: number;
};
