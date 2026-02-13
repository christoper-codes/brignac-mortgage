<script setup>
import { Link, Head, usePage } from '@inertiajs/vue3';
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import useCurrentYear from '@/composables/currentYear';

const { currentYear } = useCurrentYear();
const date = new Date();
const formattedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);
</script>

<template>
    <Head title="Privacy Policy for website" />

  <main class="min-h-screen flex items-center justify-center py-5 lg:py-0 relative">
    <div class="px-5 lg:px-0 lg:w-[60%] 2xl:w-1/2 mx-auto lg:py-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
            <Link :href="route('welcome')" class="block">
                <div class="lg:h-[38px] h-[33px] lg:w-[38px] w-[33px] bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full flex items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5" viewBox="0 0 24 24"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
                </div>
            </Link>
        </div>
        <Link :href="route('welcome')" class="block">
            <img class="w-20 lg:w-28 h-auto" src="../../../../public/img/primary-logo-light.jpg" alt="img logo">
        </Link>
      </div>
      <div class="flex flex-col items-center w-full mt-3 lg:mt-5">
        <h2 class="text-center shadow-lg font-bold text-xl lg:text-3xl bg-gray-50 p-5 rounded-md block w-full">Disclaimers</h2>
        <h4 class="text-center  mt-7 inline-block mx-auto">Last Updated: {{ formattedDate }}</h4>
      </div>
      <div class="mt-7 leading-7">
        <div class="font-medium  opacity-90">
        <main class="min-h-screen w-full">
            <div class="w-full mx-auto bg-white">

                <div class="mt-8 leading-7 text-gray-700">
                    <h2 class="text-xl font-bold text-gray-800 mt-8">1. General Disclaimer</h2>
                    <p class="mt-4">
                    Brignac Mortgage is a wholesale mortgage broker licensed in the State of Louisiana. We do not fund, underwrite, approve, or service mortgage loans. All loan products, terms, and conditions are offered through third-party lenders and are subject to change without notice. Loan approval is based on individual lender criteria, creditworthiness, and market conditions.
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">2. No Guarantee of Loan Approval</h2>
                    <p class="mt-4">
                    Completing an inquiry on this website does not constitute a loan application or approval. Loan qualification is determined solely by the third-party lenders we work with. We make no guarantees regarding loan terms, interest rates, or approval decisions.
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">3. Third-Party Links and Content</h2>
                    <p class="mt-4">
                    Our website may contain links to third-party websites or resources. Brignac Mortgage does not control, endorse, or guarantee the accuracy, security, or policies of any external content. Users should review the terms and privacy policies of third-party websites before engaging with them.
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">4. No Financial, Legal, or Tax Advice</h2>
                    <p class="mt-4">
                    The content on this website is for informational purposes only and should not be construed as financial, legal, or tax advice. You should consult with a qualified financial advisor, attorney, or tax professional before making mortgage-related decisions.
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">5. Communications & Consent Disclaimer</h2>
                    <p class="mt-4">
                    By submitting your contact information on this website, you consent to receive communication via phone, email, and/or text messages from Brignac Mortgage or our lending partners. This may include automated messaging or prerecorded calls to the number provided.
                    </p>
                    <ul class="list-disc list-inside mt-2">
                    <li>Message & data rates may apply.</li>
                    <li>Consent is not a condition of loan services.</li>
                    <li>You may opt out at any time by following the instructions in the communication.</li>
                    </ul>
                    <p class="mt-4">
                    Brignac Mortgage does not knowingly contact individuals listed on the National Do Not Call Registry unless authorized under an existing business relationship.
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">6. Equal Housing Opportunity Statement</h2>
                    <p class="mt-4">
                    Brignac Mortgage is an Equal Housing Opportunity Mortgage Broker and complies with all Louisiana state fair lending laws and federal regulations, including the Fair Housing Act and Equal Credit Opportunity Act (ECOA). We do not discriminate based on race, color, religion, national origin, sex, marital status, age, disability, or familial status.
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">7. Licensing & Regulatory Disclaimer</h2>
                    <p class="mt-4">
                    Brignac Mortgage is a Louisiana-licensed mortgage broker. We operate exclusively within the state of Louisiana and comply with all local, state, and federal mortgage brokerage regulations.
                    </p>
                    <ul class="list-disc list-inside mt-2">
                    <li>Company NMLS ID:</li>
                    <li>Louisiana Residential Mortgage Lending License Number:</li>
                    <li>Licensed by the Louisiana Office of Financial Institutions (OFI)</li>
                    </ul>
                    <p class="mt-4">
                    For questions or complaints about mortgage brokers in Louisiana, you may contact:
                    </p>
                    <p class="mt-2">
                    Louisiana Office of Financial Institutions (OFI)<br />
                    Main Phone: <a href="tel:2259254660" class="underline text-blue-500">(225) 925-4660</a><br />
                    Main Fax: (225) 925-4524<br />
                    Email: <a href="mailto:ofila@ofi.la.gov" class="underline text-blue-500">ofila@ofi.la.gov</a><br />
                    Website: <a href="https://ofi.la.gov/" target="_blank" class="underline text-blue-500">https://ofi.la.gov/</a>
                    </p>

                    <h2 class="text-xl font-bold text-gray-800 mt-8">8. Website Security & Limitation of Liability</h2>
                    <p class="mt-4">
                    We take reasonable precautions to protect user data; however, we cannot guarantee that unauthorized access, cyberattacks, or technical errors will never occur. By using this website, you agree that Brignac Mortgage is not liable for any damage resulting from:
                    </p>
                    <ul class="list-disc list-inside mt-2">
                    <li>The use of this website or third-party links.</li>
                    <li>Loss of data or security breaches.</li>
                    <li>Errors, inaccuracies, or changes in loan programs.</li>
                    </ul>
                </div>
            </div>
        </main>
        </div>
      </div>
      <div class="mt-16 flex flex-col items-center justify-center">
        <Link :href="route('welcome')" class="block">
            <img class="w-28 h-auto" src="../../../../public/img/primary-logo-light.jpg" alt="img logo">
        </Link>
        <div class="flex items-center gap-5 mt-5">
            <a href="https://www.brignacmortgage.com/disclaimers-for-website" target="_blank" class="underline text-blue-500">Disclaimers</a>
            <a href="https://www.brignacmortgage.com/privacy-policy-for-website" target="_blank" class="underline text-blue-500">Privacy policy</a>
            <a href="https://www.brignacmortgage.com/terms-of-use-for-website" target="_blank" class="underline text-blue-500">Terms of use</a>
        </div>
        <p class="text-center mt-5 lg:mt-7 inline-block mx-auto">Brignac Mortgage | {{ currentYear }}</p>
      </div>
    </div>
  </main>
</template>
