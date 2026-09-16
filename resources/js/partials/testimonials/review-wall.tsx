import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type Review = { name: string; date: string; text: string; image: string };

// Straight from https://www.facebook.com/BrignacMortgage/reviews — image 1 is the most recent
// client photo, image 10 the oldest, matching the order these were posted. Owner replies are
// intentionally left out; only the client's own review is shown.
const REVIEWS: Review[] = [
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

// A small "f" mark to keep each card reading as a genuine Facebook recommendation without
// pulling in an icon set — lucide doesn't ship a Facebook glyph.
function FacebookMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
        </svg>
    );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
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
                    <p className="text-sm leading-snug font-semibold text-foreground">
                        {review.name} <span className="font-normal text-foreground/50">recommends Brignac Mortgage.</span>
                    </p>
                    <p className="mt-0.5 text-xs text-foreground/40">{review.date}</p>
                </div>
                <FacebookMark className="mt-0.5 size-5 shrink-0 text-[#1877F2]" />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/70">{review.text}</p>
        </motion.div>
    );
}

export function ReviewWall() {
    return (
        <section className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-background to-transparent sm:h-28" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-background to-transparent sm:h-28" />

            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                {REVIEWS.map((review, index) => (
                    <ReviewCard key={review.name} review={review} index={index} />
                ))}
            </div>
        </section>
    );
}
