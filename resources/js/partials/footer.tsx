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

const EXPLORE_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Loan Programs', href: '/programs' },
    { label: 'Apply', href: '/apply' },
    { label: 'Testimonials', href: '/testimonials' },
];

const LEGAL_LINKS = [
    { label: 'Disclaimers', href: '/disclaimers' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

// Shared by every column below, so the four stay visually aligned as one row (or stack in the same
// order) instead of each inventing its own spacing.
const COLUMN =
    'flex flex-col items-center gap-3 text-center sm:items-start sm:text-left';
const COLUMN_HEADING =
    'text-xs font-semibold tracking-wide text-foreground/40 uppercase';
const COLUMN_LINK =
    'text-sm text-foreground/70 transition-colors hover:text-foreground';

function FooterBrand() {
    return (
        <div className={`${COLUMN} col-span-2 sm:col-span-1`}>
            <h3 className="text-lg leading-[1.1] text-foreground">
                Brignac <span className="text-primary">Mortgage</span>
            </h3>
            <p className="max-w-56 text-sm text-foreground/60">
                A Louisiana wholesale mortgage broker, shopping multiple lenders
                so you don't have to.
            </p>
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
        </div>
    );
}

function FooterExplore() {
    return (
        <div className={COLUMN}>
            <p className={COLUMN_HEADING}>Explore</p>
            {EXPLORE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={COLUMN_LINK}>
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

function FooterLegal() {
    return (
        <div className={COLUMN}>
            <p className={COLUMN_HEADING}>Legal</p>
            {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={COLUMN_LINK}>
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

function FooterContact() {
    return (
        <div className={COLUMN}>
            <p className={COLUMN_HEADING}>Contact</p>
            <a href="tel:+15045592821" className={COLUMN_LINK}>
                (504) 559-2821
            </a>
            <a
                href="mailto:Shaun@brignacmortgage.com"
                className={`${COLUMN_LINK} break-all`}
            >
                Shaun@brignacmortgage.com
            </a>
            <Link
                href="/apply"
                className="group mt-1 inline-flex items-center gap-2 rounded-full bg-primary py-2 pr-2 pl-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                About Us
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="size-3.5" />
                </span>
            </Link>
        </div>
    );
}

export function Footer({
    dark = false,
    image = true,
}: {
    dark?: boolean;
    /** Set false to skip the bottom photo band — e.g. testimonials replaces it with its own. */
    image?: boolean;
}) {
    return (
        // No margin on the footer itself: `data-header-theme` lives on this element, and a margin
        // sits outside its box — getBoundingClientRect() (what the header's scroll check reads)
        // would then report this zone starting below a gap that no dark zone covers, so the header
        // flashes light while scrolling through that gap. The sections above already carry their
        // own bottom padding, so no extra spacing is needed here anyway.
        <footer
            data-header-theme={dark ? 'dark' : undefined}
            className={dark ? 'force-dark' : 'force-light'}
        >
            {/* The actual content, on a solid surface with real room to lay it out properly —
                a heading (the same serif-italic accent the hero titles use), then a proper
                four-column footer, instead of squeezing everything into chips floating on the
                photo below. */}
            <div className="bg-background">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="max-w-xl text-center sm:text-left">
                        <h2 className="text-3xl leading-[1.1] text-foreground sm:text-4xl">
                            Your Next Chapter{' '}
                            <span className="font-elegant text-primary italic">
                                Starts Here
                            </span>
                        </h2>
                        <p className="mt-4 text-base text-foreground/60">
                            Licensed across Louisiana, start to close.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
                        <FooterBrand />
                        <FooterExplore />
                        <FooterLegal />
                        <FooterContact />
                    </div>
                </div>
            </div>

            {/* The lion, full-bleed below the content — taller now that it isn't also carrying
                text, and fading up into the section above instead of meeting it at a hard line. */}
            {image && (
                <div className="relative min-h-64 overflow-hidden sm:min-h-140">
                    <img
                        src={
                            dark
                                ? '/img/dark_footer-v2.jpeg'
                                : '/img/light_footer-v2.jpeg'
                        }
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent sm:h-32"
                    />
                </div>
            )}
        </footer>
    );
}
