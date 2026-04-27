<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import usePriceFormat from '@/composables/priceFormat';

const { formatPrice } = usePriceFormat();

/* ─── Scroll refs ─────────────────────────────── */
const ourServices           = ref(null);
const mortgageLoanCalculator = ref(null);
const testimonials          = ref(null);

const scrollTo = (el, offset = 90) => {
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll-our-services-section',            () => scrollTo(ourServices.value));
    window.addEventListener('scroll-mortgage-loan-calculator-section',() => scrollTo(mortgageLoanCalculator.value));
    window.addEventListener('scroll-testimonials-section',            () => scrollTo(testimonials.value));

    if (!document.getElementById('elfsight-script')) {
        const s = document.createElement('script');
        s.id  = 'elfsight-script';
        s.src = 'https://elfsightcdn.com/platform.js';
        s.async = true;
        document.head.appendChild(s);
    }
});
onUnmounted(() => {
    window.removeEventListener('scroll-our-services-section',            () => {});
    window.removeEventListener('scroll-mortgage-loan-calculator-section',() => {});
    window.removeEventListener('scroll-testimonials-section',            () => {});
});

/* ─── Mortgage calculator ──────────────────────── */
const plazoOptions    = Array.from({ length: 31 }, (_, i) => i + 5);
const propertyValue   = ref('');
const loanNeeded      = ref('');
const creditTerm      = ref('');
const interestRate    = ref(6.91);
const loadingCalc     = ref(false);
const showResults     = ref(false);
const monthlyPayment  = ref(null);
const paymentDetails  = ref([]);

const calcMortgage = (p, r, y) => {
    const mr = r / 100 / 12;
    const n  = y * 12;
    return (p * mr / (1 - Math.pow(1 + mr, -n))).toFixed(2);
};

const calcDetails = (p, r, y) => {
    const mr = r / 100 / 12;
    const n  = y * 12;
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
    }, 800);
};

const resetCalc = () => {
    propertyValue.value  = '';
    loanNeeded.value     = '';
    creditTerm.value     = '';
    interestRate.value   = 6.91;
    monthlyPayment.value = null;
    paymentDetails.value = [];
    showResults.value    = false;
};

/* ─── Facebook testimonials modal ─────────────── */
const activeTestimonial = ref(null);

const facebookTestimonials = [
    { name: "Jordan O'Bryant",    content: "Great experience refinancing with Brignac Mortgage. The process was smooth, communication was clear, and the team was professional and responsive throughout. Highly recommend!", image: '/storage/facebookprofiles/profile-10.jpg', createdAt: 'Dic 17, 2025' },
    { name: 'Tim Huynh',          content: "Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience. They definitely have my business and referrals going forward.", image: '/storage/facebookprofiles/profile-1.jpg', createdAt: 'Oct 8, 2025' },
    { name: 'Ashley J Simon',     content: "Shaun and his team are straightforward and honest! They got the job done quick and easy. Will use them again if I ever need to purchase another home. Highly recommend!!!!!", image: '/storage/facebookprofiles/profile-2.jpg', createdAt: 'Jul 15, 2025' },
    { name: 'Evan Mullins',       content: "A friend of mine recommended Brignac Mortgage to me while I was home hunting. I decided to give them a chance and it was worth it! They weren't pushy like some of these other company's. I purchased the home by-owner and not through a realtor. Shaun, Allie, and Jenn were there to answer any questions I had. and were patient and willing through the entire process. They made the purchase of my new home easy and understanding. I cannot give Brignac Mortgage enough credit for all the work there team did. If I ever purchase another home there is no doubt in my mind that Shaun will be my first call!", image: '/storage/facebookprofiles/profile-3.jpg', createdAt: 'May 8, 2025' },
    { name: 'Jason Villar',       content: "Shaun Brignac and his team worked around the clock to get my loan. They were all very available, professional, and knowledgeable about their work. Looking forward to working with them again in the future!", image: '/storage/facebookprofiles/profile-4.jpg', createdAt: 'Apr 10, 2025' },
    { name: 'Angelo Datseris',    content: "Shaun and I crossed paths at a mortgage conference and it didn't take long at all for us to become pretty tight friends. There are many people in this industry that are not in it for the right reasons but I can tell you whole heartedly that Shaun is not one of those people. Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done. He doesn't listen to people telling him no either - if there's a way to get a deal closed he will find a way. Proud to call him a friend. This is the kind of person you want in your corner at all times.", image: '/storage/facebookprofiles/profile-5.jpg', createdAt: 'May 5, 2023' },
    { name: 'Justin Pfister',     content: "I talked with and received numbers (rates) from 6 different brokers. Brignac smoked them all by more then 2-3% lower! I'll never even consider any other mortgage company out there… call Brignac Mortgage and let them blow your mind with the numbers they put together!!", image: '/storage/facebookprofiles/profile-6.jpg', createdAt: 'Jan 10, 2023' },
    { name: 'Brant Gauthreaux',   content: "Shaun made the loan process so easy and my loan closed fast. Would definitely recommend and use them on my next mortgage.", image: '/storage/facebookprofiles/profile-7.jpg', createdAt: 'Aug 23, 2022' },
    { name: 'Jeremy Bergeron',    content: "easy and fast process! Highly recommend Shaun for your mortgage services!", image: '/storage/facebookprofiles/profile-8.jpg', createdAt: 'May 30, 2022' },
    { name: 'Gmurph Pro Wash',    content: "Shaun has been a great help and is very knowledgeable in the Mortgage world!", image: '/storage/facebookprofiles/profile-9.jpg', createdAt: 'Feb 27, 2022' },
];

