<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="About Us" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>About Us</template>
        <template #description>We believe that life is for living and you should be passionate about what you do.</template>
    </Breadcrumb>

    <!-- About Section -->
    <section class="py-20">
        <div class="max-w-6xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-16">

            <!-- Image with accent bar -->
            <div class="w-full lg:w-2/5">
                <div class="relative h-96 lg:h-150">
                    <div class="absolute top-1/2 -left-3 lg:-left-4 -translate-y-1/2 w-2.5 h-64 lg:h-120 bg-green-500 rounded-l-xl z-10"></div>
                    <img class="w-full h-full object-cover rounded-xl" src="/storage/img/header-5.jpg" alt="Brignac Mortgage Office">
                </div>
            </div>

            <!-- Content -->
            <div class="w-full lg:w-3/5 flex flex-col gap-5">
                <div>
                    <span class="bg-green-100 text-green-700 rounded-full py-1.5 px-5 text-sm font-semibold inline-block">About Us</span>
                </div>
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-800">Brignac Mortgage And Consulting Services</h2>
                <p class="text-gray-600 leading-relaxed">
                    Shaun Brignac, President and CEO welcomes you to our site. We believe that life is for living and you should be passionate about what you do.
                    We hold our team to a high standard, and we only hire the best! We look forward to working with you and your family.
                </p>

                <div class="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                    <p class="text-sm text-gray-700">Explore our diverse range of loan products and programs <strong>designed to meet your unique financial needs.</strong></p>
                </div>

                <!-- Feature Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
                    <div class="flex items-center gap-3">
                        <div class="shrink-0 h-14 w-14 rounded-full flex items-center justify-center border-2 border-green-200 bg-green-50">
                            <span class="material-symbols-outlined text-2xl text-green-500">real_estate_agent</span>
                        </div>
                        <h3 class="text-sm text-gray-700">Conventional and Construction Loans</h3>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="shrink-0 h-14 w-14 rounded-full flex items-center justify-center border-2 border-green-200 bg-green-50">
                            <span class="material-symbols-outlined text-2xl text-green-500">support_agent</span>
                        </div>
                        <h3 class="text-sm text-gray-700">Mobile Home Loans – Single and Double Wide</h3>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="shrink-0 h-14 w-14 rounded-full flex items-center justify-center border-2 border-green-200 bg-green-50">
                            <span class="material-symbols-outlined text-2xl text-green-500">location_away</span>
                        </div>
                        <h3 class="text-sm text-gray-700">Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns</h3>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="shrink-0 h-14 w-14 rounded-full flex items-center justify-center border-2 border-green-200 bg-green-50">
                            <span class="material-symbols-outlined text-2xl text-green-500">badge</span>
                        </div>
                        <h3 class="text-sm text-gray-700">Home Equity Line of Credit Loans</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Google Testimonials -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex flex-col items-center gap-4 mb-10">
                <span class="bg-black/10 text-gray-700 rounded-full py-1.5 px-5 text-sm font-medium">Testimonials</span>
                <h2 class="text-3xl lg:text-4xl font-bold text-center">
                    Our
                    <span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC05;">o</span><span style="color: #4285F4;">g</span><span style="color: #34A853;">l</span><span style="color: #EA4335;">e</span>
                    Testimonials
                </h2>
                <a href="https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6" target="_blank"
                   class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors duration-200">
                    Read More Reviews
                    <span class="material-symbols-outlined text-base">arrow_outward</span>
                </a>
            </div>

            <div class="bg-white rounded-2xl shadow-xl p-6 lg:p-10">
                <div class="elfsight-app-ebce6ca8-0720-4595-b6cd-c4d2cb07e6df" data-elfsight-app-lazy></div>
            </div>
        </div>
    </section>

    <Footer />
</template>
