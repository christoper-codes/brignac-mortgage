<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import Footer from '@/Components/Footer.vue';
import usePriceFormat from '@/composables/priceFormat';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import axios from 'axios';

const { formatPrice } = usePriceFormat();

/* ─── Scroll refs ─────────────────────────────── */
const ourServices            = ref(null);
const mortgageLoanCalculator = ref(null);
const testimonials           = ref(null);
const heroVideo              = ref(null);

/* ─── Video fade-loop ─────────────────────────── */
const FADE_DURATION = 1; // seconds to fade out before end
let videoFading = false;
let videoFadeFrame = null;

const onVideoTimeUpdate = () => {
    const v = heroVideo.value;
    if (!v || !v.duration) return;
    const remaining = v.duration - v.currentTime;
    if (remaining <= FADE_DURATION && !videoFading) {
        videoFading = true;
        const startOpacity = 0.55;
        const startTime = performance.now();
        const fadeOut = (now) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / FADE_DURATION, 1);
            v.style.opacity = startOpacity * (1 - progress);
            if (progress < 1) {
                videoFadeFrame = requestAnimationFrame(fadeOut);
            }
        };
        videoFadeFrame = requestAnimationFrame(fadeOut);
    }
};

const onVideoEnded = () => {
    const v = heroVideo.value;
    if (!v) return;
    cancelAnimationFrame(videoFadeFrame);
    v.style.opacity = 0;
    v.currentTime = 0;
    v.play();
    videoFading = false;
    const startTime = performance.now();
    const fadeIn = (now) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / FADE_DURATION, 1);
        v.style.opacity = 0.55 * progress;
        if (progress < 1) {
            videoFadeFrame = requestAnimationFrame(fadeIn);
        }
    };
    videoFadeFrame = requestAnimationFrame(fadeIn);
};

const scrollTo = (el, offset = 90) => {
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
};

/* ─── Reveal observer ─────────────────────────── */
let revealObserver = null;

onMounted(() => {
    if (heroVideo.value) {
        heroVideo.value.addEventListener('timeupdate', onVideoTimeUpdate);
        heroVideo.value.addEventListener('ended',      onVideoEnded);
    }
    window.addEventListener('scroll-our-services-section',             () => scrollTo(ourServices.value));
    window.addEventListener('scroll-mortgage-loan-calculator-section', () => scrollTo(mortgageLoanCalculator.value));
    window.addEventListener('scroll-testimonials-section',             () => scrollTo(testimonials.value));

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('is-visible', entry.isIntersecting);
            });
        },
        { threshold: [0, 0.15] }
    );
    document.querySelectorAll('.reveal-title').forEach(el => revealObserver.observe(el));
});

onUnmounted(() => {
    cancelAnimationFrame(videoFadeFrame);
    if (heroVideo.value) {
        heroVideo.value.removeEventListener('timeupdate', onVideoTimeUpdate);
        heroVideo.value.removeEventListener('ended',      onVideoEnded);
    }
    window.removeEventListener('scroll-our-services-section',             () => {});
    window.removeEventListener('scroll-mortgage-loan-calculator-section', () => {});
    window.removeEventListener('scroll-testimonials-section',             () => {});
    if (revealObserver) revealObserver.disconnect();
});

/* ─── Mortgage calculator ──────────────────────── */
const plazoOptions   = Array.from({ length: 31 }, (_, i) => i + 5);
const propertyValue  = ref('');
const loanNeeded     = ref('');
const creditTerm     = ref('');
const interestRate   = ref(6.91);
const loadingCalc    = ref(false);
const showResults    = ref(false);
const monthlyPayment = ref(null);
const paymentDetails = ref([]);

const calcMortgage = (p, r, y) => {
    const mr = r / 100 / 12, n = y * 12;
    return (p * mr / (1 - Math.pow(1 + mr, -n))).toFixed(2);
};
const calcDetails = (p, r, y) => {
    const mr = r / 100 / 12, n = y * 12;
    const mp = p * mr / (1 - Math.pow(1 + mr, -n));
    let bal  = p;
    return Array.from({ length: n }, (_, i) => {
        const interest  = bal * mr;
        const principal = mp - interest;
        bal -= principal;
        return {
            month:            i + 1,
            principalPayment: formatPrice(principal.toFixed(2)),
            interestPayment:  formatPrice(interest.toFixed(2)),
            monthlyPayment:   formatPrice(mp.toFixed(2)),
            remainingBalance: formatPrice(Math.max(0, bal).toFixed(2)),
        };
    });
};
const onSubmitCalc = () => {
    if (!canCalculate.value) return;
    loadingCalc.value = true;
    setTimeout(() => {
        monthlyPayment.value = calcMortgage(+loanNeeded.value, interestRate.value, +creditTerm.value);
        paymentDetails.value = calcDetails(+loanNeeded.value, interestRate.value, +creditTerm.value);
        showResults.value    = true;
        loadingCalc.value    = false;
    }, 700);
};
const resetCalc = () => {
    propertyValue.value = ''; loanNeeded.value = ''; creditTerm.value = '';
    interestRate.value  = 6.91; monthlyPayment.value = null;
    paymentDetails.value = []; showResults.value = false;
};

const canCalculate = computed(() => {
    const loan = parseFloat(String(loanNeeded.value));
    const term = parseFloat(String(creditTerm.value));
    return !isNaN(loan) && loan > 0 && !isNaN(term) && term > 0 && !loadingCalc.value;
});

const ltv = computed(() => {
    const prop = parseFloat(String(propertyValue.value));
    const loan = parseFloat(String(loanNeeded.value));
    if (!prop || !loan || prop <= 0) return null;
    return Math.min((loan / prop) * 100, 100).toFixed(1);
});

const downPayment = computed(() => {
    const prop = parseFloat(String(propertyValue.value));
    const loan = parseFloat(String(loanNeeded.value));
    if (!prop || !loan || prop <= loan) return null;
    return formatPrice((prop - loan).toFixed(2));
});

