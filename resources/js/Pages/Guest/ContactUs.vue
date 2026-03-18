<script setup>
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const form = ref(false);
const name = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const optIn = ref(false);
const loading = ref(false);

const onSubmit = () => {
    if (!form.value) {
        toast('All fields are required', { "theme": "auto", "type": "error", "dangerouslyHTMLString": true });
        return;
    }
    if (!optIn.value) {
        toast('You must consent to receive text messages before submitting.', { "theme": "auto", "type": "error", "dangerouslyHTMLString": true });
        return;
    }
    loading.value = true;
    axios.post(route('send-email'), { name: name.value, email: email.value, phone: phone.value, message: message.value, is_hiring: false })
        .then(response => toast(response.data.message, { "theme": "auto", "type": "success", "dangerouslyHTMLString": true }))
        .catch(error => toast(error.response.data.message, { "theme": "auto", "type": "error", "dangerouslyHTMLString": true }))
        .finally(() => {
            loading.value = false;
            name.value = ''; email.value = ''; phone.value = ''; message.value = ''; optIn.value = false;
        });
};

const rules = {
    required: value => !!value || 'Field is required',
    email: value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid email address',
    phone: value => /^[0-9+\-\s()]{7,20}$/.test(value) || 'Invalid phone number',
    description: value => value.length <= 255 || 'The description must be less than 255 characters.'
};
</script>

