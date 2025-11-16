<script setup>
import { ref } from "vue";

const slides = ref([
    'Conventional and Construction Loans',
    'FHA Loans',
    'VA and VA Construction Loans',
    'RD/USDA',
    'Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns',
    'Jumbo Loan Experts',
    'Home Equity Line of Credit Loans',
    'Down Payment Assistance',
    'Bank Statement Loans',
    'Non-QM Loans',
    'Commercial Loans',
    'Mobile Home Loans - Single and Double Wide',
    'Rehab Loans',
    'Fix and Flips',
    'Do not see what you are looking for?  Give us a call!'
]);
</script>

<template>
     <div class="flex  text-gray-600">
        <v-dialog max-width="700">
            <template v-slot:activator="{ props: activatorProps }">
                <div class='flex items-center justify-center relative mt-12'>
                    <div class="h-10 flex items-center justify-center w-full relative z-5">
                        <v-btn v-bind="activatorProps" rounded="xs" size="x-large" class="!hidden text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700 !rounded-full lg:!flex !items-center !justify-center !py-7 !px-8">Read more</v-btn>
                        <v-btn v-bind="activatorProps" rounded="xs" size="large" class="lg:!hidden text-none !bg-orange-500 !text-white hover:!bg-white hover:!text-orange-600 !transition-all !duration-700 !rounded-full !flex !items-center !justify-center !py-5 !px-6">Read more</v-btn>
                    </div>
                </div>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card class="!rounded-xl">
                    <v-card-text>
                        <div class="flex items-center justify-center text-center">
                            <h2 class="font-bold text-xl my-2">Loan Products & Programs</h2>
                        </div>

                        <div class="w-controls">
                            <v-carousel
                                height="250"
                                cycle
                                hide-delimiter-background
                            >
                                <v-carousel-item
                                    v-for="(slide, i) in slides"
                                    :key="i"
                                    >
                                        <v-sheet
                                            color="transparent"
                                            height="100%"
                                        >
                                            <div class="d-flex fill-height justify-center align-center px-20">
                                                <div>
                                                    <div class="flex gap-2 items-center justify-center flex-col">
                                                        <img class="w-10" src="../../../public/img/secondary-logo-light.jpg" alt="avatar">
                                                        <div class="">
                                                            <h3 class="text-xs">Brignac Mortgage</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p class="mt-5 font-bold text-xl lg:text-2xl text-center">{{ slide }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-sheet>
                                </v-carousel-item>
                            </v-carousel>
                        </div>
                    </v-card-text>
                </v-card>
            </template>
        </v-dialog>
        </div>
</template>

<style>
.w-controls .v-window__controls .v-btn--icon.v-btn--density-default {
    background: #fff !important;
    border: 1px solid #22c55e !important;
    color: #22c55e !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
}
.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.7, 1) infinite !important;
}
</style>
