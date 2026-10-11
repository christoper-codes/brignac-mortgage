import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { isTrackedPath } from '@/lib/tracking';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'cookie-consent';

// Only shown on the public pages the pixels/Google Analytics actually load on (isTrackedPath
// excludes the dashboard and auth routes), and only once — "Accept" is remembered in
// localStorage, same mechanism as the saved appearance preference. Deliberately not tied to
// visiting the Privacy Policy link: reading the policy isn't the same as accepting cookies.
export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [inDarkZone, setInDarkZone] = useState(false);

    useEffect(() => {
        const shouldShow = () => {
            if (!isTrackedPath(window.location.pathname)) {
                return false;
            }

            try {
                return localStorage.getItem(STORAGE_KEY) !== 'accepted';
            } catch {
                // Blocked storage (private mode, etc.) — show it anyway.
                return true;
            }
        };

        const reveal = () => setVisible(shouldShow());
        reveal();
    }, []);

    // Same dark-zone detection as the header (header.tsx) — except the header sits fixed at the
    // top, so it checks which zone overlaps y=0, while this sits fixed at the bottom, so it
    // checks which zone overlaps the viewport's bottom edge instead.
    useEffect(() => {
        const onScroll = () => {
            const zones = document.querySelectorAll(
                '[data-header-theme="dark"]',
            );
            const overDarkZone = Array.from(zones).some((zone) => {
                const rect = zone.getBoundingClientRect();

                return (
                    rect.top <= window.innerHeight &&
                    rect.bottom >= window.innerHeight
                );
            });

            setInDarkZone(overDarkZone);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const accept = () => {
        try {
            localStorage.setItem(STORAGE_KEY, 'accepted');
        } catch {
            // Ignore — it'll just ask again next visit, which is a safe fallback here.
        }

        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <div
            role="region"
            aria-label="Cookie notice"
            className={cn(
                'fixed right-4 bottom-4 z-50 max-w-sm rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl transition-colors duration-300',
                inDarkZone
                    ? 'force-dark border-white/10 bg-black/40 text-white'
                    : 'force-light border-white/15 bg-background/40 text-foreground',
            )}
        >
            <p
                className={cn(
                    'text-sm',
                    inDarkZone ? 'text-white/80' : 'text-foreground/80',
                )}
            >
                We use cookies and analytics to understand how visitors use this
                site.
            </p>
            <div className="mt-3 flex items-center gap-2">
                {/* Inverts with the dark-zone state so it stays readable against the glass
                    background: dark pill on the light glass, white pill once that glass itself
                    goes dark. */}
                <button
                    type="button"
                    onClick={accept}
                    className={cn(
                        'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                        inDarkZone
                            ? 'bg-white text-[#080a10] hover:bg-white/90'
                            : 'bg-[#080a10] text-white hover:bg-[#080a10]/90',
                    )}
                >
                    Accept
                </button>
                <Link
                    href="/privacy-policy"
                    className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                        inDarkZone
                            ? 'text-white/60 hover:text-white'
                            : 'text-foreground/60 hover:text-foreground',
                    )}
                >
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}
