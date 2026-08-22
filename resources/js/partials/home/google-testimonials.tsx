import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Review = {
    name: string;
    timeAgo: string;
    text: string;
    reply?: string;
    replyTimeAgo?: string;
};

const REVIEWS: Review[] = [
    {
        name: 'Pamela Brady',
        timeAgo: '7 months ago',
        text: "Words can't express the gratitude we have for them. I can only credit divine intervention for helping us through our purchase process and Brignac Mortgage puts everyone to shame. They will always have a place in my heart.",
        reply: 'Thank you so much. We are so happy for you and this is one we will always remember.',
        replyTimeAgo: '7 months ago',
    },
    {
        name: 'Raven Becnel',
        timeAgo: '7 months ago',
        text: 'We were so pleased with our experience working with Shaun and Allie with Brignac Mortgage! They were always on top of everything and extremely responsive and helpful with this entire closing process. They are upfront, knowledgeable and the most important, HONEST about every single thing. Amazing people and experience!',
        reply: 'It was our pleasure. Thank you so much for trusting us.',
        replyTimeAgo: '7 months ago',
    },
    {
        name: 'Jordan',
        timeAgo: '8 months ago',
        text: 'Great experience refinancing with Brignac Mortgage. The process was smooth, communication was clear, and the team was professional and responsive throughout. Highly recommend!',
        reply: 'Thanks, it was our pleasure',
        replyTimeAgo: '8 months ago',
    },
    {
        name: 'Tim Huynh',
        timeAgo: '10 months ago',
        text: 'Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience. They definitely have my business and referrals going forward.',
        reply: 'Thank you!',
        replyTimeAgo: '10 months ago',
    },
    {
        name: 'Ashley Simon',
        timeAgo: '1 year ago',
        text: 'Working with Brignac Mortgage Company has been an exceptional experience from start to finish. Their team is professional, knowledgeable, and truly committed to helping clients find the best mortgage options available. From the first consultation to closing day, they guided me through every step of the process with clear communication and personalized attention.',
        reply: 'Thanks for your review. We appreciate your feedback and business.',
        replyTimeAgo: '1 year ago',
    },
    {
        name: 'Evan Mullins',
        timeAgo: '1 year ago',
        text: 'A friend of mine recommended Brignac Mortgage to me while I was home hunting. I decided to give them a chance and it was worth it! They weren’t pushy like some of these other company’s. Shaun, Allie, and Jenn were there to answer any questions I had, and were patient and willing through the entire process.',
        reply: 'Thank you Evan!',
        replyTimeAgo: '1 year ago',
    },
    {
        name: 'Jason Villar',
        timeAgo: '1 year ago',
        text: 'Shaun and his team worked around the clock to get my loan. They were all very available, professional, and knowledgeable about their work. Looking forward to working with them again in the future!',
        reply: 'Thank you Jason!! It was a pleasure.',
        replyTimeAgo: '1 year ago',
    },
    {
        name: "Rob O'Mahony",
        timeAgo: '2 years ago',
        text: 'Shaun with Brignac Mortgage & Consulting Services LLC is fantastic! Thank you!',
        reply: 'Thank you for your support!!',
        replyTimeAgo: '2 years ago',
    },
    {
        name: 'Angelo Datseris',
        timeAgo: '2 years ago',
        text: "Shaun and I crossed paths at a mortgage conference and it didn't take long at all for us to become pretty tight friends. Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done.",
        reply: 'Thank you my friend!',
        replyTimeAgo: '2 years ago',
    },
    {
        name: 'Jennifer McMinn-Griffin',
        timeAgo: '3 years ago',
        text: 'Shaun and his team always provide excellent customer service and are committed to helping borrowers find the right loan for them.',
        reply: 'Thank you!',
        replyTimeAgo: '3 years ago',
    },
    {
        name: 'Kristian Guirola',
        timeAgo: '3 years ago',
        text: 'This company is the absolute best at what they do.',
        reply: 'Thank you sir and so are you!!',
        replyTimeAgo: '3 years ago',
    },
    {
        name: 'Justin Pfister',
        timeAgo: '3 years ago',
        text: "I talked with and received numbers (rates) from 6 different brokers. Brignac smoked them all by more than 2-3% lower! I'll never even consider any other mortgage company out there… call Brignac Mortgage and let them blow your mind with the numbers they put together!! Highly highly recommend!",
        reply: 'Thank you! Nothing makes us happier then earning a customer for life.',
        replyTimeAgo: '3 years ago',
    },
    {
        name: 'Grant Murphy',
        timeAgo: '4 years ago',
        text: 'Shaun has been a great help and is very knowledgeable in the Mortgage world!',
        reply: "It's our pleasure to help you! Thanks for the review!",
        replyTimeAgo: '4 years ago',
    },
    {
        name: 'David Rooney',
        timeAgo: '4 years ago',
        text: 'Shawn and Company got me a very low rate and were very easy to get in touch with to answer my questions throughout the process. Would recommend!',
        reply: "It's our pleasure to help you! Thanks for the review",
        replyTimeAgo: '4 years ago',
    },
];

