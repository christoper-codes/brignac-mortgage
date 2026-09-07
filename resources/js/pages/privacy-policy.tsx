import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { LegalNav } from '@/partials/legal/legal-nav';
import { PrivacyPolicyContent } from '@/partials/legal/privacy-policy-content';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy" />

            <div className="force-light min-h-screen bg-background">
                <Header />
                <main className="pt-36 pb-24 sm:pb-32">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Legal</p>
                            <h1 className="mt-4 text-3xl text-foreground sm:text-4xl">Privacy Policy</h1>
                            <p className="mt-3 text-sm text-foreground/50">Last Updated: September 6, 2026</p>
                        </div>

                        <div className="mt-10">
                            <LegalNav active="/privacy-policy" />
                        </div>

                        <div className="mt-10">
                            <PrivacyPolicyContent />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
