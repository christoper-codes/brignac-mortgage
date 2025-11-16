<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import ServiceDialog from '@/Components/ServiceDialog.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import { drawerNavState } from '@/composables/drawersStates';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import usePriceFormat from '@/composables/priceFormat';

const { formatPrice } = usePriceFormat();
const dialog = ref(false);

const form = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const loading = ref(false);
const menuServices = ref(false);
const menuTeam = ref(false);
const menuLegal = ref(false);

const ourServices = ref(null);
const mortgageLoanCalculator = ref(null);
const testimonials = ref(null);

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
const scrolltestimonialsSection = () => {
    const offset = 100;
    const elementPosition = testimonials.value.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll-our-services-section', scrollOurServicesSection);
    window.addEventListener('scroll-mortgage-loan-calculator-section', scrollMortgageLoanCalculatorSection);
    window.addEventListener('scroll-testimonials-section', scrolltestimonialsSection);
      if (!document.getElementById('elfsight-script')) {
        const script = document.createElement('script');
        script.id = 'elfsight-script';
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.head.appendChild(script);
    }
});

onUnmounted(() => {
    window.removeEventListener('scroll-our-services-section', scrollOurServicesSection);
    window.removeEventListener('scroll-mortgage-loan-calculator-section', scrollMortgageLoanCalculatorSection);
    window.removeEventListener('scroll-testimonials-section', scrolltestimonialsSection);
});

const onSubmit = () => {
    if(!form.value){
        toast('All fields are required', {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
        })
        return;
    }

    loading.value = true;

    const data = {
        name: name.value,
        email: email.value,
        message: message.value,
        is_hiring: false
    }

    axios.post(route('send-email'), data)
        .then(response => {
            console.log(response)
            toast(response.data.message, {
                "theme": "auto",
                "type": "success",
                "dangerouslyHTMLString": true
            })
        })
        .catch(error => {
            toast(error.response.data.message, {
                "theme": "auto",
                "type": "error",
                "dangerouslyHTMLString": true
            })
        })
        .finally(() => {
            loading.value = false;
            name.value = ' ';
            email.value = ' ';
            message.value = ' ';
        });

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

for(let i=5; i<=35; i++) {
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
    dialog.value = false;
}

const headers = [
    { title: 'Month', key: 'month' },
    { title: 'Principal Payment', key: 'principalPayment' },
    { title: 'Interest Payment', key: 'interestPayment' },
    { title: 'Monthly Payment', key: 'monthlyPayment' },
    { title: 'Remaining Balance', key: 'remainingBalance' },

];
const headerProps = {
    class: '!font-bold'
};

const onSubmitCalculate = () => {
    if (!formSimulator.value) {
        toast('All fields are required', {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
        });
        return;
    }

    loadingCalculate.value = true;
    setTimeout(() => {
        toast('result obtained successfully', {
            "theme": "auto",
            "type": "success",
            "dangerouslyHTMLString": true
        });
        showCalculatorResult.value = true;
        monthlyPayment.value = calculateMortgage(loanNeeded.value, interestRate.value, creditTerm.value);
        paymentDetails.value = calculatePaymentDetails(loanNeeded.value, interestRate.value, creditTerm.value);
        loadingCalculate.value = false;
        dialog.value = true;
    }, 1000);
};

const paymentDetails = ref([]);
const calculatePaymentDetails = (principal, annualInterestRate, years) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    let balance = principal;
    let paymentDetails = [];

    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        paymentDetails.push({
            month: i,
            principalPayment: formatPrice(principalPayment.toFixed(2)),
            interestPayment: formatPrice(interestPayment.toFixed(2)),
            monthlyPayment: formatPrice(monthlyPayment.toFixed(2)),
            remainingBalance: formatPrice(balance.toFixed(2)),
        });
    }

    return paymentDetails;
};

