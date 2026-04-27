<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { useColorMode } from '@/composables/colorMode';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const scrolled = ref(false);
const menuOpen = ref(false);
const { mode, init, cycle } = useColorMode();

const emits = defineEmits([
    'scroll-our-services-section',
    'scroll-mortgage-loan-calculator-section',
    'scroll-testimonials-section',
]);

const onScroll = () => { scrolled.value = window.scrollY > 60; };
onMounted(() => {
    window.addEventListener('scroll', onScroll);
    init();
});
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const openMenu = () => {
    menuOpen.value = true;
    document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
    menuOpen.value = false;
    document.body.style.overflow = '';
};

const handleScroll = (event) => {
    closeMenu();
    emits(event);
};

const navLinks = [
    { label: 'Home',          route: 'welcome' },
    { label: 'Loan Programs', route: 'programs.index' },
    { label: 'Our Team',      route: 'our-team.index' },
    { label: 'About Us',      route: 'about-us.index' },
    { label: 'Contact Us',    route: 'contact-us.index' },
];

const modeIcon  = { dark: 'dark_mode', light: 'light_mode', system: 'devices' };
const modeLabel = { dark: 'Dark',      light: 'Light',      system: 'System' };
</script>

<template>
    <!-- ── Fixed nav wrapper ───────────────────────────── -->
    <div class="fixed top-0 left-0 right-0 z-40">

        <!-- Top info bar (desktop) -->
        <div class="py-1.5 px-4 text-xs hidden lg:block transition-all duration-300" :class="scrolled ? 'bg-dark shadow-2xl shadow-dark/50' : 'bg-transparent'">
            <div class="max-w-6xl mx-auto flex items-center justify-between">
                <div class="flex items-center gap-5">
                    <a href="mailto:Shaun@brignacmortgage.com"
                       class="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                        <span class="material-symbols-outlined text-primary" style="font-size:14px">mail</span>
                        Shaun@brignacmortgage.com
                    </a>
                    <a href="tel:+15045592821"
                       class="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                        <span class="material-symbols-outlined text-primary" style="font-size:14px">phone</span>
                        +1 504-559-2821
                    </a>
                </div>
                <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank"
                   class="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                    <span class="material-symbols-outlined text-primary" style="font-size:14px">location_on</span>
                    21121 Waterfront East Dr, Maurepas, LA
                </a>
            </div>
        </div>

        <!-- Main nav -->
        <nav :class="scrolled ? 'bg-dark shadow-2xl shadow-dark/50' : 'bg-transparent'"
             class="transition-all duration-300">
            <div class="max-w-6xl mx-auto px-4 lg:px-0 h-16 flex items-center justify-between">

                <!-- Logo -->
                <Link :href="route('welcome')" class="shrink-0">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-9 w-auto">
                </Link>

                <!-- Right controls -->
                <div class="flex items-center gap-2">
                    <!-- Mode toggle -->
                    <button @click="cycle"
                            :title="modeLabel[mode] + ' mode'"
                            class="h-9 w-9 rounded-lg border border-light/10 hover:border-primary/40 flex items-center justify-center text-light/50 hover:text-primary transition-all duration-200 cursor-pointer">
                        <span class="material-symbols-outlined" style="font-size:17px">{{ modeIcon[mode] }}</span>
                    </button>

                    <!-- CTA (desktop) -->
                    <Link :href="route('contact-us.index')" class="hidden lg:inline-flex ml-2">
                        <PrimaryButton>
                            <span>Get Pre-Qualified</span>
                        </PrimaryButton>
                    </Link>

                    <!-- Hamburger -->
                    <button @click="openMenu"
                            id="hamburger-btn"
                            class="ml-2 h-9 w-9 flex flex-col items-center justify-center gap-1.25 cursor-pointer group"
                            aria-label="Open menu">
                        <span class="block w-6 h-px bg-light/70 group-hover:bg-primary transition-colors duration-200"></span>
                        <span class="block w-4 h-px bg-light/70 group-hover:bg-primary transition-colors duration-200 self-end"></span>
                    </button>
                </div>
            </div>
        </nav>
    </div>

    <!-- Spacer -->
    <div class="h-24 lg:h-26"></div>

    <!-- ── Full-screen overlay menu ─────────────────────── -->
    <Transition name="ripple">
        <div v-if="menuOpen"
             class="fixed inset-0 z-50 bg-dark flex flex-col">

            <!-- Menu header -->
            <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-light/6 shrink-0">
                <Link :href="route('welcome')" @click="closeMenu">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-8 w-auto">
                </Link>
                <button @click="closeMenu"
                        class="h-10 w-10 rounded-lg border border-light/12 hover:border-primary/50 flex items-center justify-center text-light/60 hover:text-primary transition-all duration-200 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Menu body -->
            <div class="flex flex-col lg:flex-row flex-1 overflow-y-auto">

                <!-- Nav links -->
                <nav class="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12">
                    <p class="text-light/25 text-xs font-semibold tracking-widest uppercase mb-8">Navigation</p>
                    <div class="flex flex-col">
                        <Link v-for="(link, i) in navLinks" :key="link.route"
                              :href="route(link.route)"
                              @click="closeMenu"
                              class="menu-link group flex items-center justify-between py-4 border-b border-light/6 text-light/75 hover:text-primary transition-colors duration-200"
                              :style="{ animationDelay: `${0.08 + i * 0.07}s` }">
                            <span class="text-4xl lg:text-6xl font-bold tracking-tight">{{ link.label }}</span>
                            <span class="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" style="font-size:28px">arrow_forward</span>
                        </Link>
                    </div>

                    <!-- Quick scroll links -->
                    <div class="mt-8 flex flex-wrap gap-2">
                        <button @click="handleScroll('scroll-our-services-section')"
                                class="text-xs text-light/35 hover:text-secondary border border-light/8 hover:border-secondary/40 px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer">
                            Our Services
                        </button>
                        <button @click="handleScroll('scroll-mortgage-loan-calculator-section')"
                                class="text-xs text-light/35 hover:text-secondary border border-light/8 hover:border-secondary/40 px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer">
                            Calculator
                        </button>
                        <button @click="handleScroll('scroll-testimonials-section')"
                                class="text-xs text-light/35 hover:text-secondary border border-light/8 hover:border-secondary/40 px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer">
                            Testimonials
                        </button>
                    </div>
                </nav>

                <!-- Right panel -->
                <div class="lg:w-76 border-t lg:border-t-0 lg:border-l border-light/6 px-8 lg:px-10 py-12 flex flex-col justify-between">
                    <div>
                        <p class="text-light/25 text-xs font-semibold tracking-widest uppercase mb-7">Contact</p>
                        <div class="flex flex-col gap-5 menu-contact">
                            <a href="tel:+15045592821"
                               class="flex items-center gap-3 text-light/65 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-primary shrink-0" style="font-size:18px">phone</span>
                                <span class="text-sm">+1 504-559-2821</span>
                            </a>
                            <a href="mailto:Shaun@brignacmortgage.com"
                               class="flex items-center gap-3 text-light/65 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-primary shrink-0" style="font-size:18px">mail</span>
                                <span class="text-sm">Shaun@brignacmortgage.com</span>
                            </a>
                            <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank"
                               class="flex items-start gap-3 text-light/65 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-primary shrink-0 mt-0.5" style="font-size:18px">location_on</span>
                                <span class="text-sm leading-relaxed">21121 Waterfront East Dr<br>Maurepas, LA 70449</span>
                            </a>
                        </div>
                    </div>

                    <div class="mt-10">
                        <Link :href="route('contact-us.index')" @click="closeMenu">
                            <PrimaryButton class="w-full! py-4!">
                                <span>Get Pre-Qualified</span>
                            </PrimaryButton>
                        </Link>
                        <p class="text-light/20 text-xs text-center mt-4">NMLS #1928157 · Licensed in Louisiana</p>
                    </div>
                </div>

            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* Ripple: circle grows from hamburger position (top-right) */
.ripple-enter-active {
    animation: rippleOpen 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.ripple-leave-active {
    animation: rippleClose 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes rippleOpen {
    from { clip-path: circle(0%   at calc(100% - 3.5rem) 3.5rem); }
    to   { clip-path: circle(170% at calc(100% - 3.5rem) 3.5rem); }
}
@keyframes rippleClose {
    from { clip-path: circle(170% at calc(100% - 3.5rem) 3.5rem); }
    to   { clip-path: circle(0%   at calc(100% - 3.5rem) 3.5rem); }
}

/* Nav links stagger in */
.menu-link {
    animation: linkSlideUp 0.4s ease both;
}
@keyframes linkSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* Contact items fade in */
.menu-contact > * {
    animation: linkSlideUp 0.4s ease both;
    animation-delay: 0.45s;
}
</style>
