<script setup>
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';
import useCurrentYear from '@/composables/currentYear';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { currentYear } = useCurrentYear();
const expanded   = ref(null);
const currentIdx = ref(0);

const toggleExpand = (id) => {
    expanded.value = expanded.value === id ? null : id;
};

const goTo = (i) => {
    currentIdx.value = i;
    expanded.value   = null;
};
const prev = () => { if (currentIdx.value > 0) goTo(currentIdx.value - 1); };
const next = () => { if (currentIdx.value < programs.value.length - 1) goTo(currentIdx.value + 1); };

/* Touch swipe */
let touchStartX = 0;
const onTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
const onTouchEnd   = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
};

/* ── SVG icon paths (stroke, viewBox 0 0 24 24) ── */
const icons = {
    shield_home:  ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
    bank:         ['M3 21h18', 'M3 7l9-4 9 4', 'M4 10h16v11H4z', 'M9 10v11', 'M15 10v11'],
    medal:        ['M12 15a6 6 0 100-12 6 6 0 000 12z', 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12'],
    leaf:         ['M17 8C8 10 5.9 16.17 3.82 22c3.33-3.33 7.5-5 12.18-5 2.63 0 5 1.07 6.75 2.82', 'M3 22C5 17 8.5 12 17 8'],
    trending_up:  ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
    gem:          ['M6 3h12l4 6-10 13L2 9z', 'M2 9h20', 'M6 3l4 6m4 0l4-6'],
    check_circle: ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
    arrow_right:  ['M5 12h14', 'M12 5l7 7-7 7'],
    external:     ['M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'],
    chevron_down: ['M6 9l6 6 6-6'],
    send:         ['M22 2L11 13', 'M22 2L15 22 11 13 2 9l20-7z'],
    programs:     ['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', 'M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', 'M9 12h6', 'M9 16h4'],
};

/* ── Programs data ── */
const programs = computed(() => [
    {
        id: 'fha',
        title: 'Federal Housing Administration',
        subtitle: 'FHA Loan Program',
        icon: 'shield_home',
        color: 'green',
        img: '/img/programs/program1.webp',
        stats: [
            { label: 'Min. Credit Score', value: '500+' },
            { label: 'Min. Down Payment', value: '3.5%' },
        ],
        highlights: [
            'Credit 500–560: 10% down payment required',
            'Credit 560+: Only 3.5% down payment',
        ],
        sections: [
            {
                title: 'Loan Options',
                items: [
                    'Primary Home Residence',
                    'Refinance Options',
                    'Fixed Rate Loan',
                    'Adjustable Rate Mortgage (ARM)',
                    'Energy Efficient Mortgage',
                    'Home Equity Loans',
                    'Streamlines',
                    'Graduated Payment Mortgage',
                ],
            },
            {
                title: 'Special Programs For',
                items: ['Law Enforcement', 'Teachers', 'Firefighters', 'Emergency Medical Technicians'],
            },
        ],
        cta: { label: 'Learn More', href: 'https://www.hud.gov/buying/loans', external: true },
    },
    {
        id: 'conventional',
        title: 'Conventional Loan',
        subtitle: 'Conventional Program',
        icon: 'bank',
        color: 'green',
        img: '/img/programs/program2.webp',
        stats: [
            { label: 'FICO Score', value: '620+' },
            { label: 'Min. Down Payment', value: '3%' },
        ],
        highlights: [
            'Conventional 1% Down Program available',
            '0% Down Purchase Program',
            'Second Home Purchase: 5% down',
        ],
        sections: [
            {
                title: 'Eligible Properties & Programs',
                items: [
                    'Primary, Second & Investment Properties',
                    'Manufactured Homes',
                    'Adjustable Rate Program (ARM)',
                    'Fixed Rate Programs',
                    'Jumbo Loans',
                    'Low Down Payment Conventional',
                    'Renovation Loans',
                ],
            },
        ],
        cta: { label: 'Learn More', href: 'https://www.consumerfinance.gov/owning-a-home/conventional-loans/', external: true },
    },
    {
        id: 'va',
        title: 'Veteran Affairs Loan',
        subtitle: 'VA Loan Program',
        icon: 'medal',
        color: 'blue',
        img: '/img/programs/program3.webp',
        stats: [
            { label: 'Down Payment', value: '0%' },
            { label: 'Funding Fee', value: '2.3% / 3.3%' },
        ],
        highlights: [
            'Active Duty: Army, Navy, Air Force, Marines, Coast Guard',
            'Discharged Veterans with DD214 Form',
            'Surviving Spouses & Current Reserve/Guard',
            'Fee waived: Purple Heart & service-connected disabilities',
        ],
        sections: [
            {
                title: 'Eligible Properties',
                items: [
                    'Single Family Home',
                    'Condo',
                    'Manufactured Home',
                    'New Home Construction',
                    'Refinancing & Cash Out',
                    'Energy Efficient Homes',
                ],
            },
        ],
        cta: { label: 'Check Eligibility', href: 'https://www.va.gov/housing-assistance/home-loans/eligibility/', external: true },
    },
    {
        id: 'usda',
        title: 'USDA Loan',
        subtitle: 'Rural Development Program',
        icon: 'leaf',
        color: 'orange',
        img: '/img/programs/program4.webp',
        stats: [
            { label: 'Down Payment', value: '0%' },
            { label: 'Funding Fee', value: '1%' },
        ],
        highlights: [
            'Credit Score 620+ (under 620 may qualify under conditions)',
            'Property must be in an eligible USDA zone',
        ],
        sections: [
            {
                title: 'Eligible Properties',
                items: ['Primary Residence', 'Single Family Homes', 'Manufactured Properties'],
            },
        ],
        cta: { label: 'Apply Now', href: null, external: false },
    },
    {
        id: 'arm',
        title: 'ARM Loan',
        subtitle: 'Adjustable Rate Mortgage',
        icon: 'trending_up',
        color: 'orange',
        img: '/img/programs/program5.webp',
        stats: [
            { label: 'Min. Down Payment', value: '3%–5%' },
            { label: 'Buy-down Tiers', value: '3-2-1, 2-1' },
        ],
        highlights: [
            'Conventional ARM: 620+ credit score',
            'FHA ARM: 580+ credit score',
            'VA ARM: No minimum requirement',
            'Initial lower monthly payment that adjusts over time',
        ],
        sections: [
            {
                title: 'Eligible Properties',
                items: [
                    'Primary Residence',
                    'Second Home & Investment Properties',
                    'Purchase, Rate/Term & Cash-Out Refinance',
                    'Jumbo Loans',
                ],
            },
        ],
        cta: { label: 'Apply Now', href: null, external: false },
    },
    {
        id: 'jumbo',
        title: 'Jumbo Loan',
        subtitle: 'High-Value Mortgage Program',
        icon: 'gem',
        color: 'orange',
        stats: [
            { label: 'Min. Credit Score', value: '680' },
            { label: 'Avg. Down Payment', value: '10%' },
        ],
        highlights: [
            `Exceeds ${currentYear.value} conforming loan limit of $766,550`,
            'Average credit score required: 700+',
            'Minimum down payment: 3%–5%',
        ],
        sections: [
            {
                title: 'Eligible Properties',
                items: [
                    'Single Family Home (Outside Conforming Limit)',
                    'Vacation & Investment Properties',
                    'Primary & Secondary Properties',
                    'Cash-Out & Rate/Term Refinances',
                ],
            },
        ],
        cta: { label: 'Apply Now', href: null, external: false },
    },
]);

/* ── Color variant helpers (full static strings for Tailwind JIT) ── */
const variantIconBg = {
    green:  'bg-emerald-500/10 border-emerald-500/25',
    blue:   'bg-blue-500/10 border-blue-500/25',
    orange: 'bg-orange-500/10 border-orange-500/25',
};
const variantIconText = {
    green:  'text-emerald-500',
    blue:   'text-blue-400',
    orange: 'text-orange-400',
};
const variantBadge = {
    green:  'bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    blue:   'bg-blue-500/8 text-blue-600 dark:text-blue-400 border-blue-500/20',
    orange: 'bg-orange-500/8 text-orange-600 dark:text-orange-400 border-orange-500/20',
};
const variantDot = {
    green:  'bg-emerald-500',
    blue:   'bg-blue-400',
    orange: 'bg-orange-400',
};
const variantExpandBtn = {
    green:  'border-emerald-500/25 bg-emerald-500/5 text-emerald-500',
    blue:   'border-blue-500/25 bg-blue-500/5 text-blue-400',
    orange: 'border-orange-500/25 bg-orange-500/5 text-orange-400',
};
const variantCta = {
    green:  'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white border border-emerald-500/25 hover:border-emerald-500',
    blue:   'bg-blue-500/10 hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-white border border-blue-500/25 hover:border-blue-500',
    orange: 'bg-orange-500/10 hover:bg-orange-500 text-orange-600 dark:text-orange-400 hover:text-white border border-orange-500/25 hover:border-orange-500',
};

/* ── Scroll reveal ── */
let revealObserver = null;
onMounted(() => {
    revealObserver = new IntersectionObserver(
        (entries) => entries.forEach(e => e.target.classList.toggle('is-visible', e.isIntersecting)),
        { threshold: [0, 0.1] }
    );
    document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));
});
onUnmounted(() => { if (revealObserver) revealObserver.disconnect(); });
</script>