const facebookTestimonials = [
    {
        name: 'Tim Huynh',
        content: 'Shaun and Allie are an amazing team at Brignac Mortgage. They got my refi deal done in under a week and cut down my loan in half the time and cost! They are fast, efficient, and made the process an amazing experience. They definitely have my business and referrals going forward.',
        image: '/storage/facebookprofiles/profile-1.jpg',
        createdAt: 'Oct 8, 2025'
    },
    {
        name: 'Ashley J Simon',
        content: 'Shaun and his team are straightforward and honest! They got the job done quick and easy. Will use them again if I ever need to purchase another home. Highly recommend!!!!!',
        image: '/storage/facebookprofiles/profile-2.jpg',
        createdAt: 'Jul 15, 2025'
    },
    {
        name: 'Evan Mullins ',
        content: 'A friend of mine recommended Brignac Mortgage to me while I was home hunting. I decided to give them a chance and it was worth it!  They weren’t pushy like some of these other company’s.  I purchased the home by-owner and not through a realtor. Shaun, Allie, and Jenn were there to answer any questions I had. and were patient and willing through the entire process.  They made the purchase of my new home easy and understanding.  I cannot give Brignac Mortgage enough credit for all the work there team did.  If I ever purchase another home there is no doubt in my mind that Shaun will be my first call!',
        image: '/storage/facebookprofiles/profile-3.jpg',
        createdAt: 'May 8, 2025'
    },
    {
        name:'Jason Villar',
        content: 'Shaun Brignac and his team worked around the clock to get my loan.  They were all very available, professional, and knowledgeable about their work.  Looking forward to working with them again in the future!',
        image: '/storage/facebookprofiles/profile-4.jpg',
        createdAt: 'Apr 10, 2025'
    },
    {
        name: 'Angelo Datseris',
        content: 'Shaun and I crossed paths at a mortgage conference and it didn\'t take long at all for us to become pretty tight friends. There are many people in this industry that are not in it for the right reasons but I can tell you whole heartedly that Shaun is not one of those people. Genuine, honest and the hardest working person in the room is what I think of when I think of Shaun. He does not stop when he puts his mind into getting something done. He doesn\'t listen to people telling him no either - if there\'s a way to get a deal closed he will find a way. Proud to call him a friend. This is the kind of person you want in your corner at all times.',
        image: '/storage/facebookprofiles/profile-5.jpg',
        createdAt: 'May 5, 2023'
    },
    {
        name: 'Justin Pfister',
        content: 'I talked with and received numbers (rates) from 6 different brokers. Brignac smoked them all by more then 2-3% lower! I’ll never even consider any other mortgage company out there… call Brignac Mortgage and let them blow your mind with the numbers they put together!!',
        image: '/storage/facebookprofiles/profile-6.jpg',
        createdAt: 'Jan 10, 2023'
    },
    {
        name: 'Brant Gauthreaux',
        content: 'Shaun made the loan process so easy and my loan closed fast. Would definitely recommend and use them on my next mortgage.',
        image: '/storage/facebookprofiles/profile-7.jpg',
        createdAt: 'Aug 23, 2022'
    },
    {
        name: 'Jeremy Bergeron',
        content: 'easy and fast process! Highly recommend Shaun for your mortgage services!',
        image: '/storage/facebookprofiles/profile-8.jpg',
        createdAt: 'May 30, 2022'
    },
    {
        name: 'Gmurph Pro Wash',
        content: 'Shaun has been a great help and is very knowledgeable in the Mortgage world!',
        image: '/storage/facebookprofiles/profile-9.jpg',
        createdAt: 'Feb 27, 2022'
    }
]
</script>

