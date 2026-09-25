import { Head } from '@inertiajs/react';
import { Contact } from '@/partials/contact';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { Calculator } from '@/partials/home/calculator';
import { ClientAvatars } from '@/partials/home/client-avatars';
import { Faqs } from '@/partials/home/faqs';
// import { GoogleTestimonials } from '@/partials/home/google-testimonials';
import { Hero } from '@/partials/home/hero';
import { LoanPrograms } from '@/partials/home/loan-programs';
import { LoanTimeline } from '@/partials/home/loan-timeline';
import { Process } from '@/partials/home/process';
import { StatsMarquee } from '@/partials/home/stats-marquee';
// import { WhatWeProvide } from '@/partials/home/what-we-provide';

export default function Welcome() {
    return (
        <>
            <Head title="Louisiana Mortgage Lender & Loan Officers" />

            {/* This page mixes light and dark sections, but most of it is light — force-light here as
                the default so any gap/margin between sections shows light, not the site's dark-mode
                setting. LoanPrograms and LoanTimeline's inner panel are already force-dark themselves,
                which correctly overrides back to dark for just their own subtree. */}
            <div className="force-light min-h-screen bg-background">
                <Header />
                <main>
                    <Hero />
                    <StatsMarquee />
                    <LoanPrograms />
                    <Calculator />
                    <LoanTimeline />
                    {/* <WhatWeProvide /> */}
                    {/* <GoogleTestimonials /> */}
                    <Faqs />
                    <Process />
                    <ClientAvatars />
                    <Contact />
                    <Footer />
                </main>
            </div>
        </>
    );
}
