<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { drawerNavState } from '@/composables/drawersStates';

const scrolled = ref(false);

const emits = defineEmits([
    'scroll-our-services-section',
    'scroll-mortgage-loan-calculator-section',
    'scroll-testimonials-section',
]);

const onScroll = () => { scrolled.value = window.scrollY > 50; };
onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
    <!-- Top bar -->
    <div class="fixed top-0 left-0 right-0 z-50">
        <div class="bg-gray-900/95 text-white py-1.5 px-4 text-xs">
            <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <a href="mailto:Shaun@brignacmortgage.com" class="flex items-center gap-1 hover:text-green-400 transition-colors">
                        <span class="material-symbols-outlined text-base text-green-500" style="font-size:16px">mail</span>
                        Shaun@brignacmortgage.com
                    </a>
                    <a href="tel:+15045592821" class="flex items-center gap-1 hover:text-green-400 transition-colors">
                        <span class="material-symbols-outlined text-green-500" style="font-size:16px">phone</span>
                        +1 504-559-2821
                    </a>
                </div>
                <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank" class="hidden lg:flex items-center gap-1 hover:text-green-400 transition-colors">
                    <span class="material-symbols-outlined text-green-500" style="font-size:16px">location_on</span>
                    21121 Waterfront East Dr, Maurepas, LA
                </a>
            </div>
        </div>

        <!-- Main nav -->
        <nav :class="scrolled ? 'bg-gray-900/98 shadow-xl' : 'bg-gray-900/80 backdrop-blur-sm'"
             class="transition-all duration-300 hidden lg:block">
            <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                <!-- Logo -->
                <Link :href="route('welcome')">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-10 w-auto">
                </Link>

                <!-- Desktop Links -->
                <div class="flex items-center gap-7 text-sm font-medium text-white">

                    <Link :href="route('welcome')" class="nav-link">Home</Link>
                    <Link :href="route('programs.index')" class="nav-link">Loan Programs</Link>

                    <!-- Services dropdown -->
                    <div class="relative group">
                        <button class="nav-link flex items-center gap-0.5 pb-1">
                            Services
                            <span class="material-symbols-outlined" style="font-size:18px">keyboard_arrow_down</span>
                        </button>
                        <div class="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3 min-w-52 z-50">
                            <div class="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                                <button @click="$emit('scroll-our-services-section')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">home_work</span>
                                    Our Services
                                </button>
                                <Link :href="route('contact-us.index')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">support_agent</span>
                                    Contact Us
                                </Link>
                                <button @click="$emit('scroll-mortgage-loan-calculator-section')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">calculate</span>
                                    Mortgage Calculator
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Our Team dropdown -->
                    <div class="relative group">
                        <button class="nav-link flex items-center gap-0.5 pb-1">
                            Our Team
                            <span class="material-symbols-outlined" style="font-size:18px">keyboard_arrow_down</span>
                        </button>
                        <div class="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3 min-w-44 z-50">
                            <div class="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                                <Link :href="route('our-team.index')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">group</span>
                                    Our Team
                                </Link>
                                <Link :href="route('about-us.index')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">apartment</span>
                                    About Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    <!-- Legal dropdown -->
                    <div class="relative group">
                        <button class="nav-link flex items-center gap-0.5 pb-1">
                            Legal
                            <span class="material-symbols-outlined" style="font-size:18px">keyboard_arrow_down</span>
                        </button>
                        <div class="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3 min-w-48 z-50">
                            <div class="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                                <Link :href="route('privacy-policy-website')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">contract</span>
                                    Privacy Policy
                                </Link>
                                <Link :href="route('disclaimers-website')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">gavel</span>
                                    Disclaimers
                                </Link>
                                <Link :href="route('terms-of-use-website')" class="dropdown-item">
                                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">contract_edit</span>
                                    Terms of Use
                                </Link>
                            </div>
                        </div>
                    </div>

                    <button @click="$emit('scroll-testimonials-section')" class="nav-link">
                        Testimonials
                    </button>
                </div>

                <!-- CTA -->
                <Link :href="route('contact-us.index')">
                    <button class="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer">
                        Apply Now
                    </button>
                </Link>
            </div>
        </nav>

        <!-- Mobile top bar -->
        <nav :class="scrolled ? 'bg-gray-900/98 shadow-xl' : 'bg-gray-900/80 backdrop-blur-sm'"
             class="transition-all duration-300 lg:hidden">
            <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link :href="route('welcome')">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-8 w-auto">
                </Link>
                <button @click="drawerNavState = !drawerNavState" class="text-white p-1 cursor-pointer">
                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </button>
            </div>
        </nav>
    </div>

    <!-- Spacer to prevent content overlap -->
    <div class="h-22 lg:h-26"></div>
</template>

<style scoped>
.nav-link {
    position: relative;
    color: white;
    padding-bottom: 4px;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;
}
.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #22c55e;
    transition: width 0.3s ease;
}
.nav-link:hover::after { width: 100%; }
.nav-link:hover { color: #86efac; }

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 16px;
    font-size: 0.875rem;
    color: #374151;
    transition: background-color 0.15s;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
}
.dropdown-item:hover { background-color: #f0fdf4; color: #15803d; }
</style>
