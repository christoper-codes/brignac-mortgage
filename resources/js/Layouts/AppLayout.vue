<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { drawerNavState, draweAppNavState } from '@/composables/drawersStates';
import NavegationDrawerApp from '@/Components/NavegationDrawerApp.vue';
import useCurrentYear from '@/composables/currentYear';

const { currentYear } = useCurrentYear();
const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

const toggleFav = () => {
  fav.value = !fav.value;
};

const user = usePage().props.auth.user;

</script>

<template>
    <NavegationDrawerApp v-bind:user="user" />

   <div class="bg-white fixed w-full z-50 top-0 left-0 overflow-hidden shadow-xl">
       <div class="w-full bg-transparent lg:py-5 lg:pr-5 flex items-center justify-between lg:pl-[295px]">
            <div class="hidden lg:flex items-center gap-3">
                <Link :href="route('welcome')" class="lg:block hidden">
                   <img class="w-10 h-auto" src="../../../public/img/secondary-logo-light.jpg" alt="img logo">
                </Link>
                <Link :href="route('welcome')" class="flex gap-1 flex-col">
                    <h1 class="bg-clip-text bg-gradient-to-r from-green-600 to-green-500 text-transparent text-lg md:text-2xl font-bold">Brignac Mortgage</h1>
                    <p class="text-gray-500 text-xs">21121 Waterfront East Dr, Maurepas, LA 70449</p>
                </Link>
            </div>
            <div class="lg:flex items-center gap-4 lg:gap-10 text-gray-500 hidden">
                <div class="h-5 w-[1px] bg-gray-600 hidden md:flex"></div>
                <div class="items-center gap-2 lg:gap-4 flex">
                    <Link :href="route('welcome')">
                        <v-btn rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700">Home</v-btn>
                    </Link>
                </div>
            </div>
            <section class="py-3 w-full mx-auto flex items-center justify-between lg:hidden px-4 lg:px-0 shadow-xl">
                <Link :href="route('welcome')">
                    <div class="flex items-center justify-center">
                        <img class="w-28" src="../../../public/img/primary-logo-light.jpg" alt="brignac logo">
                    </div>
                </Link>
                <div @click="draweAppNavState = !draweAppNavState" class="flex items-center justify-center h-12 w-12 bg-white shadow-xl">
                    <span class="material-symbols-outlined block">menu</span>
                </div>
            </section>
        </div>

   </div>

   <div class="lg:ml-[270px] mt-[70px] lg:mt-[100px]">
        <main class="p-0 space-y-4 sm:space-y-6 bg-white min-h-screen overflow-hidden relative">
           <div class="z-20 inner-shadow relative bg-white bg-opacity-30 backdrop-blur-md !m-0  min-h-screen" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
            <slot/>
            </div>
        </main>
        <div class="p-10 bg-slate-200 text-center">
            <h3 class="">Brignac Mortgage | {{ currentYear }} </h3>
        </div>
   </div>

</template>


<style scoped>

/* CSS Inner Shadow Code */
/* .inner-shadow {
box-shadow: 36px -1px 26px -35px rgba(189, 189, 189, 0.67) inset;
-webkit-box-shadow: 36px -1px 26px -35px rgba(189, 189, 189, 0.67) inset;
-moz-box-shadow: 36px -1px 26px -35px rgba(189, 189, 189, 0.67) inset;
} */
</style>

