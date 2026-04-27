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
    <div class="fixed top-0 left-0 right-0 z-50">
        <!-- Top contact bar -->
        <div class="bg-[#141211] text-[#F0EEE8]/55 py-2 px-4 text-xs border-b border-white/5">
            <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div class="flex items-center gap-5">
                    <a href="mailto:Shaun@brignacmortgage.com" class="flex items-center gap-1.5 hover:text-[#E37A52] transition-colors">
                        <span class="material-symbols-outlined text-[#E37A52]" style="font-size:14px">mail</span>
                        Shaun@brignacmortgage.com
                    </a>
                    <a href="tel:+15045592821" class="flex items-center gap-1.5 hover:text-[#E37A52] transition-colors">
                        <span class="material-symbols-outlined text-[#E37A52]" style="font-size:14px">phone</span>
                        +1 504-559-2821
                    </a>
                </div>
                <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank" class="hidden lg:flex items-center gap-1.5 hover:text-[#E37A52] transition-colors">
                    <span class="material-symbols-outlined text-[#E37A52]" style="font-size:14px">location_on</span>
                    21121 Waterfront East Dr, Maurepas, LA
                </a>
            </div>
        </div>
        <!-- Main nav — desktop -->
        <nav :class="scrolled ? 'bg-[#F0EEE8]/98 shadow-sm' : 'bg-[#F0EEE8]/95 backdrop-blur-md'"
             class="transition-all duration-300 hidden lg:block border-b border-[#141211]/8">
            <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link :href="route('welcome')">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-9 w-auto">
                </Link>

                <div class="flex items-center gap-8 text-sm font-medium text-[#141211]">
                    <Link :href="route('welcome')" class="nav-link">Home</Link>
                    <Link :href="route('programs.index')" class="nav-link">Loan Programs</Link>

                    <div class="relative group">
                        <button class="nav-link flex items-center gap-0.5">
                            Services
                            <span class="material-symbols-outlined opacity-40" style="font-size:16px">expand_more</span>
                        </button>
                        <div class="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3 min-w-52 z-50">
                            <div class="bg-[#F0EEE8] rounded-xl shadow-xl border border-[#141211]/8 py-1.5 overflow-hidden">
                                <button @click="$emit('scroll-our-services-section')" class="dropdown-item">Our Services</button>
                                <Link :href="route('contact-us.index')" class="dropdown-item">Contact Us</Link>
                                <button @click="$emit('scroll-mortgage-loan-calculator-section')" class="dropdown-item">Mortgage Calculator</button>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="nav-link flex items-center gap-0.5">
                            Company
                            <span class="material-symbols-outlined opacity-40" style="font-size:16px">expand_more</span>
                        </button>
                        <div class="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3 min-w-44 z-50">
                            <div class="bg-[#F0EEE8] rounded-xl shadow-xl border border-[#141211]/8 py-1.5 overflow-hidden">
                                <Link :href="route('our-team.index')" class="dropdown-item">Our Team</Link>
                                <Link :href="route('about-us.index')" class="dropdown-item">About Us</Link>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="nav-link flex items-center gap-0.5">
                            Legal
                            <span class="material-symbols-outlined opacity-40" style="font-size:16px">expand_more</span>
                        </button>
                        <div class="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3 min-w-48 z-50">
                            <div class="bg-[#F0EEE8] rounded-xl shadow-xl border border-[#141211]/8 py-1.5 overflow-hidden">
                                <Link :href="route('privacy-policy-website')" class="dropdown-item">Privacy Policy</Link>
                                <Link :href="route('disclaimers-website')" class="dropdown-item">Disclaimers</Link>
                                <Link :href="route('terms-of-use-website')" class="dropdown-item">Terms of Use</Link>
                            </div>
                        </div>
                    </div>

                    <button @click="$emit('scroll-testimonials-section')" class="nav-link">Testimonials</button>
                </div>

                <Link :href="route('contact-us.index')">
                    <button class="bg-[#E37A52] hover:bg-[#cc6b44] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                        Apply Now
                    </button>
                </Link>
            </div>
        </nav>

        <!-- Mobile nav -->
        <nav :class="scrolled ? 'bg-[#F0EEE8]/98 shadow-sm' : 'bg-[#F0EEE8]/95 backdrop-blur-md'"
             class="transition-all duration-300 lg:hidden border-b border-[#141211]/8">
            <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link :href="route('welcome')">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-8 w-auto">
                </Link>
                <button @click="drawerNavState = !drawerNavState" class="text-[#141211] p-1 cursor-pointer">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </button>
            </div>
        </nav>
    </div>

    <!-- Spacer -->
    <div class="h-22 lg:h-24"></div>
</template>

<style scoped>
.nav-link {
    position: relative;
    color: #141211;
    padding-bottom: 2px;
    opacity: 0.65;
    transition: opacity 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;
    text-decoration: none;
}
.nav-link:hover { opacity: 1; }
.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1.5px;
    background-color: #E37A52;
    transition: width 0.25s ease;
}
.nav-link:hover::after { width: 100%; }

.dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 9px 16px;
    font-size: 0.875rem;
    color: #141211;
    opacity: 0.75;
    transition: opacity 0.15s, color 0.15s, background-color 0.15s;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    font-weight: 450;
}
.dropdown-item:hover {
    opacity: 1;
    background-color: rgba(227, 122, 82, 0.07);
    color: #E37A52;
}
</style>
