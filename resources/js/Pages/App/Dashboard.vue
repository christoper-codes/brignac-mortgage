<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify'

const form = ref(false);
const welcomeTitle = ref('');
const welcomeSubTitle = ref('');
const welcomePresentation = ref('');
const loading = ref(false);
const show = ref(false);
const enableEditing = ref(false);


const onSubmit = () => {
    if(!form.value) return;
    loading.value = true;

    const formData = useForm({
        welcome_title: welcomeTitle.value,
        welcome_subtitle: welcomeSubTitle.value,
        welcome_presentation: welcomePresentation.value
    });

    formData.put(route('about-us.update'), {
        onSuccess: (success) => {
            toast('Successfully updated', {
                "theme": "auto",
                "type": "success",
                "dangerouslyHTMLString": true
            })
            console.log(success);

        },
        onError: (error) => {
            toast('Error when trying to update', {
                "theme": "auto",
                "type": "error",
                "dangerouslyHTMLString": true
            })

            console.log(error);

        },
        onFinish: () => {
            loading.value = false;
        }
    })

}

const rules = {
    required: value => !!value || 'Field is required' ,
}

const props = defineProps({
    about_us: {
        type: Object,
        required: false
    }
})

onMounted(() => {
    welcomeTitle.value = props.about_us.welcome_title;
    welcomeSubTitle.value = props.about_us.welcome_subtitle;
    welcomePresentation.value = props.about_us.welcome_presentation;
})

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout>

        <div class="p-10 lg:mx-10 bg-gray-300 text-white text-center  lg:mt-7 rounded-md">
            <h2 class="font-bold text-xl lg:text-4xl"><span class="italic text-orange-500">Welcome</span> to Brignac Mortgage Administration</h2>
        </div>
        <section class="mt-10 lg:mt-[73px] lg:mx-10 rounded-md">
            <div class="w-full h-[300px] bg-[url('/storage/img/header-4.jpg')] bg-center bg-cover">
                <div class="h-full w-full bg-black/60 pt-14 px-4 lg:px-0">
                    <div class="flex flex-col gap-3 items-center justify-center">
                        <div class="bg-black/20 rounded-full py-2 px-5 inline-flex text-white">
                            <span>Administration</span>
                        </div>
                        <h2 class="text-3xl lg:text-4xl font-bold text-white text-center">
                            Managing the Home View
                        </h2>
                    </div>
                </div>
            </div>

            <main class="bg-white relative z-10" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <div class="w-[90%] lg:w-[80%] mx-auto shadow-xl rounded-sm p-6 lg:p-10 absolute top-[-100px] left-1/2 transform -translate-x-1/2 bg-white">
                    <div class="relative">
                        <div class="lg:p-10 w-full z-20">

                            <div class="flex flex-col gap-1 w-full items-center justify-center">
                                <v-switch
                                    v-model="enableEditing"
                                    color="green"
                                    :label="`Enable editing: ${enableEditing}`"
                                    hide-details
                                ></v-switch>

                                <div :class="{'bg-green-500': enableEditing, 'bg-red-500': !enableEditing}" class="w-full h-[3px] transition-all duration-500"></div>
                            </div>

                            <div class="mt-10">
                                <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                                <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-3">
                                    <v-text-field
                                        label="Welcome title"
                                        color="green"
                                        append-inner-icon="mdi-home"
                                        clearable
                                        class="w-full lg:w-[50%]"
                                        hint="Maximum 255 characters recommended"
                                        persistent-hint=""
                                        v-model="welcomeTitle"
                                        :rules="[rules.required]"
                                    ></v-text-field>

                                </div>
                                    <v-textarea
                                        append-inner-icon="mdi-message"
                                        label="Welcome subtitle"
                                        v-model="welcomeSubTitle"
                                        auto-grow
                                        hint="Maximum 255 characters recommended"
                                        persistent-hint=""
                                        class="mt-3"
                                        clearable
                                        :rules="[rules.required]"
                                        color="green"
                                    ></v-textarea>

                                    <v-textarea
                                        append-inner-icon="mdi-message"
                                        label="Welcome presentation"
                                        v-model="welcomePresentation"
                                        auto-grow
                                        hint="Maximum 255 characters recommended"
                                        persistent-hint=""
                                        class="mt-3"
                                        clearable
                                        :rules="[rules.required]"
                                        color="green"
                                    ></v-textarea>

                                    <div class="w-full flex items-center justify-end mt-12">
                                        <div class='flex items-center justify-center relative'>
                                            <div class="h-10 flex items-center justify-center w-full relative z-5">
                                                <v-btn :disabled="!enableEditing" type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Update now</v-btn>
                                                <v-btn :disabled="!enableEditing" type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Update now</v-btn>
                                            </div>
                                        </div>
                                    </div>

                                </v-form>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </section>

        <div class="mt-[800px] h-1"></div>

    </AppLayout>

</template>

<style scoped>

</style>
