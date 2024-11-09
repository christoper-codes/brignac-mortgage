<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { draweAppNavState } from '@/composables/drawersStates';

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? 'text-none !h-[40px] !w-full !text-white !bg-slate-200/10 !justify-start backdrop-blur-sm'
        : 'text-none !h-[40px] !w-full !text-gray-300  !bg-transparent !justify-start'
);

const toggledraweAppNavState = () => {
    if(window.innerWidth < 700) {
        draweAppNavState.value = !draweAppNavState.value;
    }
}

</script>

<template>
    <Link :href="href">
        <v-btn variant="text" :class="classes" rounded="sm" @click="toggledraweAppNavState">
            <slot />
        </v-btn>
    </Link>
</template>
