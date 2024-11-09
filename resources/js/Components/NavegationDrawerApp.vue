<script setup>
import { drawerNavState, draweAppNavState } from '@/composables/drawersStates';
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import AppNavLink from './AppNavLink.vue';


const fav = ref(true);
const menu = ref(false);
const menu1 = ref(false);
const menu2 = ref(false);
const message = ref(false);
const hints = ref(true);

const toggleFav = () => {
  fav.value = !fav.value;
};

</script>

<template>
  <div class="">
    <v-layout>
      <v-navigation-drawer v-model="draweAppNavState" temporary class="">
        <div class="!text-gray-100 bg-slate-950 min-h-screen relative overflow-hidden bg-[url('https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg')] bg-center bg-cover">

            <div class="w-full h-full bg-black/85 min-h-screen">
                <div class="w-full relative h-full">
                <div class="w-full py-3 lg:py-4 px-4">

                    <div class="text-center profile-btn cursor-pointer">
                        <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        location="bottom start" origin="top center"
                        >
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    :class="fav ? 'text-white' : '!text-white'"
                                    class="!rounded-full !size-40 !bg-transparent backdrop-blur-sm"
                                    v-bind="props"
                                    variant="tonal"
                                    @click="fav = !fav"
                                    >
                                    <div>
                                        <img  class="w-full h-auto" src="../../../public/img/user-img.svg" alt="profile img">
                                    </div>
                                </v-btn>
                            </template>

                            <v-card min-width="200" rounded="lg" class="!bg-white backdrop-blur-sm !w-full !p-3">
                                <Link :href="route('logout')" method="post" as="button" class="w-full">
                                    <v-btn  color="red" size="large" variant="tonal" block class="text-none !w-full" rounded="lg">
                                        Log out
                                    </v-btn>
                                </Link>
                            </v-card>
                        </v-menu>
                    </div>

                </div>
            </div>

            <div class="flex flex-col items-center justify-between gap-10 p-4 auth-nav">
                    <div class="flex flex-col w-full">
                        <h2 class="font-semibold text-sm mb-3">Administration</h2>
                        <div class="flex flex-col items-center gap-4 w-full">
                            <div class="w-full ">
                                <AppNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                                    <span class="material-symbols-outlined text-lg">home</span>Administration | home
                                </AppNavLink>
                            </div>
                            <div class=" w-full">
                                <AppNavLink :href="route('auth-programs.index')" :active="route().current('auth-programs.index')">
                                    <span class="material-symbols-outlined text-lg">folder</span>Loans programs
                                </AppNavLink>
                            </div>
                            <div class=" w-full">
                                <AppNavLink :href="route('auth-team.index')" :active="route().current('auth-team.index')">
                                    <span class="material-symbols-outlined text-lg">group</span>Our team
                                </AppNavLink>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col w-full">
                        <h2 class="font-semibold text-sm mb-3">Authentication</h2>
                        <div class="flex flex-col items-center gap-3 w-full">
                            <div class="w-full">
                                <AppNavLink :href="route('welcome')" :active="route().current('welcome')">
                                    <span class="material-symbols-outlined text-lg">person</span>Profile
                                </AppNavLink>
                            </div>
                        </div>
                    </div>

                    <div class="w-full flex items-center justify-between rounded-md overflow-hidden shadow-xl relative bg-white/10 backdrop-blur-sm">
                        <div class="w-full px-3 py-5 text-sm font-semibold text-gray-200">

                            <v-dialog max-width="500">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn v-bind="activatorProps" variant="elevated" block class="text-none !bg-orange-600 !text-white" rounded="sm">
                                            Log out
                                        </v-btn>
                                    </template>
                                    <template v-slot:default="{ isActive }">
                                        <v-card title="Are you sure you want to end your session?">
                                        <v-card-text>
                                            <p class="opacity-50 mt-3">Press 'log out' to finish authentication.</p>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="red" rounded="sm" variant="tonal" class="text-none !px-4" text="Cancel" @click="isActive.value = false"></v-btn>
                                            <Link :href="route('logout')" method="post" as="button">
                                                <v-btn rounded="sm" variant="elevated" class="text-none !bg-orange-500 !text-white mb-2 !px-4" @click="isActive.value = false">
                                                    <span class="material-symbols-outlined text-xl !w-1/2">person</span> Log out
                                                </v-btn>
                                            </Link>
                                        </v-card-actions>

                                        </v-card>
                                    </template>
                            </v-dialog>
                        </div>
                    </div>
            </div>
            </div>

        </div>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>


<style >

.auth-nav .material-symbols-outlined  {
    margin-right: 5px !important;
}

@media (min-width: 768px) {
    .v-navigation-drawer--temporary.v-navigation-drawer--active {
        width: 270px !important;
        box-shadow: none !important;
    }
    .v-navigation-drawer__scrim {
        display: none !important;
    }
}

</style>

