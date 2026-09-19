import { Head } from '@inertiajs/react';
import { Contact } from '@/partials/contact';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { TeamHero } from '@/partials/our-team/hero';
import { TeamDirectory } from '@/partials/our-team/team-directory';

export default function OurTeam() {
    return (
        <>
            <Head title="Our Team" />

            <div className="force-light min-h-screen bg-background">
                <Header />
                <main className="pt-36">
                    <TeamHero />
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
