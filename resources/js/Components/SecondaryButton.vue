<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <button
        :type="type"
        class="relative flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-6 py-2 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-all cursor-pointer"
    >
        <slot />
    </button>
</template>
