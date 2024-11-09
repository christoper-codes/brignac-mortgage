<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import ServiceDialog from '@/Components/ServiceDialog.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import { drawerNavState } from '@/composables/drawersStates';

const form = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const loading = ref(false);
const menuServices = ref(false);
const menuTeam = ref(false);
const rangeSlider = ref(0);

const ourServices = ref(null);
const mortgageLoanCalculator = ref(null);

const scrollOurServicesSection = () => {
    const offset = 100;
    const elementPosition = ourServices.value.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
};
const scrollMortgageLoanCalculatorSection = () => {
    const offset = 70;
    const elementPosition = mortgageLoanCalculator.value.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll-our-services-section', scrollOurServicesSection);
    window.addEventListener('scroll-mortgage-loan-calculator-section', scrollMortgageLoanCalculatorSection);
});
onUnmounted(() => {
    window.removeEventListener('scroll-our-services-section', scrollOurServicesSection);
    window.removeEventListener('scroll-mortgage-loan-calculator-section', scrollMortgageLoanCalculatorSection);
});

const onSubmit = () => {
    if(!form.value) return;

    loading.value = true;
    console.log(form.value);
}

const rules = {
    required: value => !!value || 'Field is required' ,
    isNumber: value => !isNaN(value) || 'Must be a number',
    email: value => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || 'Invalid email address';
    },
    description: value => value.length <= 255 || 'The description must be less than 255 characters.'
}

const navigateToAboutUsAndScroll = () => {
    router.visit('/about-us', {
        onSuccess: () => {
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('scroll-contact-us-section'));
            }, 700);
        },
    });
}

const props = defineProps({
    about_us: {
        type: Object,
        required: true
    }
});

/*
* Calculator
*/
const plazoOptions = ref([]);
const propertyValue = ref(null);
const loanNeeded = ref(null);
const creditTerm = ref(null);
const interestRate = ref(6.91);
const formSimulator = ref(false);
const loadingCalculate = ref(false);
const monthlyPayment = ref(null);
const showCalculatorResult = ref(false);

for(let i=5; i<=30; i++) {
    plazoOptions.value.push(i)
}

const calculateMortgage = (principal, annualInterestRate, years) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment.toFixed(2);
};500

const resetCalculate = () => {
    propertyValue.value = null;
    loanNeeded.value = null;
    creditTerm.value = null;
    interestRate.value = 6.91;
    formSimulator.value = false;
    loadingCalculate.value = false;
    monthlyPayment.value = null;
    showCalculatorResult.value = false;
}

const onSubmitCalculate = () => {
    if(!formSimulator.value) return;
    loadingCalculate.value = true;
    setTimeout(() => {
        showCalculatorResult.value = true;
        monthlyPayment.value = calculateMortgage(loanNeeded.value, interestRate.value, creditTerm.value);
        loadingCalculate.value = false;
    }, 1000)
}


</script>

