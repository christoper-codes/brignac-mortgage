<script setup>
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';


</script>

<template>
    <Head title="Loan programs" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>
            <span>Loans programs</span>
        </template>
        <template #description>
            <span>Explore our diverse range of loan products and programs designed to meet your unique financial needs.</span>
        </template>
    </Breadcrumb>

    <div class="max-w-7xl mx-auto grid items-start grid-cols-1 lg:grid-cols-2 w-full gap-10 mt-20">

        <div class="border-4 border-neutral-100 py-6 mx-4 p-4 rounded-xl">
            <!-- Imagen principal -->
            <div class="w-full h-[270px] rounded-lg bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-3a39861.png')] bg-center bg-cover">
                <div class="h-full w-full flex items-start justify-end bg-black/20 rounded-lg">
                    <div class="h-16 w-8 bg-green-500 mr-5 rounded-b-md"></div>
                </div>
            </div>

            <div class="flex items-start gap-3 flex-col mt-5 lg:p-5">
                <!-- Icono y título -->
                <div class="flex items-center justify-center lg:gap-2">
                    <h3 class="font-bold text-xl">Federal Housing Administration Loan</h3>
                </div>

                <!-- Título del programa -->
                <div class="py-2 px-5 border-l-[4px] border-l-green-500">
                    <h3 class="text-xs">General FHA Loans Program</h3>
                </div>

                <!-- Detalles del programa -->
                <div class="mt-2 pt-4 text-sm text-gray-700 border-t-[2px] space-y-2">
                    <p><strong>Credit Score:</strong> 500+</p>
                    <p><strong>Down Payment:</strong> There is no minimum down payment required under certain conditions:</p>
                    <ul class="list-disc pl-5 space-y-3 mt-3">
                        <li>Credit Score 500-560: 10% Down</li>
                        <li>Credit Score 560+: 3.5% Down</li>
                    </ul>

                    <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                        <!-- Opciones de préstamos -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Loan Options:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Primary Home Residence</li>
                                <li>Refinance Options</li>
                                <li>Fixed Rate Loan</li>
                                <li>Adjustable Rate Mortgage (ARM)</li>
                                <li>Energy Efficient Mortgage</li>
                                <li>Home Equity Loans</li>
                                <li>Streamlines</li>
                                <li>Graduated Payment Mortgage</li>
                            </ul>
                        </div>

                        <!-- Programas especiales -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Special Programs for:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Law Enforcement</li>
                                <li>Teachers</li>
                                <li>Firefighters</li>
                                <li>Emergency Medical Technicians (EMT)</li>
                            </ul>
                            <p class="mt-2 text-sm">and More.</p>
                        </div>
                    </div>

                    <v-btn href="https://www.hud.gov/buying/loans" target="_blank" rounded="xs" color="green" size="large" variant="tonal" block class="text-none !mt-10 !rounded-full !flex !items-center !justify-center !py-6 !border !border-green-500">See more</v-btn>

                </div>
            </div>
        </div>

        <div class="border-4 border-neutral-100 py-6 mx-4 p-4 rounded-xl">
            <!-- Imagen principal -->
            <div class="w-full h-[270px] rounded-lg bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-0772a60.png')] bg-center bg-cover">
                <div class="h-full w-full flex items-start justify-end bg-black/20 rounded-lg">
                    <div class="h-16 w-8 bg-green-500 mr-5 rounded-b-md"></div>
                </div>
            </div>

            <div class="flex items-start gap-3 flex-col mt-5 lg:p-5">
                <!-- Icono y título -->
                <div class="flex items-center justify-center lg:gap-2">
                    <h3 class="font-bold text-xl">Conventional Loan</h3>
                </div>

                <!-- Título del programa -->
                <div class="py-2 px-5 border-l-[4px] border-l-green-500">
                    <h3 class="text-xs">General Conventional Loan Program</h3>
                </div>

                <!-- Detalles del programa -->
                <div class="mt-2 pt-4 text-sm text-gray-700 border-t-[2px] space-y-2">
                    <p><strong>FICO Score:</strong> 620+</p>
                    <p><strong>Minimum Down Payment:</strong> 3% down payment solution for first-time homebuyers.</p>
                    <p><strong>Conventional 1% Down Program</strong></p>
                    <p><strong>0% Down Purchase Program</strong></p>
                    <p><strong>Second Home Purchase:</strong> 5%</p>

                    <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                        <!-- Opciones de préstamos -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Eligible Properties:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Primary, second, and investment properties</li>
                                <li>Manufactured Homes</li>
                                <li>Adjustable Rate Program (ARM)</li>
                                <li>Fixed Rate Programs</li>
                                <li>Jumbo Loans</li>
                                <li>Low Down Payment Conventional Options</li>
                                <li>Renovation Loans</li>
                                <li>and More.</li>
                            </ul>
                        </div>
                    </div>

                    <v-btn href="https://www.consumerfinance.gov/owning-a-home/conventional-loans/" target="_blank" rounded="xs" color="green" size="large" variant="tonal" block class="text-none !mt-10 !rounded-full !flex !items-center !justify-center !py-6 !border !border-green-500">See more</v-btn>

                </div>
            </div>
        </div>

        <div class="border-4 border-neutral-100 py-6 mx-4 p-4 rounded-xl">
            <!-- Imagen principal -->
            <div class="w-full h-[270px] rounded-lg bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-2f983ad.png')] bg-center bg-cover">
                <div class="h-full w-full flex items-start justify-end bg-black/20 rounded-lg">
                    <div class="h-16 w-8 bg-green-500 mr-5 rounded-b-md"></div>
                </div>
            </div>

            <div class="flex items-start gap-3 flex-col mt-5 lg:p-5">
                <!-- Icono y título -->
                <div class="flex items-center justify-center lg:gap-2">
                    <h3 class="font-bold text-xl">Veteran Affairs Loan</h3>
                </div>

                <!-- Título del programa -->
                <div class="py-2 px-5 border-l-[4px] border-l-green-500">
                    <h3 class="text-xs">General Eligibility Requirements</h3>
                </div>

                <!-- Detalles del programa -->
                <div class="mt-2 pt-4 text-sm text-gray-700 border-t-[2px] space-y-2">
                    <p><strong>Active Duty Service:</strong> A Veteran is eligible for VA home loan benefits if they served on active duty in the Army, Navy, Air Force, Marine Corps, or Coast Guard.</p>
                    <p><strong>Discharged Veterans:</strong> The DD214 Form, Certificate of Release or Discharge from Active Duty</p>
                    <p><strong>Surviving Spouses</strong></p>
                    <p><strong>Current Reserve/Guard Members</strong></p>
                    <p><strong>Down Payment:</strong> 0%</p>
                    <p><strong>Funding Fee:</strong> First Time Homebuyer 2.3%, Subsequent 3.3%</p>
                    <p><strong>Funding Fee Waived:</strong> Awarded Purple Heart, Service-Connected Disabilities, Surviving Spouses.</p>

                    <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                        <!-- Opciones de préstamos -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Eligible Properties:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Single Family Home</li>
                                <li>Condo</li>
                                <li>Manufactured Home</li>
                                <li>Building a New Home (Construction)</li>
                                <li>Refinancing</li>
                                <li>Cash Out</li>
                                <li>Energy Efficient Homes</li>
                                <li>And More.</li>
                            </ul>
                        </div>
                    </div>

                    <v-btn href="https://www.va.gov/housing-assistance/home-loans/eligibility/" target="_blank" rounded="xs" color="green" size="large" variant="tonal" block class="text-none !mt-10 !rounded-full !flex !items-center !justify-center !py-6 !border !border-green-500">See more</v-btn>
                </div>
            </div>
        </div>

        <div class="border-4 border-neutral-100 py-6 mx-4 p-4 rounded-xl">
            <!-- Imagen principal -->
            <div class="w-full h-[270px] rounded-lg bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-3a39861.png')] bg-center bg-cover">
                <div class="h-full w-full flex items-start justify-end bg-black/20 rounded-lg">
                    <div class="h-16 w-8 bg-orange-500 mr-5 rounded-b-md"></div>
                </div>
            </div>

            <div class="flex items-start gap-3 flex-col mt-5 lg:p-5">
                <!-- Icono y título -->
                <div class="flex items-center justify-center lg:gap-2">
                    <h3 class="font-bold text-xl">USDA LOAN</h3>
                </div>

                <!-- Título del programa -->
                <div class="py-2 px-5 border-l-[4px] border-l-orange-500">
                    <h3 class="text-xs">General USDA Loan Program</h3>
                </div>

                <!-- Detalles del programa -->
                <div class="mt-2 pt-4 text-sm text-gray-700 border-t-[2px] space-y-2">
                    <p><strong>Credit Score:</strong> 620+</p>
                    <p>Under 620 Might Be Able To Qualify Under Conditions.</p>
                    <p><strong>ZERO Down Payment</strong></p>
                    <p><strong>Funding Fee:</strong> 1%</p>
                    <p><strong>Property Location:</strong> Needs To Qualify (The property must be located in an eligible area validated on the USDA eligibility website)</p>

                    <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                        <!-- Opciones de préstamos -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Eligible Properties:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Primary Residence</li>
                                <li>Single Family Homes</li>
                                <li>Manufactured Properties</li>
                                <li>And More.</li>
                            </ul>
                        </div>
                    </div>
                    <Link :href="route('our-team.index')">
                        <v-btn rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-10 !rounded-full !flex !items-center !justify-center !py-6 !border !border-yellow-500">Click To Apply</v-btn>
                    </Link >

                </div>
            </div>
        </div>

        <div class="border-4 border-neutral-100 py-6 mx-4 p-4 rounded-xl">
            <!-- Imagen principal -->
            <div class="w-full h-[270px] rounded-lg bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-10681fa.png')] bg-center bg-cover">
                <div class="h-full w-full flex items-start justify-end bg-black/20 rounded-lg">
                    <div class="h-16 w-8 bg-orange-500 mr-5 rounded-b-md"></div>
                </div>
            </div>

            <div class="flex items-start gap-3 flex-col mt-5 lg:p-5">
                <!-- Icono y título -->
                <div class="flex items-center justify-center lg:gap-2">
                    <h3 class="font-bold text-xl">ARM LOAN</h3>
                </div>

                <!-- Título del programa -->
                <div class="py-2 px-5 border-l-[4px] border-l-orange-500">
                    <h3 class="text-xs">General Adjustable Rate Mortgage Program</h3>
                </div>

                <!-- Detalles del programa -->
                <div class="mt-2 pt-4 text-sm text-gray-700 border-t-[2px] space-y-2">
                    <p><strong>Credit Score Requirements:</strong></p>
                    <p>Minimum: 580+</p>
                    <p>Conventional ARM: 620</p>
                    <p>FHA ARM: 580</p>
                    <p>VA ARM: No requirements</p>
                    <p><strong>Minimum Down Payment:</strong> 3% - 5%</p>
                    <p>An Adjustable Rate Mortgage (ARM) typically features an initial lower monthly payment, which increases over time.</p>
                    <p><strong>Buy-down Options:</strong> 3-2-1, 2-1, 1-1, and 1-0 tiers</p>

                    <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                        <!-- Opciones de préstamos -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Eligible Properties:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Primary Residence</li>
                                <li>Second Home Properties</li>
                                <li>Investment Properties</li>
                                <li>Purchase</li>
                                <li>Rate/Term Refinance</li>
                                <li>Cash-Out Refinance Options</li>
                                <li>Jumbo Loans</li>
                                <li>and More</li>
                            </ul>
                        </div>
                    </div>
                    <Link :href="route('our-team.index')">
                        <v-btn rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-10 !rounded-full !flex !items-center !justify-center !py-6 !border !border-yellow-500">Click To Apply</v-btn>
                    </Link>

                </div>
            </div>
        </div>

        <div class="border-4 border-neutral-100 py-6 mx-4 p-4 rounded-xl">
            <!-- Imagen principal -->
            <div class="w-full h-[270px] rounded-lg bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-e000abc.png')] bg-center bg-cover">
                <div class="h-full w-full flex items-start justify-end bg-black/20 rounded-lg">
                    <div class="h-16 w-8 bg-orange-500 mr-5 rounded-b-md"></div>
                </div>
            </div>

            <div class="flex items-start gap-3 flex-col mt-5 lg:p-5">
                <!-- Icono y título -->
                <div class="flex items-center justify-center lg:gap-2">
                    <h3 class="font-bold text-xl">JUMBO LOAN</h3>
                </div>

                <!-- Título del programa -->
                <div class="py-2 px-5 border-l-[4px] border-l-orange-500">
                    <h3 class="text-xs">General Jumbo Mortgage Program</h3>
                </div>

                <!-- Detalles del programa -->
                <div class="mt-2 pt-4 text-sm text-gray-700 border-t-[2px] space-y-2">
                    <p><strong>Minimum Credit Score:</strong> 680</p>
                    <p><strong>Average Credit Score:</strong> 700 or higher</p>
                    <p><strong>Minimum Down Payment:</strong> 3% to 5%</p>
                    <p><strong>Average Down Payment:</strong> 10%</p>
                    <p>Jumbo loans are generally utilized for home purchases that exceed the conforming loan limit, which for 2025 is set at $766,550.</p>

                    <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                        <!-- Opciones de préstamos -->
                        <div class="mt-4">
                            <h4 class="font-semibold text-md">Eligible Properties:</h4>
                            <ul class="list-disc pl-5 space-y-3 mt-3">
                                <li>Single Family Home Outside Conforming Limit</li>
                                <li>Vacation Properties</li>
                                <li>Investment Properties</li>
                                <li>Primary & Secondary Properties</li>
                                <li>Cash-out refinances</li>
                                <li>Rate/Term Refinances</li>
                                <li>And More</li>
                            </ul>
                        </div>
                    </div>
                    <Link :href="route('our-team.index')">
                        <v-btn rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-10 !rounded-full !flex !items-center !justify-center !py-6 !border !border-yellow-500">Click To Apply</v-btn>
                    </Link>

                </div>
            </div>
        </div>
    </div>

    <section class="mt-60">
        <Footer />
    </section>

</template>

<style scoped>

</style>
