import { Head } from '@inertiajs/react';
import { Header } from '@/partials/header';
import { Hero } from '@/partials/home/hero';
import { LoanPrograms } from '@/partials/home/loan-programs';
import { StatsMarquee } from '@/partials/home/stats-marquee';
import { Footer } from '@/partials/footer';

export default function Welcome() {
    return (
        <>
            <Head title="Louisiana Mortgage Lending" />

            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    <Hero />
                    <StatsMarquee />
                    <LoanPrograms />
                    <Footer />
                </main>
            </div>
        </>
    );
}
