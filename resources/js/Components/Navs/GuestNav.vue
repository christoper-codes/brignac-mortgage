<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Link, router, usePage } from '@inertiajs/vue3';
import { drawerNavState } from '@/composables/drawersStates';

const scrolledDown = ref(false);
const menuServices = ref(false);
const menuTeam = ref(false);
const menuLegal = ref(false);
const emits = defineEmits(['scroll-our-services-section', 'scroll-contact-us-section', 'scroll-mortgage-loan-calculator-section', 'scroll-testimonials-section'])
const navigateToWelcomeAndScroll = () => {
    if (routeName.value == '/') {
        emits('scroll-our-services-section');
    } else {
        router.visit('/', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-our-services-section'));
                }, 700);
            },
        });
    }
};

const navigateToMortgageLoanCalculatorAndScroll = () => {
    if (routeName.value == '/') {
        emits('scroll-mortgage-loan-calculator-section');
    } else {
        router.visit('/', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-mortgage-loan-calculator-section'));
                }, 300);
            },
        });
    }
};

const navigateToTestimonialsAndScroll = () => {
    if (routeName.value == '/') {
        emits('scroll-testimonials-section');
    } else {
        router.visit('/', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-testimonials-section'));
                }, 700);
            },
        });
    }
}

const navigateToAboutUsAndScroll = () => {
    if (routeName.value == '/about-us') {
        emits('scroll-contact-us-section');
    } else {
        router.visit('/about-us', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-contact-us-section'));
                }, 700);
            },
        });
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    })
}

const onScroll = () => {
    scrolledDown.value = window.scrollY >= 200;
};

const page = usePage();
const routeName = ref(page.url);

