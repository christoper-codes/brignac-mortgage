import { Link } from '@inertiajs/react';

const LEGAL_PAGES = [
    { label: 'Disclaimers', href: '/disclaimers' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

export function LegalNav({ active }: { active: string }) {
    return (
        <nav className="flex flex-wrap justify-center gap-2 border-b border-border pb-6">
            {LEGAL_PAGES.map((page) => {
                const isActive = page.href === active;

                return (
                    <Link
                        key={page.href}
                        href={page.href}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:bg-accent hover:text-foreground'
                        }`}
                    >
                        {page.label}
                    </Link>
                );
            })}
        </nav>
    );
}