<template>
    <Head title="Welcome" />
    <NavigationDrawerGuest @scroll-our-services-section="scrollOurServicesSection" @scroll-mortgage-loan-calculator-section="scrollMortgageLoanCalculatorSection" />
    <GuestNav @scroll-our-services-section="scrollOurServicesSection" @scroll-mortgage-loan-calculator-section="scrollMortgageLoanCalculatorSection" />
    <div class="relative overflow-hidden welcome-header">
        <nav class="absolute w-full bg-transparent z-50 text-white">
            <div class="py-2 border-b-[1px] border-b-gray-500">
                <div class="flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-0">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:gap-6">
                        <a href="mailto:Shaun@brignacmortgage.com"  class="flex items-center gap-1 text-xs lg:text-sm">
                            <span class="material-symbols-outlined text-lg text-green-500">mail</span>
                            <p>Shaun@brignacmortgage.com</p>
                        </a>
                        <div class="flex items-center gap-1 text-xs lg:text-sm">
                            <span class="material-symbols-outlined text-lg text-green-500">phone</span>
                            <p> +1 225-435-9287</p>
                        </div>
                    </div>

                    <div class="flex flex-col items-end lg:flex-row lg:items-center gap-1 lg:gap-6">
                        <div class="flex items-center gap-1 text-xs lg:text-sm">
                            <div class="text-center">
                                <v-menu
                                    open-on-hover
                                    location="bottom center"
                                    origin="top center"
                                >
                                <template v-slot:activator="{ props }">
                                    <p v-bind="props" class="cursor-pointer">English</p>
                                </template>

                                <div class="w-32 h-10 bg-white shadow-xl rounded-sm flex items-center justify-center text-center mt-2">English</div>
                                </v-menu>
                            </div>
                        </div>
                        <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank" class="flex items-center gap-1 text-xs lg:text-sm">
                            <span class="material-symbols-outlined text-lg text-green-500">location_on</span>
                            <p> 12481, Maurepas, LA</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="py-3 max-w-7xl mx-auto lg:flex items-center justify-between hidden">
                <div class="flex items-center justify-center">
                    <img class="w-40" src="../../../../public/img/primary-logo-dark.png" alt="">
                </div>
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
                                    <span class="material-symbols-outlined block text-gray-50 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="500" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="w-[60%] flex flex-col justify-between gap-3">
                                        <div @click="scrollOurServicesSection" class="flex items-center justify-between gap-3 p-3 rounded-md bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors duration-500">
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
                                                <div @click="scrollMortgageLoanCalculatorSection" class="bg-black/20 cursor-pointer rounded-full py-2 px-5 inline-flex text-white text-xs text-center items-center justify-center">
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
                                    <span class="material-symbols-outlined block text-gray-50 text-xl">keyboard_arrow_down</span>
                                </div>
                            </template>

                            <v-card min-width="500" rounded="lg" class="mt-3">
                                <div class="flex items-start justify-between gap-5 p-5">
                                    <div class="bg-gray-300 w-[40%] h-[240px] rounded-md overflow-hidden">
                                        <div class="w-full h-full bg-[url('https://www.bbva.com/wp-content/uploads/2018/04/plan-negocios-empresas-bbva-e1523885477593.jpg')] bg-center bg-cover rounded-md">
                                            <div class="h-full w-full bg-black/60 flex items-center justify-center">
                                                <div @click="scrollMortgageLoanCalculatorSection" class="bg-black/20 cursor-pointer rounded-full py-2 px-5 inline-flex text-white text-xs text-center items-center justify-center">
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
                        <v-btn rounded="xs" size="large" class="text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply Now</v-btn>
                    </div>
                </div>
            </div>
            <div class="py-3 max-w-7xl mx-auto flex items-center justify-between lg:hidden px-4 lg:px-0 mt-7 lg:mt-0">
                <div class="flex items-center justify-center">
                    <img class="w-32" src="../../../../public/img/primary-logo-dark.png" alt="">
                </div>
                <div @click="drawerNavState = !drawerNavState" class="flex items-center justify-center h-12 w-12 bg-white">
                    <span class="material-symbols-outlined block">menu</span>
                </div>
            </div>
        </nav>
        <v-carousel
            class="relative"
            hide-delimiter-background
        >
            <v-carousel-item src="https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg" cover>
                <div class="w-full h-full bg-black/60 flex items-center justify-center text-white">
                   <div class="max-w-2xl flex items-center justify-center flex-col gap-8 lg:mx-auto text-center mx-4"
                     data-aos="fade-down"
                    data-aos-duration="3000"
                   >
                        <div class="flex items-center gap-1 bg-black/10 py-2 px-5 rounded-full mt-20 lg:mt-0">
                            <span class="material-symbols-outlined text-xl text-white">home</span>
                            <p class="font-bold text-xs lg:text-base">Brignac Mortgage Company</p>
                        </div>
                        <h1 class="text-4xl lg:text-6xl" style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bold !important;">{{ about_us.welcome_title }}</h1>
                        <div >
                            <p class="text-base lg:text-lg">{{ about_us.welcome_subtitle }}</p>
                        </div>
                        <div>
                            <Link :href="route('our-team.index')">

                                <v-btn rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply now for a mortgage</v-btn>
                                <v-btn rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply now for a mortgage</v-btn>
                            </Link >
                        </div>
                   </div>
                </div>
            </v-carousel-item>

            <v-carousel-item src="https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/12.jpg" cover>
                <div class="w-full h-full bg-black/60 flex items-center justify-center text-white">
                   <div class="max-w-2xl flex items-center justify-center flex-col gap-8 lg:mx-auto text-center mx-4"
                     data-aos="fade-down"
                    data-aos-duration="3000"
                   >
                        <div class="flex items-center gap-1 bg-black/10 py-2 px-5 rounded-full mt-20 lg:mt-0">
                            <span class="material-symbols-outlined text-xl text-white">home</span>
                            <p class="font-bold text-xs lg:text-base">Brignac Mortgage Company</p>
                        </div>
                        <h1 class="text-4xl lg:text-6xl" style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bold !important;">{{ about_us.welcome_title }}</h1>
                        <div >
                            <p class="text-base lg:text-lg">{{ about_us.welcome_subtitle }}</p>
                        </div>
                        <div>
                            <Link :href="route('our-team.index')">
                                <v-btn rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply now for a mortgage</v-btn>
                                <v-btn rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply now for a mortgage</v-btn>
                            </Link >
                        </div>
                   </div>
                </div>
            </v-carousel-item>

            <v-carousel-item src="https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/13.jpg" cover>
                <div class="w-full h-full bg-black/60 flex items-center justify-center text-white">
                   <div class="max-w-2xl flex items-center justify-center flex-col gap-8 lg:mx-auto text-center mx-4"
                     data-aos="fade-down"
                    data-aos-duration="3000"
                   >
                        <div class="flex items-center gap-1 bg-black/10 py-2 px-5 rounded-full mt-20 lg:mt-0">
                            <span class="material-symbols-outlined text-xl text-white">home</span>
                            <p class="font-bold text-xs lg:text-base">Brignac Mortgage Company</p>
                        </div>
                        <h1 class="text-4xl lg:text-6xl" style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bold !important;">{{ about_us.welcome_title }}</h1>
                        <div >
                            <p class="text-base lg:text-lg">{{ about_us.welcome_subtitle }}</p>
                        </div>
                        <div>
                            <Link :href="route('our-team.index')">
                                <v-btn rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply now for a mortgage</v-btn>
                                <v-btn rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Apply now for a mortgage</v-btn>
                            </Link >
                        </div>
                   </div>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>

    <section class="bg-white relative z-10">
        <div class="w-[90%] lg:w-[70%] mx-auto shadow-xl rounded-sm p-10 absolute overflow-hidden top-[-60px] left-1/2 transform -translate-x-1/2 bg-white lg:hover:-translate-y-2 lg:transition-all lg:duration-700">
            <!-- Testimonials -->
            <div class="relative" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <!-- Blockquote -->
                <blockquote class="text-center lg:mx-auto lg:w-3/5">
                    <div class="flex items-center justify-center">
                        <img class="w-14" src="../../../../public/img/secondary-logo-light.jpg" alt="logo img">
                    </div>
                    <div class="mt-6 lg:mt-10">
                    <p class="relative text-xl sm:text-xl md:leading-normal font-medium text-gray-700">
                        <svg class="absolute top-0 start-0 transform -translate-x-8 -translate-y-14 size-16 text-gray-200 sm:h-28 sm:w-28" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z" fill="currentColor"/>
                        </svg>
                        <span class="relative z-10 italic text-gray-700 text-sm lg:text-base">
                            {{ about_us.welcome_presentation }}
                        </span>
                    </p>
                    </div>

                    <footer class="mt-6 flex items-center justify-center gap-3">
                        <div class="h-12 w-12 rounded-full overflow-hidden">
                            <img class="h-full w-full" src="../../../../public/img/company-seo-img.jpg" alt="">
                        </div>
                       <div class="text-start">
                            <div class="font-semibold text-gray-800">Shaun Brignac</div>
                            <div class="text-xs text-gray-500">President and CEO | Brignac Mortgage</div>
                       </div>
                    </footer>
                </blockquote>
                <!-- End Blockquote -->
            </div>
            <!-- End Testimonials -->
        </div>
    </section>

    <section ref="ourServices" class="mt-[450px] lg:mt-[420px] text-gray-700 mb-10">

         <div class="w-full flex flex-col-reverse lg:flex-col lg:mt-10">
            <div class="bg-gray-100 w-full pt-14 pb-14 lg:mb-10">
                <div class="max-w-6xl mx-auto gap-16 flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-0 overflow-hidden">
                    <div class="w-full lg:w-[40%] px-2"  data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                        <div class="relative h-[400px] lg:h-[600px] border-[10px] shadow-xl border-white w-full after:w-[20px] lg:after:w-[30px] after:h-[250px] lg:after:h-[500px] after:absolute after:top-1/2 after:-left-[20px] lg:after:-left-[30px] after:-translate-y-1/2 after:bg-orange-500">
                            <img class="w-full h-full object-cover" src="https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/13.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-full lg:w-[60%]" data-aos="fade-left" data-aos-duration="3000" data-aos-once="true">
                        <div class="flex flex-col gap-5">
                            <div>
                                <div class="bg-orange-100 rounded-full py-2 px-5 inline-flex text-orange-600">
                                    <span class="inline-flex">Our Services</span>
                                </div>
                            </div>
                            <h2 class="text-3xl lg:text-4xl font-bold">Loan Products & Programs</h2>
                            <p class="text-sm lg:text-base">Explore our diverse range of loan products and programs <span class="font-bold">designed to meet your unique financial needs.</span> Whether you're looking for a residential mortgage, an investment loan, or a commercial financing solution, we have the right options for you.</p>
                            <p></p>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">real_estate_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Conventional and Construction Loans</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">support_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Mobile Home Loans - Single and Double Wide</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">location_away</span>
                                </div>
                                <h3 class="text-sm flex-grow">Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">badge</span>
                                </div>
                                <h3 class="text-sm flex-grow">Mobile Home Loans - Single and Double Wide</h3>
                            </div>
                        </div>
                    <ServiceDialog />
                </div>
            </div>
        </div>

        <div class="lg:mt-10">
            <div class="flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
                <div class="bg-orange-100 rounded-full py-2 px-5 inline-flex text-orange-600">
                    <span>Our Services</span>
                </div>
                <h2 class="text-3xl lg:text-4xl font-bold">What We Provide</h2>
            </div>
            <div class="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-5 mt-5 mb-0">

                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card2 lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">real_estate_agent</span></div>
                    <h3 class="text-xl font-bold">Excellent Customer Experience!</h3>
                    <p class="text-xs">We are dedicated to providing you with the best customer experience in the industry.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">nest_clock_farsight_analog</span></div>
                    <h3 class="text-xl font-bold">Fast Closing Times</h3>
                    <p class="text-xs">Our streamlined process ensures that you can close your loan quickly and efficiently, saving you time and hassle.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">productivity</span></div>
                    <h3 class="text-xl font-bold">Open Line of Communication</h3>
                    <p class="text-xs">e maintain an open line of communication throughout the entire process, ensuring you are always informed and your questions are promptly answered.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">support_agent</span></div>
                    <h3 class="text-xl font-bold">Free Consulting Services</h3>
                    <p class="text-xs">Take advantage of our free consulting services to get expert advice and guidance tailored to your specific financial needs and goals.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">location_away</span></div>
                    <h3 class="text-xl font-bold">Access to Wholesale Lenders, Investors, and Products</h3>
                    <p class="text-xs">Gain exclusive access to a wide range of wholesale lenders, investors, and products to find the best options for your needs.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">badge</span></div>
                    <h3 class="text-xl font-bold">Credit Repair Guidance</h3>
                    <p class="text-xs">ur experts provide personalized guidance to help you repair and improve your credit score, making it easier to secure favorable loan terms.</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full md:col-span-2 px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:hover:scale-105 lg:transition-all lg:duration-700">
                    <div><span class="material-symbols-outlined text-5xl text-green-500">card_travel</span></div>
                    <h3 class="text-xl font-bold">Residential, Investment, and Commercial Loans</h3>
                    <p class="text-xs">We offer a variety of loan options to meet your residential, investment, and commercial needs, ensuring you get the best terms and rates available.</p>
                </div>
            </div>
        </div>

         </div>
    </section>

    <section ref="mortgageLoanCalculator" class="lg:mt-32 text-gray-700 max-w-7xl mx-auto lg:rounded-lg overflow-hidden">
         <div class="shadow-xl bg-[url('https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg')] bg-center bg-cover">

            <v-form v-model="formSimulator" @submit.prevent="onSubmitCalculate" lazy-validation class="h-full w-full bg-black/80 py-20 px-4 text-white">
                <div class="lg:px-10" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                    <div class="flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
                        <div class="bg-white/20 rounded-full py-2 px-5 inline-flex">
                            <span>Simulator</span>
                        </div>
                        <h2 class="text-3xl lg:text-4xl font-bold text-center">Mortgage <span class="text-orange-500">loan</span> calculator</h2>
                        <div class="flex flex-col lg:flex-row items-center gap-2 lg:gap-5 justify-center text-xs">
                            <p class="font-bold">Average interest rate in the United States. Sources:</p>
                            <a class="underline" href="https://fred.stlouisfed.org/series/MORTGAGE30US/" target="_blank">fred.stlouisfed.org</a>
                            <a class="underline" href="https://www.bankrate.com/mortgages/mortgage-rates/" target="_blank">www.bankrate.com</a>
                            <a class="underline" href="https://money.usnews.com/loans/rates/mortgages/mortgage-rates" target="_blank">money.usnews.com</a>
                        </div>
                    </div>

                    <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-10">
                        <v-text-field
                            append-inner-icon="mdi-email"
                            label="Property Value"
                            v-model="propertyValue"
                            color="orange"
                            clearable
                            class="w-full text-white backdrop-blur-sm"
                            hint="Enter the property value to calculate"
                            persistent-hint=""
                            :rules="[rules.required, rules.isNumber]"
                        ></v-text-field>
                        <v-text-field
                            append-inner-icon="mdi-email"
                            label="How much do you need to borrow?"
                            v-model="loanNeeded"
                            color="orange"
                            clearable
                            class="w-full text-white backdrop-blur-sm"
                            hint="The loan cannot be less than 5% of the property value"
                            persistent-hint=""
                            :rules="[rules.required, rules.isNumber]"
                        ></v-text-field>
                        <v-select
                            append-inner-icon="mdi-email"
                            :items="plazoOptions"
                            v-model="creditTerm"
                            label="What loan term do you need?"
                            color="orange"
                            clearable
                            class="w-full text-white backdrop-blur-sm "
                            hint="The most common term is 20 years"
                            persistent-hint=""
                            :rules="[rules.required]"
                        ></v-select>
                    </div>

                    <div class="text-center mt-10 lg:mt-5">
                        <p class="font-bold">What interest rate?</p>
                        <p class="text-xs">This rate depends on your credit history and the bank you apply for the loan from.</p>
                    </div>
                    <div class="w-full flex flex-col lg:flex-row items-start gap-3 mt-2">
                        <v-slider
                            color="orange"
                            hint="The most common term is 20 years"
                            persistent-hint=""
                            class="w-full lg:w-auto"
                            v-model="interestRate"
                            :min="6.5"
                            :max="7.5"
                            :step="0.01"
                        ></v-slider>
                        <div class="">
                            <p>Annual effective rate: {{ interestRate.toFixed(2) }}%</p>
                            <p>Monthly interest rate: {{ (interestRate / 12).toFixed(2) }}%</p>
                        </div>
                    </div>

                    <div class="text-center text-xs flex items-center justify-center mt-3 lg:mt-0">
                        <p class="inline-flex bg-white/10 py-1 px-4 rounded-full">The average interest rate is 6.91% according to the United States Bank.</p>
                    </div>

                    <div class="mt-10">
                        <div class='flex items-center justify-center relative'>
                            <div class="animate-ping absolute inline-flex h-10 w-32 rounded-lg bg-orange-500 opacity-75"></div>
                            <div class="h-10 flex items-center justify-center w-full relative z-5">
                                <v-btn type="submit"  :loading="loadingCalculate" rounded="xs" size="large" class="text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700">Calculate credit</v-btn>
                            </div>
                        </div>
                    </div>

                    <div v-if="showCalculatorResult" class="mt-10 bg-white/10 py-10 px-8 rounded-lg backdrop-blur-md flex items-center justify-center flex-col text-start">
                        <p class="text-2xl font-bold text-orange-500">Calculation results:</p>
                        <div class="w-full flex flex-col lg:flex-row gap-3 lg:gap-10 lg:items-center justify-center mt-5 font-bold text-lg">
                            <p>Pay installments of ${{ monthlyPayment }} per month</p>
                            <p>For a term of {{ creditTerm }} years</p>
                            <p>And a loan of ${{ loanNeeded }}</p>
                            <p>Interest rate: {{ interestRate.toFixed(2) }}%</p>
                        </div>
                        <v-btn @click="resetCalculate" rounded="xs" size="large" class="mt-5 text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700">Reset</v-btn>
                    </div>

                    <div v-else class="mt-16 flex w-full items-center justify-center">
                        <img class="w-52 h-auto" src="../../../../public/img/simulator-img.svg" alt="simulator img">
                    </div>
                </div>
            </v-form>
         </div>
    </section>

    <section class="mt-28 lg:mt-36">
        <div class="w-full h-[500px] bg-[url('https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg')] bg-center bg-cover">
            <div class="h-full w-full bg-black/60 pt-14 px-4 lg:px-0">
                <div class="flex flex-col gap-3 items-center justify-center">
                    <div class="bg-black/20 rounded-full py-2 px-5 inline-flex text-white">
                        <span>Testimonials</span>
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-white text-center">
                        Our
                        <span style="color: #4285F4;">G</span>
                        <span style="color: #EA4335;">o</span>
                        <span style="color: #FBBC05;">o</span>
                        <span style="color: #4285F4;">g</span>
                        <span style="color: #34A853;">l</span>
                        <span style="color: #EA4335;">e</span>
                        Testimonials
                    </h2>
                </div>
            </div>
        </div>

        <main class="bg-white relative z-10" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="w-[90%] lg:w-[80%] mx-auto shadow-xl rounded-sm p-4 lg:p-10 absolute top-[-300px] left-1/2 transform -translate-x-1/2 bg-white">
                <div class="relative">
                    <iframe class="h-[450px] z-50 w-full" src="https://widget.tagembed.com/2135662" style="border:none;"></iframe>
                </div>
            </div>
        </main>

    </section>

    <section class="mt-[280px] lg:mt-[370px] w-full flex flex-col items-center justify-center">
        <div class="w-[90%] lg:w-[50%] h-10 bg-green-500"></div>
        <div class="w-full h-[300px] lg:hidden bg-[url('https://www.bbva.com/wp-content/uploads/2018/04/plan-negocios-empresas-bbva-e1523885477593.jpg')] bg-center bg-cover">
            <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/50">
                <div class="flex flex-col gap-0 items-center justify-center mb-5">
                    <h2 class="text-3xl lg:text-4xl font-bold">About us</h2>
                    <div class="inline-flex cursor-pointer items-center gap-x-1 text-sm">
                        <span class="block decoration-2 underline decoration-green-500">Show more</span>
                        <span class="material-symbols-outlined block text-xl">chevron_right</span>
                    </div>
                </div>
                <v-dialog max-width="800">
                    <template v-slot:activator="{ props: activatorProps }">
                        <div class='flex items-center justify-center relative'>
                            <div class="animate-ping absolute inline-flex size-16 rounded-full bg-white opacity-75"></div>
                            <v-btn v-bind="activatorProps" icon="mdi-play" size="x-large" class="!text-green-500 !size-20 !text-2xl"></v-btn>
                        </div>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <v-card>
                        <v-card-text>
                            <div class="flex flex-col gap-5 items-center justify-center text-center">
                                <h2 class="font-bold text-xl my-2">About Brignac Mortgage</h2>
                                <div class="tw-mx-auto tw-absolute w-full">
                                    <video class="tw-max-w-full tw-w-full tw-h-auto" controls playsinline>
                                        <source type="video/mp4" src="../../../../public/video/about-us-video.mp4">
                                    </video>
                                </div>
                            </div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                            color="red"
                            variant="tonal"
                            text="Close"
                            class="text-none mr-2 mb-2"
                            @click="isActive.value = false"
                            ></v-btn>
                        </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </div>
        <div class="w-full !hidden lg:!block">
            <v-parallax
            class="w-full h-[300px] "
            src="https://www.bbva.com/wp-content/uploads/2018/04/plan-negocios-empresas-bbva-e1523885477593.jpg"
        >
                <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/50">
                    <div class="flex flex-col gap-0 items-center justify-center mb-5">
                        <h2 class="text-3xl lg:text-4xl font-bold">About us</h2>
                        <div class="inline-flex cursor-pointer items-center gap-x-1 text-sm">
                            <span class="block decoration-2 underline decoration-green-500">Show more</span>
                            <span class="material-symbols-outlined block text-xl">chevron_right</span>
                        </div>
                    </div>
                    <v-dialog max-width="800">
                        <template v-slot:activator="{ props: activatorProps }">
                            <div class='flex items-center justify-center relative'>
                                <div class="animate-ping absolute inline-flex size-16 rounded-full bg-white opacity-75"></div>
                                <v-btn v-bind="activatorProps" icon="mdi-play" size="x-large" class="!text-green-500 !size-20 !text-2xl"></v-btn>
                            </div>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card>
                            <v-card-text>
                                <div class="flex flex-col gap-5 items-center justify-center text-center">
                                    <h2 class="font-bold text-xl my-2">About Brignac Mortgage</h2>
                                    <div class="tw-mx-auto tw-absolute w-full">
                                        <video class="tw-max-w-full tw-w-full tw-h-auto" controls playsinline>
                                            <source type="video/mp4" src="../../../../public/video/about-us-video.mp4">
                                        </video>
                                    </div>
                                </div>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                color="red"
                                variant="tonal"
                                text="Close"
                                class="text-none mr-2 mb-2"
                                @click="isActive.value = false"
                                ></v-btn>
                            </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </div>
        </v-parallax>
        </div>

    </section>


    <section class="mt-20 lg:mt-32" data-aos="fade-up" data-aos-duration="3000" data-aos-once="true">
        <div class="flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
            <div class="bg-gray-200 rounded-full py-2 px-5 inline-flex">
                <span class="text-gray-700">Testimonials</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-bold text-center">
                Our <span class="text-orange-500">Facebook</span> Testimonials
            </h2>
        </div>

        <div class="hidden lg:flex items-center justify-between mt-12" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="w-[50%] h-[500px] bg-[url('https://html.commonsupport.xyz/2018/TheBiznes/images/home/service.jpg')] bg-center bg-cover">
                <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/70">
                    <div class="flex flex-col gap-2 justify-center mb-5">
                        <h2 class="text-3xl lg:text-4xl font-bold">Our Testimonials</h2>
                        <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                        <p class="max-w-[400px]">Clients who have trusted our offers and services in Brignac Mortgage</p>
                    </div>
                </div>
            </div>
            <div class="w-[50%] h-[500px] bg-gray-100 flex items-center justify-center relative">
                <div class="w-[115%] h-[400px] absolute left-[-150px] transform flex items-center justify-center w-testimonials-control" data-aos="fade-up" data-aos-duration="3000" data-aos-once="true">
                    <v-carousel hide-delimiters height="400">
                        <v-carousel-item>
                            <div class="w-full h-full flex items-center justify-between gap-10 mt-5">
                                <div class="h-[300px] shadow-lg w-full bg-white flex items-center justify-center p-7 cursor-pointer rounded-md card_blue">
                                    <a href="https://www.facebook.com/grant.murphy.503/posts/995434784396558?ref=embed_post" target="_blank" class="w-full h-full flex items-center justify-center">
                                        <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial3.png" alt="">
                                    </a>                                </div>
                                <div class="h-[300px] shadow-lg w-full bg-white flex items-center justify-center p-7 cursor-pointer rounded-md card_blue">
                                    <a href="https://www.facebook.com/jeremy.bergeron.7/posts/10100116932176682?ref=embed_post" target="_blank" class="w-full h-full flex items-center justify-center">
                                        <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial4.png" alt="">
                                    </a>
                                </div>
                            </div>
                        </v-carousel-item>
                        <v-carousel-item>
                            <div class="w-full h-full flex items-center justify-between gap-10 mt-5">
                                <div class="h-[300px] shadow-lg w-full bg-white flex items-center justify-center p-7 cursor-pointer rounded-md card_blue">
                                    <a href="https://www.facebook.com/brant.gauthreaux/posts/5756679497685251?ref=embed_post" target="_blank" class="w-full h-full flex items-center justify-center">
                                        <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial1.png" alt="">
                                    </a>                                </div>
                                <div class="h-[300px] shadow-lg w-full bg-white flex items-center justify-center p-7 cursor-pointer rounded-md card_blue">
                                    <a href="https://www.facebook.com/justin.pfister.7/posts/6175620575790131?ref=embed_post" target="_blank" class="w-full h-full flex items-center justify-center">
                                        <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial2.png" alt="">
                                    </a>
                                </div>
                            </div>
                        </v-carousel-item>
                        <v-carousel-item>
                            <div class="w-full h-full flex items-center justify-between gap-10 mt-5">
                                <div class="h-[300px] shadow-lg w-full bg-white flex items-center justify-center p-7 cursor-pointer rounded-md card_blue">
                                    <iframe class="w-full h-[275px] cursor-pointer" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fangelo.datseris%2Fposts%2Fpfbid02e7L8hKjCxSfEuk8HCjkhFZcbSZjvosnxijXMRvo3Hzvc4zUhRNMirszpDpDZ3QRpl&show_text=true&width=500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                </div>
                                <div class="h-[300px] shadow-lg w-full bg-white flex items-center justify-center p-7 cursor-pointer rounded-md card_blue">
                                    <a href="https://www.facebook.com/grant.murphy.503/posts/995434784396558?ref=embed_post" target="_blank" class="w-full h-full flex items-center justify-center">
                                        <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial3.png" alt="">
                                    </a>
                                </div>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>
            </div>
        </div>

        <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 lg:px-0 lg:hidden">
            <a href="https://www.facebook.com/grant.murphy.503/posts/995434784396558?ref=embed_post" target="_blank" class="w-full p-4 rounded-sm shadow-xl card_blue_persistent" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial3.png" alt="">
            </a>
            <a href="https://www.facebook.com/jeremy.bergeron.7/posts/10100116932176682?ref=embed_post" target="_blank" class="w-full p-4 rounded-sm shadow-xl card_blue" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial4.png" alt="">
            </a>
            <a href="https://www.facebook.com/brant.gauthreaux/posts/5756679497685251?ref=embed_post" target="_blank" class="w-full p-4 rounded-sm shadow-xl card_blue" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial1.png" alt="">
            </a>
            <a href="https://www.facebook.com/justin.pfister.7/posts/6175620575790131?ref=embed_post" target="_blank" class="w-full p-4 rounded-sm shadow-xl card_blue" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial2.png" alt="">
            </a>
            <a href="https://www.facebook.com/angelo.datseris/posts/10230219937151699?ref=embed_post" target="_blank" class="w-full p-4 rounded-sm shadow-xl card_blue" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <img class="w-full h-auto" src="../../../../public/img/facebook-testimonials/testimonial5.png" alt="">
            </a>
        </div>

        <!-- <div class="mt-12 lg:grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 lg:px-0 hidden">
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="lg:hover:scale-105 lg:transition-transform lg:duration-500 cursor-pointer w-full shadow-xl rounded-sm p-4 card_blue">
                <iframe class="w-full h-[240px]" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fjustin.pfister.7%2Fposts%2Fpfbid02mTgmjJaFUKJjCkAcd4VdG2PVfepymdSLGPwtvoPXD1ybuHQpJVnjkyXibEAcM3CFl&show_text=true&width=500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="lg:col-span-2 lg:hover:scale-105 lg:transition-transform lg:duration-500 cursor-pointer w-full shadow-xl rounded-sm p-4 card_blue">
                <iframe class="w-full h-[350px] lg:h-[240px]" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fangelo.datseris%2Fposts%2Fpfbid02e7L8hKjCxSfEuk8HCjkhFZcbSZjvosnxijXMRvo3Hzvc4zUhRNMirszpDpDZ3QRpl&show_text=true&width=500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
        </div> -->
    </section>


    <section class="mt-24 lg:mt-36">
        <iframe class="w-full h-[400px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6893.12326712053!2d-90.771464!3d30.249575!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8626cf3dc655337f%3A0x3b15aacf38947f0c!2sBrignac%20Mortgage%20and%20Consulting%20Services%20LLC!5e0!3m2!1ses-419!2smx!4v1730790533348!5m2!1ses-419!2smx" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <main class="bg-white relative z-10" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="w-[90%] lg:w-[70%] mx-auto rounded-sm py-10 px-6 absolute top-[-200px] left-1/2 transform -translate-x-1/2 bg-white">
                <div class="relative min-h-[300px]">
                    <div class="flex flex-col gap-3 items-center justify-center">
                        <div class="bg-green-100 rounded-full py-2 px-5 inline-flex">
                            <span class="text-green-600">Contact</span>
                        </div>
                        <h2 class="text-4xl font-bold text-gray-600">
                            Contact Us
                        </h2>
                    </div>

                    <div class="mt-10 lg:px-10">
                        <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                           <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-3">
                            <v-text-field
                                label="Name"
                                color="green"
                                append-inner-icon="mdi-account"
                                variant="solo"
                                clearable
                                class="w-full lg:w-[50%]"
                                hint="Its recommended to use your full name"
                                persistent-hint=""
                                v-model="name"
                                :rules="[rules.required, rules.description]"
                            ></v-text-field>

                            <v-text-field
                                append-inner-icon="mdi-email"
                                variant="solo"
                                label="Email"
                                autocomplete="email"
                                color="green"
                                clearable
                                class="w-full lg:w-[50%]"
                                hint="Your email to subscribe"
                                persistent-hint=""
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                            ></v-text-field>

                           </div>
                            <v-textarea
                                append-inner-icon="mdi-message"
                                variant="solo"
                                label="Message"
                                v-model="message"
                                auto-grow
                                hint="What do you want to know"
                                persistent-hint=""
                                class="mt-3"
                                clearable
                                :rules="[rules.required, rules.description]"
                                color="green"
                            ></v-textarea>

                            <div class="w-full flex items-center justify-end mt-12">
                                <div class='flex items-center justify-center relative'>
                                    <div class="animate-ping absolute inline-flex h-12 w-24 lg:h-14 lg:w-32 rounded-lg bg-green-500 opacity-75"></div>
                                    <div class="h-10 flex items-center justify-center w-full relative z-5">
                                        <v-btn type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Send now</v-btn>
                                        <v-btn type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Send now</v-btn>
                                    </div>
                                </div>
                            </div>

                        </v-form>
                    </div>
                </div>
            </div>
        </main>
    </section>

    <section class="mt-[600px] lg:mt-[550px]">
        <Footer />
    </section>


</template>

<style scoped>
.card {
position: relative;
}
.card::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: orange;
transition: width 0.5s ease-in-out;
}
.card:hover::after {
width: 100%;
}
.card2 {
position: relative;
}
.card2::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: orange;
width: 100%;
}

.card_blue {
position: relative;
}
.card_blue::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: #2563eb;
transition: width 0.5s ease-in-out;
}
.card_blue:hover::after {
width: 100%;
}

.card_blue_persistent {
position: relative;
}
.card_blue_persistent::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: #2563eb;
width: 100%;
}

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

</style>
