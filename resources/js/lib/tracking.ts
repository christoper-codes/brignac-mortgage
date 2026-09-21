import { pixelCta } from '@/lib/pixels';
import { click, visit } from '@/routes/track';

const VISITOR_KEY = 'bm_vid';
const ATTRIBUTION_KEY = 'bm_attr';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

// Paths that belong to the team, not to visitors — never counted as traffic.
const PRIVATE_PREFIXES = ['/dashboard', '/login', '/auth', '/settings', '/register', '/user', '/two-factor'];

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
    referrer?: string;
    landing_path?: string;
};

function readStorage(key: string): string | null {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStorage(key: string, value: string): void {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        // Storage can be blocked (private mode); tracking just falls back to a fresh id per page.
    }
}

/** Anonymous id kept in the browser so repeat visits count as one visitor. */
export function getVisitorId(): string {
    const existing = readStorage(VISITOR_KEY);

    if (existing) {
        return existing;
    }

    const id = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    writeStorage(VISITOR_KEY, id);

    return id;
}

/**
 * UTM tags in the landing URL identify the ad campaign. They are remembered (with the referrer) so a
 * visitor who browses on and fills the form later is still credited to the campaign that brought them.
 */
export function getAttribution(): Attribution {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};

    UTM_KEYS.forEach((key) => {
        const value = params.get(key);

        if (value) {
            fromUrl[key] = value.slice(0, 255);
        }
    });

    if (Object.keys(fromUrl).length > 0) {
        const fresh: Attribution = { ...fromUrl, referrer: document.referrer, landing_path: window.location.pathname };
        writeStorage(ATTRIBUTION_KEY, JSON.stringify(fresh));

        return fresh;
    }

    try {
        return JSON.parse(readStorage(ATTRIBUTION_KEY) ?? '{}') as Attribution;
    } catch {
        return {};
    }
}

export function isTrackedPath(path: string): boolean {
    return !PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function send(url: string, body: Record<string, unknown>): void {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
        credentials: 'same-origin',
    }).catch(() => undefined);
}

let lastVisit = { path: '', at: 0 };

export function trackVisit(path: string): void {
    // Guards against the same page being reported twice in a row (initial load + navigate event).
    if (lastVisit.path === path && Date.now() - lastVisit.at < 1500) {
        return;
    }

    lastVisit = { path, at: Date.now() };
    const attribution = getAttribution();

    send(visit().url, {
        visitor_id: getVisitorId(),
        path,
        referrer: document.referrer || attribution.referrer || null,
        ...Object.fromEntries(UTM_KEYS.map((key) => [key, attribution[key] ?? null])),
    });
}

export function trackClick(label: string, target: string): void {
    pixelCta(label);
    send(click().url, {
        visitor_id: getVisitorId(),
        label,
        target,
        path: window.location.pathname,
        utm_campaign: getAttribution().utm_campaign ?? null,
    });
}
