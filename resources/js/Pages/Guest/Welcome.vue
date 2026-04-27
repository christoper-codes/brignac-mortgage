<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import Footer from '@/Components/Footer.vue';
import usePriceFormat from '@/composables/priceFormat';

const { formatPrice } = usePriceFormat();

/* ─── Scroll refs ─────────────────────────────── */
const ourServices            = ref(null);
const mortgageLoanCalculator = ref(null);
const testimonials           = ref(null);

const scrollTo = (el, offset = 90) => {
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll-our-services-section',             () => scrollTo(ourServices.value));
    window.addEventListener('scroll-mortgage-loan-calculator-section', () => scrollTo(mortgageLoanCalculator.value));
    window.addEventListener('scroll-testimonials-section',             () => scrollTo(testimonials.value));
});
onUnmounted(() => {
    window.removeEventListener('scroll-our-services-section',             () => {});
    window.removeEventListener('scroll-mortgage-loan-calculator-section', () => {});
    window.removeEventListener('scroll-testimonials-section',             () => {});
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
    if (!loanNeeded.value || !creditTerm.value) return;
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

/* ─── Sticky services data ─────────────────────── */
const services = [
    { icon: 'real_estate_agent', label: 'FHA & Conventional', title: 'Purchase Your Dream Home',    desc: 'From FHA with 3.5% down to conventional with competitive rates — we find the right program for your situation and budget.' },
    { icon: 'military_tech',     label: 'VA & USDA',          title: 'Zero Down Payment Options',   desc: 'Eligible veterans and rural buyers can own a home with $0 down. We handle the paperwork so you focus on moving in.' },
    { icon: 'autorenew',         label: 'Refinance',           title: 'Lower Your Rate Today',       desc: 'Rate & term, cash-out, or streamline refinance — we shop wholesale lenders to get you the sharpest rate available.' },
    { icon: 'home_work',         label: 'Home Equity',         title: 'Tap Into Your Equity',        desc: 'HELOCs and home equity loans that put your property value to work for renovations, debt payoff, or major purchases.' },
];
</script>

<template>
    <Head title="Welcome" />

    <GuestNav
        @scroll-our-services-section="scrollTo(ourServices)"
        @scroll-mortgage-loan-calculator-section="scrollTo(mortgageLoanCalculator)"
        @scroll-testimonials-section="scrollTo(testimonials)"
    />

    <!-- ═══════════════════════════════════════
         HERO — dark
    ════════════════════════════════════════ -->
    <section class="relative min-h-screen bg-dark flex items-center overflow-hidden -mt-24 pt-24">
        <!-- Ambient gradient orbs -->
        <div class="absolute -top-20 -left-40 w-120 h-120 bg-primary/12 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 -right-40 w-120 h-120 bg-secondary/8 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 lg:py-36">
            <div class="max-w-4xl">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 border border-primary/30 bg-primary/8 rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-10">
                    <span class="material-symbols-outlined" style="font-size:13px">verified</span>
                    Louisiana's #1 Wholesale Mortgage Broker
                </div>

                <!-- Heading -->
                <h1 class="text-6xl md:text-7xl lg:text-9xl font-bold leading-none tracking-tight text-light mb-10">
                    Your Path<br>
                    to <em class="not-italic text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Home</em>
                </h1>

                <p class="text-light/50 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
                    Expert mortgage guidance for purchases, refinancing, and home equity.
                    Fast closings. Wholesale rates. Exceptional service.
                </p>

                <!-- CTAs — border style preserved -->
                <div class="flex flex-col sm:flex-row gap-4 items-start">
                    <Link :href="route('contact-us.index')">
                        <button class="bg-primary hover:bg-primary/90 text-dark font-bold px-9 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer">
                            Get Pre-Qualified
                            <span class="material-symbols-outlined align-middle ml-1" style="font-size:18px">arrow_forward</span>
                        </button>
                    </Link>
                    <button @click="scrollTo(mortgageLoanCalculator)"
                            class="border border-light/20 hover:border-light/50 text-light/70 hover:text-light font-semibold px-9 py-4 rounded-full text-base transition-all duration-300 hover:bg-light/5 cursor-pointer">
                        Calculate Payment
                        <span class="material-symbols-outlined align-middle ml-1" style="font-size:18px">calculate</span>
                    </button>
                </div>

                <!-- Trust badges -->
                <div class="flex flex-wrap items-center gap-6 mt-16 text-xs text-light/35 uppercase tracking-widest">
                    <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary" style="font-size:16px">verified_user</span>
                        Licensed &amp; Insured
                    </span>
                    <span class="w-px h-3 bg-light/10"></span>
                    <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary" style="font-size:16px">speed</span>
                        Fast Closings
                    </span>
                    <span class="w-px h-3 bg-light/10"></span>
                    <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary" style="font-size:16px">thumb_up</span>
                        5-Star Rated
                    </span>
                    <span class="w-px h-3 bg-light/10"></span>
                    <span class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary" style="font-size:16px">support_agent</span>
                        Free Consultation
                    </span>
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-light/20 animate-bounce">
            <span class="text-xs tracking-widest uppercase" style="font-size:9px">Scroll</span>
            <span class="material-symbols-outlined" style="font-size:18px">keyboard_arrow_down</span>
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
                { value: '5.0★', label: 'Average Rating' },
            ]" :key="stat.label">
                <p class="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mb-1">
                    {{ stat.value }}
                </p>
                <p class="text-light/35 text-xs uppercase tracking-wider">{{ stat.label }}</p>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         CEO QUOTE — light
    ════════════════════════════════════════ -->
    <section class="bg-light py-24">
        <div class="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <!-- Photo -->
            <div class="shrink-0">
                <div class="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden relative">
                    <img src="/img/company-seo-img.jpg" alt="Shaun Brignac"
                         class="w-full h-full object-cover object-top">
                </div>
            </div>
            <!-- Quote -->
            <div class="flex-1">
                <p class="text-dark/35 text-xs font-semibold uppercase tracking-widest mb-7">Our Philosophy</p>
                <blockquote class="text-3xl lg:text-4xl font-bold text-dark leading-tight mb-8">
                    "We believe that life is for living and you should be passionate about what you do."
                </blockquote>
                <div class="h-px bg-dark/10 mb-6"></div>
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p class="font-bold text-dark">Shaun Brignac, MBA</p>
                        <p class="text-sm text-dark/45">President &amp; CEO — Brignac Mortgage</p>
                    </div>
                    <!-- Social icons -->
                    <div class="flex items-center gap-2">
                        <a href="https://www.facebook.com/BrignacMortgage" target="_blank"
                           class="h-9 w-9 rounded-lg border border-dark/10 hover:border-primary/50 hover:bg-primary/8 flex items-center justify-center text-dark/35 hover:text-primary transition-all duration-200">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="https://x.com/shaunbrignac" target="_blank"
                           class="h-9 w-9 rounded-lg border border-dark/10 hover:border-primary/50 hover:bg-primary/8 flex items-center justify-center text-dark/35 hover:text-primary transition-all duration-200">
                            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 1200 1227"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.694H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
                        </a>
                        <a href="https://www.instagram.com/shaunbrignac" target="_blank"
                           class="h-9 w-9 rounded-lg border border-dark/10 hover:border-primary/50 hover:bg-primary/8 flex items-center justify-center text-dark/35 hover:text-primary transition-all duration-200">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         SERVICES — sticky scroll (dark)
    ════════════════════════════════════════ -->
    <section ref="ourServices" class="bg-dark flex flex-col lg:flex-row">
        <!-- Sticky image -->
        <div class="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen overflow-hidden order-first">
            <div class="relative h-72 lg:h-full">
                <img src="/storage/img/header-5.jpg" alt="Services"
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-linear-to-r from-dark/50 via-dark/10 to-transparent"></div>
                <!-- Floating stat card -->
                <div class="absolute bottom-8 left-8 bg-dark/85 backdrop-blur-md border border-light/8 rounded-2xl p-5 max-w-48">
                    <p class="text-light/35 text-xs uppercase tracking-widest mb-1">Wholesale Access</p>
                    <p class="text-light font-bold text-xl">50+ Lenders</p>
                    <p class="text-secondary text-sm mt-1 font-medium">Best rates guaranteed</p>
                </div>
            </div>
        </div>

        <!-- Scrolling content -->
        <div class="w-full lg:w-1/2 flex flex-col">
            <!-- Section intro -->
            <div class="p-8 lg:p-14 border-b border-light/6">
                <div class="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                    Our Services
                </div>
                <h2 class="text-3xl lg:text-5xl font-bold text-light leading-tight mb-4">
                    Loan Products<br>&amp; Programs
                </h2>
                <p class="text-light/40 leading-relaxed">
                    We shop 50+ wholesale lenders so you get the best rate without the legwork.
                    Every loan, every scenario — we have a solution.
                </p>
            </div>

            <!-- Service rows -->
            <div v-for="svc in services" :key="svc.label"
                 class="border-b border-light/6 group hover:bg-light/3 transition-colors duration-300 cursor-default">
                <div class="p-8 lg:p-14 flex gap-6 items-start">
                    <div class="shrink-0 h-12 w-12 rounded-xl border border-light/8 group-hover:border-primary/35 bg-light/4 group-hover:bg-primary/8 flex items-center justify-center transition-all duration-300">
                        <span class="material-symbols-outlined text-light/35 group-hover:text-primary transition-colors duration-300" style="font-size:22px">{{ svc.icon }}</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-primary text-xs font-semibold uppercase tracking-widest mb-2">{{ svc.label }}</p>
                        <h3 class="text-light text-xl font-bold mb-2">{{ svc.title }}</h3>
                        <p class="text-light/40 text-sm leading-relaxed">{{ svc.desc }}</p>
                    </div>
                    <span class="material-symbols-outlined text-light/10 group-hover:text-primary/35 transition-colors duration-300 self-center shrink-0" style="font-size:24px">arrow_forward</span>
                </div>
            </div>

            <!-- CTA row -->
            <div class="p-8 lg:p-14">
                <Link :href="route('programs.index')">
                    <button class="inline-flex items-center gap-2 border border-light/15 hover:border-primary text-light/50 hover:text-primary font-semibold px-7 py-3 rounded-full transition-all duration-200 cursor-pointer">
                        View All Programs
                        <span class="material-symbols-outlined" style="font-size:17px">arrow_outward</span>
                    </button>
                </Link>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         WHAT WE PROVIDE — light
    ════════════════════════════════════════ -->
    <section class="bg-light py-24">
        <div class="max-w-7xl mx-auto px-6">
            <div class="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <p class="text-dark/35 text-xs font-semibold uppercase tracking-widest mb-5">Why Choose Us</p>
                    <h2 class="text-4xl lg:text-5xl font-bold text-dark leading-tight">What We Provide</h2>
                </div>
                <p class="text-dark/40 max-w-xs text-sm leading-relaxed lg:text-right">
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
                     class="group bg-white/50 hover:bg-white border border-dark/6 hover:border-dark/10 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-dark/5">
                    <div class="h-11 w-11 rounded-xl border border-dark/6 group-hover:border-primary/25 bg-dark/4 group-hover:bg-primary/8 flex items-center justify-center mb-5 transition-all duration-300">
                        <span class="material-symbols-outlined text-dark/35 group-hover:text-primary transition-colors duration-300" style="font-size:20px">{{ card.icon }}</span>
                    </div>
                    <h3 class="font-bold text-dark mb-2 text-sm">{{ card.title }}</h3>
                    <p class="text-dark/40 text-xs leading-relaxed">{{ card.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         MORTGAGE CALCULATOR — dark
    ════════════════════════════════════════ -->
    <section ref="mortgageLoanCalculator" class="bg-dark py-24 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/6 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-5xl mx-auto px-6">
            <div class="text-center mb-12">
                <div class="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-5">
                    <span class="material-symbols-outlined" style="font-size:13px">calculate</span>
                    Payment Simulator
                </div>
                <h2 class="text-4xl lg:text-5xl font-bold text-light mb-3">
                    Mortgage <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Calculator</span>
                </h2>
                <p class="text-light/35 text-sm">
                    Avg U.S. rates from
                    <a href="https://fred.stlouisfed.org/series/MORTGAGE30US/" target="_blank" class="text-primary hover:underline">fred.stlouisfed.org</a>
                    &amp;
                    <a href="https://www.bankrate.com/mortgages/mortgage-rates/" target="_blank" class="text-primary hover:underline">bankrate.com</a>
                </p>
            </div>

            <!-- Inputs -->
            <div class="bg-light/4 border border-light/7 rounded-2xl p-7 lg:p-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
                    <div>
                        <label class="calc-label">Property Value ($)</label>
                        <input v-model="propertyValue" type="number" placeholder="350,000" class="calc-input">
                    </div>
                    <div>
                        <label class="calc-label">Loan Amount ($)</label>
                        <input v-model="loanNeeded" type="number" placeholder="280,000" class="calc-input">
                        <p class="text-light/22 text-xs mt-1.5">Min. 5% of property value</p>
                    </div>
                    <div>
                        <label class="calc-label">Loan Term</label>
                        <select v-model="creditTerm" class="calc-input">
                            <option value="" disabled>Select term</option>
                            <option v-for="y in plazoOptions" :key="y" :value="y">{{ y }} years</option>
                        </select>
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
                            :disabled="loadingCalc || !loanNeeded || !creditTerm"
                            class="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-dark font-bold px-10 py-3.5 rounded-full transition-all duration-200 cursor-pointer">
                        <span class="material-symbols-outlined" :class="loadingCalc ? 'animate-spin' : ''" style="font-size:18px">
                            {{ loadingCalc ? 'progress_activity' : 'calculate' }}
                        </span>
                        {{ loadingCalc ? 'Calculating…' : 'Calculate Payment' }}
                    </button>
                </div>
            </div>

            <!-- Results -->
            <Transition name="slide-up">
                <div v-if="showResults" class="mt-5 bg-light rounded-2xl text-dark p-7 lg:p-10">
                    <div class="flex items-center justify-between mb-7">
                        <h3 class="font-bold text-dark text-lg">Calculation Results</h3>
                        <button @click="resetCalc"
                                class="flex items-center gap-1 text-xs text-dark/40 hover:text-primary transition-colors cursor-pointer">
                            <span class="material-symbols-outlined" style="font-size:15px">refresh</span> Reset
                        </button>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="bg-primary/10 border border-primary/12 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 mb-1">Monthly Payment</p>
                            <p class="text-2xl font-bold text-primary">${{ monthlyPayment }}</p>
                        </div>
                        <div class="bg-dark/4 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 mb-1">Loan Term</p>
                            <p class="text-2xl font-bold">{{ creditTerm }} yrs</p>
                        </div>
                        <div class="bg-dark/4 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 mb-1">Loan Amount</p>
                            <p class="text-2xl font-bold">${{ formatPrice(loanNeeded) }}</p>
                        </div>
                        <div class="bg-dark/4 rounded-xl p-4 text-center">
                            <p class="text-xs text-dark/40 mb-1">Interest Rate</p>
                            <p class="text-2xl font-bold">{{ interestRate.toFixed(2) }}%</p>
                        </div>
                    </div>
                    <div class="overflow-x-auto rounded-xl border border-dark/6">
                        <table class="w-full text-sm">
                            <thead class="bg-dark/5 text-dark/50 text-xs uppercase tracking-wider font-semibold">
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
                                    class="border-t border-dark/4 hover:bg-primary/3 transition-colors">
                                    <td class="px-4 py-2.5 font-medium">{{ row.month }}</td>
                                    <td class="px-4 py-2.5 text-right">${{ row.principalPayment }}</td>
                                    <td class="px-4 py-2.5 text-right">${{ row.interestPayment }}</td>
                                    <td class="px-4 py-2.5 text-right font-semibold text-primary">${{ row.monthlyPayment }}</td>
                                    <td class="px-4 py-2.5 text-right text-dark/40">${{ row.remainingBalance }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="text-center text-xs text-dark/30 py-3 border-t border-dark/4">
                            First 12 of {{ paymentDetails.length }} total payments
                        </p>
                    </div>
                </div>
            </Transition>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         VIDEO BANNER — dark
    ════════════════════════════════════════ -->
    <section class="relative bg-dark overflow-hidden">
        <div class="h-72 lg:h-80 relative flex items-center justify-center">
            <img src="/storage/img/header-6.jpg" alt="About Brignac"
                 class="absolute inset-0 w-full h-full object-cover opacity-25">
            <div class="absolute inset-0 bg-linear-to-t from-dark via-dark/60 to-dark/80"></div>
            <div class="relative z-10 text-center px-6">
                <p class="text-light/30 text-xs uppercase tracking-widest mb-3">Our Story</p>
                <h2 class="text-3xl lg:text-4xl font-bold text-light mb-7">
                    Learn About Brignac Mortgage
                </h2>
                <button @click="showVideo = true"
                        class="relative inline-flex items-center justify-center cursor-pointer group">
                    <span class="animate-ping absolute inline-flex h-14 w-14 rounded-full bg-primary/25"></span>
                    <span class="relative h-14 w-14 rounded-full bg-primary group-hover:bg-primary/90 flex items-center justify-center shadow-xl shadow-primary/25 transition-colors duration-200">
                        <svg class="w-5 h-5 fill-dark ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </span>
                </button>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         TESTIMONIALS — dark, custom design
    ════════════════════════════════════════ -->
    <section ref="testimonials" class="bg-dark py-24 relative overflow-hidden">
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-6">
            <!-- Header -->
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                <div>
                    <div class="inline-flex items-center gap-2 border border-secondary/25 bg-secondary/8 rounded-full px-4 py-1.5 text-xs font-semibold text-secondary mb-5">
                        Client Reviews
                    </div>
                    <h2 class="text-4xl lg:text-5xl font-bold text-light leading-tight">
                        What Our Clients<br>
                        <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Are Saying</span>
                    </h2>
                </div>
                <div class="flex items-center gap-5">
                    <div>
                        <div class="flex items-center gap-1 mb-1">
                            <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-primary" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <p class="text-light text-sm font-bold">5.0 / 5.0</p>
                        <p class="text-light/30 text-xs">{{ testimonialList.length }} verified reviews</p>
                    </div>
                    <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank"
                       class="inline-flex items-center gap-2 border border-light/10 hover:border-primary/40 text-light/40 hover:text-primary px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200">
                        All Reviews
                        <span class="material-symbols-outlined" style="font-size:13px">arrow_outward</span>
                    </a>
                </div>
            </div>

            <!-- Bento grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(t, i) in testimonialList" :key="t.name"
                     :class="{ 'lg:col-span-2': i === 0 }"
                     class="group bg-light/4 hover:bg-light/7 border border-light/6 hover:border-primary/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                     @click="activeTestimonial = t">
                    <!-- Stars -->
                    <div class="flex gap-0.5">
                        <svg v-for="n in t.rating" :key="n" class="w-3 h-3 fill-primary" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
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
                            <p class="text-light/28 text-xs">{{ t.date }}</p>
                        </div>
                        <svg class="w-4 h-4 fill-blue-500 shrink-0 opacity-60" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════
         CTA — gradient
    ════════════════════════════════════════ -->
    <section class="relative bg-linear-to-br from-primary via-primary to-secondary py-24 overflow-hidden">
        <div class="absolute inset-0 bg-dark/15"></div>
        <div class="absolute -top-24 -right-24 w-80 h-80 bg-light/10 rounded-full blur-3xl"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl lg:text-5xl font-bold text-dark mb-5">Ready to Get Started?</h2>
            <p class="text-dark/60 text-lg mb-10 max-w-xl mx-auto">
                Talk to our team today and find the mortgage solution that's right for you and your family.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Link :href="route('contact-us.index')">
                    <button class="bg-dark hover:bg-dark/85 text-light font-bold px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer">
                        Get Pre-Qualified Today
                    </button>
                </Link>
                <a href="tel:+15045592821"
                   class="border border-dark/25 hover:border-dark/50 text-dark font-semibold px-10 py-4 rounded-full transition-all duration-200 hover:bg-dark/8 inline-flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined" style="font-size:18px">phone</span>
                    +1 504-559-2821
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
                            <p class="text-xs text-light/30">{{ activeTestimonial.date }}</p>
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
                    <svg v-for="n in activeTestimonial.rating" :key="n" class="w-4 h-4 fill-primary" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-light/65 leading-relaxed">"{{ activeTestimonial.content }}"</p>
            </div>
        </div>
    </Transition>

    <!-- ═══════════════════════════════════════
         VIDEO MODAL
    ════════════════════════════════════════ -->
    <Transition name="fade">
        <div v-if="showVideo"
             class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-sm"
             @click.self="showVideo = false">
            <div class="w-full max-w-3xl bg-dark border border-light/8 rounded-2xl overflow-hidden animate__animated animate__fadeIn animate__faster">
                <div class="flex justify-end p-3 border-b border-light/6">
                    <button @click="showVideo = false"
                            class="text-light/35 hover:text-light transition-colors cursor-pointer">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <video class="w-full" controls autoplay playsinline>
                    <source type="video/mp4" src="/video/about-us-video.mp4">
                </video>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
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

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(14px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
