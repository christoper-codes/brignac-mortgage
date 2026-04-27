<script setup>
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';
const toast = (msg) => {}

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
    <Head title="Our Team" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>
            <span>Our Team</span>
        </template>
        <template #description>
            <span>We are a team of professionals who are dedicated to providing you with the best service and rates in the industry.</span>
        </template>
    </Breadcrumb>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch w-full gap-8 max-w-7xl mx-auto mt-20 px-4 lg:px-0">

        <!-- Shaun Brignac -->
        <div class="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8 h-full">
            <div class="size-40 rounded-full border-4 border-orange-400 shadow-lg overflow-hidden flex-shrink-0">
                <img class="w-full h-full object-cover object-top" src="../../../../public/img/company-seo-img.jpg" alt="Shaun Brignac">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Shaun Brignac, MBA</h2>
                <span class="mt-2 text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 py-1 px-4 rounded-full">President and CEO</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:Shaun@brignacmortgage.com" class="text-sm text-gray-600 hover:text-orange-500 transition-colors truncate">
                    Shaun@brignacmortgage.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 1928157</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">C:</span> 504-559-2821</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">O:</span> 504-559-2821</li>
                </ul>
            </div>
            <div class="mt-6 w-full shrink-0">
                <v-btn href="https://2401214.my1003app.com" target="_blank" color="orange" variant="tonal" block class="text-none !rounded-full !border !border-orange-400 !h-12">Apply Now</v-btn>
            </div>
        </div>

        <!-- Allison Ratcliff -->
        <div class="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8 h-full">
            <div class="size-40 rounded-full border-4 border-orange-400 shadow-lg overflow-hidden flex-shrink-0">
                <img class="w-full h-full object-cover object-top" src="../../../../public/img/team-allie.png" alt="Allison Ratcliff">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Allison Ratcliff</h2>
                <span class="mt-2 text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 py-1 px-4 rounded-full">Chief of Operations</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:Allie@brignacmortgage.com" class="text-sm text-gray-600 hover:text-orange-500 transition-colors truncate">
                    Allie@brignacmortgage.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 2405703</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">C:</span> 225-718-3978</li>
                </ul>
            </div>
            <div class="mt-6 w-full shrink-0">
                <v-btn href="https://allieratcliff.my1003app.com" target="_blank" color="orange" variant="tonal" block class="text-none !rounded-full !border !border-orange-400 !h-12">Apply Now</v-btn>
            </div>
        </div>

        <!-- Cynthia Roman -->
        <div class="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8 h-full">
            <div class="size-40 rounded-full border-4 border-orange-400 shadow-lg overflow-hidden flex-shrink-0">
                <img class="w-full h-full object-cover object-top" src="../../../../public/img/team-cynthia.jpg" alt="Cynthia Roman">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Cynthia Roman</h2>
                <span class="mt-2 text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 py-1 px-4 rounded-full">Loan Officer</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:Cynthia@brignacmortgage.com" class="mt-3 flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors">
                    Cynthia@brignacmortgage.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 1661775</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">C:</span> 318-319-0499</li>
                </ul>
            </div>
            <div class="mt-6 w-full shrink-0">
                <v-btn href="https://cynthiaroman.my1003app.com" target="_blank" color="orange" variant="tonal" block class="text-none !rounded-full !border !border-orange-400 !h-12">Apply Now</v-btn>
            </div>
        </div>

        <!-- Jennifer McMinn-Griffin -->
        <div class="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8 h-full">
            <div class="size-40 rounded-full border-4 border-orange-400 shadow-lg overflow-hidden flex-shrink-0">
                <img class="w-full h-full object-cover object-top" src="../../../../public/img/team-jennifer.jpg" alt="Jennifer McMinn-Griffin">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Jennifer McMinn-Griffin</h2>
                <span class="mt-2 text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 py-1 px-4 rounded-full">Loan Processor</span>
            </div>
            <div class="mt-6 w-full flex flex-col flex-1">
                <a href="mailto:jen@tigerprocessingllc.com" class="text-sm text-gray-600 hover:text-orange-500 transition-colors truncate">
                    Jen@tigerprocessingllc.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">Owner</span> Tiger Processing Services LLC</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">Role:</span> Third Party Processor</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">O:</span> 225-469-6858</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 1409144 (Individual)</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 2407930 (Company)</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">Licensed in LA</span></li>
                </ul>
            </div>
        </div>

    </div>

    <div class="bg-white">
        <div class="w-full h-auto bg-[url('/storage/img/header-5.jpg')] bg-center bg-cover mt-[73px]">
        <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/70 py-28 px-4 lg:px-0">
            <div class="w-full flex flex-col justify-between max-w-3xl mx-auto" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                <div class="flex flex-col gap-2 justify-center mb-5">
                    <h2 class="text-3xl lg:text-4xl font-bold">
                        Contact Us
                    </h2>
                    <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                    <p class="max-w-[600px] text-xs lg:text-base">
                        We believe that life is for living and you should be passionate about what you do.
                    </p>
                </div>

                <div class="relative">
                        <div class="mb-10">
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
                                        <div class="h-10 flex items-center justify-center w-full relative z-5">
                                            <v-btn type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700 !rounded-full">Send Now</v-btn>
                                            <v-btn type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700 !rounded-full">Send Now</v-btn>
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

    <section>
        <Footer />
    </section>
</template>

<style scoped>

</style>
