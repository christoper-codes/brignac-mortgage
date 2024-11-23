<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';
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

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('message', message.value);
    formData.append('is_hiring', true);
    files.value.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
    });

    axios.post(route('send-email'), formData, {
            headers: {
                    'Content-Type': 'multipart/form-data',
                },
        })
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
            console.log(error.response.data)
        })
        .finally(() => {
            loading.value = false;
            name.value = ' ';
            email.value = ' ';
            message.value = ' ';
            files.value = [];
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
    <Head title="Join" />
    <NavigationDrawerGuest />
    <GuestNav />

    <div class="bg-white">
        <div class="w-full relative h-auto bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover mt-[73px] lg:mt-[90px]">
            <div class="absolute top-0 lg:mt-10 w-full lg:right-10 lg:w-[30%] gap-5 bg-black/30 backdrop-blur-sm p-10 flex items-center flex-col justify-center rounded-md text-white">
                <p class="font-bold">If you already have an account, log in.</p>
                <Link :href="route('login')">
                    <v-btn type="submit" rounded="xs" size="large" variant="tonal" class="text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700">Log in</v-btn>
                </Link>
            </div>
            <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/80 lg:w-[65%] py-28 px-4 lg:px-0">
                <div class="w-full flex flex-col justify-between max-w-3xl mx-auto mt-32 lg:mt-0" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                    <div class="flex flex-col gap-2 justify-center mb-5">
                        <h2 class="text-3xl lg:text-4xl font-bold">
                            We're Hiring!
                        </h2>
                        <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                        <p class="max-w-[600px] text-xs lg:text-base">
                            If you're interested in one of our open positions, apply here and attach your resume. We're taking applications for self-motivated and experienced Loan Officers. Work hard, be excited about your career, and make money doing it. We hold our associates to a high standard, and we only hire the bes
                        </p>
                    </div>

                    <div class="relative">
                            <div class="">
                                <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                                <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-3">
                                    <v-text-field
                                        label="Name"
                                        color="orange"
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
                                        color="orange"
                                        clearable
                                        class="w-full lg:w-[50%] backdrop-blur-sm"
                                        hint="Your personal email"
                                        persistent-hint=""
                                        v-model="email"
                                        :rules="[rules.required, rules.email]"
                                    ></v-text-field>

                                </div>
                                    <v-file-input
                                        v-model="files"
                                        label="Resume file"
                                        accept=".doc,.docx,.xml,.pdf,.txt"
                                        hint="Attach your resume"
                                        placeholder="Upload your documents"
                                        prepend-icon="mdi-paperclip"
                                        persistent-hint=""
                                        class="mt-3 backdrop-blur-sm"
                                        clearable
                                        multiple
                                        :rules="[rules.required]"
                                    >
                                        <template v-slot:selection="{ fileNames }">
                                        <template v-for="fileName in fileNames" :key="fileName">
                                            <v-chip
                                            class="me-2"
                                            color="primary"
                                            size="small"
                                            label
                                            >
                                            {{ fileName }}
                                            </v-chip>
                                        </template>
                                        </template>
                                    </v-file-input>
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
                                        color="orange"
                                    ></v-textarea>

                                    <div class="w-full flex items-center justify-end mt-12">
                                        <div class='flex items-center justify-center relative'>
                                            <div class="animate-ping absolute inline-flex h-12 w-24 lg:h-14 lg:w-32 rounded-lg bg-orange-500 opacity-75"></div>
                                            <div class="h-10 flex items-center justify-center w-full relative z-5">
                                                <v-btn type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700">Send now</v-btn>
                                                <v-btn type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700">Send now</v-btn>
                                            </div>
                                        </div>
                                    </div>

                                </v-form>
                            </div>
                        </div>
                </div>
        </div>
    </div>


    <section class="mt-40 lg:mt-[200px]">
        <Footer />
    </section>
   </div>

</template>

<style scoped>

</style>
