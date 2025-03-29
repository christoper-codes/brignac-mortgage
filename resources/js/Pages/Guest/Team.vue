<script setup>
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';
import { toast } from 'vue3-toastify'

const form = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const loading = ref(false);
const files = ref([]);

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
    email: value => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || 'Invalid email address';
    },
    description: value => value.length <= 255 || 'The description must be less than 255 characters.'
}


</script>

<template>
    <Head title="Our team" />
    <NavigationDrawerGuest />
    <GuestNav />
    <AvgWelcomeSection />
    <Breadcrumb>
        <template #title>
            <span>Our team</span>
        </template>
        <template #description>
            <span>We are a team of professionals who are dedicated to providing you with the best service and rates in the industry.</span>
        </template>
    </Breadcrumb>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10 max-w-7xl mx-auto mt-20 px-4 lg:px-0">
        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full" src="../../../../public/img/company-seo-img.jpg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Shaun Brignac, MBA</h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">President and CEO</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:Shaun@brignacmortgage.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">Shaun@brignacmortgage.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li>NMLS# 1928157</li>
                            <li><span class="font-bold">C:</span> 504-559-2821</li>
                            <li><span class="font-bold">O:</span> 225-435-9287</li>
                        </ul>
                    </div>
                </div>
                <v-btn href="https://2401214.my1003app.com" target="_blank" rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-5">Apply with Shaun</v-btn>
            </div>
        </div>

        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-cover object-top" src="../../../../public/img/team-allie.jpg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Allison Ratcliff</h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">Chief of Operations</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:Allie@brignacmortgage.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">Allie@brignacmortgage.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li>NMLS #2405703 </li>
                            <li><span class="font-bold">C:</span> 225-718-3978</li>
                        </ul>
                    </div>
                </div>
                <v-btn href="https://allieratcliff.my1003app.com" target="_blank" rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-5">Apply with Allie</v-btn>
            </div>
        </div>

        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full" src="../../../../public/img/team-jennifer.jpg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Jennifer McMinn-Griffin </h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">Loan Processor</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:jen@tigerprocessingllc.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">jen@tigerprocessingllc.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li><span class="font-bold">Owner of Tiger Processing Services LLC</span></li>
                            <li><span class="font-bold">Third Party Processor</span></li>
                            <li><span class="font-bold">Office</span> 225-469-6858</li>
                            <li><span class="font-bold">Individual NMLS # 1409144</span></li>
                            <li><span class="font-bold">Company NMLS # 2407930 </span></li>
                            <li><span class="font-bold">Licensed in LA</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white">
        <div class="w-full h-auto bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover mt-[73px] lg:mt-[90px]">
        <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/80 py-28 px-4 lg:px-0">
            <div class="w-full flex flex-col justify-between max-w-3xl mx-auto" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                <div class="flex flex-col gap-2 justify-center mb-5">
                    <h2 class="text-3xl lg:text-4xl font-bold">
                        Contact us!
                    </h2>
                    <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                    <p class="max-w-[600px] text-xs lg:text-base">
                        We believe that life is for living and you should be passionate about what you do.
                    </p>
                </div>

                <div class="relative">
                        <div class="">
                            <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                            <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-3">
                                <v-text-field
                                    label="Name"
                                    color="green"
                                    append-inner-icon="mdi-account"
                                    clearable
                                    class="w-full lg:w-[50%] backdrop-blur-sm"
                                    hint="Its recommended to use your full name"
                                    persistent-hint=""
                                    v-model="name"
                                    :rules="[rules.required, rules.description]"
                                ></v-text-field>

                                <v-text-field
                                    append-inner-icon="mdi-email"
                                    label="Email"
                                    autocomplete="email"
                                    color="green"
                                    clearable
                                    class="w-full lg:w-[50%] backdrop-blur-sm"
                                    hint="Your email to subscribe"
                                    persistent-hint=""
                                    v-model="email"
                                    :rules="[rules.required, rules.email]"
                                ></v-text-field>

                            </div>
                                <v-textarea
                                    append-inner-icon="mdi-message"
                                    label="Message"
                                    v-model="message"
                                    auto-grow
                                    hint="What do you want to know"
                                    persistent-hint=""
                                    class="mt-3 backdrop-blur-sm"
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
        </div>
     </div>
    </div>

    <section class="mt-40 lg:mt-[250px]">
        <Footer />
    </section>

</template>

<style scoped>

</style>
