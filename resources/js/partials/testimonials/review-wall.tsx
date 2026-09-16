import { AnimatePresence, motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

type Review = { name: string; date: string; text: string; image: string };
type Platform = 'facebook' | 'google';

// Straight from https://www.facebook.com/BrignacMortgage/reviews — image 1 is the most recent
// client photo, image 10 the oldest, matching the order these were posted. Owner replies are
// intentionally left out; only the client's own review is shown.
const FACEBOOK_REVIEWS: Review[] = [
    {
        name: "Jordan O'Bryant",
        date: 'December 17, 2025',
        text: 'Great experience refinancing with Brignac Mortgage. The process was smooth, communication was clear, and the team was professional and responsive throughout. Highly recommend!',
        image: '/img/facebook_clients/1.jpg',
    },
    {
        name: 'Tim Huynh',
        date: 'October 8, 2025',
        text: 'Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience. They definitely have my business and referrals going forward.',
        image: '/img/facebook_clients/2.jpg',
    },
    {
        name: 'Ashley J Simon',
        date: 'July 15, 2025',
        text: 'Shaun and his team are straightforward and honest! They got the job done quick and easy. Will use them again if I ever need to purchase another home. Highly recommend!!!!!',
        image: '/img/facebook_clients/3.jpg',
    },
    {
        name: 'Evan Mullins',
        date: 'May 8, 2025',
        text: "A friend of mine recommended Brignac Mortgage to me while I was home hunting. I decided to give them a chance and it was worth it! They weren't pushy like some of these other company's. I purchased the home by-owner and not through a realtor. Shaun, Allie, and Jenn were there to answer any questions I had, and were patient and willing through the entire process. They made the purchase of my new home easy and understanding. I cannot give Brignac Mortgage enough credit for all the work their team did. If I ever purchase another home there is no doubt in my mind that Shaun will be my first call!",
        image: '/img/facebook_clients/4.jpg',
    },
    {
        name: 'Jason Villar',
        date: 'April 10, 2025',
        text: 'Shaun Brignac and his team worked around the clock to get my loan. They were all very available, professional, and knowledgeable about their work. Looking forward to working with them again in the future!',
        image: '/img/facebook_clients/5.jpg',
    },
    {
        name: 'Angelo Datseris',
        date: 'May 5, 2023',
        text: "Shaun and I crossed paths at a mortgage conference and it didn't take long at all for us to become pretty tight friends. There are many people in this industry that are not in it for the right reasons but I can tell you whole heartedly that Shaun is not one of those people. Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done. He doesn't listen to people telling him no either - if there's a way to get a deal closed he will find a way. Proud to call him a friend. This is the kind of person you want in your corner at all times.",
        image: '/img/facebook_clients/6.jpg',
    },
    {
        name: 'Justin Pfister',
        date: 'January 10, 2023',
        text: "I talked with and received numbers (rates) from 6 different brokers. Brignac smoked them all by more then 2-3% lower! I'll never even consider any other mortgage company out there… call Brignac Mortgage and let them blow your mind with the numbers they put together!!",
        image: '/img/facebook_clients/7.jpg',
    },
    {
        name: 'Brant Gauthreaux',
        date: 'August 23, 2022',
        text: 'Shaun made the loan process so easy and my loan closed fast. Would definitely recommend and use them on my next mortgage.',
        image: '/img/facebook_clients/8.jpg',
    },
    {
        name: 'Jeremy Bergeron',
        date: 'May 30, 2022',
        text: 'Easy and fast process! Highly recommend Shaun for your mortgage services!',
        image: '/img/facebook_clients/9.jpg',
    },
    {
        name: 'Gmurph Pro Wash',
        date: 'February 27, 2022',
        text: 'Shaun has been a great help and is very knowledgeable in the Mortgage world!',
        image: '/img/facebook_clients/10.jpg',
    },
];

// Straight from https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6 (5.0 out of 5), newest first — Google
// only shows relative dates, so order follows those ("7 months ago" before "8 months ago", etc).
// Client photos reuse the same facebook_clients set (image 1 = most recent) and wrap around once
// exhausted, since there are more Google reviews than client photos. One entry (Seth Gravois) had
// only an owner reply with no review text of its own and is left out, same as the reply text itself.
const GOOGLE_REVIEWS_BASE: Omit<Review, 'image'>[] = [
    {
        name: 'Pamela Brady',
        date: '7 months ago',
        text: "Words can't express the gratitude we have for them. I can only credit divine intervention for helping us through our purchase process and Brignac Mortgage puts everyone to shame. They will always have a place in my heart.",
    },
    {
        name: 'Raven Becnel',
        date: '8 months ago',
        text: 'We were so pleased with our experience working with Shaun and Allie with Brignac Mortgage! They were always on top of everything and extremely responsive and helpful with this entire closing process. They are upfront, knowledgeable and the most important, HONEST about every single thing. Amazing people and experience!',
    },
    {
        name: 'Jordan',
        date: '8 months ago',
        text: 'Great experience refinancing with Brignac Mortgage. The process was smooth, communication was clear, and the team was professional and responsive throughout. Highly recommend!',
    },
    {
        name: 'Tim Huynh',
        date: '11 months ago',
        text: 'Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience. They definitely have my business and referrals going forward.',
    },
    {
        name: 'Evan Mullins',
        date: '1 year ago',
        text: "A friend of mine recommended Brignac Mortgage to me while I was home hunting. I decided to give them a chance and it was worth it! They weren't pushy like some of these other company's. I purchased the home by-owner and not through a realtor. Shaun, Allie, and Jenn were there to answer any questions I had, and were patient and willing through the entire process. They made the purchase of my new home easy and understanding. I cannot give Brignac Mortgage enough credit for all the work there team did. If I ever purchase another home there is no doubt in my mind that Shaun will be my first call!",
    },
    {
        name: 'Ashley Simon',
        date: '1 year ago',
        text: "Working with Brignac Mortgage Company has been an exceptional experience from start to finish. Their team is professional, knowledgeable, and truly committed to helping clients find the best mortgage options available. From the first consultation to closing day, they guided me through every step of the process with clear communication and personalized attention.\n\nWhat stood out most was their ability to make the process smooth and stress-free. They took the time to explain all of my options, answered every question promptly, and made sure I understood each stage of the loan process. Their expertise and dedication made me feel confident that I was making the right decisions.\n\nIf you're looking for a mortgage company that combines expert knowledge, excellent customer service, and a personal touch, I highly recommend Brignac Mortgage Company. They made what can often feel like a complicated process remarkably easy and enjoyable!",
    },
    {
        name: 'Jason Villar',
        date: '1 year ago',
        text: 'Shaun and his team worked around the clock to get my loan. They were all very available, professional, and knowledgeable about their work. Looking forward to working with them again in the future!',
    },
    {
        name: 'Angelo Datseris',
        date: '2 years ago',
        text: "Shaun and I crossed paths at a mortgage conference and it didn't take long at all for us to become pretty tight friends. There are many people in this industry that are not in it for the right reasons but I can tell you whole heartedly that Shaun is not one of those people. Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done. He doesn't listen to people telling him no either - if there's a way to get a deal closed he will find a way. Proud to call him a friend. This is the kind of person you want in your corner at all time.",
    },
    {
        name: "Rob O'Mahony",
        date: '2 years ago',
        text: 'Shaun with Brignac Mortgage & Consulting Services LLC is fantastic! Thank you!',
    },
    {
        name: 'Justin Pfister',
        date: '3 years ago',
        text: "I talked with and received numbers (rates) from 6 different brokers. Brignac smoked them all by more than 2-3% lower! I'll never even consider any other mortgage company out there… call Brignac Mortgage and let them blow your mind with the numbers they put together!! Highly highly recommend!",
    },
    {
        name: 'Jennifer McMinn-Griffin',
        date: '3 years ago',
        text: 'Shaun and his team always provide excellent customer service and are committed to helping borrowers find the right loan for them.',
    },
    {
        name: 'Kristian Guirola',
        date: '3 years ago',
        text: 'This company is the absolute best at what they do.',
    },
    {
        name: 'David Rooney',
        date: '4 years ago',
        text: 'Shawn and Company got me a very low rate and were very easy to get in touch with to answer my questions throughout the process. Would recommend!',
    },
    {
        name: 'Grant Murphy',
        date: '4 years ago',
        text: 'Shaun has been a great help and is very knowledgeable in the Mortgage world!',
    },
];

const GOOGLE_REVIEWS: Review[] = GOOGLE_REVIEWS_BASE.map((review, index) => ({
    ...review,
    image: `/img/facebook_clients/${(index % 10) + 1}.jpg`,
}));

const PLATFORM_LINKS: Record<Platform, string> = {
    facebook: 'https://www.facebook.com/BrignacMortgage/reviews',
    google: 'https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6',
};

// A small "f" mark to keep each card reading as a genuine Facebook recommendation without
// pulling in an icon set — lucide doesn't ship a Facebook glyph.
function FacebookMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
        </svg>
    );
}

function GoogleMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className}>
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

function PlatformToggle({ active, onChange }: { active: Platform; onChange: (platform: Platform) => void }) {
    return (
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
                type="button"
                onClick={() => onChange('facebook')}
                className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active === 'facebook' ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-foreground',
                )}
            >
                <FacebookMark className="size-4" />
                Facebook
            </button>
            <button
                type="button"
                onClick={() => onChange('google')}
                className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active === 'google' ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-foreground',
                )}
            >
                <GoogleMark className="size-4" />
                Google
            </button>
        </div>
    );
}

function PlatformSummary({ platform }: { platform: Platform }) {
    const isFacebook = platform === 'facebook';
    const count = isFacebook ? FACEBOOK_REVIEWS.length : GOOGLE_REVIEWS.length;

    return (
        <>
        </>
    );
}

function ReviewCard({ review, index, platform }: { review: Review; index: number; platform: Platform }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
            className="mb-6 break-inside-avoid rounded-3xl border border-border bg-card p-6"
        >
            <div className="flex items-start gap-3">
                <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="size-11 shrink-0 rounded-full object-cover ring-1 ring-border"
                />
                <div className="min-w-0 flex-1">
                    {platform === 'facebook' ? (
                        <p className="text-sm leading-snug font-semibold text-foreground">
                            {review.name} <span className="font-normal text-foreground/50">recommends Brignac Mortgage.</span>
                        </p>
                    ) : (
                        <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    )}
                    <p className="mt-0.5 text-xs text-foreground/40">{review.date}</p>
                </div>

                {platform === 'facebook' ? (
                    <FacebookMark className="mt-0.5 size-5 shrink-0 text-[#1877F2]" />
                ) : (
                    <GoogleMark className="mt-0.5 size-5 shrink-0" />
                )}
            </div>

            {platform === 'google' && (
                <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="size-3.5 fill-yellow-500 text-yellow-500" />
                    ))}
                </div>
            )}

            <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-foreground/70">{review.text}</p>
        </motion.div>
    );
}

export function ReviewWall() {
    const [platform, setPlatform] = useState<Platform>('facebook');
    const activeReviews = platform === 'facebook' ? FACEBOOK_REVIEWS : GOOGLE_REVIEWS;

    return (
        <section className="relative mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4">
                <PlatformToggle active={platform} onChange={setPlatform} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={platform}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        <PlatformSummary platform={platform} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative mt-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-background to-transparent sm:h-28" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-background to-transparent sm:h-28" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={platform}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="columns-1 gap-6 sm:columns-2 lg:columns-3"
                    >
                        {activeReviews.map((review, index) => (
                            <ReviewCard key={review.name} review={review} index={index} platform={platform} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
