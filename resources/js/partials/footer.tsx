import { Link } from '@inertiajs/react';
import { ArrowUpRight, Facebook, Instagram, MapPin, Music2 } from 'lucide-react';

// lucide-react only ships the old bird logo under "Twitter" — the current X wordmark isn't in
// its icon set, so it's drawn here to match the other icons' sizing/stroke conventions.
function XLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

const SOCIAL_LINKS = [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/BrignacMortgage' },
    { icon: MapPin, label: 'Find us on Google Maps', href: 'https://maps.app.goo.gl/kSBdEXrM5XXNnSBE7' },
    { icon: XLogo, label: 'X', href: 'https://x.com/shaunbrignac' },
    { icon: Music2, label: 'TikTok', href: 'https://www.tiktok.com/@shaunbrignac' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/shaunbrignac' },
];

const LEGAL_LINKS = [
    { label: 'Disclaimers', href: '/disclaimers' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

export function Footer({ dark = false }: { dark?: boolean }) {
    return (
        <footer className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-8 px-4 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:px-6 lg:px-8">
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
                                className="grid size-9 place-items-center rounded-full text-foreground/60 transition-colors hover:text-primary"
                            >
                                <Icon className="size-4.5" />
                            </a>
                        );
                    })}
                </div>

                <p className="text-[11px] leading-relaxed text-foreground/40">
                    Copyright © 2026 Brignac Mortgage and Consulting Services LLC - All Rights reserved. NMLS #2401214
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
                    href="/about"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary py-2 pr-2 pl-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    About Us
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
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
