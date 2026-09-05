import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { ProgramsHero } from '@/partials/loan-programs/hero';
import { ProgramsList } from '@/partials/loan-programs/programs-list';

export default function LoanPrograms() {
    return (
        <>
            <Head title="Loan Programs" />

            <div className="force-dark min-h-screen bg-background">
                <Header />
                <main>
                    <ProgramsHero />
                    <ProgramsList />
                </main>
                <Footer dark />
            </div>
        </>
    );
}