const CAROUSEL_COUNT = 6;

function getInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 48 48" {...props}>
            <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" />
            <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.3C29.4 35.4 26.8 36 24 36c-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.6 39.6 16.3 44 24 44z"
            />
            <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.3C39.9 36.5 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
        </svg>
    );
}

function ReviewCard({ review, className }: { review: Review; className?: string }) {
    return (
        <div className={cn('flex h-full flex-col rounded-2xl bg-white/6 p-5 ring-1 ring-white/10', className)}>
            <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold text-white ring-1 ring-white/15">
                    {getInitials(review.name)}
                </span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{review.name}</p>
                    <p className="text-xs text-white/40">{review.timeAgo}</p>
                </div>
                <GoogleIcon className="ml-auto size-4 shrink-0" />
            </div>

            <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3.5 fill-yellow-500 text-yellow-500" />
                ))}
            </div>

            <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-white/70">{review.text}</p>
        </div>
    );
}

export function GoogleTestimonials() {
    const [showAll, setShowAll] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const carouselReviews = REVIEWS.slice(0, CAROUSEL_COUNT);
    const remainingReviews = REVIEWS.slice(CAROUSEL_COUNT);

    const scrollCarousel = (direction: 1 | -1) => {
        const el = carouselRef.current;
        const card = el?.querySelector<HTMLElement>('[data-review-card]');

        if (!el || !card) {
return;
}

        el.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: 'smooth' });
    };

    return (
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="force-dark w-full rounded-4xl bg-background [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px] p-8 text-foreground sm:p-14 lg:p-20">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <div>
                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                            <GoogleIcon className="size-6" />
                            <span className="text-sm font-medium text-white/60">Reviews</span>
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
                            <span className="text-2xl font-semibold text-white">5.0</span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="size-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <span className="text-sm text-white/40">(15)</span>
                        </div>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/5M5yibBkndHrZcie7"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
                    >
                        <GoogleIcon className="size-4" />
                        Review us on Google
                    </a>
                </div>

                <div className="mt-10">
                    <div className="flex items-center justify-end gap-2 pb-4">
                        <button
                            type="button"
                            onClick={() => scrollCarousel(-1)}
                            className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollCarousel(1)}
                            className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                            aria-label="Next reviews"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>

                    <div className="relative rounded-2xl bg-neutral-900 p-2.5">
                        <div
                            ref={carouselRef}
                            className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {carouselReviews.map((review) => (
                                <div key={review.name} data-review-card className="w-85 shrink-0 snap-start">
                                    <ReviewCard review={review} className="h-full" />
                                </div>
                            ))}
                        </div>

                        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 rounded-r-2xl bg-linear-to-l from-background to-transparent sm:w-40" />
                    </div>

                    <AnimatePresence>
                        {showAll && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {remainingReviews.map((review, index) => (
                                        <motion.div
                                            key={review.name}
                                            initial={{ opacity: 0, y: 24 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.06 }}
                                        >
                                            <ReviewCard review={review} className="h-full" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!showAll && remainingReviews.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <button
                                type="button"
                                onClick={() => setShowAll(true)}
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5"
                            >
                                Load More Reviews
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
