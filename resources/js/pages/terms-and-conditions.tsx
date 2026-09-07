import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { LegalNav } from '@/partials/legal/legal-nav';
import { TermsContent } from '@/partials/legal/terms-content';

export default function TermsAndConditions() {
    return (
        <>
            <Head title="Terms and Conditions" />

            <div className="force-light min-h-screen bg-background">
                <Header />
                <main className="pt-36 pb-24 sm:pb-32">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Legal</p>
                            <h1 className="mt-4 text-3xl text-foreground sm:text-4xl">Terms and Conditions</h1>
                            <p className="mt-3 text-sm text-foreground/50">Last Updated: September 6, 2026</p>
                        </div>

                        <div className="mt-10">
                            <LegalNav active="/terms-and-conditions" />
                        </div>

                        <div className="mt-10">
                            <TermsContent />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
