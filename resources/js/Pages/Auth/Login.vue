<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { toast } from 'vue3-toastify'

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

/* const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
}; */

const form = ref(false);
const password = ref('');
const email = ref('');
const loading = ref(false);
const show = ref(false);


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

    const formData = useForm({
        email: email.value,
        password: password.value,
        remember: true
    });

    formData.post(route('login'), {
        onError: (error) => {
            toast('Error when trying to log in', {
                "theme": "auto",
                "type": "error",
                "dangerouslyHTMLString": true
            })
            loading.value = false;
        },
    })

}

const rules = {
    required: value => !!value || 'Field is required' ,
    email: value => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || 'Invalid email address';
    },
    password: value => value.length > 8 || 'The password must be at least 8 characters.'
}
</script>

<template>
    <Head title="Login" />

    <div class="w-full h-screen bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover">
        <div class="h-full w-full flex items-center justify-center text-white bg-black/40 overflow-hidden px-4 lg:px-0">
            <div class="py-14 lg:py-10 px-5 rounded-lg bg-black/20 backdrop-blur-md max-w-5xl mx-auto w-full overflow-hidden">
                <div class="lg:px-10 w-full flex flex-col justify-between max-w-5xl mx-auto lg:mt-0" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                    <div class="flex lg:mt-0 flex-col gap-2 justify-center items-center text-center mb-5">
                        <div class="flex items-center justify-center gap-2">
                            <h2 class="text-3xl lg:text-4xl font-bold">
                                Log in!
                            </h2>
                        </div>
                        <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                        <p class="max-w-[600px] text-xs lg:text-base">
                            Please enter your credentials to access.
                        </p>
                    </div>

                    <div class="relative">
                            <div class="">
                                <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                                <div class="flex flex-col items-center justify-between gap-7 mt-3">
                                    <v-text-field
                                        append-inner-icon="mdi-email"
                                        label="Email"
                                        autocomplete="email"
                                        color="orange"
                                        clearable
                                        class="w-full lg:w-[50%] !text-white"
                                        hint="Your email to subscribe"
                                        persistent-hint=""
                                        v-model="email"
                                        :rules="[rules.required, rules.email]"
                                    ></v-text-field>
                                    <v-text-field
                                        color="orange"
                                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show ? 'text' : 'password'"
                                        hint="at least 8 characters"
                                        class="w-full lg:w-[50%]"
                                        label="Password"
                                        persistent-hint=""
                                        counter
                                        @click:append="show = !show"
                                        v-model="password"
                                        :rules="[rules.required, rules.password]"
                                    ></v-text-field>
                                </div>
                                <div class="w-full flex items-center justify-center lg:ml-[170px] mt-12">
                                        <div class='flex items-center justify-center relative'>
                                            <div class="h-10 flex items-center justify-center w-full relative z-5">
                                                <v-btn type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700 !rounded-full">Log in</v-btn>
                                                <v-btn type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700 !rounded-full">Log in</v-btn>
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
</template>
