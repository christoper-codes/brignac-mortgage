import { Head } from '@inertiajs/react';
import { ApplyHero } from '@/partials/apply/hero';
import { TeamDirectory } from '@/partials/apply/team-directory';
import { Contact } from '@/partials/contact';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';

export default function Apply() {
    return (
        <>
            <Head title="Apply" />

            <div className="force-light min-h-screen bg-background">
                <Header />
                <main className="pt-36">
                    <ApplyHero />
                    <TeamDirectory />
                    <div className="mt-16">
                        <Contact />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