<template>
    <Head title="Welcome" />
    <NavigationDrawerGuest @scroll-our-services-section="scrollOurServicesSection" @scroll-mortgage-loan-calculator-section="scrollMortgageLoanCalculatorSection" @scroll-testimonials-section="scrolltestimonialsSection" />
    <GuestNav @scroll-our-services-section="scrollOurServicesSection" @scroll-mortgage-loan-calculator-section="scrollMortgageLoanCalculatorSection" @scroll-testimonials-section="scrolltestimonialsSection" />

    <div class="relative overflow-hidden welcome-header">
        <nav class="absolute w-full bg-transparent z-50 text-white">
            <div class="py-2 border-b-[1px] border-b-gray-500">
                <div class="flex lg:items-center justify-between max-w-7xl mx-auto px-4 lg:px-0">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:gap-6">
                        <a href="mailto:Shaun@brignacmortgage.com"  class="flex items-center gap-1 text-xs lg:text-sm">
                            <span class="material-symbols-outlined text-lg text-green-500">mail</span>
                            <p>Shaun@brignacmortgage.com</p>
                        </a>
                        <a href="tel:+12254359287" class="flex items-center gap-1 text-xs lg:text-sm">
                            <span class="material-symbols-outlined text-lg text-green-500">phone</span>
                            <p>+1 225-435-9287</p>
                        </a>
                    </div>

                    <div class="flex flex-col items-end lg:flex-row lg:items-center gap-1 lg:gap-6">
                        <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank" class="flex items-center gap-1 text-xs lg:text-sm">
                            <span class="material-symbols-outlined text-lg text-green-500">location_on</span>
                            <p> 12481, Maurepas, LA</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="py-3 max-w-7xl mx-auto lg:flex items-center justify-between hidden">
                <div class="flex items-center justify-center">
                    <img class="w-40" src="../../../../public/img/primary-logo-dark.png" alt="brignac logo">
                </div>
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
                                        <div class="w-full h-full bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover rounded-md">
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
                    <div>
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
                                        <div class="w-full h-full bg-[url('/storage/img/header-5.jpg')] bg-center bg-cover rounded-md">
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
                    <div>
                        <v-menu
                            v-model="menuLegal"
                            open-on-hover
                            location="bottom start" origin="top center"
                            >
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="flex items-center card_green cursor-pointer">
                                    <span class="block">Legal</span>
                                    <span class="material-symbols-outlined block text-gray-50 text-xl">keyboard_arrow_down</span>
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
                    <div @click="scrolltestimonialsSection">
                        <div class="card_green cursor-pointer flex items-center gap-1">
                            <span class="block text-base font-bold">Testimonials</span>
                        </div>
                    </div>
                    <Link :href="route('our-team.index')">
                        <v-btn rounded="xs" size="large" class="text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full">Apply Now</v-btn>
                    </Link>
                </div>
            </div>
            <div class="py-3 max-w-7xl mx-auto flex items-center justify-between lg:hidden px-4 lg:px-0 mt-7 lg:mt-0">
                <div class="flex items-center justify-center">
                    <img class="w-32" src="../../../../public/img/primary-logo-dark.png" alt="brignac logo">
                </div>
                <div @click="drawerNavState = !drawerNavState">
                    <svg class="size-9 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </div>
            </div>
        </nav>
        <v-carousel
            class="relative"
            hide-delimiter-background
        >
            <v-carousel-item src="/img/header-7.jpeg" cover>
                <div class="w-full h-full bg-black/60 flex items-center justify-center text-white">
                   <div class="max-w-4xl flex items-center justify-center flex-col gap-8 lg:mx-auto text-center mx-4"
                   >
                        <div class="flex items-center gap-1 bg-black/10 py-2 px-5 rounded-full mt-20 lg:mt-20">
                            <span class="material-symbols-outlined text-xl text-white">home</span>
                            <p class="font-bold text-xs lg:text-base">Brignac Mortgage</p>
                        </div>
                        <h1 class="text-4xl lg:text-6xl font-bold">{{ about_us.welcome_title }}</h1>
                        <div >
                            <p class="text-base lg:text-lg max-w-2xl">{{ about_us.welcome_subtitle }}</p>
                        </div>
                        <div>
                            <Link :href="route('our-team.index')">
                                <v-btn rounded="xs" size="x-large" class="!hidden text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full !py-8 lg:!flex !items-center !justify-center">Apply for a mortgage</v-btn>
                                <v-btn rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full !py-7 !flex !items-center !justify-center">Apply for a mortgage</v-btn>
                            </Link >
                        </div>
                   </div>
                </div>
            </v-carousel-item>
            <v-carousel-item src="/img/header-7.jpeg" cover>
                <div class="w-full h-full bg-black/60 flex items-center justify-center text-white">
                   <div class="max-w-4xl flex items-center justify-center flex-col gap-8 lg:mx-auto text-center mx-4"
                   >
                        <div class="flex items-center gap-1 bg-black/10 py-2 px-5 rounded-full mt-20 lg:mt-20">
                            <span class="material-symbols-outlined text-xl text-white">home</span>
                            <p class="font-bold text-xs lg:text-base">Brignac Mortgage</p>
                        </div>
                        <h1 class="text-4xl lg:text-6xl font-bold">{{ about_us.welcome_title }}</h1>
                        <div >
                            <p class="text-base lg:text-lg max-w-2xl">{{ about_us.welcome_subtitle }}</p>
                        </div>
                        <div>
                            <Link :href="route('our-team.index')">
                                <v-btn rounded="xs" size="x-large" class="!hidden text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full !py-8 lg:!flex !items-center !justify-center">Apply for a mortgage</v-btn>
                                <v-btn rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full !py-7 !flex !items-center !justify-center">Apply for a mortgage</v-btn>
                            </Link >
                        </div>
                   </div>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>

    <section class="bg-white relative z-10">
        <div class="w-[90%] lg:w-[70%] mx-auto shadow-xl rounded-xl p-10 absolute overflow-hidden top-[-60px] left-1/2 transform -translate-x-1/2 bg-white">
            <!-- Testimonials -->
            <div class="relative">
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
                            <img class="h-full w-full" src="../../../../public/img/company-seo-img.jpg" alt="brignac logo">
                        </div>
                       <div class="text-start">
                            <div class="font-semibold text-gray-800">Shaun Brignac</div>
                            <div class="text-xs text-gray-500">President and CEO | Brignac Mortgage</div>
                       </div>
                    </footer>
                    <div class="mt-6 flex items-center gap-2 justify-center">
                        <a data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.facebook.com/BrignacMortgage" target="_blank">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                        </a>
                        <a data-aos="fade-up" data-aos-duration="1500" data-aos-once="true" class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://maps.app.goo.gl/wBjcfrZDJV8aNYr9A" target="_blank">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                        </a>
                        <a data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://x.com/shaunbrignac" target="_blank">
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="none"><g clip-path="url(#clip0_1_2)"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="gray"/></g><defs><clipPath id="clip0_1_2"><rect width="1200" height="1227" fill="white"/></clipPath></defs></svg>
                        </a>
                        <a data-aos="fade-up" data-aos-duration="2500" data-aos-once="true" class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.tiktok.com/@shaunbrignac?is_from_webapp=1&sender_device=pc" target="_blank">
                            <svg class="w-5 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                        </a>
                        <a data-aos="fade-up" data-aos-duration="3000" data-aos-once="true" class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.instagram.com/shaunbrignac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-current text-gray-500" viewBox="0 0 24 24"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path></svg>
                        </a>
                    </div>
                </blockquote>
                <!-- End Blockquote -->
            </div>
            <!-- End Testimonials -->
        </div>
    </section>

    <section ref="mortgageLoanCalculator" class="mt-[550px] lg:mt-[480px] text-gray-700 w-full mx-auto lg:rounded-lg overflow-hidden">
         <div class="shadow-xl bg-[url('/storage/img/header-6.jpg')] bg-center bg-cover">
            <v-form v-model="formSimulator" @submit.prevent="onSubmitCalculate" lazy-validation class="h-full w-full bg-black/70 py-20 px-4 text-white">
                <div class="max-w-7xl mx-auto" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
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
                            append-inner-icon="mdi-currency-usd"
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
                            append-inner-icon="mdi-cash-multiple"
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
                            append-inner-icon="mdi-home-analytics"
                            :items="plazoOptions"
                            v-model="creditTerm"
                            label="What loan term do you need?"
                            color="orange"
                            clearable
                            class="w-full text-white backdrop-blur-sm "
                            hint="The most common term is 30 years"
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
                            hint="Slide the input bar sideways to adjust the interest rate range"
                            persistent-hint=""
                            class="w-full lg:w-auto"
                            v-model="interestRate"
                            :min="3.5"
                            :max="7.5"
                            :step="0.01"
                        ></v-slider>
                        <div >
                            <p>Annual effective rate: {{ interestRate.toFixed(2) }}%</p>
                            <p>Monthly interest rate: {{ (interestRate / 12).toFixed(2) }}%</p>
                        </div>
                    </div>

                    <div class="text-center text-xs flex items-center justify-center mt-3 lg:mt-0">
                        <p class="inline-flex bg-white/10 py-1 px-4 rounded-full">The average interest rate is 6.91% according to the United States Bank.</p>
                    </div>

                    <div class="mt-10">
                        <div class='flex items-center justify-center relative'>
                            <div class="h-10 flex items-center justify-center w-full relative z-5">
                                <v-btn type="submit"  :loading="loadingCalculate" rounded="xs" size="large" class="text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700 !flex !items-center !justify-center !py-5 !px-7 lg:!py-7 lg:!px-10 !rounded-full">Calculate the credit payment</v-btn>
                            </div>
                        </div>
                    </div>

                    <div class="text-center pa-4">
                        <v-dialog
                            v-model="dialog"
                            transition="dialog-bottom-transition"
                            fullscreen
                        >
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" variant="elevated" class="text-none !hidden !text-white !bg-gradient-to-r !from-purple-600 !to-pink-400 !h-20 !w-[335px]" rounded="xl" size="large" block><span class="material-symbols-outlined text-xl !w-1/2">credit_score</span></v-btn>
                            </template>

                            <v-card>
                            <v-toolbar class="!bg-gradient-to-r !from-slate-950 !via-orange-950 !to-slate-950">
                                <v-btn
                                class="!text-white"
                                icon="mdi-close"
                                @click="dialog = false"
                                ></v-btn>

                                <v-toolbar-title>
                                    <div class="font-bold text-white text-xs lg:text-base">Calculation results</div>
                                </v-toolbar-title>

                                <v-spacer></v-spacer>

                                <v-toolbar-items>
                                <v-btn
                                    color="white"
                                    text="Accept"
                                    variant="tonal"
                                    @click="dialog = false"
                                ></v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <div class="w-full max-w-[90%] mx-auto">
                                <div v-if="showCalculatorResult" class="mt-10 bg-white/10 pb-14 lg:py-10 lg:px-8 rounded-lg backdrop-blur-md flex items-center justify-center flex-col text-start">
                                    <p class="text-2xl lg:text-3xl font-bold text-orange-500">Calculation results:</p>
                                    <div class="w-full flex flex-col lg:flex-row gap-3 lg:gap-10 lg:items-center justify-center mt-7 font-bold text-lg">
                                        <p class="py-2 px-5 bg-gray-100 shadow-md rounded-full text-sm lg:text-base">Pay installments of ${{ monthlyPayment }} per month</p>
                                        <p class="py-2 px-5 bg-gray-100 shadow-md rounded-full text-sm lg:text-base">For a term of {{ creditTerm }} years</p>
                                        <p class="py-2 px-5 bg-gray-100 shadow-md rounded-full text-sm lg:text-base">And a loan of ${{ loanNeeded }}</p>
                                        <p class="py-2 px-5 bg-gray-100 shadow-md rounded-full text-sm lg:text-base">Interest rate: {{ interestRate.toFixed(2) }}%</p>
                                    </div>
                                    <v-btn @click="resetCalculate" rounded="xs" size="large" class="mt-6 text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700 !px-9">Reset</v-btn>

                                    <div class="mt-10 w-full overflow-x-auto">
                                        <v-data-table
                                            :headers="headers" :header-props="headerProps"
                                            :items="paymentDetails"
                                            :items-per-page="12"
                                            class="elevation-1"
                                        ></v-data-table>
                                    </div>
                                </div>
                            </div>
                            </v-card>
                        </v-dialog>
                    </div>
                </div>
            </v-form>
         </div>
    </section>

    <section ref="ourServices" class="text-gray-700 mb-10 mt-20">
         <div class="w-full flex flex-col-reverse lg:flex-col lg:mt-10">
            <div class="bg-gray-50 border-y lg:my-10 w-full py-20 lg:mb-10">
                <div class="max-w-6xl mx-auto gap-16 flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-0 overflow-hidden">
                    <div class="w-full lg:w-[40%] px-2">
                        <div class="relative h-[400px] lg:h-[600px] rounded-xl w-full after:w-[20px] lg:after:w-[30px] after:h-[250px] lg:after:h-[500px] after:absolute after:top-1/2 after:-left-[20px] lg:after:-left-[30px] after:-translate-y-1/2 after:bg-orange-500 after:rounded-l-xl">
                            <img class="w-full h-full object-cover rounded-xl" src="/storage/img/header-5.jpg" alt="brignac logo">
                        </div>
                    </div>
                    <div class="w-full lg:w-[60%]">
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
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">real_estate_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Conventional and Construction Loans</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">support_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Mobile Home Loans - Single and Double Wide</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">location_away</span>
                                </div>
                                <h3 class="text-sm flex-grow">Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">badge</span>
                                </div>
                                <h3 class="text-sm flex-grow">Home Equity Line of Credit Loans</h3>
                            </div>
                        </div>
                    <ServiceDialog />
                </div>
            </div>
        </div>

        <div class="lg:mt-5">
            <div class="flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
                <div class="bg-orange-100 rounded-full py-2 px-5 inline-flex text-orange-600">
                    <span>Our Services</span>
                </div>
                <h2 class="text-3xl lg:text-4xl font-bold">What We Provide</h2>
            </div>
            <div data-aos-duration="2000" data-aos-once="true" class="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-5 mt-5 mb-0">

                <div class="relative bg-center bg-cover w-full shadow-xl mx-auto card2 lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                   <div class="w-full h-full px-10 py-12 flex flex-col gap-3 items-center justify-center text-center">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">real_estate_agent</span></div>
                    <h3 class="text-xl font-bold">Excellent Customer Experience!</h3>
                    <p class="text-xs">We are dedicated to providing you with the best customer experience in the industry.</p>
                   </div>
                </div>
                <div class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">nest_clock_farsight_analog</span></div>
                    <h3 class="text-xl font-bold">Fast Closing Times</h3>
                    <p class="text-xs">Our streamlined process ensures that you can close your loan quickly and efficiently, saving you time and hassle.</p>
                </div>
                <div class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">productivity</span></div>
                    <h3 class="text-xl font-bold">Open Line of Communication</h3>
                    <p class="text-xs">e maintain an open line of communication throughout the entire process, ensuring you are always informed and your questions are promptly answered.</p>
                </div>
                <div class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">support_agent</span></div>
                    <h3 class="text-xl font-bold">Free Consulting Services</h3>
                    <p class="text-xs">Take advantage of our free consulting services to get expert advice and guidance tailored to your specific financial needs and goals.</p>
                </div>
                <div class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">location_away</span></div>
                    <h3 class="text-xl font-bold">Access to Wholesale Lenders, Investors, and Products</h3>
                    <p class="text-xs">Gain exclusive access to a wide range of wholesale lenders, investors, and products to find the best options for your needs.</p>
                </div>
                <div class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">badge</span></div>
                    <h3 class="text-xl font-bold">Credit Repair Guidance</h3>
                    <p class="text-xs">ur experts provide personalized guidance to help you repair and improve your credit score, making it easier to secure favorable loan terms.</p>
                </div>
                <div class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card lg:transition-all lg:duration-700 cursor-pointer rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center text-center size-14 rounded-full border-2 border-green-200"><span class="material-symbols-outlined text-3xl text-green-500">card_travel</span></div>
                    <h3 class="text-xl font-bold">Residential, Investment, and Commercial Loans</h3>
                    <p class="text-xs">We offer a variety of loan options to meet your residential, investment, and commercial needs, ensuring you get the best terms and rates available.</p>
                </div>
            </div>
        </div>
         </div>
    </section>

    <section ref="testimonials" class="mt-28 lg:mt-36">
        <div class="w-full">
            <div class="h-full w-full pt-14 px-4 lg:px-0">
                <div class="flex flex-col gap-3 items-center justify-center">
                    <div class="bg-black/10 rounded-full py-2 px-5 inline-flex">
                        <span>Testimonials</span>
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-center">
                        Our
                        <span style="color: #4285F4;">G</span>
                        <span style="color: #EA4335;">o</span>
                        <span style="color: #FBBC05;">o</span>
                        <span style="color: #4285F4;">g</span>
                        <span style="color: #34A853;">l</span>
                        <span style="color: #EA4335;">e</span>
                        Testimonials
                    </h2>
                    <a href="https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6" target="_blank">
                        <v-btn rounded="xs" size="large" class="text-none !bg-blue-600 mt-3 !text-white hover:!bg-white hover:!text-blue-600 !transition-all !duration-700 !flex !items-center !justify-center !p-5 lg:!py-7 lg:!px-8 !rounded-full !mb-3">
                            Read more reviews
                            <span class="material-symbols-outlined block text-lg mr-2">arrow_outward</span>
                        </v-btn>
                    </a>
                </div>
            </div>
        </div>

        <main class="bg-white relative z-10">
            <div class="w-[90%] lg:w-[80%] mx-auto shadow-xl rounded-xl p-4 lg:p-10 bg-white">
                <div class="relative">
                   <!--  <iframe class="h-[450px] z-50 w-full" src="https://widget.tagembed.com/2135662" style="border:none;"></iframe> -->
                    <div class="elfsight-app-ebce6ca8-0720-4595-b6cd-c4d2cb07e6df" data-elfsight-app-lazy></div>
                </div>
            </div>
        </main>
    </section>

    <section ref="testimonialsfacebook" class="mt-20 lg:mt-32">
        <div class="w-full">
            <div class="h-full w-full pt-14 px-4 lg:px-0">
                <div class="flex flex-col gap-3 items-center justify-center">
                    <div class="bg-black/10 rounded-full py-2 px-5 inline-flex">
                        <span>Testimonials</span>
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-center">
                        Our <span class="text-blue-500">Facebook</span> Testimonials
                    </h2>
                    <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank">
                        <v-btn rounded="xs" size="large" class="text-none !bg-blue-600 mt-3 !text-white hover:!bg-white hover:!text-blue-600 !transition-all !duration-700 !flex !items-center !justify-center !p-5 lg:!py-7 lg:!px-8 !rounded-full !mb-3">
                            Read more reviews
                            <span class="material-symbols-outlined block text-lg mr-2">arrow_outward</span>
                        </v-btn>
                    </a>

                </div>
            </div>
        </div>

        <main class="bg-white relative z-10">
            <div class="w-[90%] lg:w-[80%] mx-auto shadow-xl rounded-xl p-4 lg:p-10 bg-white">
                <div class="relative">
                    <div class="w-full p-6 bg-gray-100/70 rounded-lg flex flex-col md:flex-row gap-5 items-center justify-between">
                        <div class="flex flex-col gap-3">
                            <h2 class="font-bold text-xl text-blue-600">Facebook <span class="text-lg text-neutral-800">Reviews</span></h2>
                            <div class="flex items-center gap-1">
                                <p class="text-xl font-bold">5.0</p>
                                <div class="flex gap-0 items-center text-yellow-500">
                                    <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                </div>
                                <p class="text-xs opacity-70">(9)</p>
                            </div>
                        </div>
                        <div>
                            <a href="https://www.facebook.com/BrignacMortgage/reviews" target="_blank" class="py-2 px-4 rounded-full bg-blue-600 text-white">
                                Review us on Facebook
                            </a>
                        </div>
                    </div>
                    <div class="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <div v-for="testimonial in facebookTestimonials" :key="testimonial.name" class="bg-gray-100/70 rounded-lg flex flex-col gap-5 p-7">
                            <div class="text-center flex flex-col items-center justify-center gap-1">
                                <div class="flex gap-0 items-center text-yellow-500">
                                    <svg class="size-5 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-5 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-5 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-5 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    <svg class="size-5 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                </div>
                                <p class="line-clamp-3">{{ testimonial.content }}</p>
                                <v-dialog max-width="600">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <p v-bind="activatorProps" class="text-blue-500 cursor-pointer">Read more</p>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card class="!p-8 !w-full !rounded-xl">
                                            <div class="flex items-start justify-between">
                                                <div class="flex flex-col gap-2">
                                                    <div class="text-center flex items-center justify-center gap-3">
                                                        <div class="size-12 rounded-full flex items-center justify-center relative">
                                                            <img class="w-full h-full object-cover rounded-full z-10" :src="testimonial.image" alt="profile picture">
                                                            <div class="absolute -bottom-1 -right-1 z-20 bg-white rounded-full p-[3px]">
                                                                <svg class="shrink-0 size-5 fill-blue-600 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div class="flex flex-col items-start">
                                                            <p class="text-lg font-bold">{{ testimonial.name }}</p>
                                                            <p class="text-xs opacity-70">{{ testimonial.createdAt }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex gap-0 items-center text-yellow-500">
                                                        <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                                        <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                                        <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                                        <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                                        <svg class="size-6 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                                    </div>
                                                </div>
                                                <div @click="isActive.value = false" class="cursor-pointer">
                                                    <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="mt-2">
                                                <p>{{ testimonial.content }}</p>
                                            </div>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </div>
                            <div class="text-center flex flex-col items-center justify-center gap-1">
                                <div class="size-12 rounded-full flex items-center justify-center relative">
                                    <img class="w-full h-full object-cover rounded-full z-10" :src="testimonial.image" alt="profile picture">
                                    <div class="absolute -bottom-1 -right-1 z-20 bg-white rounded-full p-[3px]">
                                        <svg class="shrink-0 size-5 fill-blue-600 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-lg font-bold">{{ testimonial.name }}</p>
                                    <p class="text-xs opacity-70">{{ testimonial.createdAt }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </section>

    <section class="mt-20 lg:mt-40 w-full flex flex-col items-center justify-center">
        <div class="w-[90%] lg:w-[50%] h-10 bg-green-500 rounded-t-xl"></div>
        <div class="w-full h-[300px] lg:hidden bg-[url('/storage/img/header-6.jpg')] bg-center bg-cover">
            <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/50">
                <div class="flex flex-col gap-0 items-center justify-center mb-5">
                    <h2 class="text-3xl lg:text-4xl font-bold">About us</h2>
                    <div class="inline-flex cursor-pointer items-center gap-x-1 text-sm">
                        <span class="block">Show more</span>
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
                            <v-card-text class="!p-0">
                                <div class="flex flex-col gap-5 items-center justify-center text-center">
                                    <div class="tw-mx-auto tw-absolute w-full">
                                        <video class="tw-max-w-full tw-w-full tw-h-auto" controls playsinline>
                                            <source type="video/mp4" src="../../../../public/video/about-us-video.mp4">
                                        </video>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </div>
        <div class="w-full !hidden lg:!block">
            <v-parallax
            class="w-full h-[300px] "
            src="/storage/img/header-6.jpg"
        >
                <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/50">
                    <div class="flex flex-col gap-0 items-center justify-center mb-5">
                        <h2 class="text-3xl lg:text-4xl font-bold">About us</h2>
                        <div class="inline-flex cursor-pointer items-center gap-x-1 text-sm">
                            <span class="block">Show more</span>
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
                                <v-card-text class="!p-0">
                                    <div class="flex flex-col gap-5 items-center justify-center text-center">
                                        <div class="tw-mx-auto tw-absolute w-full">
                                            <video class="tw-max-w-full tw-w-full tw-h-auto" controls playsinline>
                                                <source type="video/mp4" src="../../../../public/video/about-us-video.mp4">
                                            </video>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-dialog>
                </div>
        </v-parallax>
        </div>

    </section>

    <section class="mt-24 lg:mt-36">
        <iframe class="w-full h-[400px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6893.12326712053!2d-90.771464!3d30.249575!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8626cf3dc655337f%3A0x3b15aacf38947f0c!2sBrignac%20Mortgage%20and%20Consulting%20Services%20LLC!5e0!3m2!1ses-419!2smx!4v1730790533348!5m2!1ses-419!2smx" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <main class="bg-white relative z-10">
            <div class="w-[90%] lg:w-[70%] mx-auto rounded-xl py-10 px-6 absolute top-[-200px] left-1/2 transform -translate-x-1/2 bg-white">
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
                                    <div class="h-10 flex items-center justify-center w-full relative z-5">
                                        <v-btn type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full">Send now</v-btn>
                                        <v-btn type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white !transition-all !duration-700 !rounded-full">Send now</v-btn>
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
        <Footer  @scroll-our-services-section="scrollOurServicesSection" @scroll-testimonials-section="scrolltestimonialsSection" />
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
thead {
    background: #f5f5f5 !important;
}
</style>