/* ─── Testimonials ────────────────────────────── */
const activeTestimonial = ref(null);
const testimonialList = [
    { name: "Jordan O'Bryant",  content: "Great experience refinancing with Brignac Mortgage. The process was smooth, communication was clear, and the team was professional and responsive throughout. Highly recommend!", avatar: '/storage/facebookprofiles/profile-10.jpg', date: 'Dec 2025', rating: 5 },
    { name: 'Tim Huynh',        content: "Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience.", avatar: '/storage/facebookprofiles/profile-1.jpg', date: 'Oct 2025', rating: 5 },
    { name: 'Ashley J Simon',   content: "Shaun and his team are straightforward and honest! They got the job done quick and easy. Will use them again if I ever need to purchase another home. Highly recommend!!!!!", avatar: '/storage/facebookprofiles/profile-2.jpg', date: 'Jul 2025', rating: 5 },
    { name: 'Evan Mullins',     content: "A friend recommended Brignac Mortgage while I was home hunting. Shaun, Allie, and Jenn were patient and willing throughout the entire process. They made the purchase of my new home easy. If I ever purchase another home, Shaun will be my first call!", avatar: '/storage/facebookprofiles/profile-3.jpg', date: 'May 2025', rating: 5 },
    { name: 'Jason Villar',     content: "Shaun Brignac and his team worked around the clock to get my loan. They were all very available, professional, and knowledgeable about their work. Looking forward to working with them again!", avatar: '/storage/facebookprofiles/profile-4.jpg', date: 'Apr 2025', rating: 5 },
    { name: 'Angelo Datseris',  content: "Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done. This is the kind of person you want in your corner at all times.", avatar: '/storage/facebookprofiles/profile-5.jpg', date: 'May 2023', rating: 5 },
    { name: 'Justin Pfister',   content: "I talked with 6 different brokers. Brignac smoked them all by more than 2-3% lower! I'll never even consider any other mortgage company out there — call Brignac Mortgage and let them blow your mind with the numbers!", avatar: '/storage/facebookprofiles/profile-6.jpg', date: 'Jan 2023', rating: 5 },
    { name: 'Brant Gauthreaux', content: "Shaun made the loan process so easy and my loan closed fast. Would definitely recommend and use them on my next mortgage.", avatar: '/storage/facebookprofiles/profile-7.jpg', date: 'Aug 2022', rating: 5 },
    { name: 'Jeremy Bergeron',  content: "Easy and fast process! Highly recommend Shaun for your mortgage services!", avatar: '/storage/facebookprofiles/profile-8.jpg', date: 'May 2022', rating: 5 },
    { name: 'Gmurph Pro Wash',  content: "Shaun has been a great help and is very knowledgeable in the Mortgage world!", avatar: '/storage/facebookprofiles/profile-9.jpg', date: 'Feb 2022', rating: 5 },
];

/* ─── Video modal ──────────────────────────────── */
const showVideo = ref(false);

/* ─── Reviews load more ────────────────────────── */
const googleShowAll = ref(false);
const fbShowAll     = ref(false);

/* ─── Loan products (Our Services) ──────────────── */
const services = [
    { icon: 'real_estate_agent', label: 'Conventional',      title: 'Standard Loans, Competitive Rates',       desc: 'Ideal for borrowers with good credit and a 5%–20% down payment. We shop 50+ wholesale lenders to find your best rate.' },
    { icon: 'support_agent',     label: 'Mobile Home Loans', title: 'Manufactured & Mobile Home Financing',    desc: 'Financing solutions for manufactured and mobile homes, including land-home packages tailored to your specific needs.' },
    { icon: 'location_away',     label: 'Fixed / ARMs',      title: 'Stability or Flexibility — Your Choice',  desc: 'Choose the stability of a fixed rate or the flexibility of an adjustable rate to perfectly fit your long-term strategy.' },
    { icon: 'badge',             label: 'HELOC',             title: 'Tap Into Your Home Equity',               desc: 'A revolving line of credit for renovations, emergencies, and major purchases — powered by the equity you have already built.' },
    { icon: 'account_balance',    label: 'Jumbo Loans',       title: 'Financing for High-Value Properties',     desc: 'Specialized loans for properties that exceed conforming limits, with competitive rates and flexible terms.' },
    { icon: 'handshake',         label: 'FHA / VA',         title: 'Government-Backed Loans',                 desc: 'Low down payment options and flexible credit requirements for first-time buyers, veterans, and those with less-than-perfect credit.' },
];

/* ─── Process steps ─────────────────────────────── */
const processSteps = [
    { step: '01', icon: 'contact_page',  title: 'Apply in Minutes',      desc: 'Complete our quick online form — no commitment, no hard pull. Just the basics we need to find your best options.' },
    { step: '02', icon: 'manage_search', title: 'We Shop 50+ Lenders',   desc: 'Our team compares rates and programs across our wholesale network to secure the sharpest deal available for your profile.' },
    { step: '03', icon: 'handshake',     title: 'Get Your Approval',     desc: 'We walk you through your options, lock your rate, and handle all the paperwork from application to the closing table.' },
    { step: '04', icon: 'celebration',   title: 'Close & Move In',       desc: 'Sign at closing, receive your keys, and start living. Fast closings are our standard — not an exception.' },
    { step: '05', icon: 'support_agent', title: 'Here for You Always',   desc: 'Our relationship doesn\'t end at closing. We\'re here for questions, future refinancing, and your next home purchase.' },
    { step: '06', icon: 'star',          title: '5-Star Service',        desc: 'Our clients consistently rave about our responsiveness, transparency, and dedication to getting the best deal.' },
    { step: '07', icon: 'groups',        title: 'Family-Owned & Operated', desc: 'As a local family business, we treat you like one of our own — with honesty, integrity, and a commitment to your best interests.' },
];

