<script setup>
import { Link, Head, usePage } from '@inertiajs/vue3';
import AvgWelcomeSection from '@/Components/AvgWelcomeSection.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
const date = new Date();
const formattedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);
</script>

<template>
    <Head title="Privacy Policy for website" />
    <AvgWelcomeSection />
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
        <h2 class="text-center shadow-lg font-bold text-xl lg:text-3xl bg-gray-50 p-5 rounded-md block w-full">Terms and Conditions</h2>
        <h4 class="text-center  mt-7 inline-block mx-auto">Last Updated: {{ formattedDate }}</h4>
      </div>
      <div class="mt-7 leading-7">
        <div class="font-medium  opacity-90">
        <main class="min-h-screen w-full">
            <div class="w-full mx-auto bg-white">

                <div class="mt-8 leading-7 text-gray-700">
        <p>
          Welcome to Brignac Mortgage ("Company," "we," "us," or "our"). By accessing or using our website,
          <a href="https://www.brignacmortgage.com" target="_blank" class="underline text-blue-500">www.brignacmortgage.com</a>
            , you agree to be bound by these Terms of Use. If you do not agree, please do not use this Website.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">1. Company Role and Services</h2>
        <p class="mt-4">
          Brignac Mortgage is a wholesale mortgage broker. We do not fund, underwrite, or service loans. Our role is to assist clients in identifying and applying for mortgage loan products offered by third-party lenders. Loan approval, terms, and funding are determined solely by the respective lenders and not by Brignac Mortgage.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">2. Permitted Use</h2>
        <p class="mt-4">
          You are granted a limited, non-exclusive, non-transferable right to use this Website for lawful purposes, including researching mortgage options, requesting consultations, and submitting loan inquiries. You agree not to:
        </p>
        <ul class="list-disc list-inside mt-2">
          <li>Use the Website for any fraudulent, unlawful, or unauthorized purpose.</li>
          <li>Copy, reproduce, modify, distribute, sell, or lease any part of the Website’s content without our prior written consent.</li>
          <li>Attempt to interfere with or disrupt the Website’s operation.</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-800 mt-8">3. No Guarantee of Loan Approval</h2>
        <p class="mt-4">
          The information provided on this Website is for informational purposes only and does not constitute an offer to lend or a guarantee of approval. Loan programs, rates, and terms are subject to change at any time without notice. All final lending decisions are made by third-party lenders.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">4. No Financial or Legal Advice</h2>
        <p class="mt-4">
          The content provided on this Website is not financial, legal, or professional advice. You should consult with a qualified financial advisor, attorney, or mortgage professional before making any financial decisions.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">5. Privacy and Communication Consent</h2>
        <p class="mt-4">
          By submitting your contact information on this Website, you consent to:
        </p>
        <ul class="list-disc list-inside mt-2">
          <li>Receive communications from Brignac Mortgage and its affiliates, including phone calls, emails, and text messages regarding mortgage-related services.</li>
          <li>Be contacted via automated systems, SMS/text messages, or prerecorded voice messages, even if your number is on a Do-Not-Call list.</li>
          <li>Opt out at any time by following the instructions in the communication. Standard message and data rates may apply.</li>
        </ul>
        <p class="mt-4">
          For details on how we collect and use your personal data, please review our
          <a href="https://brignacmortgage.com/privacy-policy-ror-website" target="_blank" class="underline text-blue-500">Privacy Policy</a>.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">6. Third-Party Links and Content</h2>
        <p class="mt-4">
          This Website may contain links to third-party websites. Brignac Mortgage does not endorse or assume responsibility for the content, policies, or practices of any third-party site.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">7. Limitation of Liability</h2>
        <p class="mt-4">
          To the fullest extent permitted by law, Brignac Mortgage is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
        </p>
        <ul class="list-disc list-inside mt-2">
          <li>Your use of or inability to use the Website.</li>
          <li>Any decision made based on Website content.</li>
          <li>Any errors, omissions, or changes in loan terms by third-party lenders.</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-800 mt-8">8. Indemnification</h2>
        <p class="mt-4">
          You agree to indemnify and hold harmless Brignac Mortgage, its employees, and affiliates from any claims, damages, or losses resulting from your use of the Website or violation of these Terms.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">9. Changes to Terms</h2>
        <p class="mt-4">
          Brignac Mortgage reserves the right to update or modify these Terms at any time. Your continued use of the Website after changes are posted constitutes acceptance of the revised Terms.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">10. Governing Law</h2>
        <p class="mt-4">
          These Terms are governed by the laws of the State of Louisiana, without regard to conflict of law principles.
        </p>

        <h2 class="text-xl font-bold text-gray-800 mt-8">11. Contact Information</h2>
        <p class="mt-4">
          For questions regarding these Terms, contact us at:
        </p>
        <p class="mt-2">
          Brignac Mortgage<br />
          <a href="mailto:Shaun@brignacmortgage.com" class="underline text-blue-500">Shaun@brignacmortgage.com</a><br />
          <a href="tel:2254359287" class="underline text-blue-500">225-435-9287</a>
        </p>
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
        <p class="text-center mt-5 lg:mt-7 inline-block mx-auto">Brignac Mortgage | 2025</p>
      </div>
    </div>
  </main>
</template>
