<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="w-full h-56 bg-[url('/storage/img/header-5.jpg')] bg-center bg-cover">
        <div class="h-full w-full flex items-center bg-black/60">
            <div class="w-full flex flex-col items-start lg:flex-row lg:items-center justify-between max-w-7xl mx-auto px-4">
                <div class="flex flex-col gap-2 mb-4 lg:mb-0">
                    <h2 class="text-3xl lg:text-4xl font-bold text-white">
                        <slot name="title" />
                    </h2>
                    <div class="h-1 w-14 bg-green-500 rounded-full"></div>
                    <p class="max-w-md text-xs lg:text-base text-white/80">
                        <slot name="description" />
                    </p>
                </div>
                <div class="flex items-center gap-2 text-white text-sm">
                    <Link :href="route('welcome')" class="flex items-center gap-1 hover:text-green-400 transition-colors">
                        <span class="material-symbols-outlined text-xl text-green-500">home</span>
                        Home
                    </Link>
                    <span class="material-symbols-outlined text-lg">chevron_right</span>
                    <slot name="title" />
                </div>
            </div>
        </div>
    </div>
</template>
