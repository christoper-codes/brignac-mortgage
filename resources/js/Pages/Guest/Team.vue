<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Our Team" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>Our Team</template>
        <template #description>We are a team of professionals dedicated to providing you with the best service and rates in the industry.</template>
    </Breadcrumb>

    <!-- Team Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16 px-4 mb-16">

        <!-- Shaun Brignac -->
        <div class="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8">
            <div class="size-40 rounded-full border-4 border-green-400 shadow-lg overflow-hidden shrink-0">
                <img class="w-full h-full object-cover object-top" src="/img/company-seo-img.jpg" alt="Shaun Brignac">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Shaun Brignac, MBA</h2>
                <span class="mt-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 py-1 px-4 rounded-full">President and CEO</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:Shaun@brignacmortgage.com" class="text-sm text-gray-600 hover:text-green-600 transition-colors block truncate">
                    Shaun@brignacmortgage.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 1928157</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">C:</span> 504-559-2821</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">O:</span> 504-559-2821</li>
                </ul>
            </div>
            <div class="mt-6 w-full shrink-0">
                <a href="https://2401214.my1003app.com" target="_blank"
                   class="w-full inline-flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2.5 rounded-full transition-colors duration-200">
                    Apply Now
                </a>
            </div>
        </div>

        <!-- Allison Ratcliff -->
        <div class="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8">
            <div class="size-40 rounded-full border-4 border-green-400 shadow-lg overflow-hidden shrink-0">
                <img class="w-full h-full object-cover object-top" src="/img/team-allie.png" alt="Allison Ratcliff">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Allison Ratcliff</h2>
                <span class="mt-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 py-1 px-4 rounded-full">Chief of Operations</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:Allie@brignacmortgage.com" class="text-sm text-gray-600 hover:text-green-600 transition-colors block truncate">
                    Allie@brignacmortgage.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 2405703</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">C:</span> 225-718-3978</li>
                </ul>
            </div>
            <div class="mt-6 w-full shrink-0">
                <a href="https://allieratcliff.my1003app.com" target="_blank"
                   class="w-full inline-flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2.5 rounded-full transition-colors duration-200">
                    Apply Now
                </a>
            </div>
        </div>

        <!-- Cynthia Roman -->
        <div class="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8">
            <div class="size-40 rounded-full border-4 border-green-400 shadow-lg overflow-hidden shrink-0">
                <img class="w-full h-full object-cover object-top" src="/img/team-cynthia.jpg" alt="Cynthia Roman">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Cynthia Roman</h2>
                <span class="mt-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 py-1 px-4 rounded-full">Loan Officer</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:Cynthia@brignacmortgage.com" class="text-sm text-gray-600 hover:text-green-600 transition-colors block truncate">
                    Cynthia@brignacmortgage.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS#</span> 1661775</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">C:</span> 318-319-0499</li>
                </ul>
            </div>
            <div class="mt-6 w-full shrink-0">
                <a href="https://cynthiaroman.my1003app.com" target="_blank"
                   class="w-full inline-flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2.5 rounded-full transition-colors duration-200">
                    Apply Now
                </a>
            </div>
        </div>

        <!-- Jennifer McMinn-Griffin -->
        <div class="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-8">
            <div class="size-40 rounded-full border-4 border-green-400 shadow-lg overflow-hidden shrink-0">
                <img class="w-full h-full object-cover object-top" src="/img/team-jennifer.jpg" alt="Jennifer McMinn-Griffin">
            </div>
            <div class="flex flex-col items-center text-center mt-5 w-full">
                <h2 class="text-xl font-bold text-gray-800">Jennifer McMinn-Griffin</h2>
                <span class="mt-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 py-1 px-4 rounded-full">Loan Processor</span>
            </div>
            <div class="mt-6 w-full flex-1">
                <a href="mailto:jen@tigerprocessingllc.com" class="text-sm text-gray-600 hover:text-green-600 transition-colors block truncate">
                    Jen@tigerprocessingllc.com
                </a>
                <ul class="mt-4 text-sm text-gray-600 space-y-2">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">Owner:</span> Tiger Processing Services LLC</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">Role:</span> Third Party Processor</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">O:</span> 225-469-6858</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS# (Ind.):</span> 1409144</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">NMLS# (Co.):</span> 2407930</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-700">Licensed in LA</span></li>
                </ul>
            </div>
        </div>

    </div>

    <!-- CTA Banner -->
    <div class="relative bg-[url('/storage/img/header-5.jpg')] bg-center bg-cover">
        <div class="bg-black/70 py-24 px-4">
            <div class="max-w-2xl mx-auto text-center text-white">
                <h2 class="text-3xl lg:text-4xl font-bold mb-3">Ready to Get Started?</h2>
                <div class="h-1 w-14 bg-green-500 rounded-full mx-auto mb-5"></div>
                <p class="text-white/80 mb-8">Our team is here to help you find the best mortgage solution for your needs. Reach out today.</p>
                <Link :href="route('contact-us.index')"
                      class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200">
                    Contact Us Today
                    <span class="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
            </div>
        </div>
    </div>

    <Footer />
</template>
