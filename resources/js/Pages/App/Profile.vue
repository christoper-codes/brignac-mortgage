<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify'
import useDateFormat from '@/composables/dateFormat';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm.vue';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '../Profile/Partials/UpdateProfileInformationForm.vue';

const { dateFormat } = useDateFormat();
const user = usePage().props.auth.user;


</script>

<template>
    <Head title="Profile" />

    <AppLayout>

        <div class="p-4 lg:p-10 lg:mx-10 bg-white shadow-lg text-center  lg:mt-3 rounded-md">
            <div class="mt-5 border-l-8 border-l-red-500 bg-red-100 p-7 text-sm lg:text-base">
                <span class="font-bold">Hello {{ user.name }} 👋.</span> This is your profile information as an administrator
            </div>
        </div>

          <div class="p-4 lg:p-10 mb-10">
            <div class="mx-auto w-full space-y-6">
                <div
                    class="bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                    <UpdateProfileInformationForm
                        class="max-w-xl"
                    />
                </div>

                <div
                    class="bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                    <UpdatePasswordForm class="max-w-xl" />
                </div>

                <div
                    class="bg-red-100 p-4 shadow sm:rounded-lg sm:p-8"
                >
                    <DeleteUserForm class="max-w-xl" />
                </div>
            </div>
        </div>


    </AppLayout>

</template>

<style>
</style>
