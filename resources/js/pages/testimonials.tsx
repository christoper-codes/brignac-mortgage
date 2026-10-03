import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { TestimonialsHero } from '@/partials/testimonials/hero';
import { ReviewWall } from '@/partials/testimonials/review-wall';
import { SuccessStories } from '@/partials/testimonials/success-stories';

export default function Testimonials() {
    return (
        <>
            <Head title="Client Reviews & Testimonials" />

            <div className="force-light min-h-screen bg-background">
                <Header />
                <main className="pt-36 pb-24 sm:pb-32">
                    <TestimonialsHero />
                    <ReviewWall />
                </main>
                <SuccessStories />
                <Footer />
            </div>
        </>
    );
}
