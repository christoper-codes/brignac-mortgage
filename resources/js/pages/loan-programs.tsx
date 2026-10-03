import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { ProgramsHero } from '@/partials/loan-programs/hero';
import { ProgramsList } from '@/partials/loan-programs/programs-list';
import { ProgramsVideo } from '@/partials/loan-programs/video';

export default function LoanPrograms() {
    return (
        <>
            <Head title="FHA, VA, USDA & Jumbo Loans in Louisiana" />

            <div className="force-dark min-h-screen bg-background">
                <Header />
                <main>
                    <ProgramsHero />
                    <ProgramsList />
                    <ProgramsVideo />
                </main>
                <Footer dark />
            </div>
        </>
    );
}