onMounted(() => {
    if (routeName.value == '/') {
        window.addEventListener('scroll', onScroll);
    } else {
        scrolledDown.value = true;
    }
});
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <div @click="scrollToTop" class="animate__animated animate__fadeInDown fixed bottom-10 right-5 size-12 bg-orange-500 z-40 rounded-full flex items-center justify-center floating-shadow lg:hover:scale-110 duration-500 transition-transform cursor-pointer">
        <span class="material-symbols-outlined text-white">keyboard_arrow_up</span>
    </div>
    <nav :class="['fixed top-0 left-0 w-full transition-all z-40 bg-white/60 backdrop-blur-xl backdrop-brightness-150 shadow-xl', { 'hidden': !scrolledDown, 'animate__animated animate__fadeInDown': scrolledDown }]">
        <section class="w-full text-gray-600 hidden lg:block">
            <div class="py-5 max-w-7xl mx-auto flex items-center justify-between">
                <Link :href="route('welcome')">
                    <div class="flex items-center justify-center cursor-pointer">
                    <img class="w-40" src="/img/darklogo.png" alt="">
                </div>
                </Link>
                <div class="flex items-center gap-6 font-bold text-base">
                    <Link :href="route('welcome')">
                        <div class="card_green cursor-pointer">
                            Home
                        </div>
                    </Link>
                    <Link :href="route('programs.index')">
                        <div class="card_green cursor-pointer">
                            Loan programs
                        </div>
                    </Link>
                    <div>
                        <v-menu
                            v-model="menuServices"
                            open-on-hover
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer">
                                    <span class="block">Services</span>
                                    <span class="material-symbols-outlined block text-gray-500 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="500" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="w-[60%] flex flex-col justify-between gap-3">
                                        <div @click="navigateToWelcomeAndScroll" class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                            <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                <span class="material-symbols-outlined text-2xl text-orange-500">group</span>
                                            </div>
                                            <h3 class="flex-grow text-base">Our services</h3>
                                        </div>
                                        <div @click="navigateToAboutUsAndScroll" class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                            <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                <span class="material-symbols-outlined text-2xl text-orange-500">groups</span>
                                            </div>
                                            <h3 class="flex-grow text-base">Contact us</h3>
                                        </div>
                                        <Link :href="route('blog.index')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">bookmark</span>
                                                </div>
                                                <h3 class="flex-grow text-base">Blog</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="bg-gray-300 w-[40%] h-[240px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">
                                                <div @click="navigateToMortgageLoanCalculatorAndScroll" class="bg-black/20 cursor-pointer rounded-full py-2 px-5 inline-flex text-white text-xs text-center items-center justify-center">
                                                    <span class="material-symbols-outlined text-2xl">web_traffic</span>
                                                    <span>Mortgage loan calculator</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </v-menu>
                    </div>
                    <div>
                        <v-menu
                            v-model="menuTeam"
                            open-on-hover
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer">
                                    <span class="block">Our team</span>
                                    <span class="material-symbols-outlined block text-gray-500 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="500" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="bg-gray-300 w-[40%] h-[240px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('/storage/img/header-5.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">
                                                <div @click="navigateToMortgageLoanCalculatorAndScroll" class="bg-black/20 cursor-pointer rounded-full py-2 px-5 inline-flex text-white text-xs text-center items-center justify-center">
                                                    <span class="material-symbols-outlined text-2xl">web_traffic</span>
                                                    <span>Mortgage loan calculator</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[60%] flex flex-col justify-between gap-3">
                                        <Link :href="route('our-team.index')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">group</span>
                                                </div>
                                                <h3 class="flex-grow text-base">Our team</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('about-us.index')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">apartment</span>
                                                </div>
                                                <h3 class="flex-grow text-base">About</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('join-our-team.index')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">key</span>
                                                </div>
                                                <h3 class="flex-grow text-base">Join or login</h3>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </v-card>
                        </v-menu>
                    </div>
                    <div>
                        <v-menu
                            v-model="menuLegal"
                            open-on-hover
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer">
                                    <span class="block">Legal</span>
                                    <span class="material-symbols-outlined block text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="500" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="bg-gray-300 w-[40%] h-[240px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('/storage/img/header-6.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[60%] flex flex-col justify-between gap-3">
                                        <Link :href="route('privacy-policy-website')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">contract</span>
                                                </div>
                                                <h3 class="flex-grow text-base">Privacy policy</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('disclaimers-website')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">gavel</span>
                                                </div>
                                                <h3 class="flex-grow text-base">Disclaimers</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('terms-of-use-website')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-12 w-12 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                                    <span class="material-symbols-outlined text-2xl text-orange-500">contract_edit</span>
                                                </div>
                                                <h3 class="flex-grow text-base">Terms of use</h3>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </v-card>
                        </v-menu>
                    </div>
                </div>
                <div class="flex items-center gap-5">
                    <div @click="navigateToTestimonialsAndScroll">
                        <div class="card_green cursor-pointer flex items-center gap-1">
                            <span class="block text-base font-bold">Testimonials</span>
                        </div>
                    </div>
                    <Link :href="route('our-team.index')">
                        <v-btn rounded="xs" size="large" class="text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full">Apply Now</v-btn>
                    </Link>
                </div>
            </div>
        </section>

        <section class="py-5 w-full mx-auto flex items-center justify-between lg:hidden px-4 lg:px-0 shadow-xl">
            <Link :href="route('welcome')">
                <div class="flex items-center justify-center">
                    <img class="w-28" src="/img/darklogo.png" alt="">
                </div>
            </Link>
            <div @click="drawerNavState = !drawerNavState">
                <svg class="size-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
            </div>
        </section>
    </nav>
</template>

<style scoped>
.cls-1{fill:#00f6ef;}.cls-2{fill:#fff;}.cls-3{fill:#ff004f;}
.cls-1{fill:url(#radial-gradient);}.cls-2{fill:#fff;}
.card_green {
position: relative;
}
.card_green::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 1.5px;
background-color: #22c55e;
transition: width 0.5s ease-in-out;
}
.card_green:hover::after {
width: 100%;
}
.floating-shadow {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}
.st0{fill:#0072FF;}
</style>