/* ─── Video modal ──────────────────────────────── */
const showVideo = ref(false);
</script>

<template>
    <Head title="Welcome" />

    <NavigationDrawerGuest
        @scroll-our-services-section="scrollTo(ourServices)"
        @scroll-mortgage-loan-calculator-section="scrollTo(mortgageLoanCalculator)"
        @scroll-testimonials-section="scrollTo(testimonials)"
    />
    <GuestNav
        @scroll-our-services-section="scrollTo(ourServices)"
        @scroll-mortgage-loan-calculator-section="scrollTo(mortgageLoanCalculator)"
        @scroll-testimonials-section="scrollTo(testimonials)"
    />

    <!-- ═══════════════════════════════════════════════════
         HERO
    ════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden -mt-26">
        <div class="absolute inset-0 bg-[url('/storage/img/header-7.jpeg')] bg-cover bg-center"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        <div class="relative z-10 text-white text-center max-w-4xl mx-auto px-4 pt-32 pb-20 animate__animated animate__fadeIn">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm mb-8">
                <span class="material-symbols-outlined text-green-400" style="font-size:18px">verified</span>
                Louisiana's #1 Wholesale Mortgage Broker
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Path to<br>
                <span class="text-green-400">Homeownership</span><br>
                Starts Here
            </h1>

            <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Expert mortgage guidance for purchases, refinancing, and home equity. Fast closings. Competitive rates. Exceptional service.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link :href="route('contact-us.index')">
                    <button class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 cursor-pointer">
                        Get Pre-Qualified
                        <span class="material-symbols-outlined align-middle ml-1" style="font-size:20px">arrow_forward</span>
                    </button>
                </Link>
                <button @click="scrollTo(mortgageLoanCalculator)" class="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/10 cursor-pointer">
                    Calculate Payment
                    <span class="material-symbols-outlined align-middle ml-1" style="font-size:20px">calculate</span>
                </button>
            </div>

            <!-- Trust badges -->
            <div class="flex flex-wrap items-center justify-center gap-8 mt-14 text-sm text-gray-300">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-green-400" style="font-size:22px">verified_user</span>
                    Licensed & Insured
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-green-400" style="font-size:22px">speed</span>
                    Fast Closing Times
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-green-400" style="font-size:22px">thumb_up</span>
                    5-Star Reviews
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-green-400" style="font-size:22px">support_agent</span>
                    Free Consultation
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <span class="material-symbols-outlined text-white/60" style="font-size:32px">keyboard_arrow_down</span>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         CEO QUOTE
    ════════════════════════════════════════════════════ -->
    <section class="bg-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <div class="flex justify-center mb-6">
                <img src="/img/secondary-logo-light.jpg" alt="Brignac Mortgage" class="h-16 w-auto">
            </div>
            <blockquote class="relative">
                <svg class="absolute -top-4 -left-2 w-12 h-12 text-gray-100" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z"/>
                </svg>
                <p class="text-lg md:text-xl text-gray-700 italic leading-relaxed relative z-10 max-w-2xl mx-auto">
                    We believe that life is for living and you should be passionate about what you do. We hold our team to a high standard, and we only hire the best!
                </p>
            </blockquote>
            <div class="mt-8 flex items-center justify-center gap-3">
                <img src="/img/company-seo-img.jpg" alt="Shaun Brignac" class="h-12 w-12 rounded-full object-cover">
                <div class="text-left">
                    <p class="font-bold text-gray-800">Shaun Brignac</p>
                    <p class="text-xs text-gray-500">President & CEO — Brignac Mortgage</p>
                </div>
            </div>
            <!-- Social links -->
            <div class="mt-6 flex items-center justify-center gap-2">
                <a href="https://www.facebook.com/BrignacMortgage" target="_blank" class="h-9 w-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://x.com/shaunbrignac" target="_blank" class="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4 fill-gray-700" viewBox="0 0 1200 1227"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.694H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@shaunbrignac" target="_blank" class="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4 fill-gray-700" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
                <a href="https://www.instagram.com/shaunbrignac" target="_blank" class="h-9 w-9 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4 fill-pink-600" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         MORTGAGE CALCULATOR
    ════════════════════════════════════════════════════ -->
    <section ref="mortgageLoanCalculator" class="relative py-20 bg-cover bg-center" style="background-image:url('/storage/img/header-6.jpg')">
        <div class="absolute inset-0 bg-black/75"></div>
        <div class="relative z-10 max-w-5xl mx-auto px-4 text-white">

            <div class="text-center mb-10">
                <div class="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-sm mb-4">
                    <span class="material-symbols-outlined text-orange-400" style="font-size:18px">calculate</span>
                    Simulator
                </div>
                <h2 class="text-3xl lg:text-4xl font-bold">Mortgage <span class="text-orange-400">Loan</span> Calculator</h2>
                <p class="text-gray-300 text-sm mt-2">Average U.S. rate sources:
                    <a href="https://fred.stlouisfed.org/series/MORTGAGE30US/" target="_blank" class="underline hover:text-orange-300">fred.stlouisfed.org</a>,
                    <a href="https://www.bankrate.com/mortgages/mortgage-rates/" target="_blank" class="underline hover:text-orange-300">bankrate.com</a>
                </p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-10 border border-white/20">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label class="block text-sm font-medium mb-1.5 text-gray-200">Property Value ($)</label>
                        <input v-model="propertyValue" type="number" placeholder="e.g. 350,000"
                               class="calc-input">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1.5 text-gray-200">Loan Amount ($)</label>
                        <input v-model="loanNeeded" type="number" placeholder="e.g. 280,000"
                               class="calc-input">
                        <p class="text-xs text-gray-400 mt-1">Min. 5% of property value</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1.5 text-gray-200">Loan Term (years)</label>
                        <select v-model="creditTerm" class="calc-input">
                            <option value="" disabled>Select term</option>
                            <option v-for="y in plazoOptions" :key="y" :value="y">{{ y }} years</option>
                        </select>
                        <p class="text-xs text-gray-400 mt-1">Most common: 30 years</p>
                    </div>
                </div>

                <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <label class="text-sm font-medium text-gray-200">Interest Rate</label>
                        <span class="text-orange-400 font-bold">{{ interestRate.toFixed(2) }}% / yr — {{ (interestRate/12).toFixed(3) }}% / mo</span>
                    </div>
                    <input v-model="interestRate" type="range" min="3.5" max="10" step="0.01"
                           class="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-orange-400">
                    <p class="text-xs text-center text-gray-400 mt-2">Average U.S. rate ≈ 6.91%</p>
                </div>

                <div class="text-center">
                    <button @click="onSubmitCalc" :disabled="loadingCalc || !loanNeeded || !creditTerm"
                            class="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-10 py-3.5 rounded-full transition-all duration-300 cursor-pointer">
                        <span v-if="loadingCalc" class="inline-flex items-center gap-2">
                            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                            Calculating…
                        </span>
                        <span v-else>Calculate Payment</span>
                    </button>
                </div>
            </div>

            <!-- Results panel -->
            <Transition name="slide-up">
                <div v-if="showResults" class="mt-8 bg-white rounded-2xl text-gray-800 p-6 lg:p-10">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-orange-500">Calculation Results</h3>
                        <button @click="resetCalc" class="text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                            <span class="material-symbols-outlined align-middle" style="font-size:18px">refresh</span> Reset
                        </button>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="bg-orange-50 rounded-xl p-4 text-center">
                            <p class="text-xs text-gray-500 mb-1">Monthly Payment</p>
                            <p class="text-xl font-bold text-orange-600">${{ monthlyPayment }}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 text-center">
                            <p class="text-xs text-gray-500 mb-1">Loan Term</p>
                            <p class="text-xl font-bold">{{ creditTerm }} yrs</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 text-center">
                            <p class="text-xs text-gray-500 mb-1">Loan Amount</p>
                            <p class="text-xl font-bold">${{ formatPrice(loanNeeded) }}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 text-center">
                            <p class="text-xs text-gray-500 mb-1">Interest Rate</p>
                            <p class="text-xl font-bold">{{ interestRate.toFixed(2) }}%</p>
                        </div>
                    </div>
                    <div class="overflow-x-auto rounded-xl border border-gray-100">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-50 text-gray-600 font-semibold">
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
                                    class="border-t border-gray-50 hover:bg-orange-50/50 transition-colors">
                                    <td class="px-4 py-2.5">{{ row.month }}</td>
                                    <td class="px-4 py-2.5 text-right">${{ row.principalPayment }}</td>
                                    <td class="px-4 py-2.5 text-right">${{ row.interestPayment }}</td>
                                    <td class="px-4 py-2.5 text-right font-medium">${{ row.monthlyPayment }}</td>
                                    <td class="px-4 py-2.5 text-right text-gray-500">${{ row.remainingBalance }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="text-center text-xs text-gray-400 py-3">Showing first 12 months of {{ paymentDetails.length }} total payments</p>
                    </div>
                </div>
            </Transition>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         OUR SERVICES — Loan Products
    ════════════════════════════════════════════════════ -->
    <section ref="ourServices" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex flex-col lg:flex-row items-center gap-16">
                <!-- Image -->
                <div class="w-full lg:w-2/5 shrink-0">
                    <div class="relative rounded-2xl overflow-hidden h-96 lg:h-[520px]">
                        <img src="/storage/img/header-5.jpg" alt="Brignac Mortgage Team" class="w-full h-full object-cover">
                        <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-1.5 h-3/4 bg-orange-500 rounded-r-xl"></div>
                    </div>
                </div>
                <!-- Content -->
                <div class="w-full lg:w-3/5">
                    <div class="inline-flex items-center bg-orange-100 text-orange-600 rounded-full px-5 py-1.5 text-sm font-medium mb-4">Our Services</div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loan Products & Programs</h2>
                    <p class="text-gray-600 mb-6">Explore our diverse range of loan products and programs <strong>designed to meet your unique financial needs.</strong> Whether you're looking for a residential mortgage, an investment loan, or a commercial financing solution, we have the right options for you.</p>
                    <div class="border-l-4 border-orange-500 pl-4 mb-8 text-gray-600 text-sm">
                        Explore our diverse range of loan products and programs designed to meet your unique financial needs.
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="(item, i) in [
                            { icon: 'real_estate_agent', text: 'Conventional and Construction Loans' },
                            { icon: 'support_agent',     text: 'Mobile Home Loans — Single and Double Wide' },
                            { icon: 'location_away',     text: 'Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns' },
                            { icon: 'badge',             text: 'Home Equity Line of Credit Loans' },
                        ]" :key="i" class="flex items-center gap-3">
                            <div class="shrink-0 h-12 w-12 rounded-full border-2 border-orange-200 flex items-center justify-center">
                                <span class="material-symbols-outlined text-orange-500" style="font-size:22px">{{ item.icon }}</span>
                            </div>
                            <p class="text-sm text-gray-700 font-medium">{{ item.text }}</p>
                        </div>
                    </div>
                    <Link :href="route('programs.index')">
                        <button class="mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3 rounded-full transition-colors duration-200 cursor-pointer">
                            View All Programs
                            <span class="material-symbols-outlined align-middle ml-1" style="font-size:18px">arrow_forward</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         WHAT WE PROVIDE
    ════════════════════════════════════════════════════ -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <div class="inline-flex bg-orange-100 text-orange-600 rounded-full px-5 py-1.5 text-sm font-medium mb-3">Our Services</div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">What We Provide</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="(card, i) in [
                    { icon: 'real_estate_agent',  title: 'Excellent Customer Experience', desc: 'We are dedicated to providing you with the best customer experience in the industry.' },
                    { icon: 'nest_clock_farsight_analog', title: 'Fast Closing Times',    desc: 'Our streamlined process ensures that you can close your loan quickly and efficiently.' },
                    { icon: 'productivity',        title: 'Open Communication',            desc: 'We maintain an open line of communication throughout the entire process.' },
                    { icon: 'support_agent',       title: 'Free Consulting Services',      desc: 'Get expert advice and guidance tailored to your specific financial needs and goals.' },
                    { icon: 'location_away',       title: 'Wholesale Lender Access',       desc: 'Gain exclusive access to a wide range of wholesale lenders, investors, and products.' },
                    { icon: 'card_travel',         title: 'Residential, Investment & Commercial', desc: 'Loan options to meet your residential, investment, and commercial needs.' },
                ]" :key="i"
                class="group bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                    <div class="h-14 w-14 rounded-full border-2 border-green-200 group-hover:border-green-400 flex items-center justify-center mx-auto mb-4 transition-colors">
                        <span class="material-symbols-outlined text-green-500" style="font-size:26px">{{ card.icon }}</span>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">{{ card.title }}</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">{{ card.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         VIDEO / ABOUT US BANNER
    ════════════════════════════════════════════════════ -->
    <section class="relative h-72 bg-cover bg-center flex items-center justify-center" style="background-image:url('/storage/img/header-6.jpg')">
        <div class="absolute inset-0 bg-black/60"></div>
        <div class="relative z-10 text-center text-white">
            <h2 class="text-3xl lg:text-4xl font-bold mb-2">About Us</h2>
            <p class="text-gray-300 text-sm mb-6">Learn more about Brignac Mortgage</p>
            <button @click="showVideo = true"
                    class="relative inline-flex items-center justify-center cursor-pointer">
                <span class="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-white opacity-30"></span>
                <span class="relative h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <svg class="w-6 h-6 fill-green-500 ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </span>
            </button>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         GOOGLE TESTIMONIALS
    ════════════════════════════════════════════════════ -->
    <section ref="testimonials" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-10">
                <div class="inline-flex bg-gray-100 rounded-full px-5 py-1.5 text-sm text-gray-600 mb-3">Testimonials</div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">
                    Our
                    <span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span>
                    Testimonials
                </h2>
                <a href="https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6" target="_blank"
                   class="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
                    Read More Reviews
                    <span class="material-symbols-outlined" style="font-size:16px">arrow_outward</span>
                </a>
            </div>
            <div class="bg-white shadow-xl rounded-2xl p-4 lg:p-10">
                <div class="elfsight-app-ebce6ca8-0720-4595-b6cd-c4d2cb07e6df" data-elfsight-app-lazy></div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         FACEBOOK TESTIMONIALS
    ════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-10">
                <div class="inline-flex bg-gray-100 rounded-full px-5 py-1.5 text-sm text-gray-600 mb-3">Testimonials</div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">
                    Our <span class="text-blue-600">Facebook</span> Testimonials
                </h2>
                <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank"
                   class="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
                    Read More Reviews
                    <span class="material-symbols-outlined" style="font-size:16px">arrow_outward</span>
                </a>
            </div>

            <!-- Rating bar -->
            <div class="bg-white rounded-2xl shadow p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <p class="text-sm text-blue-600 font-bold mb-1">Facebook Reviews</p>
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold">5.0</span>
                        <div class="flex text-yellow-400">
                            <svg v-for="n in 5" :key="n" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <span class="text-xs text-gray-400">({{ facebookTestimonials.length }})</span>
                    </div>
                </div>
                <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank"
                   class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full font-semibold transition-colors">
                    Review us on Facebook
                </a>
            </div>

            <!-- Cards grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <div v-for="t in facebookTestimonials" :key="t.name"
                     class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                    <!-- Stars -->
                    <div class="flex text-yellow-400">
                        <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <!-- Content -->
                    <p class="text-gray-600 text-sm leading-relaxed line-clamp-4">{{ t.content }}</p>
                    <button @click="activeTestimonial = t" class="text-blue-500 text-xs hover:underline text-left cursor-pointer bg-none border-none p-0">Read more</button>
                    <!-- Author -->
                    <div class="flex items-center gap-3 mt-auto pt-3 border-t border-gray-50">
                        <div class="relative shrink-0">
                            <img :src="t.image" :alt="t.name" class="h-10 w-10 rounded-full object-cover">
                            <div class="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                                <svg class="w-4 h-4 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800 text-sm">{{ t.name }}</p>
                            <p class="text-xs text-gray-400">{{ t.createdAt }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         CTA BANNER
    ════════════════════════════════════════════════════ -->
    <section class="bg-green-500 py-16">
        <div class="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-green-100 text-lg mb-8">Talk to our team today and find the mortgage solution that's right for you.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Link :href="route('contact-us.index')">
                    <button class="bg-white text-green-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                        Get Pre-Qualified Today
                    </button>
                </Link>
                <a href="tel:+15045592821" class="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined" style="font-size:20px">phone</span>
                    +1 504-559-2821
                </a>
            </div>
        </div>
    </section>

    <Footer />

    <!-- ═══════════════════════════════════════════════════
         FACEBOOK TESTIMONIAL MODAL
    ════════════════════════════════════════════════════ -->
    <Transition name="fade">
        <div v-if="activeTestimonial" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
             @click.self="activeTestimonial = null">
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate__animated animate__fadeInUp animate__faster">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <img :src="activeTestimonial.image" :alt="activeTestimonial.name" class="h-12 w-12 rounded-full object-cover">
                            <div class="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                                <svg class="w-4 h-4 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                        </div>
                        <div>
                            <p class="font-bold text-gray-800">{{ activeTestimonial.name }}</p>
                            <p class="text-xs text-gray-400">{{ activeTestimonial.createdAt }}</p>
                        </div>
                    </div>
                    <button @click="activeTestimonial = null" class="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex text-yellow-400 mb-4">
                    <svg v-for="n in 5" :key="n" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-gray-700 leading-relaxed">{{ activeTestimonial.content }}</p>
            </div>
        </div>
    </Transition>

    <!-- ═══════════════════════════════════════════════════
         VIDEO MODAL
    ════════════════════════════════════════════════════ -->
    <Transition name="fade">
        <div v-if="showVideo" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
             @click.self="showVideo = false">
            <div class="w-full max-w-3xl bg-black rounded-2xl overflow-hidden animate__animated animate__fadeIn animate__faster">
                <div class="flex justify-end p-2">
                    <button @click="showVideo = false" class="text-white hover:text-gray-300 cursor-pointer">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
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
.calc-input {
    width: 100%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 0.75rem;
    padding: 0.625rem 1rem;
    color: white;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;
}
.calc-input::placeholder { color: rgba(255,255,255,0.4); }
.calc-input:focus { border-color: #fb923c; }
.calc-input option { background: #1f2937; color: white; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
.slide-up-leave-to  { opacity: 0; transform: translateY(20px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
