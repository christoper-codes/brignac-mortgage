<script setup>
import { Link, router, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { onMounted, ref, onUnmounted } from 'vue';
import { toast } from 'vue3-toastify'
import useCurrentYear from '@/composables/currentYear';

const { currentYear } = useCurrentYear();

const form = ref(false);
const name = ref('I request information');
const email = ref('');
const message = ref('I would like to see the plans that you offer on your website and information about them');
const loading = ref(false);
const scrolledDown = ref(false);

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
            email.value = ' ';
        });

}

const rules = {
    required: value => !!value || 'Field is required',
    email: value => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || 'Invalid email address';
    },
}

const emits = defineEmits(['scroll-our-services-section', 'scroll-testimonials-section'])
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
}

const navigateToTestimonialsAndScroll = () => {
    if (routeName.value == '/') {
        emits('scroll-testimonials-section');
    } else {
        router.visit('/', {
            onSuccess: () => {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('scroll-testimonials-section'));
                }, 300);
            },
        });
    }
};

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
    <!-- ========== FOOTER ========== -->
    <footer class="mt-auto bg-neutral-50 w-full relative border-t-4">
        <div class="w-[90%] lg:w-[70%] p-10 rounded-xl flex items-center justify-center text-center gap-10 mx-auto rounded-sm absolute top-[-70px] left-1/2 transform -translate-x-1/2 bg-orange-500">
            <div>
                <h3 class="font-bold text-xl lg:text-3xl text-white">Don't see what you are looking for?</h3>
                <p class="text-white text-sm lg:text-base mt-3">We can help you with that, Give us a call!</p>
            </div>
        </div>
        <div class="mt-auto w-full max-w-[85rem] pb-10 pt-40 lg:pt-32 px-4 sm:px-6 lg:px-8 mx-auto">
            <!-- Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div class="col-span-full lg:col-span-1">
                <a class="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
                    <img class="w-40" src="img/darklogo.png" alt="brignac logo">
                </a>
            </div>
            <!-- End Col -->

            <div class="col-span-1">
                <h4 class="font-semibold">Services</h4>

                <div class="mt-3 grid space-y-3">
                <p><span @click="navigateToWelcomeAndScroll" class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">What We Provide</span></p>
                <Link :href="route('programs.index')">
                    <div><span class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">Programs</span></div>
                </Link>
                <p><span @click="navigateToWelcomeAndScroll" class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">Loan Products</span></p>
                </div>

                <h4 class="font-semibold mt-5">Legal</h4>
                <div class="mt-3 grid space-y-3">
                    <a href="https://www.brignacmortgage.com/disclaimers-for-website" target="_blank" class="underline text-gray-700 hover:text-gray-900">Disclaimers</a>
                    <a href="https://www.brignacmortgage.com/privacy-policy-for-website" target="_blank" class="underline text-gray-700 hover:text-gray-900">Privacy policy</a>
                    <a href="https://www.brignacmortgage.com/terms-of-use-for-website" target="_blank" class="underline text-gray-700 hover:text-gray-900">Terms of use</a>
                </div>
            </div>
            <!-- End Col -->

            <div class="col-span-1">
                <h4 class="font-semibold">Company</h4>

                <div class="mt-3 grid space-y-3">
                <Link :href="route('about-us.index')">
                    <p><span class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">About us</span></p>
                </Link>
                <p @click="navigateToTestimonialsAndScroll"><span class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">Testimonials</span></p>
                <Link :href="route('blog.index')">
                    <p><span class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">Blog</span> <span class="inline-block ms-1 text-xs bg-green-600 text-white py-1 px-2 rounded-lg">New section</span></p>
                </Link>
                <Link :href="route('about-us.index')">
                    <p><span class="inline-flex cursor-pointer gap-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-200">Mission and vision</span></p>
                </Link>

                </div>
            </div>
            <!-- End Col -->

            <div class="col-span-2">
                <h4 class="font-semibold">Stay up to date</h4>

                <form>
                <div class="mt-3">
                    <v-form class="w-full flex flex-col justify-between" v-model="form" @submit.prevent="onSubmit" lazy-validation>
                        <v-text-field
                                append-inner-icon="mdi-email"
                                variant="solo"
                                label="Email"
                                autocomplete="email"
                                color="green"
                                clearable
                                class="w-full"
                                persistent-hint=""
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                            ></v-text-field>
                            <v-btn type="submit" :loading="loading" rounded="xs" class="text-none lg:!w-[35%] !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700 !rounded-full">Send now</v-btn>
                    </v-form>
                </div>
                <p class="mt-3 text-xs lg:text-sm text-gray-500">
                    Subscribe to our newsletter to hear about the latest mortgage news.
                    <span class="block mt-2 lg:mt-0">21121 Waterfront East Dr, Maurepas, LA 70449 | 504-559-2821</span>
                </p>
                </form>
            </div>
            <!-- End Col -->
            </div>
            <!-- End Grid -->

            <div class="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
            <div class="flex justify-between items-center">
                <p class="text-sm text-gray-500">
                    © {{ currentYear }} Brignac Mortgage.
                </p>
            </div>
            <!-- End Col -->

            <!-- Social Brands -->
            <div class="flex items-center gap-2">
                <a class="size-10 text-neutral-600 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.facebook.com/BrignacMortgage" target="_blank">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                </a>
                <a class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="https://maps.app.goo.gl/wBjcfrZDJV8aNYr9A" target="_blank">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
                </a>
                <a class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="https://x.com/shaunbrignac" target="_blank">
                    <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="none"><g><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black"/></g><defs><clipPath id="clip0_1_2"><rect width="1200" height="1227" fill="black"/></clipPath></defs></svg>
                </a>
                <a class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.tiktok.com/@shaunbrignac?is_from_webapp=1&sender_device=pc" target="_blank">
                    <svg class="w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                </a>
                <a class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.instagram.com/shaunbrignac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-current" viewBox="0 0 24 24"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path></svg>
                </a>
            </div>
            <!-- End Social Brands -->
            </div>
        </div>
    </footer>
    <!-- ========== END FOOTER ========== -->
    <div class="w-full p-5 text-center flex-col gap-3 flex items-center justify-center bg-white border-t-4 text-gray-400 text-xs">
        <p>Copyright © {{ currentYear }} Brignac Mortgage and Consulting Services LLC - All Rights reserved. NMLS #2401214</p>
        <p class="py-1 px-4 rounded-full bg-gray-100">Equal Housing Opportunity Lender</p>
    </div>
</template>

<style scoped>

</style>
