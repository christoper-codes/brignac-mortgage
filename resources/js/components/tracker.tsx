import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { loadPixels, pixelPageView } from '@/lib/pixels';
import { isTrackedPath, trackClick, trackVisit } from '@/lib/tracking';

const CTA_SELECTOR = 'a[href]';

// Which links count as a "call to action": applying, the loan-application portal, phone and email.
function isCallToAction(link: HTMLAnchorElement): boolean {
    const href = link.getAttribute('href') ?? '';

    return (
        link.hasAttribute('data-cta') ||
        href.startsWith('/apply') ||
        href.includes('my1003app.com') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:')
    );
}

/**
 * Reports page views and call-to-action clicks from the public site to the dashboard's tracking
 * endpoints. Renders nothing.
 */
export function Tracker() {
    useEffect(() => {
        // Ad pixels load on the public site only, never inside the team dashboard.
        const reportPage = (url: string, first: boolean) => {
            const path = new URL(url, window.location.origin).pathname;

            if (!isTrackedPath(path)) {
                return;
            }

            trackVisit(path);

            if (first) {
                loadPixels(window.__tracking ?? { metaPixelId: null, tiktokPixelId: null, googleAnalyticsId: null });
            } else {
                pixelPageView(path);
            }
        };

        reportPage(window.location.href, true);
        const stopListening = router.on('navigate', (event) => reportPage(event.detail.page.url, false));

        const handleClick = (event: MouseEvent) => {
            const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(CTA_SELECTOR);

            if (link && isTrackedPath(window.location.pathname) && isCallToAction(link)) {
                const label = link.dataset.cta ?? link.getAttribute('aria-label') ?? link.textContent?.trim() ?? 'Link';

                trackClick(label.slice(0, 80), link.getAttribute('href') ?? '', link.dataset.member);
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            stopListening();
            document.removeEventListener('click', handleClick, true);
        };
    }, []);

    return null;
}
