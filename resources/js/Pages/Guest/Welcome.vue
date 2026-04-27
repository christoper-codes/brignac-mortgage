<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import usePriceFormat from '@/composables/priceFormat';

const { formatPrice } = usePriceFormat();

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

/* â”€â”€â”€ Mortgage calculator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Facebook testimonials modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const activeTestimonial = ref(null);

const facebookTestimonials = [
    { name: "Jordan O'Bryant",    content: "Great experience refinancing with Brignac Mortgage. The process was smooth, communication was clear, and the team was professional and responsive throughout. Highly recommend!", image: '/storage/facebookprofiles/profile-10.jpg', createdAt: 'Dic 17, 2025' },
    { name: 'Tim Huynh',          content: "Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience. They definitely have my business and referrals going forward.", image: '/storage/facebookprofiles/profile-1.jpg', createdAt: 'Oct 8, 2025' },
    { name: 'Ashley J Simon',     content: "Shaun and his team are straightforward and honest! They got the job done quick and easy. Will use them again if I ever need to purchase another home. Highly recommend!!!!!", image: '/storage/facebookprofiles/profile-2.jpg', createdAt: 'Jul 15, 2025' },
    { name: 'Evan Mullins',       content: "A friend of mine recommended Brignac Mortgage to me while I was home hunting. I decided to give them a chance and it was worth it! They weren't pushy like some of these other company's. I purchased the home by-owner and not through a realtor. Shaun, Allie, and Jenn were there to answer any questions I had. and were patient and willing through the entire process. They made the purchase of my new home easy and understanding. I cannot give Brignac Mortgage enough credit for all the work there team did. If I ever purchase another home there is no doubt in my mind that Shaun will be my first call!", image: '/storage/facebookprofiles/profile-3.jpg', createdAt: 'May 8, 2025' },
    { name: 'Jason Villar',       content: "Shaun Brignac and his team worked around the clock to get my loan. They were all very available, professional, and knowledgeable about their work. Looking forward to working with them again in the future!", image: '/storage/facebookprofiles/profile-4.jpg', createdAt: 'Apr 10, 2025' },
    { name: 'Angelo Datseris',    content: "Shaun and I crossed paths at a mortgage conference and it didn't take long at all for us to become pretty tight friends. There are many people in this industry that are not in it for the right reasons but I can tell you whole heartedly that Shaun is not one of those people. Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done. He doesn't listen to people telling him no either - if there's a way to get a deal closed he will find a way. Proud to call him a friend. This is the kind of person you want in your corner at all times.", image: '/storage/facebookprofiles/profile-5.jpg', createdAt: 'May 5, 2023' },
    { name: 'Justin Pfister',     content: "I talked with and received numbers (rates) from 6 different brokers. Brignac smoked them all by more then 2-3% lower! I'll never even consider any other mortgage company out thereâ€¦ call Brignac Mortgage and let them blow your mind with the numbers they put together!!", image: '/storage/facebookprofiles/profile-6.jpg', createdAt: 'Jan 10, 2023' },
    { name: 'Brant Gauthreaux',   content: "Shaun made the loan process so easy and my loan closed fast. Would definitely recommend and use them on my next mortgage.", image: '/storage/facebookprofiles/profile-7.jpg', createdAt: 'Aug 23, 2022' },
    { name: 'Jeremy Bergeron',    content: "easy and fast process! Highly recommend Shaun for your mortgage services!", image: '/storage/facebookprofiles/profile-8.jpg', createdAt: 'May 30, 2022' },
    { name: 'Gmurph Pro Wash',    content: "Shaun has been a great help and is very knowledgeable in the Mortgage world!", image: '/storage/facebookprofiles/profile-9.jpg', createdAt: 'Feb 27, 2022' },
];

/* â”€â”€â”€ Video modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

    <!-- â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section class="bg-[#141211] min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-96px)] flex items-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-150 h-150 bg-[#E37A52] opacity-[0.04] blur-[140px] pointer-events-none rounded-full"></div>

        <div class="max-w-5xl mx-auto px-6 py-24 text-center w-full relative">
            <div class="inline-flex items-center gap-2 border border-white/10 rounded-lg px-4 py-1.5 text-xs text-[#F0EEE8]/45 mb-8 tracking-wide">
                Louisiana's Trusted Wholesale Mortgage Broker
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[#F0EEE8] leading-[1.06] tracking-tight mb-6">
                Your path to<br>
                <span class="text-[#E37A52]">homeownership</span><br>
                starts here.
            </h1>

            <p class="text-base text-[#F0EEE8]/45 max-w-lg mx-auto mb-10 leading-relaxed">
                Expert mortgage guidance for purchases, refinancing, and home equity. Fast closings. Competitive rates.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <Link :href="route('contact-us.index')">
                    <button class="bg-[#E37A52] hover:bg-[#cc6b44] text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm">
                        Get Pre-Qualified
                    </button>
                </Link>
                <button @click="scrollTo(mortgageLoanCalculator)"
                        class="border border-white/15 hover:border-white/30 text-[#F0EEE8] font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm">
                    Calculate Payment
                </button>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-12 mt-16 pt-12 border-t border-white/5">
                <div class="text-center">
                    <p class="text-2xl font-bold text-[#F0EEE8]">5.0â˜…</p>
                    <p class="text-xs text-[#F0EEE8]/35 mt-1 tracking-wide">Google Rating</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-bold text-[#F0EEE8]">Fast</p>
                    <p class="text-xs text-[#F0EEE8]/35 mt-1 tracking-wide">Closing Times</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-bold text-[#F0EEE8]">Free</p>
                    <p class="text-xs text-[#F0EEE8]/35 mt-1 tracking-wide">Consultation</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-bold text-[#F0EEE8]">10+</p>
                    <p class="text-xs text-[#F0EEE8]/35 mt-1 tracking-wide">Loan Programs</p>
                </div>
            </div>
        </div>
    </section>

    <!-- â”€â”€â”€ CEO QUOTE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section class="bg-[#F0EEE8] py-16 border-b border-[#141211]/8">
        <div class="max-w-3xl mx-auto px-6 text-center">
            <p class="text-xl text-[#141211] font-medium leading-relaxed">
                "We believe that life is for living and you should be passionate about what you do.
                We hold our team to a high standard, and we only hire the best."
            </p>
            <div class="mt-8 flex items-center justify-center gap-3">
                <img src="/img/company-seo-img.jpg" alt="Shaun Brignac" class="h-10 w-10 rounded-full object-cover">
                <div class="text-left">
                    <p class="font-semibold text-sm text-[#141211]">Shaun Brignac</p>
                    <p class="text-xs text-[#141211]/45">President & CEO â€” Brignac Mortgage</p>
                </div>
            </div>
        </div>
    </section>

    <!-- â”€â”€â”€ LOAN PROGRAMS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section ref="ourServices" class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="relative">
                    <div class="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#E37A52] rounded-full"></div>
                    <img src="/storage/img/header-5.jpg" alt="Brignac Mortgage" class="w-full h-105 object-cover rounded-xl">
                </div>
                <div>
                    <p class="text-xs font-semibold text-[#E37A52] uppercase tracking-widest mb-4">Loan Products</p>
                    <h2 class="text-3xl lg:text-4xl font-bold text-[#141211] tracking-tight mb-5">Programs designed<br>for your needs</h2>
                    <p class="text-[#141211]/55 mb-8 leading-relaxed text-sm">Whether you're looking for a residential mortgage, an investment loan, or commercial financing â€” we have the right options for you.</p>
                    <ul class="space-y-3 mb-8">
                        <li v-for="item in [
                            'Conventional and Construction Loans',
                            'Mobile Home Loans â€” Single and Double Wide',
                            'Fixed, ARMs, and Buydown Options',
                            'Home Equity Line of Credit Loans',
                        ]" :key="item" class="flex items-center gap-3 text-sm text-[#141211]">
                            <span class="h-1.5 w-1.5 rounded-full bg-[#E37A52] shrink-0"></span>
                            {{ item }}
                        </li>
                    </ul>
                    <Link :href="route('programs.index')">
                        <button class="border border-[#141211]/25 hover:border-[#E37A52] hover:text-[#E37A52] text-[#141211] font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer text-sm">
                            View All Programs
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </section>

    <!-- â”€â”€â”€ WHAT WE PROVIDE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section class="py-24 bg-[#F0EEE8]">
        <div class="max-w-6xl mx-auto px-6">
            <div class="mb-12">
                <p class="text-xs font-semibold text-[#E37A52] uppercase tracking-widest mb-3">What We Provide</p>
                <h2 class="text-3xl lg:text-4xl font-bold text-[#141211] tracking-tight">Built around you</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div v-for="(card, i) in [
                    { icon: 'real_estate_agent',          title: 'Excellent Customer Experience', desc: 'We are dedicated to providing you with the best experience in the industry.' },
                    { icon: 'nest_clock_farsight_analog', title: 'Fast Closing Times',            desc: 'Our streamlined process ensures you can close your loan quickly.' },
                    { icon: 'productivity',               title: 'Open Communication',            desc: 'We maintain an open line of communication throughout the entire process.' },
                    { icon: 'support_agent',              title: 'Free Consulting',               desc: 'Expert advice tailored to your specific financial needs and goals.' },
                    { icon: 'location_away',              title: 'Wholesale Lender Access',       desc: 'Exclusive access to a wide range of wholesale lenders and products.' },
                    { icon: 'card_travel',                title: 'Residential & Investment',      desc: 'Loan options for residential, investment, and commercial needs.' },
                ]" :key="i"
                class="bg-white rounded-xl p-6 border border-[#141211]/6 hover:border-[#E37A52]/25 transition-colors">
                    <span class="material-symbols-outlined text-[#E37A52] mb-4 block" style="font-size:22px">{{ card.icon }}</span>
                    <h3 class="font-semibold text-[#141211] mb-2 text-sm">{{ card.title }}</h3>
                    <p class="text-xs text-[#141211]/50 leading-relaxed">{{ card.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- â”€â”€â”€ MORTGAGE CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section ref="mortgageLoanCalculator" class="py-24 bg-[#141211]">
        <div class="max-w-4xl mx-auto px-6">
            <div class="mb-10">
                <p class="text-xs font-semibold text-[#E37A52] uppercase tracking-widest mb-3">Simulator</p>
                <h2 class="text-3xl lg:text-4xl font-bold text-[#F0EEE8] tracking-tight">Mortgage Calculator</h2>
                <p class="text-[#F0EEE8]/35 text-xs mt-2">
                    Rate data:
                    <a href="https://fred.stlouisfed.org/series/MORTGAGE30US/" target="_blank" class="hover:text-[#E37A52] transition-colors underline">fred.stlouisfed.org</a>
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div>
                    <label class="block text-xs font-medium text-[#F0EEE8]/40 mb-2 uppercase tracking-wide">Property Value ($)</label>
                    <input v-model="propertyValue" type="number" placeholder="350,000" class="calc-input">
                </div>
                <div>
                    <label class="block text-xs font-medium text-[#F0EEE8]/40 mb-2 uppercase tracking-wide">Loan Amount ($)</label>
                    <input v-model="loanNeeded" type="number" placeholder="280,000" class="calc-input">
                </div>
                <div>
                    <label class="block text-xs font-medium text-[#F0EEE8]/40 mb-2 uppercase tracking-wide">Loan Term</label>
                    <select v-model="creditTerm" class="calc-input">
                        <option value="" disabled>Select term</option>
                        <option v-for="y in plazoOptions" :key="y" :value="y">{{ y }} years</option>
                    </select>
                </div>
            </div>

            <div class="mb-8">
                <div class="flex items-center justify-between mb-3">
                    <label class="text-xs font-medium text-[#F0EEE8]/40 uppercase tracking-wide">Interest Rate</label>
                    <span class="text-[#E37A52] font-semibold text-sm">{{ interestRate.toFixed(2) }}% / yr</span>
                </div>
                <input v-model="interestRate" type="range" min="3.5" max="10" step="0.01"
                       class="w-full h-px bg-white/10 appearance-none cursor-pointer accent-[#E37A52]">
                <p class="text-xs text-center text-[#F0EEE8]/25 mt-2">Avg. U.S. rate â‰ˆ 6.91%</p>
            </div>

            <button @click="onSubmitCalc" :disabled="loadingCalc || !loanNeeded || !creditTerm"
                    class="bg-[#E37A52] hover:bg-[#cc6b44] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm">
                <span v-if="loadingCalc" class="inline-flex items-center gap-2">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Calculatingâ€¦
                </span>
                <span v-else>Calculate Monthly Payment</span>
            </button>

            <Transition name="slide-up">
                <div v-if="showResults" class="mt-8 bg-[#1c1917] rounded-xl p-6 border border-white/5">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-[#F0EEE8] font-semibold text-sm">Results</h3>
                        <button @click="resetCalc" class="text-xs text-[#F0EEE8]/35 hover:text-[#E37A52] transition-colors cursor-pointer">Reset</button>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="text-center">
                            <p class="text-xs text-[#F0EEE8]/35 mb-1">Monthly Payment</p>
                            <p class="text-xl font-bold text-[#E37A52]">${{ monthlyPayment }}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-[#F0EEE8]/35 mb-1">Loan Term</p>
                            <p class="text-xl font-bold text-[#F0EEE8]">{{ creditTerm }} yrs</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-[#F0EEE8]/35 mb-1">Loan Amount</p>
                            <p class="text-xl font-bold text-[#F0EEE8]">${{ formatPrice(loanNeeded) }}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-[#F0EEE8]/35 mb-1">Interest Rate</p>
                            <p class="text-xl font-bold text-[#F0EEE8]">{{ interestRate.toFixed(2) }}%</p>
                        </div>
                    </div>
                    <div class="overflow-x-auto rounded-lg border border-white/5">
                        <table class="w-full text-xs">
                            <thead>
                                <tr class="border-b border-white/5">
                                    <th class="px-4 py-3 text-left text-[#F0EEE8]/35 font-medium">Month</th>
                                    <th class="px-4 py-3 text-right text-[#F0EEE8]/35 font-medium">Principal</th>
                                    <th class="px-4 py-3 text-right text-[#F0EEE8]/35 font-medium">Interest</th>
                                    <th class="px-4 py-3 text-right text-[#F0EEE8]/35 font-medium">Payment</th>
                                    <th class="px-4 py-3 text-right text-[#F0EEE8]/35 font-medium">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in paymentDetails.slice(0, 12)" :key="row.month"
                                    class="border-t border-white/5 text-[#F0EEE8]/60">
                                    <td class="px-4 py-2.5">{{ row.month }}</td>
                                    <td class="px-4 py-2.5 text-right">${{ row.principalPayment }}</td>
                                    <td class="px-4 py-2.5 text-right">${{ row.interestPayment }}</td>
                                    <td class="px-4 py-2.5 text-right font-medium text-[#F0EEE8]">${{ row.monthlyPayment }}</td>
                                    <td class="px-4 py-2.5 text-right text-[#F0EEE8]/35">${{ row.remainingBalance }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="text-center text-xs text-[#F0EEE8]/20 py-3">First 12 of {{ paymentDetails.length }} months</p>
                    </div>
                </div>
            </Transition>
        </div>
    </section>

    <!-- â”€â”€â”€ VIDEO ABOUT US â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section class="py-20 bg-[#1c1917] text-center">
        <div class="max-w-2xl mx-auto px-6">
            <p class="text-xs font-semibold text-[#E37A52] uppercase tracking-widest mb-4">About Us</p>
            <h2 class="text-2xl font-bold text-[#F0EEE8] mb-8 tracking-tight">See who we are</h2>
            <button @click="showVideo = true"
                    class="relative inline-flex items-center justify-center cursor-pointer group">
                <span class="absolute h-16 w-16 rounded-full bg-[#E37A52] opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all duration-300"></span>
                <span class="relative h-14 w-14 rounded-full bg-[#F0EEE8] flex items-center justify-center">
                    <svg class="w-5 h-5 fill-[#141211] ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </span>
            </button>
        </div>
    </section>

    <!-- â”€â”€â”€ GOOGLE TESTIMONIALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section ref="testimonials" class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                    <p class="text-xs font-semibold text-[#E37A52] uppercase tracking-widest mb-3">Reviews</p>
                    <h2 class="text-3xl lg:text-4xl font-bold text-[#141211] tracking-tight">
                        <span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span> Reviews
                    </h2>
                </div>
                <a href="https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6" target="_blank"
                   class="text-sm font-semibold text-[#141211] border border-[#141211]/15 hover:border-[#E37A52] hover:text-[#E37A52] px-5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0">
                    All Reviews
                    <span class="material-symbols-outlined" style="font-size:15px">arrow_outward</span>
                </a>
            </div>
            <div class="bg-[#F0EEE8]/50 rounded-xl p-6 lg:p-10 border border-[#141211]/5">
                <div class="elfsight-app-ebce6ca8-0720-4595-b6cd-c4d2cb07e6df" data-elfsight-app-lazy></div>
            </div>
        </div>
    </section>

    <!-- â”€â”€â”€ FACEBOOK TESTIMONIALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section class="py-24 bg-[#F0EEE8]">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                    <p class="text-xs font-semibold text-[#E37A52] uppercase tracking-widest mb-3">Reviews</p>
                    <h2 class="text-3xl lg:text-4xl font-bold text-[#141211] tracking-tight">Facebook Reviews</h2>
                    <div class="flex items-center gap-2 mt-3">
                        <div class="flex text-yellow-500">
                            <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <span class="text-sm text-[#141211]/50">({{ facebookTestimonials.length }} reviews)</span>
                    </div>
                </div>
                <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank"
                   class="text-sm font-semibold text-[#141211] border border-[#141211]/15 hover:border-[#E37A52] hover:text-[#E37A52] px-5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0">
                    All Reviews
                    <span class="material-symbols-outlined" style="font-size:15px">arrow_outward</span>
                </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div v-for="t in facebookTestimonials" :key="t.name"
                     class="bg-white rounded-xl p-5 border border-[#141211]/6 flex flex-col gap-3">
                    <div class="flex text-yellow-500">
                        <svg v-for="n in 5" :key="n" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <p class="text-sm text-[#141211]/65 leading-relaxed line-clamp-4">{{ t.content }}</p>
                    <button @click="activeTestimonial = t" class="text-[#E37A52] text-xs cursor-pointer text-left bg-none border-none p-0">Read more</button>
                    <div class="flex items-center gap-2.5 mt-auto pt-3 border-t border-[#141211]/6">
                        <div class="relative shrink-0">
                            <img :src="t.image" :alt="t.name" class="h-8 w-8 rounded-full object-cover">
                            <div class="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-px">
                                <svg class="w-3 h-3 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold text-xs text-[#141211]">{{ t.name }}</p>
                            <p class="text-xs text-[#141211]/40">{{ t.createdAt }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- â”€â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <section class="bg-[#E37A52] py-20">
        <div class="max-w-3xl mx-auto px-6 text-center">
            <h2 class="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">Ready to get started?</h2>
            <p class="text-white/65 mb-8 text-sm">Talk to our team today and find the mortgage solution that's right for you.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <Link :href="route('contact-us.index')">
                    <button class="bg-[#141211] hover:bg-[#2a2420] text-[#F0EEE8] font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm">
                        Get Pre-Qualified Today
                    </button>
                </Link>
                <a href="tel:+15045592821"
                   class="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm">
                    <span class="material-symbols-outlined" style="font-size:17px">phone</span>
                    +1 504-559-2821
                </a>
            </div>
        </div>
    </section>

    <Footer />

    <!-- â”€â”€â”€ TESTIMONIAL MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <Transition name="fade">
        <div v-if="activeTestimonial" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
             @click.self="activeTestimonial = null">
            <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full p-7">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <img :src="activeTestimonial.image" :alt="activeTestimonial.name" class="h-10 w-10 rounded-full object-cover">
                        <div>
                            <p class="font-semibold text-sm text-[#141211]">{{ activeTestimonial.name }}</p>
                            <p class="text-xs text-[#141211]/40">{{ activeTestimonial.createdAt }}</p>
                        </div>
                    </div>
                    <button @click="activeTestimonial = null" class="text-[#141211]/30 hover:text-[#141211] cursor-pointer">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex text-yellow-500 mb-4">
                    <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-sm text-[#141211]/65 leading-relaxed">{{ activeTestimonial.content }}</p>
            </div>
        </div>
    </Transition>

    <!-- â”€â”€â”€ VIDEO MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <Transition name="fade">
        <div v-if="showVideo" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
             @click.self="showVideo = false">
            <div class="w-full max-w-3xl bg-black rounded-xl overflow-hidden">
                <div class="flex justify-end p-2">
                    <button @click="showVideo = false" class="text-white/50 hover:text-white cursor-pointer">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
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
    background: rgba(240,238,232,0.05);
    border: 1px solid rgba(240,238,232,0.1);
    border-radius: 0.5rem;
    padding: 0.625rem 1rem;
    color: #F0EEE8;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;
}
.calc-input::placeholder { color: rgba(240,238,232,0.25); }
.calc-input:focus { border-color: #E37A52; }
.calc-input option { background: #1c1917; color: #F0EEE8; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.35s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(14px); }
.slide-up-leave-to  { opacity: 0; transform: translateY(14px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
