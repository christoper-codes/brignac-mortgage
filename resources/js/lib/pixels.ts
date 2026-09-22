// Loads the site-wide ad / analytics scripts (Meta Pixel, TikTok Pixel, Google Analytics 4) from the
// IDs saved in the dashboard, and reports page views and conversions to whichever are configured.
// IDs are re-checked against each platform's format here as well, because they are written into
// inline scripts.

export type PixelIds = {
    metaPixelId: string | null;
    tiktokPixelId: string | null;
    googleAnalyticsId: string | null;
};

type Win = Window & {
    fbq?: (...args: unknown[]) => void;
    ttq?: { page: () => void; track: (event: string, data?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
};

const loaded = new Set<string>();
const win = () => window as Win;

function injectInline(code: string): void {
    const script = document.createElement('script');
    script.text = code;
    document.head.appendChild(script);
}

function loadMeta(id: string): void {
    if (loaded.has('meta') || !/^\d{8,20}$/.test(id)) {
        return;
    }

    loaded.add('meta');
    injectInline(
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`,
    );
}

function loadTikTok(id: string): void {
    if (loaded.has('tiktok') || !/^[A-Z0-9]{10,30}$/.test(id)) {
        return;
    }

    loaded.add('tiktok');
    injectInline(
        `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${id}');ttq.page()}(window,document,'ttq');`,
    );
}

function loadGoogle(id: string): void {
    if (loaded.has('google') || !/^G-[A-Z0-9]{6,12}$/.test(id)) {
        return;
    }

    loaded.add('google');

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(tag);

    // The single-page app reports page views itself, so the automatic one is switched off.
    injectInline(`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{send_page_view:false});`);
}

/** Injects every configured script once (and the first page view each of them fires on load). */
export function loadPixels(ids: PixelIds): void {
    if (ids.metaPixelId) {
        loadMeta(ids.metaPixelId);
    }

    if (ids.tiktokPixelId) {
        loadTikTok(ids.tiktokPixelId);
    }

    if (ids.googleAnalyticsId) {
        loadGoogle(ids.googleAnalyticsId);
        win().gtag?.('event', 'page_view', { page_path: window.location.pathname });
    }
}

/** Client-side navigations: the base scripts only count the first page on their own. */
export function pixelPageView(path: string): void {
    win().fbq?.('track', 'PageView');
    win().ttq?.page();
    win().gtag?.('event', 'page_view', { page_path: path });
}

/**
 * A visitor sent the contact form — priority #2 conversion. `eventId` is shared with the matching
 * server-side Conversions API call (sent from LeadController) so Meta deduplicates the two into one.
 */
export function pixelLead(eventId: string): void {
    win().fbq?.('track', 'Lead', {}, { eventID: eventId });
    win().ttq?.track('SubmitForm');
    win().gtag?.('event', 'generate_lead');
}

/**
 * A visitor picked a loan officer and clicked "Apply Now" — priority #1 conversion. Fires a distinct
 * event from other CTAs so ad platforms can be told to optimize specifically for this action.
 * `eventId` is shared with the matching server-side call (sent from TrackingController) for Meta's dedup.
 */
export function pixelApplyClick(member: string | undefined, eventId: string): void {
    win().fbq?.('track', 'SubmitApplication', member ? { content_name: member } : {}, { eventID: eventId });
    win().ttq?.track('Contact', { description: 'Apply Now', content_name: member });
    win().gtag?.('event', 'apply_click', { team_member: member });
}

/** Any other call to action (phone, email, secondary links). */
export function pixelCta(label: string): void {
    win().fbq?.('track', 'Contact');
    win().ttq?.track('ClickButton', { description: label });
    win().gtag?.('event', 'cta_click', { label });
}
