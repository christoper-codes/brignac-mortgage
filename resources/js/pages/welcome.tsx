import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { Calculator } from '@/partials/home/calculator';
// import { GoogleTestimonials } from '@/partials/home/google-testimonials';
import { Hero } from '@/partials/home/hero';
import { LoanPrograms } from '@/partials/home/loan-programs';
import { StatsMarquee } from '@/partials/home/stats-marquee';
import { WhatWeProvide } from '@/partials/home/what-we-provide';

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
                    <Calculator />
                    <WhatWeProvide />
                    {/* <GoogleTestimonials /> */}
                    <Footer />
                </main>
            </div>
        </>
    );
}
