import { Head } from '@inertiajs/react';
import { Header } from '@/partials/header';
import { Hero } from '@/partials/home/hero';
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
                </main>
            </div>
        </>
    );
}
