import { Head } from '@inertiajs/react';
import { Header } from '@/partials/header';
import { Hero } from '@/partials/home/hero';
import { LoanPrograms } from '@/partials/home/loan-programs';
import { StatsMarquee } from '@/partials/home/stats-marquee';

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
                    {/* section test */}
                    <section className="min-h-screen"></section>
                </main>
            </div>
        </>
    );
}
