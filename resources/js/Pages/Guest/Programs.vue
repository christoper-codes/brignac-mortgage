<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head, Link } from '@inertiajs/vue3';
import useCurrentYear from '@/composables/currentYear';

const { currentYear } = useCurrentYear();
</script>

<template>
    <Head title="Loan Programs" />
    <NavigationDrawerGuest />
    <GuestNav />

    <Breadcrumb>
        <template #title>Loan Programs</template>
        <template #description>Explore our diverse range of loan products and programs designed to meet your unique financial needs.</template>
    </Breadcrumb>

    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 mb-20">

        <!-- FHA Loan -->
        <div class="border-4 border-neutral-100 rounded-xl overflow-hidden flex flex-col">
            <div class="h-64 bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-3a39861.png')] bg-center bg-cover">
                <div class="h-full flex items-start justify-end bg-black/20">
                    <div class="h-16 w-8 bg-green-500 mr-5 rounded-b-md"></div>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-3 flex-1">
                <h3 class="text-xl font-bold">Federal Housing Administration Loan</h3>
                <div class="border-l-4 border-green-500 pl-4">
                    <p class="text-xs text-gray-500">General FHA Loans Program</p>
                </div>
                <div class="text-sm text-gray-700 space-y-2 border-t pt-4 flex-1">
                    <p><strong>Credit Score:</strong> 500+</p>
                    <p><strong>Down Payment:</strong></p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Credit Score 500–560: 10% Down</li>
                        <li>Credit Score 560+: 3.5% Down</li>
                    </ul>
                    <div class="flex flex-col lg:flex-row gap-6 pt-2">
                        <div>
                            <h4 class="font-semibold mb-2">Loan Options:</h4>
                            <ul class="list-disc pl-5 space-y-1">
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
                        <div>
                            <h4 class="font-semibold mb-2">Special Programs for:</h4>
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Law Enforcement</li>
                                <li>Teachers</li>
                                <li>Firefighters</li>
                                <li>Emergency Medical Technicians</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <a href="https://www.hud.gov/buying/loans" target="_blank"
                   class="mt-4 w-full inline-flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 rounded-full transition-colors duration-200">
                    See More
                </a>
            </div>
        </div>

        <!-- Conventional Loan -->
        <div class="border-4 border-neutral-100 rounded-xl overflow-hidden flex flex-col">
            <div class="h-64 bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-0772a60.png')] bg-center bg-cover">
                <div class="h-full flex items-start justify-end bg-black/20">
                    <div class="h-16 w-8 bg-green-500 mr-5 rounded-b-md"></div>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-3 flex-1">
                <h3 class="text-xl font-bold">Conventional Loan</h3>
                <div class="border-l-4 border-green-500 pl-4">
                    <p class="text-xs text-gray-500">General Conventional Loan Program</p>
                </div>
                <div class="text-sm text-gray-700 space-y-2 border-t pt-4 flex-1">
                    <p><strong>FICO Score:</strong> 620+</p>
                    <p><strong>Minimum Down Payment:</strong> 3% for first-time homebuyers.</p>
                    <p><strong>Conventional 1% Down Program</strong></p>
                    <p><strong>0% Down Purchase Program</strong></p>
                    <p><strong>Second Home Purchase:</strong> 5%</p>
                    <div>
                        <h4 class="font-semibold mt-3 mb-2">Eligible Properties:</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Primary, second, and investment properties</li>
                            <li>Manufactured Homes</li>
                            <li>Adjustable Rate Program (ARM)</li>
                            <li>Fixed Rate Programs</li>
                            <li>Jumbo Loans</li>
                            <li>Low Down Payment Conventional Options</li>
                            <li>Renovation Loans</li>
                        </ul>
                    </div>
                </div>
                <a href="https://www.consumerfinance.gov/owning-a-home/conventional-loans/" target="_blank"
                   class="mt-4 w-full inline-flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 rounded-full transition-colors duration-200">
                    See More
                </a>
            </div>
        </div>

        <!-- VA Loan -->
        <div class="border-4 border-neutral-100 rounded-xl overflow-hidden flex flex-col">
            <div class="h-64 bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-2f983ad.png')] bg-center bg-cover">
                <div class="h-full flex items-start justify-end bg-black/20">
                    <div class="h-16 w-8 bg-green-500 mr-5 rounded-b-md"></div>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-3 flex-1">
                <h3 class="text-xl font-bold">Veteran Affairs Loan</h3>
                <div class="border-l-4 border-green-500 pl-4">
                    <p class="text-xs text-gray-500">General Eligibility Requirements</p>
                </div>
                <div class="text-sm text-gray-700 space-y-2 border-t pt-4 flex-1">
                    <p><strong>Active Duty Service:</strong> Army, Navy, Air Force, Marine Corps, or Coast Guard.</p>
                    <p><strong>Discharged Veterans:</strong> DD214 Form required</p>
                    <p><strong>Surviving Spouses</strong></p>
                    <p><strong>Current Reserve/Guard Members</strong></p>
                    <p><strong>Down Payment:</strong> 0%</p>
                    <p><strong>Funding Fee:</strong> First Time 2.3% · Subsequent 3.3%</p>
                    <p><strong>Fee Waived:</strong> Purple Heart, Service-Connected Disabilities, Surviving Spouses.</p>
                    <div>
                        <h4 class="font-semibold mt-3 mb-2">Eligible Properties:</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Single Family Home</li>
                            <li>Condo</li>
                            <li>Manufactured Home</li>
                            <li>New Home Construction</li>
                            <li>Refinancing &amp; Cash Out</li>
                            <li>Energy Efficient Homes</li>
                        </ul>
                    </div>
                </div>
                <a href="https://www.va.gov/housing-assistance/home-loans/eligibility/" target="_blank"
                   class="mt-4 w-full inline-flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 rounded-full transition-colors duration-200">
                    See More
                </a>
            </div>
        </div>

        <!-- USDA Loan -->
        <div class="border-4 border-neutral-100 rounded-xl overflow-hidden flex flex-col">
            <div class="h-64 bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-3a39861.png')] bg-center bg-cover">
                <div class="h-full flex items-start justify-end bg-black/20">
                    <div class="h-16 w-8 bg-orange-500 mr-5 rounded-b-md"></div>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-3 flex-1">
                <h3 class="text-xl font-bold">USDA Loan</h3>
                <div class="border-l-4 border-orange-500 pl-4">
                    <p class="text-xs text-gray-500">General USDA Loan Program</p>
                </div>
                <div class="text-sm text-gray-700 space-y-2 border-t pt-4 flex-1">
                    <p><strong>Credit Score:</strong> 620+ (under 620 may qualify under conditions)</p>
                    <p><strong>ZERO Down Payment</strong></p>
                    <p><strong>Funding Fee:</strong> 1%</p>
                    <p><strong>Property Location:</strong> Must be in an eligible USDA zone</p>
                    <div>
                        <h4 class="font-semibold mt-3 mb-2">Eligible Properties:</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Primary Residence</li>
                            <li>Single Family Homes</li>
                            <li>Manufactured Properties</li>
                        </ul>
                    </div>
                </div>
                <Link :href="route('contact-us.index')"
                      class="mt-4 w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition-colors duration-200">
                    Click To Apply
                </Link>
            </div>
        </div>

        <!-- ARM Loan -->
        <div class="border-4 border-neutral-100 rounded-xl overflow-hidden flex flex-col">
            <div class="h-64 bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-10681fa.png')] bg-center bg-cover">
                <div class="h-full flex items-start justify-end bg-black/20">
                    <div class="h-16 w-8 bg-orange-500 mr-5 rounded-b-md"></div>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-3 flex-1">
                <h3 class="text-xl font-bold">ARM Loan</h3>
                <div class="border-l-4 border-orange-500 pl-4">
                    <p class="text-xs text-gray-500">General Adjustable Rate Mortgage Program</p>
                </div>
                <div class="text-sm text-gray-700 space-y-2 border-t pt-4 flex-1">
                    <p><strong>Credit Score Requirements:</strong></p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Conventional ARM: 620+</li>
                        <li>FHA ARM: 580+</li>
                        <li>VA ARM: No requirement</li>
                    </ul>
                    <p><strong>Minimum Down Payment:</strong> 3%–5%</p>
                    <p>Features an initial lower monthly payment that adjusts over time.</p>
                    <p><strong>Buy-down Options:</strong> 3-2-1, 2-1, 1-1, and 1-0 tiers</p>
                    <div>
                        <h4 class="font-semibold mt-3 mb-2">Eligible Properties:</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Primary Residence</li>
                            <li>Second Home &amp; Investment Properties</li>
                            <li>Purchase, Rate/Term &amp; Cash-Out Refinance</li>
                            <li>Jumbo Loans</li>
                        </ul>
                    </div>
                </div>
                <Link :href="route('contact-us.index')"
                      class="mt-4 w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition-colors duration-200">
                    Click To Apply
                </Link>
            </div>
        </div>

        <!-- Jumbo Loan -->
        <div class="border-4 border-neutral-100 rounded-xl overflow-hidden flex flex-col">
            <div class="h-64 bg-[url('https://img1.wsimg.com/isteam/ip/6ea216e3-2cb3-4597-a890-f1be29a5c17b/blob-e000abc.png')] bg-center bg-cover">
                <div class="h-full flex items-start justify-end bg-black/20">
                    <div class="h-16 w-8 bg-orange-500 mr-5 rounded-b-md"></div>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-3 flex-1">
                <h3 class="text-xl font-bold">Jumbo Loan</h3>
                <div class="border-l-4 border-orange-500 pl-4">
                    <p class="text-xs text-gray-500">General Jumbo Mortgage Program</p>
                </div>
                <div class="text-sm text-gray-700 space-y-2 border-t pt-4 flex-1">
                    <p><strong>Minimum Credit Score:</strong> 680</p>
                    <p><strong>Average Credit Score:</strong> 700+</p>
                    <p><strong>Minimum Down Payment:</strong> 3%–5%</p>
                    <p><strong>Average Down Payment:</strong> 10%</p>
                    <p>Used for purchases exceeding the {{ currentYear }} conforming loan limit of $766,550.</p>
                    <div>
                        <h4 class="font-semibold mt-3 mb-2">Eligible Properties:</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Single Family Home (Outside Conforming Limit)</li>
                            <li>Vacation &amp; Investment Properties</li>
                            <li>Primary &amp; Secondary Properties</li>
                            <li>Cash-Out &amp; Rate/Term Refinances</li>
                        </ul>
                    </div>
                </div>
                <Link :href="route('contact-us.index')"
                      class="mt-4 w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition-colors duration-200">
                    Click To Apply
                </Link>
            </div>
        </div>

    </div>

    <Footer />
</template>
