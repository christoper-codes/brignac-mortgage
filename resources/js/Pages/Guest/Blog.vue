<script setup>
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';
import useCurrentYear from '@/composables/currentYear';

const { currentYear } = useCurrentYear();
</script>

<template>
    <Head title="Blog" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>
            <span>Blog and news</span>
        </template>
        <template #description>
            <span>A space for news on mortgage issues.</span>
        </template>
    </Breadcrumb>

    <!-- Blog Article -->
    <div class="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto lg:mt-20">
        <div class="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6 mt-10 lg:mt-0">
            <!-- Content -->
            <div class="lg:col-span-2">
            <div class="py-8 lg:pe-8">
                <div class="space-y-5 lg:space-y-8">
                <a class="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline focus:outline-none focus:underline" href="/">
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Back to Home
                </a>

                <h2 class="text-3xl font-bold lg:text-5xl">Announcing a New Solution for Mortgage Loans</h2>

                <div class="flex items-center gap-x-5">
                    <a class="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                    Company News
                    </a>
                    <p class="text-xs sm:text-sm text-gray-800">November, 2025</p>
                </div>

                <p class="text-lg text-gray-800">At Brignac Mortgage And Consulting Services, our mission has always been to offer transparency and accessibility throughout the home loan process. We believe that by providing a platform where potential homeowners can explore and compare loan options, we empower them to make informed decisions and invest wisely in real estate.</p>

                <p class="text-lg text-gray-800">We are proud to be part of a new culture where homeownership is more attainable, clear, and straightforward for everyone. We continue to innovate and provide financial products that support this vision.</p>

                <div class="text-center">
                    <div class="grid lg:grid-cols-2 gap-3">
                    <div class="grid grid-cols-2 lg:grid-cols-1 gap-3">
                        <figure class="relative w-full h-60">
                        <img class="size-full absolute top-0 start-0 object-cover rounded-md" src="/storage/img/header-1.webp" alt="Blog Image">
                        </figure>
                        <figure class="relative w-full h-60">
                        <img class="size-full absolute top-0 start-0 object-cover rounded-md" src="/storage/img/header-2.webp" alt="Blog Image">
                        </figure>
                    </div>
                    <figure class="relative w-full h-72 sm:h-96 lg:h-full">
                        <img class="size-full absolute top-0 start-0 object-cover rounded-md" src="/storage/img/header-3.webp" alt="Blog Image">
                    </figure>
                    </div>

                    <span class="mt-3 block text-sm text-center text-gray-500">
                        Brignac Mortgage And Consulting Services news
                    </span>
                </div>

                <p class="text-lg text-gray-800">As we’ve grown, we’ve seen how Brignac Mortgage And Consulting Services has helped thousands of people access the best mortgage options. Leading financial institutions and real estate agencies have trusted us to guide their clients through the home loan journey. We’ve also learned that when financial education is provided from the beginning, homebuyers can make more informed and confident decisions.</p>

                <p class="text-lg text-gray-800">That’s why we’re excited to announce that we now offer a free version of our platform, giving individuals, families, and small businesses easy access to clear and reliable loan information from the start of their home buying process.</p>

                <blockquote class="text-center p-4 sm:px-7">
                    <p class="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal xl:text-2xl xl:leading-normal">
                        “Shawn and Company got me a very low rate and Were very easy to get in touch with to answer my questions throughout the process. Would recommend” says one of our satisfied clients, David Rooney.
                    </p>
                    <p class="mt-5 text-gray-800">
                    Brignac Mortgage And Consulting Services news
                    </p>
                </blockquote>

                <figure>
                    <img class="w-full object-cover rounded-md" src="/storage/img/header-3.webp" alt="Blog Image">
                    <figcaption class="mt-3 text-sm text-center text-gray-500">
                        Brignac Mortgage And Consulting Services news
                    </figcaption>
                </figure>

                <div class="space-y-3">
                    <h3 class="text-2xl font-semibold">Bringing Transparency to Everyone</h3>

                    <p class="text-lg text-gray-800">We know the power of clear communication, and we want to give everyone the opportunity to try Brignac Mortgage And Consulting Services and see how easy it can be to navigate the home loan process. Whether you're looking for a residential mortgage, investment loan, or commercial financing solution, we provide a wide range of options to meet your unique needs.</p>
                </div>

                <ul class="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800">
                    <li class="ps-2">Now, you can access personalized support, no matter the size of your loan, and have experts guide you every step of the way.</li>
                    <li class="ps-2">"Shaun and his team always provide excellent customer service and are committed to helping borrowers find the right loan for them" says Jennifer McMinn-Griffin, another happy client.
                        The platform provides a consistent, easy-to-understand way to view and compare various mortgage and loan programs. Users can explore different loan types like Conventional and Construction Loans, Mobile Home Loans (Single and Double Wide), and various ARM and Buydown options, all in one place.</li>
                </ul>

                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                    <!-- Badges/Tags -->
                    <div>
                    <a class="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                        Blog
                    </a>
                    <a class="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                        News
                    </a>
                    <a class="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                        Brignac Mortgage
                    </a>
                    </div>
                    <!-- End Badges/Tags -->

                    <div class="flex justify-end items-center gap-x-1.5">
                    <!-- Button -->
                    <div class="hs-tooltip inline-block">
                        <button type="button" class="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm" role="tooltip">
                            Like
                        </span>
                        </button>
                    </div>
                    <!-- Button -->

                    <div class="block h-3 border-e border-gray-300 mx-3"></div>

                    <!-- Button -->
                    <div class="hs-tooltip inline-block">
                        <button type="button" class="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm" role="tooltip">
                            Comment
                        </span>
                        </button>
                    </div>
                    <!-- Button -->

                    <div class="block h-3 border-e border-gray-300 mx-3"></div>

                    <!-- Button -->
                    <div class="hs-dropdown relative inline-flex">
                        <button id="hs-blog-article-share-dropdown" type="button" class="hs-dropdown-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                        Share
                        </button>
                        <div class="hs-dropdown-menu w-56 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mb-1 z-10 bg-gray-900 shadow-md rounded-md p-2" role="menu" aria-orientation="vertical" aria-labelledby="hs-blog-article-share-dropdown">
                        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:bg-white/10" href="#">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            Copy link
                        </a>
                        <div class="border-t border-gray-600 my-2"></div>
                        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:bg-white/10" href="#">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                            Share on Twitter
                        </a>
                        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:bg-white/10" href="#">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                            Share on Facebook
                        </a>
                        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:bg-white/10" href="#">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                            Share on LinkedIn
                        </a>
                        </div>
                    </div>
                    <!-- Button -->
                    </div>
                </div>
                </div>
            </div>
            </div>
            <!-- End Content -->

            <!-- Sidebar -->
            <div class="lg:col-span-1 lg:w-full lg:h-full">
                <div class="sticky top-24 start-10 py-8 lg:ps-8">
                    <!-- Avatar Media -->
                    <div class="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8">
                    <a class="block shrink-0 focus:outline-none" href="#">
                        <img class="size-10" src="../../../../public/img/secondary-logo-light.jpg" alt="Avatar">
                    </a>

                    <a class="group grow block focus:outline-none" href="">
                        <h5 class="group-hover:text-gray-600 group-focus:text-gray-600 text-sm font-semibold text-gray-800">
                            Brignac Mortgage
                        </h5>
                        <p class="text-sm text-gray-500">
                        Company
                        </p>
                    </a>

                    <div class="grow">
                        <Link :href="route('our-team.index')">
                            <div class="flex justify-end">
                                <v-btn rounded="xs" class="text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700 !rounded-full">Apply Now</v-btn>
                            </div>
                        </Link>
                    </div>
                    </div>
                    <!-- End Avatar Media -->

                    <div class="space-y-6">
                        <iframe class="w-full h-[300px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6893.12326712053!2d-90.771464!3d30.249575!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8626cf3dc655337f%3A0x3b15aacf38947f0c!2sBrignac%20Mortgage%20and%20Consulting%20Services%20LLC!5e0!3m2!1ses-419!2smx!4v1730790533348!5m2!1ses-419!2smx" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <!-- End Sidebar -->
        </div>
    </div>
    <!-- End Blog Article -->

    <section class="mt-60">
        <Footer />
    </section>

</template>
