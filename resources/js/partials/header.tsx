import { Link, router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Info, LogIn, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '@/components/amicro/magnetic-button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Loan Programs', href: '/programs' },
    { label: 'Testimonials', href: '/testimonials' },
];

// The fourth nav item is a dropdown rather than a single link.
const COMPANY_LINKS = [
    { label: 'About Us', href: '/apply', icon: Info },
    { label: 'Login', href: '/login', icon: LogIn },
];

function CompanyMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointer = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handlePointer);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('mousedown', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    return (
        <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
                Company
                <ChevronDown className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'top center' }}
                        className="absolute top-full left-1/2 z-50 w-52 -translate-x-1/2 pt-3"
                    >
                        <div className="rounded-3xl border border-border bg-background/90 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
                            {COMPANY_LINKS.map((link) => {
                                const Icon = link.icon;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        role="menuitem"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                                    >
                                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="size-4" />
                                        </span>
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Header() {
    const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24);
    const [inDarkZone, setInDarkZone] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);

            const zones = document.querySelectorAll('[data-header-theme="dark"]');
            const overDarkZone = Array.from(zones).some((zone) => {
                const rect = zone.getBoundingClientRect();

                return rect.top <= 0 && rect.bottom >= 0;
            });
            setInDarkZone(overDarkZone);
        };

        onScroll();
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
                    inDarkZone
                        ? cn(
                              'force-dark text-white',
                              scrolled
                                  ? 'border-white/10 bg-black/40 shadow-lg shadow-black/20 backdrop-blur-xl'
                                  : 'border-transparent bg-transparent',
                          )
                        : cn(
                              'force-light text-foreground',
                              scrolled
                                  ? 'border-border bg-background/80 shadow-lg shadow-black/5 backdrop-blur-md'
                                  : 'border-transparent bg-transparent',
                          ),
                )}
            >
                <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img
                            src={inDarkZone ? '/img/lightlogo.png' : '/img/darklogo.png'}
                            alt="Brignac Mortgage"
                            className="w-32"
                            fetchPriority="high"
                        />
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
                        <CompanyMenu />
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="/apply"
                            className="group inline-flex h-11.75 items-center justify-center rounded-[40px] bg-[#080a10] pr-1.5 pl-5 text-base font-medium tracking-tighter text-white shadow-[inset_0_4px_19px_rgba(255,255,255,0.55),0_2px_14px_rgba(129,141,151,0.35)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:shadow-[inset_0_4px_19px_rgba(255,255,255,0.65),0_6px_20px_rgba(129,141,151,0.45)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            Get Pre-Qualified
                            <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    className="size-3.5"
                                >
                                    <path d="M5 11 11 5" />
                                    <path d="M5.5 5H11v5.5" />
                                </svg>
                            </span>
                        </Link>
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
                        {[...NAV_LINKS, ...COMPANY_LINKS].map((link) => (
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
