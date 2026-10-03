import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import {
    FacebookMark,
    GoogleMark,
    InstagramMark,
    TikTokMark,
} from '@/components/platform-marks';

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

// Its own floating glass island — not a strip of a shared full-width bar — so it stays a compact,
// content-sized card like the rest of this app's "liquid glass" chips (see loan-timeline.tsx).
const GLASS_CARD =
    'w-full max-w-xs rounded-4xl px-6 py-6 backdrop-blur-2xl sm:w-auto';

function FooterBrand() {
    return (
        <div
            className={`${GLASS_CARD} flex flex-col items-center gap-5 text-center sm:items-start sm:text-left`}
        >
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
                            <Icon className={`size-4.5 ${social.className}`} />
                        </a>
                    );
                })}
            </div>

            <p className="text-[11px] leading-relaxed text-foreground/40">
                Copyright © 2026 Brignac Mortgage and Consulting Services LLC -
                All Rights reserved. NMLS #2401214
                <br />
                Equal Housing Opportunity Lender
            </p>
        </div>
    );
}

function FooterLinks() {
    return (
        <div
            className={`${GLASS_CARD} flex flex-col items-center gap-5 text-center sm:items-end sm:text-right`}
        >
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
    );
}

export function Footer({ dark = false }: { dark?: boolean }) {
    return (
        // isolate: keeps the -z-10 background image scoped to this footer instead of sinking
        // behind the page's own opaque ancestor backgrounds (the same stacking-context bug fixed
        // elsewhere in this app — see hero.tsx's and video.tsx's own notes on it).
        <footer
            data-header-theme={dark ? 'dark' : undefined}
            className={`relative isolate mt-10 min-h-105 overflow-hidden sm:min-h-152 ${dark ? 'force-dark' : 'force-light'}`}
        >
            {/* The lion, full-bleed behind the whole footer. min-h- on the footer (above) gives the
                image enough room to show the whole scene instead of being cropped down to the
                content row's own height. The content row below stays inside its own max-w, same as
                every other section. */}
            <img
                src={
                    dark
                        ? '/img/dark_footer-v2.jpeg'
                        : '/img/light_footer-v2.jpeg'
                }
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />

            {/* Fades the image's top edge into the section's own background, so it blends into
                whatever's above instead of meeting it at a hard line. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-background to-transparent sm:h-48"
            />

            {/* Near the top, not the middle — that's the lion's own spot, and the sky behind it is
                the lightest part of the photo. Two separate frosted "liquid glass" islands (not one
                bar spanning the full width) hold the content, iOS-style: translucent, blurred,
                tinted from the theme's own background so each reads as glass in both variants
                instead of a fixed white or black panel. */}
            <div className="absolute inset-x-0 top-8 mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:top-12 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
                <FooterBrand />
                <FooterLinks />
            </div>
        </footer>
    );
}
