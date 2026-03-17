<script setup>
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head } from '@inertiajs/vue3';

</script>

<template>
    <Head title="About us" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>
            <span>About Us</span>
        </template>
        <template #description>
            <span>We believe that life is for living and you should be passionate about what you do.</span>
        </template>
    </Breadcrumb>

    <section class="lg:mt-14">
        <div class="w-full flex flex-col-reverse lg:flex-col lg:mt-10">
            <div class="w-full pt-14 pb-14 lg:mb-10">
                <div class="max-w-6xl mx-auto gap-16 flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-0 overflow-hidden">
                    <div class="w-full lg:w-[40%] px-2">
                        <div class="relative h-[400px] lg:h-[600px] rounded-xl w-full after:w-[20px] lg:after:w-[30px] after:h-[250px] lg:after:h-[500px] after:absolute after:top-1/2 after:-left-[20px] lg:after:-left-[30px] after:-translate-y-1/2 after:bg-orange-500 after:rounded-l-xl">
                            <img class="w-full h-full object-cover rounded-xl" src="/storage/img/header-5.jpg" alt="brignac logo">
                        </div>
                    </div>
                    <div class="w-full lg:w-[60%]">
                        <div class="flex flex-col gap-5">
                            <div>
                                <div class="bg-orange-100 rounded-full py-2 px-5 inline-flex text-orange-600">
                                    <span class="inline-flex">About Us</span>
                                </div>
                            </div>
                            <h2 class="text-3xl lg:text-4xl font-bold">Brignac Mortgage And Consulting Services</h2>
                            <p class="text-sm lg:text-base">Shaun Brignac, President and CEO welcomes you to our site.  We believe that life is for living and you should be passionate about what you do. We hold our team to a high standard, and we only hire the best!  We look forward to working with you and your family.</p>
                            <p></p>
                        </div>
                        <div class="border-l-8 border-l-orange-500 p-3">
                            <p class="text-sm lg:text-sm">Explore our diverse range of loan products and programs <span class="font-bold">designed to meet your unique financial needs.</span></p>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 mt-6">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">real_estate_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Conventional and Construction Loans</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">support_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Mobile Home Loans - Single and Double Wide</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">location_away</span>
                                </div>
                                <h3 class="text-sm flex-grow">Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex border-2 border-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">badge</span>
                                </div>
                                <h3 class="text-sm flex-grow">Home Equity Line of Credit Loans</h3>
                            </div>
                        </div>
                    <ServiceDialog />
                </div>
            </div>
        </div>
         </div>
    </section>

    <section class="mt-10">
        <div class="w-full">
            <div class="h-full w-full pt-14 px-4 lg:px-0">
                <div class="flex flex-col gap-3 items-center justify-center">
                    <div class="bg-black/10 rounded-full py-2 px-5 inline-flex">
                        <span>Testimonials</span>
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-center">
                        Our
                        <span style="color: #4285F4;">G</span>
                        <span style="color: #EA4335;">o</span>
                        <span style="color: #FBBC05;">o</span>
                        <span style="color: #4285F4;">g</span>
                        <span style="color: #34A853;">l</span>
                        <span style="color: #EA4335;">e</span>
                        Testimonials
                    </h2>
                    <a href="https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6" target="_blank">
                        <v-btn rounded="xs" size="large" class="text-none !bg-blue-600 mt-3 !text-white hover:!bg-white hover:!text-blue-600 !transition-all !duration-700 !flex !items-center !justify-center !p-5 lg:!py-7 lg:!px-8 !rounded-full !mb-3">
                            Read More Reviews
                            <span class="material-symbols-outlined block text-lg mr-2">arrow_outward</span>
                        </v-btn>
                    </a>
                </div>
            </div>
        </div>

        <main class="bg-white relative z-10">
            <div class="w-[90%] lg:w-[80%] mx-auto shadow-xl rounded-sm p-4 lg:p-10 bg-white">
                <div class="relative">
                    <!--  <iframe class="h-[450px] z-50 w-full" src="https://widget.tagembed.com/2135662" style="border:none;"></iframe> -->
                    <div class="elfsight-app-ebce6ca8-0720-4595-b6cd-c4d2cb07e6df" data-elfsight-app-lazy></div>
                </div>
            </div>
        </main>
    </section>

    <section class="mt-20">
        <Footer />
    </section>
</template>

<style scoped>
.card_green_persistent {
position: relative;
}
.card_green_persistent::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: #22c55e;
width: 100%;
}

.card_green {
position: relative;
}
.card_green::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: #22c55e;
transition: width 0.5s ease-in-out;
}
.card_green:hover::after {
width: 100%;
}
</style>
