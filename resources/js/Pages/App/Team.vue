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

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout>

        <div class="p-10 lg:mx-10 bg-gray-300 text-white text-center  lg:mt-7 rounded-md">
            <h2 class="font-bold lg:text-4xl">coming soon</h2>
        </div>

    </AppLayout>

</template>

<style scoped>

</style>