<template>
    <Head title="Contact Us" />
    <NavigationDrawerGuest />
    <GuestNav />

    <!-- Hero Banner -->
     <div class="mt-16 lg:mt-0">
        <div class="w-full h-[500px] relative overflow-hidden lg:mt-20">
            <img src="/img/contact-us.jpg" class="w-full h-full object-cover object-top" alt="Contact Us" />
            <div class="absolute inset-0 bg-gradient-to-tr from-black/80 to-black/20"></div>
            <div class="absolute inset-0 flex items-center px-5 lg:px-0 max-w-7xl mx-auto">
                <div class="max-w-xl text-white" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
                    <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full py-2 px-4 mb-5">
                        <span class="material-symbols-outlined text-orange-400 text-lg">home</span>
                        <span class="text-sm font-semibold">Brignac Mortgage</span>
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        Contact Us Today!
                    </h1>
                    <p class="text-base lg:text-lg text-white/80 mb-4">
                        Get the mortgage loan you need. It's easy to qualify for flexible loans that adapt to your circumstances.
                    </p>
                    <Link :href="route('our-team.index')">
                        <v-btn size="large" class="text-none !bg-orange-500 !text-white !rounded-full !px-8 hover:!bg-white hover:!text-orange-500 !transition-all !duration-300">
                            Apply Today
                            <span class="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                        </v-btn>
                    </Link>
                </div>
            </div>
        </div>
     </div>


    <!-- Main content: 2 columns -->
    <section class="max-w-7xl mx-auto px-4 lg:px-0 mt-16 mb-20">
        <div class="flex flex-col lg:flex-row gap-10 items-start">

            <!-- LEFT: Info + Hours + Social -->
            <div class="w-full lg:w-[42%] flex flex-col gap-8">

                <!-- Contact Info Cards -->
                <div>
                    <div class="flex flex-col gap-2 mb-6">
                        <div class="inline-flex items-center gap-2 bg-green-50 text-green-600 rounded-full py-1 px-4 text-xs font-semibold w-fit">
                            <span class="material-symbols-outlined text-base">contact_support</span>
                            Get In Touch
                        </div>
                        <h2 class="text-2xl lg:text-3xl font-bold text-gray-700">We're Here to Help</h2>
                        <div class="h-1 w-10 bg-orange-500 rounded-full"></div>
                    </div>

                    <div class="flex flex-col gap-4">

                        <!-- Social Media -->
                <div class="p-5 rounded-2xl bg-white shadow-md border border-gray-100">
                    <div>
                        <footer class="flex items-center gap-3">
                            <div class="size-[70px] rounded-full overflow-hidden">
                                <img class="h-full w-full" src="../../../../public/img/company-seo-img.jpg" alt="brignac logo">
                            </div>
                            <div class="text-start">
                                <div class="font-semibold text-gray-800 text-lg">Shaun Brignac</div>
                                <div class="text-sm text-gray-500">President and CEO | Brignac Mortgage</div>
                            </div>
                        </footer>
                        <div class="mt-6 flex items-center gap-2 ">
                            <a class="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.facebook.com/BrignacMortgage" target="_blank">
                                <svg class="shrink-0 size-[22px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                            </a>
                            <a class="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://maps.app.goo.gl/wBjcfrZDJV8aNYr9A" target="_blank">
                                <svg class="shrink-0 size-[20px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                </svg>
                            </a>
                            <a class="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://x.com/shaunbrignac" target="_blank">
                                <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="none"><g clip-path="url(#clip0_1_2)"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="gray"/></g><defs><clipPath id="clip0_1_2"><rect width="1200" height="1227" fill="white"/></clipPath></defs></svg>
                            </a>
                            <a class="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.tiktok.com/@shaunbrignac?is_from_webapp=1&sender_device=pc" target="_blank">
                                <svg class="w-[22px] fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                            </a>
                            <a class="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500 hover:bg-black/10 focus:outline-none focus:bg-black/10 disabled:opacity-50 disabled:pointer-events-none" href="https://www.instagram.com/shaunbrignac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-[26px] fill-current text-gray-500" viewBox="0 0 24 24"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                        <!-- Address -->
                        <div class="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <div class="flex-shrink-0 size-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                                <span class="material-symbols-outlined text-2xl text-green-500">location_on</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800 mb-1">Office Address</h3>
                                <p class="text-sm text-gray-600">21121 Waterfront East Dr</p>
                                <p class="text-sm text-gray-600">Maurepas, LA 70449</p>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div class="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <div class="flex-shrink-0 size-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                                <span class="material-symbols-outlined text-2xl text-green-500">perm_phone_msg</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800 mb-1">Phone Number</h3>
                                <a href="tel:+15045592821" class="text-sm text-gray-600 hover:text-green-600 transition-colors">+1 504-559-2821</a>
                                <p class="text-xs text-gray-400 mt-1">NMLS ID: 2401214</p>
                            </div>
                        </div>

                        <!-- Our Team -->
                        <div class="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <div class="flex-shrink-0 size-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                                <span class="material-symbols-outlined text-2xl text-green-500">group</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800 mb-1">Our Team</h3>
                                <p class="text-sm text-gray-600 mb-2">Ready to help you find the best mortgage solution.</p>
                                <Link :href="route('our-team.index')">
                                    <span class="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 py-1 px-3 rounded-full hover:bg-green-100 transition-colors">
                                        <span class="material-symbols-outlined text-sm">arrow_outward</span>
                                        Apply with one of us
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Business Hours -->
                <div class="p-5 rounded-2xl bg-white shadow-md border border-gray-100">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="material-symbols-outlined text-orange-500">schedule</span>
                        <h3 class="font-bold text-gray-800">Business Hours</h3>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-gray-600">
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="font-medium text-gray-700">Monday – Friday</span>
                            <span>9:00 am – 5:00 pm</span>
                        </div>
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="font-medium text-gray-700">Saturday</span>
                            <span>By appointment</span>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <span class="font-medium text-gray-700">Sunday</span>
                            <span>By appointment</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT: Contact Form -->
            <div class="w-full lg:w-[58%]">
                <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10 lg:sticky lg:top-28">
                    <div class="flex flex-col gap-2 mb-7">
                        <h3 class="text-2xl font-bold text-gray-700">Send Us a Message</h3>
                        <div class="h-1 w-10 bg-orange-500 rounded-full"></div>
                        <p class="text-sm text-gray-500">Fill out the form and we'll get back to you shortly.</p>
                    </div>

                    <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                        <div class="flex flex-col lg:flex-row gap-5">
                            <v-text-field
                                label="Name"
                                color="green"
                                append-inner-icon="mdi-account"
                                variant="solo"
                                clearable
                                class="w-full"
                                hint="Your full name"
                                persistent-hint
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
                                class="w-full"
                                hint="Your email address"
                                persistent-hint
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                            ></v-text-field>
                        </div>

                        <v-text-field
                            append-inner-icon="mdi-phone"
                            variant="solo"
                            label="Phone Number"
                            autocomplete="tel"
                            color="green"
                            clearable
                            class="mt-2"
                            hint="Your phone number"
                            persistent-hint
                            v-model="phone"
                            :rules="[rules.required, rules.phone]"
                        ></v-text-field>

                        <v-textarea
                            append-inner-icon="mdi-message"
                            variant="solo"
                            label="Message"
                            v-model="message"
                            auto-grow
                            hint="How can we help you?"
                            persistent-hint
                            class="mt-2"
                            clearable
                            :rules="[rules.required, rules.description]"
                            color="green"
                        ></v-textarea>

                        <!-- SMS Opt-In -->
                        <div class="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p class="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                                <Link :href="route('terms-of-use-website')" class="underline hover:text-green-600 transition-colors">Terms of Use</Link>
                                &amp;
                                <Link :href="route('privacy-policy-website')" class="underline hover:text-green-600 transition-colors">Privacy Policy</Link>
                            </p>
                            <div class="flex items-start gap-3">
                                <div class="-mt-3 flex-shrink-0">
                                    <v-checkbox color="success" v-model="optIn"></v-checkbox>
                                </div>
                                <p class="text-sm text-gray-700 leading-relaxed">
                                    By checking this box, you agree to Brignac Mortgage's
                                    <Link :href="route('terms-of-use-website')" class="font-semibold underline hover:text-green-600 transition-colors">Terms of Use</Link>
                                    and
                                    <Link :href="route('privacy-policy-website')" class="font-semibold underline hover:text-green-600 transition-colors">Privacy Policy</Link>,
                                    and provide consent to receive text messages for important notifications about our services, updates on upcoming meetings, and replies from your dedicated representative.
                                </p>
                            </div>
                        </div>

                        <div class="w-full mt-7">
                            <v-btn type="submit" :loading="loading" :disabled="!optIn" size="x-large" block class="text-none !bg-green-500 !text-white hover:!bg-green-600 !transition-all !duration-300 !rounded-full !h-14 disabled:!opacity-40">
                                Send Message
                                <span class="material-symbols-outlined ml-2">send</span>
                            </v-btn>
                        </div>
                    </v-form>
                </div>
            </div>

        </div>
    </section>

    <div class="mt-80">
        <Footer />
    </div>
</template>
