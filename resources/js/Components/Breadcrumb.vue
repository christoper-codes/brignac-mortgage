<script setup>
import { Link } from '@inertiajs/vue3';


</script>

<template>
    <div class="w-full h-[230px] bg-[url('/storage/img/header-5.jpg')] bg-center bg-cover mt-[73px] lg:mt-[90px]">
        <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/60">
            <div class="w-full flex flex-col items-start lg:flex-row lg:items-center justify-between max-w-7xl mx-auto px-4 lg:px-0" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                <div class="flex flex-col gap-2 justify-center mb-5">
                    <h2 class="text-3xl lg:text-4xl font-bold">
                        <slot name="title" />
                    </h2>
                    <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                    <p class="max-w-[400px] text-xs lg:text-base">
                        <slot name="description" />
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <Link :href="route('welcome')">
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-2xl text-orange-500">home</span>
                            <span class="block">Home</span>
                        </div>
                    </Link>
                    <div class="block"><span class="material-symbols-outlined text-lg">chevron_right</span></div>
                    <div><slot name="title" /></div>
                </div>
            </div>
        </div>
    </div>
</template>
