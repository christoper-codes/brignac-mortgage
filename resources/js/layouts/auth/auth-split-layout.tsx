import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative grid h-dvh items-stretch gap-4 bg-background px-4 lg:grid-cols-2 lg:p-4">
            {/* Floating image card: inset from the screen edges, fully rounded, with frosted-glass overlays. */}
            <div className="relative hidden overflow-hidden rounded-4xl lg:flex">
                <img src="/img/auth.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />

                <Link
                    href={home()}
                    className="relative z-20 m-6 flex h-fit items-center rounded-full border border-white/50 bg-white/40 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl"
                >
                    <img src="/img/darklogo.png" alt="Brignac Mortgage" className="w-32" />
                </Link>

                <div className="absolute inset-x-6 bottom-6 z-20 rounded-3xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-xl">
                    <p className="text-lg font-semibold text-foreground">Your campaigns, all in one place.</p>
                    <p className="mt-1 text-sm text-foreground/60">Secure team access to your leads and campaign results.</p>
                </div>
            </div>

            <div className="flex w-full items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
                    <Link href={home()} className="relative z-20 flex items-center justify-center lg:hidden">
                        <img src="/img/darklogo.png" alt="Brignac Mortgage" className="w-36" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
