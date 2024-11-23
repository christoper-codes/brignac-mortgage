<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify'
import useDateFormat from '@/composables/dateFormat';

const { dateFormat } = useDateFormat();

const form = ref(false);
const welcomeTitle = ref('');
const welcomeSubTitle = ref('');
const welcomePresentation = ref('');
const loading = ref(false);
const show = ref(false);
const enableEditing = ref(false);
const items = ref([]);

const props = defineProps({
    'emails': {
        required: true,
        type: Array
    }
});


const headers = [
    { title: 'ID', key: 'ID' },
    { title: 'Email', key: 'Email' },
    { title: 'Subject', key: 'Subject' },
    { title: 'Message', key: 'Message' },
    { title: 'Customer', key: 'Customer' },
    { title: 'Files', key: 'Files' },
    { title: 'Application date', key: 'Application date'}
];
const headerProps = {
    class: '!font-bold'
};
if (props.emails) {
    props.emails.forEach((email, index) => {
        items.value.push({
            'ID': (props.emails.length - (index)), 
            'Email': email.email,
            'Subject':email.subject,
            'Message':email.message,
            'Customer': email.is_hiring ? 'No' : 'Yes',
            'Files': email.files ? email.files.split(',') : [],
            'Application date': dateFormat(email.created_at),
        });
    });
}

</script>

<template>
    <Head title="Our interested clients" />

    <AppLayout>

        <div class="p-4 lg:p-10 lg:mx-10 bg-white shadow-lg text-center  mt-7 rounded-md">
            <h2 class="font-bold text-xl lg:text-4xl text-gray-500"><span class="italic text-green-500">Our</span> candidates for hire</h2>
            <div class="mt-5 border-l-8 border-l-green-500 bg-green-100 p-7 text-sm lg:text-base">
                <span class="font-bold">Hello administration 👋.</span> These are the details of the questions that our potential candidates ask us.
            </div>
        </div>

        <div class="my-10 p-4 lg:p-10">
            <v-data-table color="black" :items="items" :headers="headers" :header-props="headerProps">
                <template v-slot:item.Customer="{ item }">
                    <span class="py-1 px-4 rounded-full" :class="item.Customer === 'No' ? '!text-red-600 bg-red-100' : '!text-blue-600 bg-blue-100'">
                        {{ item.Customer }}
                    </span>
                </template>
                <template v-slot:item.Files="{ item }">
                    <v-list v-if="item.Files.length">
                        <v-list-item
                        v-for="(file, index) in item.Files"
                        :key="index"
                        >
                            <a class="text-xs underline text-blue-500" :href="`/storage/${file}`" target="_blank">{{ file }}</a>
                        </v-list-item>
                    </v-list>
                    <v-list v-else>
                        <span class="text-blue-500">files not included</span>
                    </v-list>
                </template>
            </v-data-table>
        </div>

    </AppLayout>

</template>

<style>

thead {
    background: #f5f5f5 !important;
}
</style>
