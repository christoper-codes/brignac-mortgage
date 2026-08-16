import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { KeyRound, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MagneticButton } from '@/components/amicro/magnetic-button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Loan Programs', href: '/programs' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export function Header() {
    const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
            <motion.div
                initial={false}
                animate={scrolled ? 'scrolled' : 'top'}
                variants={{
                    top: { maxWidth: '80rem', marginTop: '0rem', borderRadius: '0rem' },
                    scrolled: { maxWidth: '64rem', marginTop: '0.75rem', borderRadius: '9999px' },
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    'w-full border transition-colors duration-300',
                    scrolled ? 'border-border bg-background/80 shadow-lg shadow-black/5 backdrop-blur-md' : 'border-transparent bg-transparent',
                )}
            >
                <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <KeyRound className="size-4.5" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight text-foreground">
                            Brignac <span className="text-primary">Mortgage</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <a
                            href="tel:+15045592821"
                            className="flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                        >
                            <Phone className="size-4" />
                            (504) 559-2821
                        </a>
                        <MagneticButton onClick={() => router.visit('/apply')} className="h-10 px-5 text-sm">
                            Get Pre-Qualified
                        </MagneticButton>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        className="flex size-9 items-center justify-center rounded-full text-foreground lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="flex flex-col gap-1 border-t border-border px-5 pt-3 pb-5 lg:hidden">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <MagneticButton onClick={() => router.visit('/apply')} className="mt-3 w-full">
                            Get Pre-Qualified
                        </MagneticButton>
                    </div>
                )}
            </motion.div>
        </header>
    );
}
