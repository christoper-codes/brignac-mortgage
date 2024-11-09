<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Link, router, usePage } from '@inertiajs/vue3';
import { drawerNavState } from '@/composables/drawersStates';

const scrolledDown = ref(false);
const menuServices = ref(false);
const menuTeam = ref(false);
const emits = defineEmits(['scroll-our-services-section', 'scroll-contact-us-section', 'scroll-mortgage-loan-calculator-section'])
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
    <div @click="scrollToTop" class="animate__animated animate__fadeInDown fixed bottom-10 right-5 w-10 h-10 bg-orange-500 z-40 rounded-sm flex items-center justify-center floating-shadow lg:hover:scale-110 duration-500 transition-transform cursor-pointer">
        <span class="material-symbols-outlined text-white">keyboard_arrow_up</span>
    </div>

    <!-- <div class="fixed top-1/2 left-0 w-8 h-auto flex flex-col z-10">
        <div class="bg-white p-1 rounded-t-sm">
            <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="none"><g clip-path="url(#clip0_1_2)"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black"/></g><defs><clipPath id="clip0_1_2"><rect width="1200" height="1227" fill="white"/></clipPath></defs></svg>
        </div>
        <div class="bg-[#E62A80]">
            <svg class="w-full h-full" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><radialGradient cx="-578.95" cy="-837.6" gradientTransform="translate(499.5 629.5) scale(0.75)" gradientUnits="userSpaceOnUse" id="radial-gradient" r="197.06"><stop offset="0" stop-color="#f9ed32"/><stop offset="0.36" stop-color="#ee2a7b"/><stop offset="0.44" stop-color="#d22a8a"/><stop offset="0.6" stop-color="#8b2ab2"/><stop offset="0.83" stop-color="#1b2af0"/><stop offset="0.88" stop-color="#002aff"/></radialGradient></defs><title/><g data-name="3-instagram" id="_3-instagram"><rect class="cls-1" height="64" rx="11.2" ry="11.2" transform="translate(64 64) rotate(180)" width="64"/><path class="cls-2" d="M44,56H20A12,12,0,0,1,8,44V20A12,12,0,0,1,20,8H44A12,12,0,0,1,56,20V44A12,12,0,0,1,44,56ZM20,12.8A7.21,7.21,0,0,0,12.8,20V44A7.21,7.21,0,0,0,20,51.2H44A7.21,7.21,0,0,0,51.2,44V20A7.21,7.21,0,0,0,44,12.8Z"/><path class="cls-2" d="M32,45.6A13.6,13.6,0,1,1,45.6,32,13.61,13.61,0,0,1,32,45.6Zm0-22.4A8.8,8.8,0,1,0,40.8,32,8.81,8.81,0,0,0,32,23.2Z"/><circle class="cls-2" cx="45.6" cy="19.2" r="2.4"/></g></svg>
        </div>
        <div class="bg-[#2867B2]">
            <svg class="w-full h-full" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="g5891"><path d="M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z" id="background" style="fill:#2867b2;"/><g id="shapes"><rect height="257.962" id="rect11" style="fill:#fff;" width="85.76" x="61.053" y="178.667"/><path d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z" id="path13-0" style="fill:#fff;fill-rule:nonzero;"/><path d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z" id="path15" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg>
        </div>
        <div class="bg-white">
            <svg class="w-full h-full" style="enable-background:new 0 0 64 64;" version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="GUIDES_64"/><g id="Layer_3"/><g id="Layer_2"><path class="st0" d="M20.1,36h3.4c0.3,0,0.6,0.3,0.6,0.6V58c0,1.1,0.9,2,2,2h7.8c1.1,0,2-0.9,2-2V36.6c0-0.3,0.3-0.6,0.6-0.6h5.6   c1,0,1.9-0.7,2-1.7l1.3-7.8c0.2-1.2-0.8-2.4-2-2.4h-6.6c-0.5,0-0.9-0.4-0.9-0.9v-5c0-1.3,0.7-2,2-2h5.9c1.1,0,2-0.9,2-2V6.2   c0-1.1-0.9-2-2-2h-7.1c-13,0-12.7,10.5-12.7,12v7.3c0,0.3-0.3,0.6-0.6,0.6h-3.4c-1.1,0-2,0.9-2,2v7.8C18.1,35.1,19,36,20.1,36z"/></g></svg>
        </div>
        <div class="bg-black">
            <svg class="w-full h-full" id="Apple" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs></defs><rect rx="71.15" x="42.01" y="42.95"/><path class="cls-1" d="M389.39,221.92V164.85c-74.6-3.15-77-70.94-77-77.31v-.48H254.73V309.33h0a45.66,45.66,0,1,1-32.36-43.71V206.76a104.57,104.57,0,0,0-13.32-.85A103.42,103.42,0,1,0,312.47,309.33c0-1.45,0-2.89-.1-4.32V195.56C338.92,219.85,389.39,221.92,389.39,221.92Z"/><path class="cls-2" d="M406.37,236V178.9c-74.61-3.15-77-70.94-77-77.31v-.48H271.71V323.38h0a45.66,45.66,0,1,1-32.36-43.7V220.81A104.57,104.57,0,0,0,226,220,103.42,103.42,0,1,0,329.45,323.38c0-1.45,0-2.89-.1-4.32V209.61C355.9,233.9,406.37,236,406.37,236Z"/><path class="cls-3" d="M313.82,101.11c2.78,15.14,10.9,38.81,34.57,52.66-18.09-21.07-19-48.26-19-52.18v-.48Z"/><path class="cls-3" d="M406.37,236V178.9a106.46,106.46,0,0,1-17-2v44.95s-50.47-2.07-77-26.36V304.91c.06,1.43.1,2.87.1,4.32a103.43,103.43,0,0,1-160.72,86.1,103.41,103.41,0,0,0,177.7-71.95c0-1.45,0-2.89-.1-4.32V209.61C355.9,233.9,406.37,236,406.37,236Z"/><path class="cls-3" d="M222.37,265.53a45.69,45.69,0,0,0-33.19,84.85,45.69,45.69,0,0,1,50.17-70.7V220.81A104.57,104.57,0,0,0,226,220c-1.23,0-2.44,0-3.66.07Z"/></svg>
        </div>
        <div class="bg-white rounded-b-sm">
            <svg class="w-full h-full" height="512px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="_x33_95-youtube"><g><path d="M476.387,144.888c-5.291-19.919-20.878-35.608-40.67-40.933C399.845,94.282,256,94.282,256,94.282    s-143.845,0-179.719,9.674c-19.791,5.325-35.378,21.013-40.668,40.933c-9.612,36.105-9.612,111.438-9.612,111.438    s0,75.334,9.612,111.438c5.29,19.92,20.877,34.955,40.668,40.281C112.155,417.719,256,417.719,256,417.719    s143.845,0,179.717-9.674c19.792-5.326,35.379-20.361,40.67-40.281c9.612-36.104,9.612-111.438,9.612-111.438    S485.999,180.994,476.387,144.888z" style="fill:#FF0000;"/><polygon points="208.954,324.723 208.954,187.93 329.18,256.328   " style="fill:#FFFFFF;"/></g></g><g id="Layer_1"/></svg>
        </div>
    </div> -->

    <nav :class="['fixed top-0 left-0 w-full transition-all z-40 bg-white shadow-xl', { 'hidden': !scrolledDown, 'animate__animated animate__fadeInDown': scrolledDown }]">
        <section class="w-full text-gray-600 hidden lg:block">
            <div class="py-5 max-w-7xl mx-auto flex items-center justify-between">
                <Link :href="route('welcome')">
                    <div class="flex items-center justify-center cursor-pointer">
                    <img class="w-40" src="../../../../public/img/primary-logo-light.jpg" alt="">
                </div>
                </Link>
                <div class="flex items-center gap-6 font-bold text-lg">
                    <Link :href="route('welcome')">
                        <div class="card_green cursor-pointer">
                            Home
                        </div>
                    </Link>
                    <a href="https://dot.cards/shaunbrignac" target="_blank">
                        <div class="card_green cursor-pointer flex items-center gap-1">
                            <span class="material-symbols-outlined block text-lg">arrow_outward</span>
                            <span class="block">Networking</span>
                        </div>
                    </a>
                    <div class="">
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
                                        <div class="w-full h-full bg-[url('https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg')] bg-center bg-cover rounded-md">
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
                    <Link :href="route('programs.index')">
                        <div class="card_green cursor-pointer">
                            Loan programs
                        </div>
                    </Link>
                    <div class="">
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
                                        <div class="w-full h-full bg-[url('https://www.bbva.com/wp-content/uploads/2018/04/plan-negocios-empresas-bbva-e1523885477593.jpg')] bg-center bg-cover rounded-md">
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
                    <div class="">
                        <Link :href="route('our-team.index')">
                            <v-btn rounded="xs" size="large" class="text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply Now</v-btn>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-3 w-full mx-auto flex items-center justify-between lg:hidden px-4 lg:px-0 shadow-xl">
            <Link :href="route('welcome')">
                <div class="flex items-center justify-center">
                    <img class="w-28" src="../../../../public/img/primary-logo-light.jpg" alt="">
                </div>
            </Link>
            <div @click="drawerNavState = !drawerNavState" class="flex items-center justify-center h-12 w-12 bg-white shadow-xl">
                <span class="material-symbols-outlined block">menu</span>
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
