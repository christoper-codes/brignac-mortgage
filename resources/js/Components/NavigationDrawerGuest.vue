<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Link, router, usePage } from '@inertiajs/vue3';
import { drawerNavState } from '@/composables/drawersStates';

const scrolledDown = ref(false);
const menuServices = ref(false);
const menuTeam = ref(false);
const menuLegal = ref(false);
const emits = defineEmits(['scroll-our-services-section', 'scroll-contact-us-section', 'scroll-mortgage-loan-calculator-section'])

const navigateToWelcomeAndScroll = () => {
    drawerNavState.value = drawerNavState.value ? !drawerNavState.value : drawerNavState.value;

    if (routeName.value == '/') {
        emits('scroll-our-services-section');
    } else {
        router.visit('/', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-our-services-section'));
                }, 300);
            },
        });
    }
};

const navigateToMortgageLoanCalculatorAndScroll = () => {
    drawerNavState.value = drawerNavState.value ? !drawerNavState.value : drawerNavState.value;

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

const navigateToAboutUsAndScroll = () => {
    drawerNavState.value = drawerNavState.value ? !drawerNavState.value : drawerNavState.value;

    if (routeName.value == '/about-us') {
        emits('scroll-contact-us-section');
    } else {
        router.visit('/about-us', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-contact-us-section'));
                }, 500);
            },
        });
    }
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
    <div>
        <v-layout>
            <v-navigation-drawer v-model="drawerNavState" temporary class="!tw-bg-white">
                <Link :href="route('welcome')" @click="drawerNavState = !drawerNavState">
                    <div class="w-full p-5">
                        <img class="w-36" src="../../../public/img/primary-logo-light.jpg" alt="">
                    </div>
                </Link>

                <div class="flex flex-col font-bold text-lg mt-5 px-5">
                    <Link :href="route('welcome')" @click="drawerNavState = !drawerNavState" class="border-b border-b-neutral-50 py-4">
                        <div class="card_green">
                            Home
                        </div>
                    </Link>
                    <a href="https://dot.cards/shaunbrignac" target="_blank" @click="drawerNavState = !drawerNavState" class="border-b border-b-neutral-50 py-4">
                        <div class="card_green cursor-pointer flex items-center gap-1">
                            <span class="block">Networking</span>
                            <span class="material-symbols-outlined block text-lg">arrow_outward</span>
                        </div>
                    </a>
                    <div>
                        <v-menu
                            v-model="menuServices"
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer border-b border-b-neutral-50 py-4">
                                    <span class="block">Services</span>
                                    <span class="material-symbols-outlined block text-gray-500 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="350" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="w-[50%] flex flex-col justify-between gap-3">
                                        <div @click="navigateToWelcomeAndScroll" class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                            <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                <span class="material-symbols-outlined text-xl text-blue-500">group</span>
                                            </div>
                                            <h3 class="flex-grow text-xs">Our services</h3>
                                        </div>
                                        <div @click="navigateToAboutUsAndScroll" class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                            <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                <span class="material-symbols-outlined text-xl text-blue-500">groups</span>
                                            </div>
                                            <h3 class="flex-grow text-xs">Contact us</h3>
                                        </div>
                                        <Link :href="route('blog.index')" @click="drawerNavState = !drawerNavState">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">bookmark</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">Blog</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="bg-gray-300 w-[50%] h-[215px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">
                                                <div @click="navigateToMortgageLoanCalculatorAndScroll" class="bg-black/30 cursor-pointer rounded-full py-2 px-5 inline-flex text-white text-xs text-center items-center justify-center">
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
                    <Link :href="route('programs.index')" @click="drawerNavState = !drawerNavState" class="border-b border-b-neutral-50 py-4">
                        <div class="card_green cursor-pointer">
                            Loan programs
                        </div>
                    </Link>
                    <div>
                        <v-menu
                            v-model="menuTeam"
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer border-b border-b-neutral-50 py-4">
                                    <span class="block">Our team</span>
                                    <span class="material-symbols-outlined block text-gray-500 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="350" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="bg-gray-300 w-[50%] h-[215px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('https://www.bbva.com/wp-content/uploads/2018/04/plan-negocios-empresas-bbva-e1523885477593.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">
                                                <div @click="navigateToMortgageLoanCalculatorAndScroll" class="bg-black/30 cursor-pointer rounded-full py-2 px-5 inline-flex text-white text-xs text-center items-center justify-center">
                                                    <span class="material-symbols-outlined text-2xl">web_traffic</span>
                                                    <span>Mortgage loan calculator</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[50%] flex flex-col justify-between gap-3">
                                        <Link :href="route('our-team.index')" @click="drawerNavState = !drawerNavState">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">group</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">Our team</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('about-us.index')" @click="drawerNavState = !drawerNavState">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">apartment</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">About</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('join-our-team.index')" @click="drawerNavState = !drawerNavState">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">key</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">Join or login</h3>
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
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer py-4">
                                    <span class="block">Legal</span>
                                    <span class="material-symbols-outlined block text-gray-500 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="350" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="w-[50%] flex flex-col justify-between gap-3">
                                        <Link :href="route('privacy-policy-website')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">contract</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">Privacy policy</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('disclaimers-website')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">gavel</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">Disclaimers</h3>
                                            </div>
                                        </Link>
                                        <Link :href="route('terms-of-use-website')">
                                            <div class="flex items-center justify-between gap-3 p-3 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors duration-500">
                                                <div class="flex-shrink-0 h-10 w-10 overflow-hidden rounded-full items-center justify-center flex bg-blue-200">
                                                    <span class="material-symbols-outlined text-xl text-blue-500">contract_edit</span>
                                                </div>
                                                <h3 class="flex-grow text-xs">Terms of use</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="bg-gray-300 w-[50%] h-[215px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </v-menu>
                    </div>
                    <div class="w-full mt-7">
                        <Link :href="route('our-team.index')" @click="drawerNavState = !drawerNavState">
                            <v-btn rounded="xs" size="large" block class="text-none !w-full !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700 !rounded-full">Apply Now</v-btn>
                        </Link>
                    </div>
                </div>

                <div class="mt-5 flex items-center justify-center gap-3 px-5 text-center">
                    <p class="text-xs">Copyright © 2025 Brignac Mortgage</p>
                </div>
            </v-navigation-drawer>
        </v-layout>
    </div>
</template>

<style scoped>

</style>
