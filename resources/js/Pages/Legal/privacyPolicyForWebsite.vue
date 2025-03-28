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
        <h2 class="text-center shadow-lg font-bold text-xl lg:text-3xl bg-gray-50 p-5 rounded-md block w-full">Privacy Policy</h2>
        <h4 class="text-center  mt-7 inline-block mx-auto">Last Updated: {{ formattedDate }}</h4>
      </div>
      <div class="mt-7 leading-7">
        <div class="font-medium  opacity-90">
        <main class="min-h-screen w-full">
            <div class="w-full mx-auto bg-white py-5">
            <p class="text-gray-700">
                Brignac Mortgage ("Company," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you provide when using our website, <a href="https://brignacmortgage.com/"  target="_blank" class="underline text-blue-500">https://brignacmortgage.com</a>. This Privacy Policy explains how we collect, use, share, and protect your information.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">1. Information We Collect</h2>
            <p class="mt-4 text-gray-700">
                We collect personal and non-personal information when you use our website or interact with us.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">a. Personal Information</h3>
            <ul class="list-disc list-inside mt-2 text-gray-700">
                <li>Contact Details: Name, email address, phone number, and mailing address.</li>
                <li>Financial Information: Employment and income details (if voluntarily submitted).</li>
                <li>Mortgage Preferences: Information related to your mortgage inquiries, such as loan preferences and property details.</li>
            </ul>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">b. Non-Personal Information</h3>
            <ul class="list-disc list-inside mt-2 text-gray-700">
                <li>Technical Data: IP address, browser type, and operating system.</li>
                <li>Usage Data: Website usage statistics and analytics.</li>
                <li>Cookies: Information collected through cookies and similar tracking technologies (see Section 6 for details).</li>
            </ul>

            <h2 class="text-xl font-bold text-gray-800 mt-8">2. How We Use Your Information</h2>
            <ul class="list-disc list-inside mt-4 text-gray-700">
                <li>Brokerage Services: Assist you in identifying mortgage loan products and lenders.</li>
                <li>Communication: Respond to inquiries and provide customer support.</li>
                <li>Marketing: Send updates, promotional messages, and mortgage-related communications (with your consent).</li>
                <li>Improvement: Enhance our website and services.</li>
                <li>Compliance: Adhere to legal and regulatory requirements.</li>
            </ul>
            <p class="mt-4 text-gray-700">
                Note: We do not make loan decisions, underwrite, fund, or service mortgage loans. All financial decisions, approvals, or loan terms are determined by third-party lenders.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">3. How We Share Your Information</h2>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">a. Third-Party Lenders & Partners</h3>
            <p class="mt-2 text-gray-700">
                As a mortgage broker, we may share relevant details with wholesale lenders to process your mortgage inquiries. We do not control how third-party lenders use your information. You should review their privacy policies before proceeding with any loan application.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">b. Service Providers</h3>
            <p class="mt-2 text-gray-700">
                We may engage third-party service providers to perform functions on our behalf, such as data analysis, marketing assistance, and customer service. These providers have access to your information only as necessary to perform their functions and are obligated to maintain its confidentiality.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">c. Legal Obligations</h3>
            <p class="mt-2 text-gray-700">
                We may disclose your information when required by law, regulation, or legal process, or to protect the rights, property, or safety of Brignac Mortgage, our clients, or others.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">4. Your Choices and Rights</h2>
            <ul class="list-disc list-inside mt-4 text-gray-700">
                <li>Access: Request a copy of the personal information we hold about you.</li>
                <li>Correction: Request correction of any inaccurate or incomplete information.</li>
                <li>Deletion: Request deletion of your personal information, subject to legal obligations.</li>
                <li>Opt-Out: Unsubscribe from marketing communications by following the instructions in the communication or contacting us directly.</li>
            </ul>
            <p class="mt-4 text-gray-700">
                To exercise these rights, please contact us at <a href="https://brignacmortgage.com/about-us" class="underline text-blue-500" target="_blank">brignacmortgage/about-us</a>.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">5. Security Measures</h2>
            <p class="mt-4 text-gray-700">
                We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">6. Cookies and Tracking Technologies</h2>
            <p class="mt-4 text-gray-700">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies. If you disable or refuse cookies, some parts of the Website may become inaccessible or not function properly.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">7. Third-Party Links</h2>
            <p class="mt-4 text-gray-700">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to read the privacy policies of any linked websites you visit.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">8. Children's Privacy</h2>
            <p class="mt-4 text-gray-700">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently received personal information from a user under the age of 18, we will delete such information from our records.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">9. Changes to This Privacy Policy</h2>
            <p class="mt-4 text-gray-700">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of the Website after such changes constitutes your acceptance of the new Privacy Policy.
            </p>

            <h2 class="text-xl font-bold text-gray-800 mt-8">10. Contact Us</h2>
            <p class="mt-4 text-gray-700">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p class="mt-2 text-gray-700">
                    Brignac Mortgage<br />
                    <a href="mailto:shaun@brignacmortgage.com" class="underline text-blue-500">shaun@brignacmortgage.com</a><br />
                    <a href="tel:2254359287" class="underline text-blue-500">225-435-9287</a>
                </p>
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

