import { Head } from '@inertiajs/react';
import { Contact } from '@/partials/contact';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { Calculator } from '@/partials/home/calculator';
import { ClientAvatars } from '@/partials/home/client-avatars';
import { Faqs } from '@/partials/home/faqs';
// import { GoogleTestimonials } from '@/partials/home/google-testimonials';
import { Hero } from '@/partials/home/hero';
import { LoanTimeline } from '@/partials/home/loan-timeline';
import { Process } from '@/partials/home/process';
import { StatsMarquee } from '@/partials/home/stats-marquee';
// import { WhatWeProvide } from '@/partials/home/what-we-provide';
import { WhyUs } from '@/partials/home/why-us';

export default function Welcome() {
    return (
        <>
            <Head title="Louisiana Mortgage Lender & Loan Officers">
                {/* Tells the browser to start fetching the hero photo the instant it gets this
                    HTML, instead of waiting to discover the <img> tag further down the page —
                    fetchPriority="high" on the <img> itself only affects scheduling once the
                    browser already knows about it, not how early it starts the request. */}
                <link
                    rel="preload"
                    as="image"
                    href="/img/hero.webp"
                    type="image/webp"
                    fetchPriority="high"
                />
            </Head>

            {/* This page mixes light and dark sections, but most of it is light — force-light here as
                the default so any gap/margin between sections shows light, not the site's dark-mode
                setting. WhyUs and LoanTimeline's inner panel are already force-dark themselves,
                which correctly overrides back to dark for just their own subtree. */}
            <div className="force-light min-h-screen bg-background">
                <Header />
                <main>
                    <Hero />
                    <StatsMarquee />
                    <WhyUs />
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
