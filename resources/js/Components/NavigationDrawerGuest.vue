<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { drawerNavState } from '@/composables/drawersStates';

const openSection = ref(null);

const toggle = (section) => {
    openSection.value = openSection.value === section ? null : section;
};

const close = () => { drawerNavState.value = false; };

const emits = defineEmits([
    'scroll-our-services-section',
    'scroll-mortgage-loan-calculator-section',
    'scroll-testimonials-section',
]);

const scrollTo = (event) => {
    close();
    emits(event);
};
</script>

<template>
    <!-- Backdrop -->
    <Transition name="fade">
        <div v-if="drawerNavState"
             class="fixed inset-0 bg-black/60 z-50 lg:hidden"
             @click="close">
        </div>
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
        <div v-if="drawerNavState"
             class="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 lg:hidden flex flex-col shadow-2xl overflow-y-auto">

            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-900">
                <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-8 w-auto">
                <button @click="close" class="text-white p-1 cursor-pointer">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Nav Items -->
            <nav class="flex-1 py-2">

                <Link :href="route('welcome')" @click="close" class="drawer-link">
                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">home</span>
                    Home
                </Link>

                <Link :href="route('programs.index')" @click="close" class="drawer-link">
                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">real_estate_agent</span>
                    Loan Programs
                </Link>

                <!-- Services accordion -->
                <button @click="toggle('services')" class="drawer-accordion">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-green-500" style="font-size:20px">home_work</span>
                        Services
                    </div>
                    <span class="material-symbols-outlined text-gray-400 transition-transform duration-200"
                          :class="openSection === 'services' ? 'rotate-180' : ''"
                          style="font-size:20px">keyboard_arrow_down</span>
                </button>
                <Transition name="accordion">
                    <div v-if="openSection === 'services'" class="bg-gray-50 border-l-2 border-green-500 ml-4">
                        <button @click="scrollTo('scroll-our-services-section')" class="drawer-sub-link">Our Services</button>
                        <Link :href="route('contact-us.index')" @click="close" class="drawer-sub-link">Contact Us</Link>
                        <button @click="scrollTo('scroll-mortgage-loan-calculator-section')" class="drawer-sub-link">Mortgage Calculator</button>
                    </div>
                </Transition>

                <!-- Our Team accordion -->
                <button @click="toggle('team')" class="drawer-accordion">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-green-500" style="font-size:20px">group</span>
                        Our Team
                    </div>
                    <span class="material-symbols-outlined text-gray-400 transition-transform duration-200"
                          :class="openSection === 'team' ? 'rotate-180' : ''"
                          style="font-size:20px">keyboard_arrow_down</span>
                </button>
                <Transition name="accordion">
                    <div v-if="openSection === 'team'" class="bg-gray-50 border-l-2 border-green-500 ml-4">
                        <Link :href="route('our-team.index')" @click="close" class="drawer-sub-link">Our Team</Link>
                        <Link :href="route('about-us.index')" @click="close" class="drawer-sub-link">About Us</Link>
                    </div>
                </Transition>

                <!-- Legal accordion -->
                <button @click="toggle('legal')" class="drawer-accordion">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-green-500" style="font-size:20px">gavel</span>
                        Legal
                    </div>
                    <span class="material-symbols-outlined text-gray-400 transition-transform duration-200"
                          :class="openSection === 'legal' ? 'rotate-180' : ''"
                          style="font-size:20px">keyboard_arrow_down</span>
                </button>
                <Transition name="accordion">
                    <div v-if="openSection === 'legal'" class="bg-gray-50 border-l-2 border-green-500 ml-4">
                        <Link :href="route('privacy-policy-website')" @click="close" class="drawer-sub-link">Privacy Policy</Link>
                        <Link :href="route('disclaimers-website')" @click="close" class="drawer-sub-link">Disclaimers</Link>
                        <Link :href="route('terms-of-use-website')" @click="close" class="drawer-sub-link">Terms of Use</Link>
                    </div>
                </Transition>

                <button @click="scrollTo('scroll-testimonials-section')" class="drawer-link">
                    <span class="material-symbols-outlined text-green-500" style="font-size:20px">star</span>
                    Testimonials
                </button>
            </nav>

            <!-- CTA -->
            <div class="p-4 border-t border-gray-100">
                <Link :href="route('contact-us.index')" @click="close">
                    <button class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition-colors duration-200 cursor-pointer">
                        Apply Now
                    </button>
                </Link>
                <div class="mt-4 flex flex-col gap-2 text-sm text-gray-500">
                    <a href="tel:+15045592821" class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-green-500" style="font-size:18px">phone</span>
                        +1 504-559-2821
                    </a>
                    <a href="mailto:Shaun@brignacmortgage.com" class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-green-500" style="font-size:18px">mail</span>
                        Shaun@brignacmortgage.com
                    </a>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.drawer-link {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 13px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.15s;
    text-decoration: none;
}
.drawer-link:hover { background-color: #f0fdf4; color: #16a34a; }

.drawer-accordion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 13px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    transition: background-color 0.15s;
}
.drawer-accordion:hover { background-color: #f0fdf4; color: #16a34a; }

.drawer-sub-link {
    display: block;
    width: 100%;
    padding: 10px 20px;
    font-size: 0.85rem;
    color: #6b7280;
    border-bottom: 1px solid #f3f4f6;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s;
}
.drawer-sub-link:hover { color: #16a34a; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

.accordion-enter-active, .accordion-leave-active { transition: all 0.2s ease; overflow: hidden; }
.accordion-enter-from, .accordion-leave-to { max-height: 0; opacity: 0; }
.accordion-enter-to, .accordion-leave-from { max-height: 200px; opacity: 1; }
</style>
