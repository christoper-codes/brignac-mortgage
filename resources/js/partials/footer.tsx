import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import {
    FacebookMark,
    GoogleMark,
    InstagramMark,
    TikTokMark,
} from '@/components/platform-marks';
import { cn } from '@/lib/utils';

// lucide-react only ships the old bird logo under "Twitter" — the current X wordmark isn't in
// its icon set, so it's drawn here to match the other icons' sizing/stroke conventions.
function XLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

// Same brand marks (and colors) as the pixel cards on /dashboard/tracking, so a social icon means
// the same thing everywhere in the app. Google's mark is already multi-color; the rest are
// single-color glyphs tinted to their brand color.
const SOCIAL_LINKS = [
    {
        icon: FacebookMark,
        label: 'Facebook',
        href: 'https://www.facebook.com/BrignacMortgage',
        className: 'text-[#1877F2]',
    },
    {
        icon: InstagramMark,
        label: 'Instagram',
        href: 'https://www.instagram.com/shaunbrignac',
        className: 'text-[#E1306C]',
    },
    {
        icon: TikTokMark,
        label: 'TikTok',
        href: 'https://www.tiktok.com/@shaunbrignac',
        className: 'text-foreground',
    },
    {
        icon: XLogo,
        label: 'X',
        href: 'https://x.com/shaunbrignac',
        className: 'text-foreground',
    },
    {
        icon: GoogleMark,
        label: 'Find us on Google',
        href: 'https://maps.app.goo.gl/kSBdEXrM5XXNnSBE7',
        className: '',
    },
];

const LEGAL_LINKS = [
    { label: 'Disclaimers', href: '/disclaimers' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

export function Footer({ dark = false }: { dark?: boolean }) {
    return (
        <footer
            className={cn(
                // An explicit, opaque background — not just themed text/icon colors — so a page whose
                // own root background follows the site's dark-mode toggle (e.g. the home page, which
                // mixes force-light and force-dark sections) can't show through behind this footer.
                'mx-auto mt-10 flex max-w-6xl flex-col items-center gap-8 bg-background px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:px-6 sm:py-0 lg:px-8',
                !dark && 'force-light',
            )}
        >
            <div className="order-1 flex w-full flex-col items-center gap-5 text-center sm:order-0 sm:mb-5 sm:w-[20%] sm:items-start sm:text-left">
                <h2 className="text-lg leading-[1.1] text-foreground">
                    Brignac <span className="text-primary">Mortgage</span>
                </h2>
                <div className="flex items-center gap-x-2">
                    {SOCIAL_LINKS.map((social) => {
                        const Icon = social.icon;

                        return (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="grid size-9 place-items-center rounded-full transition-transform hover:-translate-y-0.5"
                            >
                                <Icon
                                    className={`size-4.5 ${social.className}`}
                                />
                            </a>
                        );
                    })}
                </div>

                <p className="text-[11px] leading-relaxed text-foreground/40">
                    Copyright © 2026 Brignac Mortgage and Consulting Services
                    LLC - All Rights reserved. NMLS #2401214
                    <br />
                    Equal Housing Opportunity Lender
                </p>
            </div>

            <div
                data-header-theme={dark ? 'dark' : undefined}
                className={`order-3 mx-auto flex w-full max-w-2xl items-center justify-center sm:order-0 sm:w-[60%] ${dark ? 'bg-background' : 'bg-white'}`}
            >
                <img
                    src={dark ? '/img/dark_footer.png' : '/img/footer.png'}
                    alt="lion Brignac Mortgage"
                    className="h-full w-full"
                />
            </div>

            <div className="order-2 flex w-full flex-col items-center gap-5 text-center sm:order-0 sm:mb-5 sm:w-[20%] sm:items-end sm:text-right">
                <Link
                    href="/apply"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary py-2 pr-2 pl-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    About Us
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="size-3.5" />
                    </span>
                </Link>

                <div className="flex flex-col gap-2">
                    {LEGAL_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