/* ─── Icon map (SVG stroke paths, viewBox 0 0 24 24) ── */
const iconMap = {
    arrow_forward:              ['M5 12h14', 'M12 5l7 7-7 7'],
    keyboard_arrow_down:        ['M6 9l6 6 6-6'],
    arrow_outward:              ['M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'],
    refresh:                    ['M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'],
    calculate:                  ['M9 7H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 7V5a2 2 0 014 0v2M9 7h6', 'M9 12h6', 'M9 16h4'],
    send:                       ['M22 2L11 13', 'M22 2L15 22 11 13 2 9l20-7z'],
    phone:                      ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
    mail:                       ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    location_on:                ['M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', 'M15 11a3 3 0 11-6 0 3 3 0 016 0z'],
    check_circle:               ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
    real_estate_agent:          ['M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'M9 22V12h6v10'],
    support_agent:              ['M3 18v-6a9 9 0 0118 0v6', 'M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z', 'M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z'],
    location_away:              ['M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'],
    badge:                      ['M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'],
    account_balance:            ['M3 21h18', 'M3 7l9-4 9 4', 'M4 10h16v11H4z', 'M9 10v11M15 10v11'],
    handshake:                  ['M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'],
    contact_page:               ['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
    manage_search:              ['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'],
    celebration:                ['M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'],
    star:                       ['M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'],
    groups:                     ['M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'],
    nest_clock_farsight_analog: ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'],
    productivity:               ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
    card_travel:                ['M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
};

/* ─── Contact form ──────────────────────────────── */
const contactForm    = ref({ name: '', email: '', phone: '', loan_purpose: '', message: '', opt_in_sms: false });
const contactLoading = ref(false);
const contactSuccess = ref(false);
const contactError   = ref('');

const submitContact = async () => {
    contactLoading.value = true;
    contactError.value   = '';
    try {
        await axios.post(route('leads.store'), contactForm.value);
        contactSuccess.value = true;
        contactForm.value    = { name: '', email: '', phone: '', loan_purpose: '', message: '', opt_in_sms: false };
    } catch {
        contactError.value = 'Something went wrong. Please try again or call us directly.';
    } finally {
        contactLoading.value = false;
    }
};
</script>

<template>
    <Head title="Welcome" />

    <GuestNav
        @scroll-our-services-section="scrollTo(ourServices)"
        @scroll-mortgage-loan-calculator-section="scrollTo(mortgageLoanCalculator)"
        @scroll-testimonials-section="scrollTo(testimonials)"
    />

    <!-- ═══════════════════════════════════════
         HERO
    ════════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-center overflow-hidden -mt-24 pt-24 bg-dark">

        <!-- Desktop video background -->
        <div class="hidden lg:block absolute inset-0">
            <video ref="heroVideo" autoplay muted playsinline class="w-full h-full object-cover" style="opacity:0.55; transition:none;">
                <source src="/video/hero-1.mp4" type="video/mp4">
            </video>
            <!-- Oval cutout: left is fully dark, right has an elliptical transparent window -->
            <div class="absolute inset-0" style="background: radial-gradient(ellipse 52% 64% at 76% 50%, transparent 0%, transparent 36%, rgba(20,18,17,0.85) 80%, #141211 88%), linear-gradient(to right, #141211 0%, #141211 38%, rgba(20,18,17,0.12) 62%, transparent 82%);"></div>
        </div>

        <!-- Content -->
        <div class="text-light relative z-10 max-w-6xl mx-auto px-6 lg:px-0 w-full py-24 lg:pb-36 lg:pt-20">
            <div class="max-w-4xl">
                <div class="inline-flex items-center gap-2 border border-light/25 bg-light/5 rounded-lg px-4 py-1.5 text-xs font-semibold text-light mb-8">
                    Louisiana's Trusted Wholesale Mortgage Broker
                </div>
                <h1 class="reveal-title text-6xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight mb-8">
                    The Smarter Way<br>to Own <span class="text-primary">Your Home</span>
                </h1>
                <p class="reveal-title text-lg font-light max-w-lg leading-relaxed mb-12">
                    Expert mortgage guidance for purchases, refinancing, and home equity.
                    Fast closings. Wholesale rates. Exceptional service.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 items-start">
                    <Link :href="route('contact-us.index')">
                        <PrimaryButton class="py-4!">
                            <span>Get Pre-Qualified</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                        </PrimaryButton>
                    </Link>
                    <SecondaryButton @click="scrollTo(mortgageLoanCalculator)" class="py-4! bg-light/5! border-light/10! text-light!">
                        <span>Calculate Payment</span>
                    </SecondaryButton>
                </div>
            </div>

            <!-- Mobile hero image -->
            <div class="lg:hidden mt-12">
                <img src="/img/company-seo-img.jpg" alt="Brignac Mortgage"
                     class="w-full rounded-2xl object-cover object-top max-h-80 border border-light/6">
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="z-20 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce text-light">
            <span class="text-xs tracking-widest uppercase" style="font-size:9px">Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         STATS STRIP — dark
    ════════════════════════════════════════ -->
    <section class="bg-dark border-y border-light/6 py-12">
        <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div v-for="stat in [
                { value: '500+', label: 'Families Helped' },
                { value: '15+',  label: 'Years Experience' },
                { value: '50+',  label: 'Wholesale Lenders' },
                { value: '5.0', label: 'Average Rating' },
            ]" :key="stat.label">
                <p class="text-4xl lg:text-5xl font-bold mb-1 text-light">{{ stat.value }}</p>
                <p class="text-light/35 text-xs uppercase tracking-wider">{{ stat.label }}</p>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         CEO QUOTE — light
    ════════════════════════════════════════ -->
    <section class="bg-white dark:bg-light/4 py-24 overflow-hidden">
        <div class="max-w-5xl mx-auto px-6">

            <!-- Label -->
            <p class="text-dark/35 dark:text-light/30 text-xs font-semibold uppercase tracking-widest mb-10 text-center reveal-title">Our Philosophy</p>

            <!-- Quote card -->
            <div class="relative bg-dark/3 dark:bg-light/5 border border-dark/7 dark:border-light/7 rounded-3xl px-8 py-12 lg:px-16 lg:py-14">

                <!-- Decorative quote mark -->
                <span class="absolute top-6 left-8 text-8xl font-serif leading-none text-primary/20 select-none">&ldquo;</span>

                <div class="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                    <!-- Text side -->
                    <div class="flex-1">
                        <p class="reveal-title text-xl lg:text-2xl font-medium text-dark dark:text-light leading-relaxed mb-4">
                            We believe that life is for living and you should be passionate about what you do.
                        </p>
                        <p class="text-dark/50 dark:text-light/45 text-base leading-relaxed mb-4">
                            We hold our team to a high standard, and we only hire the best!
                        </p>
                        <p class="text-dark/50 dark:text-light/45 text-base leading-relaxed">
                            We look forward to working with you and your family.
                        </p>
                    </div>

                    <!-- Author side -->
                    <div class="shrink-0 flex flex-col items-center lg:items-start gap-5 lg:w-48">
                        <!-- Small photo -->
                        <div class="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/25 shadow-lg shadow-dark/10">
                            <img src="/img/company-seo-img.jpg" alt="Shaun Brignac"
                                 class="w-full h-full object-cover object-top">
                        </div>
                        <div>
                            <p class="font-bold text-dark dark:text-light text-sm">Shaun Brignac, MBA</p>
                            <p class="text-xs text-dark/45 dark:text-light/35 mt-0.5 leading-snug">President &amp; CEO<br>Brignac Mortgage</p>
                        </div>
                        <!-- Social links -->
                        <div class="flex items-center gap-2">
                            <a href="https://www.facebook.com/BrignacMortgage" target="_blank"
                               class="h-8 w-8 rounded-lg border border-dark/10 dark:border-light/8 hover:border-primary/50 flex items-center justify-center text-dark/35 dark:text-light/30 hover:text-primary transition-all duration-200">
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="https://x.com/shaunbrignac" target="_blank"
                               class="h-8 w-8 rounded-lg border border-dark/10 dark:border-light/8 hover:border-primary/50 flex items-center justify-center text-dark/35 dark:text-light/30 hover:text-primary transition-all duration-200">
                                <svg class="w-3 h-3 fill-current" viewBox="0 0 1200 1227"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.694H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/shaunbrignac" target="_blank"
                               class="h-8 w-8 rounded-lg border border-dark/10 dark:border-light/8 hover:border-primary/50 flex items-center justify-center text-dark/35 dark:text-light/30 hover:text-primary transition-all duration-200">
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         OUR SERVICES — sticky scroll
    ════════════════════════════════════════ -->
    <section ref="ourServices" class="bg-light dark:bg-dark flex flex-col lg:flex-row max-w-6xl 2xl:max-w-7xl mx-auto lg:gap-10">
        <!-- Sticky image panel -->
        <div class="w-full lg:w-[40%] lg:sticky lg:top-28 lg:h-screen overflow-hidden order-first">
            <div class="relative h-72 lg:h-[83%] lg:rounded-4xl lg:overflow-hidden">
                <img src="/storage/img/newimg-1.jpg" alt="Our Services"
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-light/10 dark:bg-dark/10"></div>
                <div class="absolute bottom-8 left-8 bg-light dark:bg-dark border border-dark/8 dark:border-light/8 rounded-2xl p-5 max-w-52">
                    <p class="text-dark/50 dark:text-light/50 text-xs uppercase tracking-widest mb-1">Wholesale Access</p>
                    <p class="text-dark dark:text-light font-bold text-xl">50+ Lenders</p>
                    <p class="text-dark/50 dark:text-light/50 text-sm mt-1 font-medium">Best rates guaranteed</p>
                </div>
            </div>
        </div>

        <!-- Scrolling content -->
        <div class="w-full lg:w-[60%] flex flex-col">
            <!-- Section intro -->
            <div class="p-8 lg:py-14 border-b border-dark/20 dark:border-light/20 mb-5">
                <div class="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 rounded-lg px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                    Our Services
                </div>
                <h2 class="reveal-title text-3xl lg:text-5xl font-bold text-dark dark:text-light leading-tight mb-4">
                    Loan Products<br>&amp; Programs
                </h2>
                <p class="text-dark/40 dark:text-light/40 leading-relaxed">
                    We shop 50+ wholesale lenders so you get the best rate without the legwork.
                    Every loan, every scenario — we have a solution.
                </p>
            </div>

            <!-- Service rows -->
            <div v-for="svc in services" :key="svc.label"
                 class="border-b border-dark/10 dark:border-light/10 group hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300 cursor-default rounded-3xl">
                <div class="p-8 lg:p-14 flex gap-6 items-start">
                    <div class="shrink-0 h-12 w-12 rounded-xl border border-dark/8 dark:border-light/8 group-hover:border-primary/35 bg-dark/4 dark:bg-light/4 group-hover:bg-primary/8 flex items-center justify-center transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-dark/35 dark:text-light/35 group-hover:text-primary transition-colors duration-300">
                            <path v-for="d in iconMap[svc.icon]" :key="d" :d="d"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-primary text-xs font-semibold uppercase tracking-widest mb-2">{{ svc.label }}</p>
                        <h3 class="text-dark dark:text-light text-xl font-bold mb-2">{{ svc.title }}</h3>
                        <p class="text-dark/40 dark:text-light/40 text-sm leading-relaxed">{{ svc.desc }}</p>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-dark/10 dark:text-light/10 group-hover:text-primary transition-colors duration-300 self-center shrink-0"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </div>
            </div>

            <!-- CTA row -->
            <div class="p-8 lg:p-14">
                <Link :href="route('programs.index')">
                    <button class="inline-flex items-center gap-2 border border-dark/15 dark:border-light/15 hover:border-primary text-dark/50 dark:text-light/50 hover:text-primary font-semibold px-7 py-3 rounded-lg transition-all duration-200 cursor-pointer">
                        View All Programs
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </button>
                </Link>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         WHAT WE PROVIDE — light
    ════════════════════════════════════════ -->
    <section class="bg-dark py-24">
        <div class="max-w-6xl mx-auto px-6">
            <div class="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <p class="text-light/35 text-xs font-semibold uppercase tracking-widest mb-5 reveal-title">Why Choose Us</p>
                    <h2 class="reveal-title text-4xl lg:text-5xl font-bold text-light leading-tight">What We Provide</h2>
                </div>
                <p class="text-light/40 max-w-xs text-sm leading-relaxed lg:text-right">
                    Everything you need to close with confidence and get the best rate.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="card in [
                    { icon: 'real_estate_agent',          title: 'Excellent Customer Experience',       desc: 'Dedicated to providing the best customer experience in the mortgage industry.' },
                    { icon: 'nest_clock_farsight_analog', title: 'Fast Closing Times',                  desc: 'Our streamlined process ensures you close quickly, without unnecessary delays.' },
                    { icon: 'productivity',               title: 'Open Communication',                  desc: 'Clear, consistent updates from application to closing — no surprises.' },
                    { icon: 'support_agent',              title: 'Free Consulting Services',             desc: 'Expert advice tailored to your specific financial goals and situation.' },
                    { icon: 'location_away',              title: 'Wholesale Lender Access',              desc: 'Exclusive access to 50+ wholesale lenders so you always get the best price.' },
                    { icon: 'card_travel',                title: 'Residential, Investment & Commercial', desc: 'Loan options across residential, investment, and commercial property types.' },
                ]" :key="card.title"
                     class="group bg-light/4 hover:bg-light/7 border border-light/6 hover:border-primary/20 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-dark/5">
                    <div class="h-11 w-11 rounded-xl border border-light/8 group-hover:border-primary/25 bg-light/4 group-hover:bg-primary/8 flex items-center justify-center mb-5 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-light/35 group-hover:text-primary transition-colors duration-300">
                            <path v-for="d in iconMap[card.icon]" :key="d" :d="d"/>
                        </svg>
                    </div>
                    <h3 class="font-bold text-light mb-2 text-sm">{{ card.title }}</h3>
                    <p class="text-light/40 text-xs leading-relaxed">{{ card.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         HOW IT WORKS — sticky scroll
    ════════════════════════════════════════ -->
    <section class="bg-light dark:bg-dark flex flex-col lg:flex-row-reverse lg:gap-10 max-w-6xl 2xl:max-w-7xl mx-auto">
        <!-- Sticky info panel (right on desktop) -->
        <div class="w-full lg:w-[40%] lg:sticky lg:top-10 lg:h-screen overflow-hidden flex items-center">
            <div class="relative h-72 lg:h-[83%] w-full lg:rounded-4xl lg:overflow-hidden">
                <img src="/storage/img/newimg-2.jpg" alt="Our Process"
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-light/10 dark:bg-dark/10"></div>
                <div class="absolute inset-0 flex items-center justify-center px-10 lg:px-14">
                    <div>
                        <div class="inline-flex items-center gap-2 border border-dark/25 dark:border-light/25 bg-dark/5 dark:bg-light/5 rounded-lg px-4 py-1.5 text-xs font-semibold text-dark dark:text-light mb-6">
                            Simple Process
                        </div>
                        <h2 class="text-3xl lg:text-5xl font-bold text-dark dark:text-light leading-tight mb-5">
                            How It<br>Works
                        </h2>
                        <p class="text-dark/40 dark:text-light/40 text-lg leading-relaxed max-w-sm">
                            From your first inquiry to closing day, we keep every step clear, fast, and stress-free.
                        </p>
                        <div class="mt-8">
                            <Link :href="route('contact-us.index')">
                                <PrimaryButton>
                                    <span>Start Today</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scrolling steps -->
        <div class="w-full lg:w-[60%] flex flex-col">
            <!-- Intro spacer on desktop -->
            <div class="hidden lg:block lg:h-24 border-b border-dark/6 dark:border-light/6"></div>

            <div v-for="(step, i) in processSteps" :key="step.step"
                 class="border-b border-dark/6 dark:border-light/6 group hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300 rounded-3xl">
                <div class="p-8 lg:p-14 flex gap-6 items-start">
                    <div class="shrink-0 flex flex-col items-center gap-3">
                        <span class="text-primary font-bold text-xs tracking-widest">{{ step.step }}</span>
                        <div class="h-11 w-11 rounded-xl border border-dark/8 dark:border-light/8 group-hover:border-primary/35 bg-dark/4 dark:bg-light/4 group-hover:bg-primary/8 flex items-center justify-center transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-dark/35 dark:text-light/35 group-hover:text-primary transition-colors duration-300">
                                <path v-for="d in iconMap[step.icon]" :key="d" :d="d"/>
                            </svg>
                        </div>
                        <div v-if="i < processSteps.length - 1" class="w-px h-8 bg-dark/8 dark:bg-light/8"></div>
                    </div>
                    <div class="flex-1 pt-1">
                        <h3 class="text-dark dark:text-light text-xl font-bold mb-2">{{ step.title }}</h3>
                        <p class="text-dark/40 dark:text-light/40 text-sm leading-relaxed">{{ step.desc }}</p>
                    </div>
                </div>
            </div>

            <div class="hidden lg:block lg:h-24 border-b border-dark/6 dark:border-light/6"></div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         MORTGAGE CALCULATOR — dark
    ════════════════════════════════════════ -->
    <section ref="mortgageLoanCalculator" class="bg-dark py-24">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-12">
                <div class="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 rounded-lg px-4 py-1.5 text-xs font-semibold text-primary mb-5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M9 7H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 7V5a2 2 0 014 0v2M9 7h6"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>
                    Payment Simulator
                </div>
                <h2 class="reveal-title text-4xl lg:text-5xl font-bold text-light mb-3">Mortgage Calculator</h2>
                <p class="text-light/35 text-sm">
                    Avg U.S. rates from
                    <a href="https://fred.stlouisfed.org/series/MORTGAGE30US/" target="_blank" class="text-primary hover:underline">fred.stlouisfed.org</a>
                    &amp;
                    <a href="https://www.bankrate.com/mortgages/mortgage-rates/" target="_blank" class="text-primary hover:underline">bankrate.com</a>
                </p>
            </div>

            <!-- Inputs -->
            <div class="bg-light/4 border border-light/7 rounded-2xl p-7 lg:p-10">

                <!-- Row 1: Property Value + Loan Amount -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label class="calc-label">Property Value ($)</label>
                        <input v-model="propertyValue" type="number" min="0" placeholder="350000" class="calc-input">
                    </div>
                    <div>
                        <label class="calc-label">Loan Amount ($)</label>
                        <input v-model="loanNeeded" type="number" min="1" placeholder="280000" class="calc-input">
                    </div>
                </div>

                <!-- Row 2: Loan Term + LTV indicator -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                    <div>
                        <label class="calc-label">Loan Term</label>
                        <select v-model="creditTerm" class="calc-input">
                            <option value="" disabled>Select term</option>
                            <option v-for="y in plazoOptions" :key="y" :value="y">{{ y }} years</option>
                        </select>
                    </div>
                    <div class="flex flex-col justify-center bg-light/3 border border-light/6 rounded-xl px-5 py-3">
                        <template v-if="ltv">
                            <div class="flex items-center justify-between mb-2">
                                <span class="calc-label mb-0">Loan-to-Value</span>
                                <span :class="parseFloat(ltv) > 80 ? 'text-orange-400' : 'text-emerald-400'" class="text-xs font-bold">{{ ltv }}%</span>
                            </div>
                            <div class="w-full h-1.5 rounded-full bg-light/10 overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-500"
                                     :class="parseFloat(ltv) > 80 ? 'bg-orange-400' : 'bg-emerald-400'"
                                     :style="{ width: ltv + '%' }"></div>
                            </div>
                            <p v-if="downPayment" class="text-light/30 text-xs mt-1.5">Down payment: ${{ downPayment }}</p>
                        </template>
                        <template v-else>
                            <span class="text-light/20 text-xs">Enter property &amp; loan values to see LTV</span>
                        </template>
                    </div>
                </div>

                <!-- Rate slider -->
                <div class="mb-8">
                    <div class="flex items-center justify-between mb-3">
                        <label class="calc-label mb-0">Interest Rate</label>
                        <span class="text-primary font-bold text-sm">
                            {{ interestRate.toFixed(2) }}% / yr &mdash; {{ (interestRate / 12).toFixed(3) }}% / mo
                        </span>
                    </div>
                    <input v-model="interestRate" type="range" min="3.5" max="10" step="0.01"
                           class="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary">
                    <div class="flex justify-between text-light/25 text-xs mt-2">
                        <span>3.50%</span><span>Avg ≈ 6.91%</span><span>10.00%</span>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button @click="onSubmitCalc"
                            :disabled="!canCalculate"
                            class="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-35 disabled:cursor-not-allowed text-dark font-bold px-10 py-3.5 rounded-lg transition-all duration-200 cursor-pointer">
                        <svg v-if="loadingCalc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 animate-spin"><path d="M12 3C7.03 3 3 7.03 3 12"/></svg>
                        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M9 7H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 7V5a2 2 0 014 0v2M9 7h6"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>
                        {{ loadingCalc ? 'Calculating…' : 'Calculate Payment' }}
                    </button>
                </div>
            </div>

            <!-- Results -->
            <Transition name="slide-up">
                <div v-if="showResults" class="mt-5 bg-light dark:bg-dark/60 border border-transparent dark:border-light/8 rounded-2xl text-dark dark:text-light p-7 lg:p-10">
                    <div class="flex items-center justify-between mb-7">
                        <h3 class="font-bold text-dark dark:text-light text-lg">Calculation Results</h3>
                        <button @click="resetCalc"
                                class="flex items-center gap-1 text-xs text-dark/40 dark:text-light/40 hover:text-primary transition-colors cursor-pointer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Reset
                        </button>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="bg-primary/10 border border-primary/12 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 dark:text-light/40 mb-1">Monthly Payment</p>
                            <p class="text-2xl font-bold text-primary">${{ monthlyPayment }}</p>
                        </div>
                        <div class="bg-dark/4 dark:bg-light/6 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 dark:text-light/40 mb-1">Loan Term</p>
                            <p class="text-2xl font-bold text-dark dark:text-light">{{ creditTerm }} yrs</p>
                        </div>
                        <div class="bg-dark/4 dark:bg-light/6 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 dark:text-light/40 mb-1">Loan Amount</p>
                            <p class="text-2xl font-bold text-dark dark:text-light">${{ formatPrice(loanNeeded) }}</p>
                        </div>
                        <div class="bg-dark/4 dark:bg-light/6 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 dark:text-light/40 mb-1">Interest Rate</p>
                            <p class="text-2xl font-bold text-dark dark:text-light">{{ interestRate.toFixed(2) }}%</p>
                        </div>
                    </div>
                    <div class="overflow-x-auto rounded-xl border border-dark/6 dark:border-light/8">
                        <table class="w-full text-sm">
                            <thead class="bg-dark/5 dark:bg-light/6 text-dark/50 dark:text-light/50 text-xs uppercase tracking-wider font-semibold">
                                <tr>
                                    <th class="px-4 py-3 text-left">Month</th>
                                    <th class="px-4 py-3 text-right">Principal</th>
                                    <th class="px-4 py-3 text-right">Interest</th>
                                    <th class="px-4 py-3 text-right">Payment</th>
                                    <th class="px-4 py-3 text-right">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in paymentDetails.slice(0, 12)" :key="row.month"
                                    class="border-t border-dark/4 dark:border-light/6 hover:bg-primary/3 dark:hover:bg-primary/5 transition-colors">
                                    <td class="px-4 py-2.5 font-medium text-dark dark:text-light">{{ row.month }}</td>
                                    <td class="px-4 py-2.5 text-right text-dark dark:text-light">${{ row.principalPayment }}</td>
                                    <td class="px-4 py-2.5 text-right text-dark dark:text-light">${{ row.interestPayment }}</td>
                                    <td class="px-4 py-2.5 text-right font-semibold text-primary">${{ row.monthlyPayment }}</td>
                                    <td class="px-4 py-2.5 text-right text-dark/40 dark:text-light/40">${{ row.remainingBalance }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="text-center text-xs text-dark/30 dark:text-light/30 py-3 border-t border-dark/4 dark:border-light/6">
                            First 12 of {{ paymentDetails.length }} total payments
                        </p>
                    </div>
                </div>
            </Transition>
        </div>
    </section>


    <!-- ═══════════════════════════════════════
         GOOGLE TESTIMONIALS — dark
    ════════════════════════════════════════ -->
    <section ref="testimonials" class="bg-dark py-24">
        <div class="max-w-6xl mx-auto px-6">
            <!-- Header -->
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                <div>
                    <div class="flex items-center gap-2 mb-5">
                        <!-- Google G icon -->
                        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span class="text-light/40 text-xs font-semibold uppercase tracking-widest">Google Reviews</span>
                    </div>
                    <h2 class="reveal-title text-4xl lg:text-5xl font-bold text-light leading-tight">
                        What Our Clients<br>Are Saying
                    </h2>
                </div>
                <div class="flex items-center gap-5">
                    <div>
                        <div class="flex items-center gap-1 mb-1">
                            <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <p class="text-light text-sm font-bold">5.0 / 5.0</p>
                        <p class="text-light/30 text-xs">{{ testimonialList.length }} verified reviews</p>
                    </div>
                    <a href="https://www.google.com/maps/search/Brignac+Mortgage" target="_blank"
                       class="inline-flex items-center gap-2 border border-light/10 hover:border-primary/40 text-light/40 hover:text-primary px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200">
                        All Reviews
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                </div>
            </div>

            <!-- Bento grid — shows 5 initially -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(t, i) in (googleShowAll ? testimonialList : testimonialList.slice(0, 5))" :key="t.name"
                     :class="{ 'lg:col-span-2': i === 0 }"
                     class="group bg-light/4 hover:bg-light/7 border border-light/6 hover:border-primary/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                     @click="activeTestimonial = t">
                    <!-- Google stars -->
                    <div class="flex items-center justify-between">
                        <div class="flex gap-0.5">
                            <svg v-for="n in t.rating" :key="n" class="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-50" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    </div>
                    <!-- Quote -->
                    <p class="text-light/60 text-sm leading-relaxed flex-1"
                       :class="i === 0 ? 'lg:text-base text-light/70' : ''">
                        "{{ t.content.length > 180 ? t.content.slice(0, 180) + '…' : t.content }}"
                    </p>
                    <!-- Author -->
                    <div class="flex items-center gap-3 pt-4 border-t border-light/6">
                        <img :src="t.avatar" :alt="t.name"
                             class="h-9 w-9 rounded-lg object-cover shrink-0 border border-light/8">
                        <div class="flex-1 min-w-0">
                            <p class="text-light text-sm font-semibold truncate">{{ t.name }}</p>
                            <p class="text-light/28 text-xs">{{ t.date }} · Google</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Load More -->
            <div v-if="!googleShowAll" class="mt-10 flex justify-center">
                <button @click="googleShowAll = true"
                        class="inline-flex items-center gap-2 border border-light/12 hover:border-primary/40 text-light/45 hover:text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-200 cursor-pointer">
                    <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Load More Reviews ({{ testimonialList.length - 5 }} more)
                </button>
            </div>
        </div>

        <!-- Divider -->
        <div class="max-w-6xl mx-auto px-6 mt-20 mb-20">
            <div class="h-px bg-light/8"></div>
        </div>

        <!-- Facebook Reviews -->
        <div class="max-w-6xl mx-auto px-6">
            <!-- Header -->
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                <div>
                    <div class="flex items-center gap-2 mb-5">
                        <!-- Facebook icon -->
                        <svg class="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        <span class="text-light/40 text-xs font-semibold uppercase tracking-widest">Facebook Reviews</span>
                    </div>
                    <h2 class="reveal-title text-4xl lg:text-5xl font-bold text-light leading-tight">
                        Heard From Our<br>Community
                    </h2>
                </div>
                <div class="flex items-center gap-5">
                    <div>
                        <div class="flex items-center gap-1 mb-1">
                            <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-primary" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <p class="text-light text-sm font-bold">5.0 / 5.0</p>
                        <p class="text-light/30 text-xs">{{ testimonialList.length }} Facebook reviews</p>
                    </div>
                    <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank"
                       class="inline-flex items-center gap-2 border border-light/10 hover:border-primary/40 text-light/40 hover:text-primary px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200">
                        All Reviews
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                </div>
            </div>

            <!-- Grid — shows 5 initially -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(t, i) in (fbShowAll ? testimonialList : testimonialList.slice(0, 5))" :key="'fb-' + t.name"
                    :class="{ 'lg:col-span-2': i === 1 }"
                     class="group bg-light/4 hover:bg-light/7 border border-light/6 hover:border-[#1877F2]/30 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                     @click="activeTestimonial = t">
                    <!-- Stars + Facebook icon -->
                    <div class="flex items-center justify-between">
                        <div class="flex gap-0.5">
                            <svg v-for="n in t.rating" :key="n" class="w-3 h-3 fill-primary" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <svg class="w-4 h-4 fill-[#1877F2] opacity-60" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <!-- Quote -->
                    <p class="text-light/60 text-sm leading-relaxed flex-1">
                        "{{ t.content.length > 180 ? t.content.slice(0, 180) + '…' : t.content }}"
                    </p>
                    <!-- Author -->
                    <div class="flex items-center gap-3 pt-4 border-t border-light/6">
                        <img :src="t.avatar" :alt="t.name"
                             class="h-9 w-9 rounded-lg object-cover shrink-0 border border-light/8">
                        <div class="flex-1 min-w-0">
                            <p class="text-light text-sm font-semibold truncate">{{ t.name }}</p>
                            <p class="text-light/28 text-xs">{{ t.date }} · Facebook</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Load More -->
            <div v-if="!fbShowAll" class="mt-10 flex justify-center">
                <button @click="fbShowAll = true"
                        class="inline-flex items-center gap-2 border border-light/12 hover:border-[#1877F2]/50 text-light/45 hover:text-[#1877F2] font-semibold px-8 py-3 rounded-lg transition-all duration-200 cursor-pointer">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Load More Reviews ({{ testimonialList.length - 5 }} more)
                </button>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         CONTACT FORM
    ════════════════════════════════════════ -->
    <section class="bg-white dark:bg-dark py-24">
        <div class="max-w-6xl mx-auto px-6">

            <!-- Section header -->
            <div class="text-center mb-14">
                <div class="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 rounded-lg px-4 py-1.5 text-xs font-semibold text-primary mb-5">
                    Free Consultation
                </div>
                <h2 class="reveal-title text-4xl lg:text-5xl font-bold text-dark dark:text-light leading-tight mb-4">
                    Let's Talk Mortgages
                </h2>
                <p class="text-dark/40 dark:text-light/35 text-sm max-w-sm mx-auto leading-relaxed">
                    No obligation, no pressure. Fill in your details and we'll reach out within one business day.
                </p>
            </div>

            <!-- Card -->
            <div class="border border-dark/10 dark:border-light/8 rounded-3xl overflow-hidden grid lg:grid-cols-5">

                <!-- ── Left panel ─────────────────── -->
                <div class="lg:col-span-2 bg-dark/3 dark:bg-light/3 border-b lg:border-b-0 lg:border-r border-dark/10 dark:border-light/8 p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                        <!-- Photo -->
                        <div class="w-16 h-16 rounded-2xl overflow-hidden mb-7 border border-dark/10 dark:border-light/10">
                            <img src="/img/company-seo-img.jpg" alt="Shaun Brignac"
                                 class="w-full h-full object-cover object-top">
                        </div>
                        <h3 class="text-dark dark:text-light font-bold text-lg mb-1">Shaun Brignac, MBA</h3>
                        <p class="text-dark/40 dark:text-light/35 text-xs mb-8">President &amp; CEO · NMLS #1928157</p>

                        <!-- Contact links -->
                        <div class="flex flex-col gap-4">
                            <a href="tel:+15045592821"
                               class="flex items-center gap-3 group">
                                <div class="h-9 w-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/18 transition-colors duration-200">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                </div>
                                <span class="text-dark/55 dark:text-light/50 text-sm group-hover:text-primary transition-colors duration-200">+1 504-559-2821</span>
                            </a>
                            <a href="mailto:Shaun@brignacmortgage.com"
                               class="flex items-center gap-3 group">
                                <div class="h-9 w-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/18 transition-colors duration-200">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                </div>
                                <span class="text-dark/55 dark:text-light/50 text-sm group-hover:text-primary transition-colors duration-200">Shaun@brignacmortgage.com</span>
                            </a>
                            <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank"
                               class="flex items-start gap-3 group">
                                <div class="h-9 w-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/18 transition-colors duration-200">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                </div>
                                <span class="text-dark/55 dark:text-light/50 text-sm group-hover:text-primary transition-colors duration-200 leading-relaxed">21121 Waterfront East Dr<br>Maurepas, LA 70449</span>
                            </a>
                        </div>
                    </div>

                    <!-- Trust bar -->
                    <div class="mt-10 pt-8 border-t border-dark/10 dark:border-light/8">
                        <div class="flex gap-0.5 mb-2">
                            <svg v-for="n in 5" :key="n" class="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <p class="text-dark/35 dark:text-light/25 text-xs leading-relaxed">500+ families helped · Licensed in Louisiana</p>
                    </div>
                </div>

                <!-- ── Right form ──────────────────── -->
                <div class="lg:col-span-3 p-10 lg:p-12">

                    <!-- Success state -->
                    <Transition name="fade">
                        <div v-if="contactSuccess"
                             class="h-full flex flex-col items-center justify-center text-center py-16">
                            <div class="h-16 w-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-5">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-secondary"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <h3 class="text-dark dark:text-light font-bold text-xl mb-2">Message Sent!</h3>
                            <p class="text-dark/45 dark:text-light/40 text-sm max-w-xs">
                                Thanks for reaching out. We'll be in touch within one business day.
                            </p>
                        </div>
                    </Transition>

                    <!-- Form -->
                    <form v-if="!contactSuccess" @submit.prevent="submitContact"
                          class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="contact-label">Full Name</label>
                            <input v-model="contactForm.name" type="text" required placeholder="John Smith" class="contact-input">
                        </div>
                        <div>
                            <label class="contact-label">Email Address</label>
                            <input v-model="contactForm.email" type="email" required placeholder="john@example.com" class="contact-input">
                        </div>
                        <div>
                            <label class="contact-label">Phone Number</label>
                            <input v-model="contactForm.phone" type="tel" placeholder="+1 (504) 000-0000" class="contact-input">
                        </div>
                        <div>
                            <label class="contact-label">Loan Purpose</label>
                            <select v-model="contactForm.loan_purpose" class="contact-input">
                                <option value="" disabled selected>Select purpose</option>
                                <option value="purchase">Home Purchase</option>
                                <option value="refinance">Refinance</option>
                                <option value="heloc">HELOC / Home Equity</option>
                                <option value="investment">Investment Property</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="contact-label">Message (Optional)</label>
                            <textarea v-model="contactForm.message" rows="4" placeholder="Tell us a little about your situation…" class="contact-input resize-none"></textarea>
                        </div>
                        <div class="md:col-span-2 flex items-start gap-3">
                            <input v-model="contactForm.opt_in_sms" type="checkbox" id="sms-opt-in"
                                   class="mt-0.5 h-4 w-4 accent-primary shrink-0 cursor-pointer">
                            <label for="sms-opt-in" class="text-xs text-dark/40 dark:text-light/30 leading-relaxed cursor-pointer">
                                I agree to receive SMS text messages from Brignac Mortgage. Reply STOP to unsubscribe.
                            </label>
                        </div>
                        <div class="md:col-span-2">
                            <p v-if="contactError" class="text-red-500 dark:text-red-400 text-sm mb-3">{{ contactError }}</p>
                            <PrimaryButton type="submit" :disabled="contactLoading" class="w-full! py-3.5!">
                                <svg v-if="contactLoading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 animate-spin"><path d="M12 3C7.03 3 3 7.03 3 12"/></svg>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                                {{ contactLoading ? 'Sending…' : 'Send Message' }}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         CTA — solid dark
    ════════════════════════════════════════ -->
    <section class="py-32">
        <div class="max-w-4xl mx-auto px-6 text-center bg-primary py-24 rounded-4xl">
            <h2 class="reveal-title text-4xl lg:text-5xl font-bold text-light mb-5">Ready to Get Started?</h2>
            <p class="text-light/80 text-lg mb-10 max-w-xl mx-auto">
                Talk to our team today and find the mortgage solution that's right for you and your family.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Link :href="route('contact-us.index')">
                    <PrimaryButton class="bg-light! text-dark! py-4!">
                        Get Pre-Qualified Today
                    </PrimaryButton>
                </Link>
                <a href="tel:+15045592821">
                    <SecondaryButton class="py-4! bg-light/10! text-light! border-neutral-200!">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        (504) 559 2821
                    </SecondaryButton>
                </a>
            </div>
        </div>
    </section>

    <Footer />

    <!-- ═══════════════════════════════════════
         TESTIMONIAL MODAL
    ════════════════════════════════════════ -->
    <Transition name="fade">
        <div v-if="activeTestimonial"
             class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
             @click.self="activeTestimonial = null">
            <div class="bg-dark border border-light/8 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate__animated animate__fadeInUp animate__faster">
                <div class="flex items-start justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <img :src="activeTestimonial.avatar" :alt="activeTestimonial.name"
                             class="h-12 w-12 rounded-xl object-cover border border-light/8">
                        <div>
                            <p class="font-bold text-light">{{ activeTestimonial.name }}</p>
                            <p class="text-xs text-light/30">{{ activeTestimonial.date }} · Google Review</p>
                        </div>
                    </div>
                    <button @click="activeTestimonial = null"
                            class="text-light/25 hover:text-light transition-colors cursor-pointer">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="flex gap-0.5 mb-5">
                    <svg v-for="n in activeTestimonial.rating" :key="n" class="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-light/65 leading-relaxed">"{{ activeTestimonial.content }}"</p>
            </div>
        </div>
    </Transition>

</template>

<style scoped>
/* Scroll-reveal titles */
.reveal-title {
    opacity: 0.25;
    transform: translateX(-10px);
    transition: opacity 0.65s ease, transform 0.65s ease;
}
.reveal-title.is-visible {
    opacity: 1;
    transform: translateX(0);
}

/* Calculator */
.calc-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(240, 238, 232, 0.40);
    margin-bottom: 0.5rem;
}
.calc-input {
    width: 100%;
    background: rgba(240, 238, 232, 0.04);
    border: 1px solid rgba(240, 238, 232, 0.09);
    border-radius: 0.75rem;
    padding: 0.7rem 1rem;
    color: #F0EEE8;
    font-size: 0.875rem;
    transition: border-color 0.2s;
}
.calc-input::placeholder { color: rgba(240, 238, 232, 0.22); }
.calc-input:focus { border-color: #E37A52; }
.calc-input option { background: #1C1A18; color: #F0EEE8; }

/* Contact form */
.contact-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(20, 18, 17, 0.45);
    margin-bottom: 0.5rem;
}
:where(.dark, .dark *) .contact-label { color: rgba(240, 238, 232, 0.35); }

.contact-input {
    width: 100%;
    background: rgba(20, 18, 17, 0.03);
    border: 1px solid rgba(20, 18, 17, 0.10);
    border-radius: 0.75rem;
    padding: 0.7rem 1rem;
    color: #141211;
    font-size: 0.875rem;
    transition: border-color 0.2s;
}
:where(.dark, .dark *) .contact-input {
    background: rgba(240, 238, 232, 0.04);
    border-color: rgba(240, 238, 232, 0.09);
    color: #F0EEE8;
}
.contact-input::placeholder { color: rgba(20, 18, 17, 0.30); }
:where(.dark, .dark *) .contact-input::placeholder { color: rgba(240, 238, 232, 0.22); }
.contact-input:focus { border-color: #E37A52; }
.contact-input option { background: #fff; color: #141211; }
:where(.dark, .dark *) .contact-input option { background: #1C1A18; color: #F0EEE8; }

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(14px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