<template>
    <Head title="Loan Programs" />
    <NavigationDrawerGuest />
    <GuestNav />

    <!-- ══════════════════════════════════════
         HERO HEADER
    ═══════════════════════════════════════ -->
    <section class="bg-light dark:bg-dark pt-36 pb-20">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <!-- Pill badge -->
            <div class="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-7 reveal-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                    <path v-for="d in icons.programs" :key="d" :d="d"/>
                </svg>
                Loan Programs
            </div>

            <h1 class="reveal-item text-5xl lg:text-7xl font-bold text-dark dark:text-light leading-tight tracking-tight mb-5">
                Find Your Perfect<br><span class="text-primary">Loan Program</span>
            </h1>
            <p class="reveal-item text-dark/45 dark:text-light/40 text-lg max-w-lg mx-auto leading-relaxed">
                Explore our diverse range of loan products designed to meet your unique financial needs. We shop 50+ lenders to find your best rate.
            </p>

            <!-- Stats row -->
            <div class="reveal-item mt-10 inline-flex items-center gap-0 border border-dark/8 dark:border-light/8 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/60 dark:bg-dark/60">
                <div v-for="(s, i) in [{ v: '6', l: 'Programs' }, { v: '50+', l: 'Lenders' }, { v: '0%', l: 'VA / USDA Down' }]" :key="s.l"
                     :class="['px-6 py-4 text-center', i < 2 ? 'border-r border-dark/8 dark:border-light/8' : '']">
                    <p class="text-xl font-bold text-dark dark:text-light">{{ s.v }}</p>
                    <p class="text-dark/35 dark:text-light/30 text-xs uppercase tracking-wider mt-0.5">{{ s.l }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ══════════════════════════════════════
         PROGRAMS CAROUSEL
    ═══════════════════════════════════════ -->
    <section class="bg-light dark:bg-dark pb-24">
        <div class="max-w-3xl mx-auto px-6">

            <!-- Track -->
            <div class="overflow-hidden rounded-3xl"
                 @touchstart.passive="onTouchStart"
                 @touchend.passive="onTouchEnd">
                <div class="flex transition-transform duration-500"
                     style="transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);"
                     :style="{ transform: `translateX(-${currentIdx * 100}%)` }">

                    <div v-for="p in programs" :key="p.id"
                         class="w-full shrink-0 bg-white/80 dark:bg-white/[0.03] border border-dark/8 dark:border-light/8 rounded-3xl overflow-hidden">

                        <!-- ── Card Header ── -->
                        <div class="p-7 pb-5">
                            <div class="flex items-start justify-between gap-4 mb-5">
                                <div class="h-13 w-13 rounded-2xl flex items-center justify-center border shrink-0"
                                     :class="variantIconBg[p.color]">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                         class="w-6 h-6" :class="variantIconText[p.color]">
                                        <path v-for="d in icons[p.icon]" :key="d" :d="d"/>
                                    </svg>
                                </div>
                                <span class="text-xs font-semibold px-3 py-1.5 rounded-full border"
                                      :class="variantBadge[p.color]">
                                    {{ p.subtitle }}
                                </span>
                            </div>
                            <h3 class="text-dark dark:text-light text-2xl font-bold leading-tight">{{ p.title }}</h3>
                        </div>

                        <!-- Divider -->
                        <div class="h-px mx-7 bg-dark/8 dark:bg-light/8"></div>

                        <!-- ── Stat Chips ── -->
                        <div class="px-7 py-5 flex flex-wrap gap-2">
                            <div v-for="stat in p.stats" :key="stat.label"
                                 class="flex items-center gap-2 bg-dark/4 dark:bg-light/4 border border-dark/8 dark:border-light/7 rounded-full px-3.5 py-1.5">
                                <span class="text-dark/40 dark:text-light/35 text-xs">{{ stat.label }}:</span>
                                <span class="font-bold text-xs text-dark dark:text-light">{{ stat.value }}</span>
                            </div>
                        </div>

                        <!-- ── Highlights ── -->
                        <div class="px-7 pb-5 space-y-2.5">
                            <div v-for="item in p.highlights" :key="item"
                                 class="flex items-start gap-2.5">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                     class="w-4 h-4 mt-0.5 shrink-0" :class="variantIconText[p.color]">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span class="text-dark/65 dark:text-light/55 text-sm leading-snug">{{ item }}</span>
                            </div>
                        </div>

                        <!-- ── Expandable Details ── -->
                        <div class="mx-7 mb-5">
                            <button @click="toggleExpand(p.id)"
                                    class="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border transition-all duration-200 cursor-pointer"
                                    :class="expanded === p.id
                                        ? variantExpandBtn[p.color]
                                        : 'border-dark/8 dark:border-light/7 bg-dark/2 dark:bg-light/2 hover:bg-dark/4 dark:hover:bg-light/4 text-dark/45 dark:text-light/35'">
                                <span class="text-xs font-semibold uppercase tracking-wider">
                                    {{ expanded === p.id ? 'Hide Details' : 'View All Details' }}
                                </span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                     class="w-4 h-4 transition-transform duration-300"
                                     :class="expanded === p.id ? 'rotate-180' : ''">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </button>

                            <Transition name="accordion">
                                <div v-if="expanded === p.id" class="pt-4 space-y-5">
                                    <div v-for="section in p.sections" :key="section.title">
                                        <p class="text-xs font-bold uppercase tracking-widest mb-3" :class="variantIconText[p.color]">
                                            {{ section.title }}
                                        </p>
                                        <ul class="grid grid-cols-1 gap-1.5">
                                            <li v-for="item in section.items" :key="item"
                                                class="flex items-center gap-2.5 text-sm text-dark/65 dark:text-light/50">
                                                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="variantDot[p.color]"></span>
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <!-- ── CTA Button ── -->
                        <div class="px-7 pb-7">
                            <template v-if="p.cta.external">
                                <a :href="p.cta.href" target="_blank"
                                   class="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200"
                                   :class="variantCta[p.color]">
                                    {{ p.cta.label }}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                                        <path v-for="d in icons.external" :key="d" :d="d"/>
                                    </svg>
                                </a>
                            </template>
                            <template v-else>
                                <Link :href="route('contact-us.index')"
                                      class="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 bg-primary hover:bg-primary/90 text-light">
                                    {{ p.cta.label }}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                                        <path v-for="d in icons.arrow_right" :key="d" :d="d"/>
                                    </svg>
                                </Link>
                            </template>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Controls -->
            <div class="mt-8 flex items-center justify-between">

                <!-- Prev -->
                <button @click="prev" :disabled="currentIdx === 0"
                        class="h-10 w-10 rounded-2xl border border-dark/8 dark:border-light/8 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed hover:border-dark/20 dark:hover:border-light/20 hover:bg-dark/4 dark:hover:bg-light/4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-dark dark:text-light">
                        <path d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>

                <!-- Dots -->
                <div class="flex items-center gap-2">
                    <button v-for="(p, i) in programs" :key="p.id"
                            @click="goTo(i)"
                            class="rounded-full transition-all duration-300 cursor-pointer"
                            :class="currentIdx === i
                                ? ['w-6 h-2', variantDot[programs[currentIdx].color]]
                                : 'w-2 h-2 bg-dark/15 dark:bg-light/15 hover:bg-dark/30 dark:hover:bg-light/30'">
                    </button>
                </div>

                <!-- Next -->
                <button @click="next" :disabled="currentIdx === programs.length - 1"
                        class="h-10 w-10 rounded-2xl border border-dark/8 dark:border-light/8 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed hover:border-dark/20 dark:hover:border-light/20 hover:bg-dark/4 dark:hover:bg-light/4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-dark dark:text-light">
                        <path d="M9 5l7 7-7 7"/>
                    </svg>
                </button>

            </div>

            <!-- Counter -->
            <p class="text-center text-dark/30 dark:text-light/25 text-xs mt-4 uppercase tracking-widest">
                {{ currentIdx + 1 }} / {{ programs.length }}
            </p>

        </div>
    </section>

    <!-- ══════════════════════════════════════
         CTA BANNER
    ═══════════════════════════════════════ -->
    <section class="bg-light dark:bg-dark pb-24">
        <div class="max-w-5xl mx-auto px-6">
            <div class="reveal-item bg-primary rounded-3xl p-10 lg:p-16 text-center">
                <div>
                    <div class="inline-flex items-center gap-2 border border-white/20 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-light mb-6">
                        Free Consultation
                    </div>
                    <h2 class="text-3xl lg:text-5xl font-bold text-light leading-tight mb-4">
                        Not Sure Which Program Fits?
                    </h2>
                    <p class="text-light/70 mb-10 max-w-md mx-auto text-base leading-relaxed">
                        Our team will review your situation and match you with the best loan program at the lowest available rate.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link :href="route('contact-us.index')"
                              class="inline-flex items-center justify-center gap-2 bg-light text-dark font-bold px-8 py-3.5 rounded-2xl hover:bg-light/90 transition-colors duration-200">
                            Get a Free Consultation
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <path v-for="d in icons.arrow_right" :key="d" :d="d"/>
                            </svg>
                        </Link>
                        <a href="tel:+15045592821"
                           class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-light font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            (504) 559-2821
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</template>

<style scoped>
/* Scroll reveal */
.reveal-item {
    opacity: 0.15;
    transform: translateY(18px);
    transition: opacity 0.65s ease, transform 0.65s ease;
}
.reveal-item.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Accordion expand/collapse */
.accordion-enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.accordion-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.accordion-enter-from,
.accordion-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
.accordion-enter-to,
.accordion-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
