import { Head } from '@inertiajs/react';
import { Footer } from '@/partials/footer';
import { Header } from '@/partials/header';
import { FacebookCollage } from '@/partials/testimonials/facebook-collage';
import { TestimonialsHero } from '@/partials/testimonials/hero';
import { ReviewWall } from '@/partials/testimonials/review-wall';

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
                <FacebookCollage />
                <Footer image={false} />
            </div>
        </>
    );
}
