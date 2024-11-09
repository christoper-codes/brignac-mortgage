<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const form = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const loading = ref(false);
const files = ref([]);

const onSubmit = () => {
    if(!form.value) return;

    loading.value = true;
    console.log(form.value);
}

const rules = {
    required: value => !!value || 'Field is required' ,
    email: value => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || 'Invalid email address';
    },
    description: value => value.length <= 255 || 'The description must be less than 255 characters.'
}


</script>

<template>
    <Head title="Our team" />
    <NavigationDrawerGuest />
    <GuestNav />
    <Breadcrumb>
        <template #title>
            <span>Our team</span>
        </template>
        <template #description>
            <span>We are a team of professionals who are dedicated to providing you with the best service and rates in the industry.</span>
        </template>
    </Breadcrumb>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10 max-w-7xl mx-auto mt-20 px-4 lg:px-0">
        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full" src="../../../../public/img/company-seo-img.jpg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Shaun Brignac, MBA</h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">President and CEO</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:Shaun@brignacmortgage.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">Shaun@brignacmortgage.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li>NMLS# 1928157</li>
                            <li><span class="font-bold">C:</span> 504-559-2821</li>
                            <li><span class="font-bold">O:</span> 225-435-9287</li>
                        </ul>
                    </div>
                </div>
                <v-btn href="https://auth.lendwize.io/login?state=hKFo2SBMQUI3Y1BzOEVxR3hBQm9XNVRLZUxNUWE0RlNuTEZnNqFupWxvZ2luo3RpZNkgZUY1VE5YVTBoZUc1TGJGc1MxYllpSTZGQWdxanA4TG6jY2lk2SA5RWlhalM5OUYzRUJVTkU0ZjkxbHRiNHQ3THNiTnc1ZA&client=9EiajS99F3EBUNE4f91ltb4t7LsbNw5d&protocol=oauth2&redirect_uri=https%3A%2F%2F2401214.my1003app.com%2Fcallback&connection=borrowerposprod&responseType=token&scope=openid%20profile%20email%20name%20companyName%20user_metadata%20app_metadata&returnTo=https%3A%2F%2F2401214.my1003app.com%2Fsession-ended&redirectPath=%2Fpos%2Fapp%2Fselect-loan&enable_freshchat=&portal_config=%7B%22portal%22%3A%22custom-new%22%2C%22path%22%3A%22assets%2Funiversal-login%2Fpos%2F%22%2C%22origin%22%3A%22https%3A%2F%2F2401214.my1003app.com%2F%22%2C%22theme%22%3A%7B%22loginTitle%22%3A%22LendWize%22%2C%22logo%22%3A%22logo.svg%22%2C%22remoteAssetPath%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2Fthemes%2Fpos%2Flight%2F%22%7D%2C%22metadata%22%3A%7B%22WizeOrgUnit%22%3A%7B%22logoUrl%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2F7242%2Flogo%2Flogo_1704484388829.png%22%2C%22complianceLogo%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2Fcompliance-logos%2Fequal-housing-opportunity.svg%22%2C%22displayName%22%3A%22Brignac%20Mortgage%20and%20Consulting%20LLC%22%2C%22email%22%3A%22shaun%40brignacmortgage.com%22%2C%22phone%22%3A%225045992821%22%2C%22companyName%22%3A%22Brignac%20Mortgage%20and%20Consulting%20LLC%22%2C%22streetAddress%22%3A%2221121%20WATERFRONT%20EAST%20DR%22%2C%22apt%22%3Anull%2C%22city%22%3A%22Maurepas%22%2C%22state%22%3A%22LA%22%2C%22zipcode%22%3A%2270449%22%2C%22id%22%3A7242%2C%22pricingEnabled%22%3Anull%2C%22proPlan%22%3Atrue%7D%2C%22WizeUser%22%3Anull%2C%22BranchWizeOrgUnit%22%3Anull%2C%22RealtorUser%22%3Anull%2C%22enableEs%22%3Afalse%7D%2C%22nmls%22%3A%7B%22broker%22%3Anull%2C%22company%22%3A%222401214%22%7D%2C%22url%22%3A%7B%22signUp%22%3A%22register%22%2C%22forgotPassword%22%3A%22forgotPassword%22%2C%22pricing%22%3A%22inquiry%22%2C%22privacyPolicy%22%3A%22https%3A%2F%2Fwww.arive.com%2Flegal%2Fprivacy-policy%22%2C%22termsOfUse%22%3A%22https%3A%2F%2Fwww.arive.com%2Flegal%2Fterms-of-use%22%2C%22nmlsConsumerAccess%22%3A%22https%3A%2F%2Fnmlsconsumeraccess.org%2FEntityDetails.aspx%2FCOMPANY%2F%22%7D%2C%22font%22%3A%7B%22file%22%3A%5B%5D%7D%2C%22poweredBy%22%3A%22powered-by-logo.svg%22%2C%22supportEmail%22%3A%22support%40arive.com%22%2C%22serverUri%22%3A%22https%3A%2F%2Fposapi.my1003app.com%22%2C%22skipVariables%22%3Atrue%2C%22translateLang%22%3A%22en%22%7D&response_type=code&response_mode=query&nonce=OEM3UFVWaU9MVC5FVlFna1VwM0REa1NuS0VOYmM1cVpqbjYtSXJXRUpUNw%3D%3D&code_challenge=FvIoEC1uObUYfOlUJBkAx03sq2rqSwHQeaF7_YUg5hQ&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMjIuNiJ9" target="_blank" rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-5">Apply with Shaun</v-btn>
            </div>
        </div>

        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full" src="../../../../public/img/team-allie.jpg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Allison Ratcliff</h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">Chief of Operations</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:Allie@brignacmortgage.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">Allie@brignacmortgage.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li>NMLS #2405703 </li>
                            <li><span class="font-bold">C:</span> 225-718-3978</li>
                        </ul>
                    </div>
                </div>
                <v-btn href="https://auth.lendwize.io/login?state=hKFo2SBVcXRmU3hmTEJTdktISzZLQXRZRTdKUlp5S0l2bE1DdqFupWxvZ2luo3RpZNkgcWVzSko0Zk5ETXhpODFueGVnTFZYRENncVJjdjVYS0ajY2lk2SA5RWlhalM5OUYzRUJVTkU0ZjkxbHRiNHQ3THNiTnc1ZA&client=9EiajS99F3EBUNE4f91ltb4t7LsbNw5d&protocol=oauth2&redirect_uri=https%3A%2F%2Fallieratcliff.my1003app.com%2Fcallback&connection=borrowerposprod&responseType=token&scope=openid%20profile%20email%20name%20companyName%20user_metadata%20app_metadata&returnTo=https%3A%2F%2Fallieratcliff.my1003app.com%2Fsession-ended&redirectPath=%2Fpos%2Fapp%2Fselect-loan&enable_freshchat=&portal_config=%7B%22portal%22%3A%22custom-new%22%2C%22path%22%3A%22assets%2Funiversal-login%2Fpos%2F%22%2C%22origin%22%3A%22https%3A%2F%2Fallieratcliff.my1003app.com%2F%22%2C%22theme%22%3A%7B%22loginTitle%22%3A%22LendWize%22%2C%22logo%22%3A%22logo.svg%22%2C%22remoteAssetPath%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2Fthemes%2Fpos%2Flight%2F%22%7D%2C%22metadata%22%3A%7B%22WizeOrgUnit%22%3A%7B%22logoUrl%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2F7242%2Flogo%2Flogo_1704484388829.png%22%2C%22complianceLogo%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2Fcompliance-logos%2Fequal-housing-opportunity.svg%22%2C%22displayName%22%3A%22Brignac%20Mortgage%20and%20Consulting%20LLC%22%2C%22email%22%3A%22shaun%40brignacmortgage.com%22%2C%22phone%22%3A%225045992821%22%2C%22companyName%22%3A%22Brignac%20Mortgage%20and%20Consulting%20LLC%22%2C%22streetAddress%22%3A%2221121%20WATERFRONT%20EAST%20DR%22%2C%22apt%22%3Anull%2C%22city%22%3A%22Maurepas%22%2C%22state%22%3A%22LA%22%2C%22zipcode%22%3A%2270449%22%2C%22id%22%3A7242%2C%22pricingEnabled%22%3Anull%2C%22proPlan%22%3Atrue%7D%2C%22WizeUser%22%3A%7B%22name%22%3A%22Allison%20Ratcliff%22%2C%22email%22%3A%22allie%40brignacmortgage.com%22%2C%22phone%22%3A%222257183978%22%2C%22workPhoneExt%22%3A%22%22%2C%22nmlsId%22%3A%222405703%22%2C%22jobTitle%22%3A%22COO%22%2C%22profileImage%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2FWizeUsers%2F80275.jpg%3Ft%3D1704731172554%22%2C%22proPlan%22%3Atrue%7D%2C%22BranchWizeOrgUnit%22%3Anull%2C%22RealtorUser%22%3Anull%2C%22enableEs%22%3Afalse%7D%2C%22nmls%22%3A%7B%22broker%22%3Anull%2C%22company%22%3A%222401214%22%7D%2C%22url%22%3A%7B%22signUp%22%3A%22register%22%2C%22forgotPassword%22%3A%22forgotPassword%22%2C%22pricing%22%3A%22inquiry%22%2C%22privacyPolicy%22%3A%22https%3A%2F%2Fwww.arive.com%2Flegal%2Fprivacy-policy%22%2C%22termsOfUse%22%3A%22https%3A%2F%2Fwww.arive.com%2Flegal%2Fterms-of-use%22%2C%22nmlsConsumerAccess%22%3A%22https%3A%2F%2Fnmlsconsumeraccess.org%2FEntityDetails.aspx%2FCOMPANY%2F%22%7D%2C%22font%22%3A%7B%22file%22%3A%5B%5D%7D%2C%22poweredBy%22%3A%22powered-by-logo.svg%22%2C%22supportEmail%22%3A%22support%40arive.com%22%2C%22serverUri%22%3A%22https%3A%2F%2Fposapi.my1003app.com%22%2C%22skipVariables%22%3Atrue%2C%22translateLang%22%3A%22en%22%7D&response_type=code&response_mode=query&nonce=NnlvSDl0dlRDRGZkaEEydEpVcFBPWEZmaUZEaUNleXhtajB4SV8wYUJXVg%3D%3D&code_challenge=ax9XQVxO69SLhuJc55LSwnlFv89mBKrrX03ja3-fVQQ&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMjIuNiJ9" target="_blank" rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-5">Apply with Allie</v-btn>
            </div>
        </div>

        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full" src="../../../../public/img/team-ashley.jpg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Ashley Legier</h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">Loan Officer</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:Ashley@brignacmortage.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">Ashley@brignacmortage.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li>NMLS #2621485</li>
                            <li><span class="font-bold">C:</span> 661-886-5619</li>
                        </ul>
                    </div>
                </div>
                <v-btn href="https://auth.lendwize.io/login?state=hKFo2SBFdEtYN1JBMkgxUnBxWDQxRmVyTnNUQWtoZTV4MXJUaaFupWxvZ2luo3RpZNkgUjR2c29keHFwUkNMcGJadHNDMm93UzJ3cUJpT1lMZkqjY2lk2SA5RWlhalM5OUYzRUJVTkU0ZjkxbHRiNHQ3THNiTnc1ZA&client=9EiajS99F3EBUNE4f91ltb4t7LsbNw5d&protocol=oauth2&redirect_uri=https%3A%2F%2Fashleylegier.my1003app.com%2Fcallback&connection=borrowerposprod&responseType=token&scope=openid%20profile%20email%20name%20companyName%20user_metadata%20app_metadata&returnTo=https%3A%2F%2Fashleylegier.my1003app.com%2Fsession-ended&redirectPath=%2Fpos%2Fapp%2Fselect-loan%3Ftime%3D1729012953125&enable_freshchat=&portal_config=%7B%22portal%22%3A%22custom-new%22%2C%22path%22%3A%22assets%2Funiversal-login%2Fpos%2F%22%2C%22origin%22%3A%22https%3A%2F%2Fashleylegier.my1003app.com%2F%22%2C%22theme%22%3A%7B%22loginTitle%22%3A%22LendWize%22%2C%22logo%22%3A%22logo.svg%22%2C%22remoteAssetPath%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2Fthemes%2Fpos%2Flight%2F%22%7D%2C%22metadata%22%3A%7B%22WizeOrgUnit%22%3A%7B%22logoUrl%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2F7242%2Flogo%2Flogo_1704484388829.png%22%2C%22complianceLogo%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2Fcompliance-logos%2Fequal-housing-opportunity.svg%22%2C%22displayName%22%3A%22Brignac%20Mortgage%20and%20Consulting%20LLC%22%2C%22email%22%3A%22shaun%40brignacmortgage.com%22%2C%22phone%22%3A%225045992821%22%2C%22companyName%22%3A%22Brignac%20Mortgage%20and%20Consulting%20LLC%22%2C%22streetAddress%22%3A%2221121%20WATERFRONT%20EAST%20DR%22%2C%22apt%22%3Anull%2C%22city%22%3A%22Maurepas%22%2C%22state%22%3A%22LA%22%2C%22zipcode%22%3A%2270449%22%2C%22id%22%3A7242%2C%22pricingEnabled%22%3Anull%2C%22proPlan%22%3Atrue%7D%2C%22WizeUser%22%3A%7B%22name%22%3A%22Ashley%20Legier%22%2C%22email%22%3A%22ashley%40brignacmortgage.com%22%2C%22phone%22%3A%226618865619%22%2C%22workPhoneExt%22%3Anull%2C%22nmlsId%22%3A%222621485%22%2C%22jobTitle%22%3Anull%2C%22profileImage%22%3A%22https%3A%2F%2Flwapiprod.s3.amazonaws.com%2FWizeUsers%2F94675.jpg%22%2C%22proPlan%22%3Atrue%7D%2C%22BranchWizeOrgUnit%22%3Anull%2C%22RealtorUser%22%3Anull%2C%22enableEs%22%3Afalse%7D%2C%22nmls%22%3A%7B%22broker%22%3Anull%2C%22company%22%3A%222401214%22%7D%2C%22url%22%3A%7B%22signUp%22%3A%22register%22%2C%22forgotPassword%22%3A%22forgotPassword%22%2C%22pricing%22%3A%22inquiry%22%2C%22privacyPolicy%22%3A%22https%3A%2F%2Fwww.arive.com%2Flegal%2Fprivacy-policy%22%2C%22termsOfUse%22%3A%22https%3A%2F%2Fwww.arive.com%2Flegal%2Fterms-of-use%22%2C%22nmlsConsumerAccess%22%3A%22https%3A%2F%2Fnmlsconsumeraccess.org%2FEntityDetails.aspx%2FCOMPANY%2F%22%7D%2C%22font%22%3A%7B%22file%22%3A%5B%5D%7D%2C%22poweredBy%22%3A%22powered-by-logo.svg%22%2C%22supportEmail%22%3A%22support%40arive.com%22%2C%22serverUri%22%3A%22https%3A%2F%2Fposapi.my1003app.com%22%2C%22skipVariables%22%3Atrue%2C%22translateLang%22%3A%22en%22%7D&response_type=code&response_mode=query&nonce=aWhaWGZCN014T3Z2cGo4ZW1HclFXWXBPQmMwSmdJNEFwUEhKUHR1M0xtQw%3D%3D&code_challenge=BPkoLDm27icSXU3pBydCM8wAfPCUaPq3E2kMyVdJp3Q&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMjIuNiJ9" target="_blank" rounded="xs" color="orange" size="large" variant="tonal" block class="text-none !mt-5">Apply with Ashley</v-btn>
            </div>
        </div>

        <div class="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center justify-between lg:hover:scale-105 transition-all duration-500" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="size-48 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img class="w-full h-full" src="../../../../public/img/user-img.svg" alt="team img">
            </div>
            <div class="flex flex-col gap-1 text-center items-center justify-center mt-5 w-full">
                <h2 class="text-xl font-bold">Jennifer McMinn-Griffin </h2>
                <h2 class="text-xs font-bold text-orange-500 py-2 px-7 bg-orange-100 rounded-full">Loan Processor</h2>
            </div>
            <div class="mt-3 w-full">
                <a href="mailto:jen@tigerprocessingllc.com" class="flex items-center lg:gap-2">
                    <div class="size-9 shadow-xl lg:flex items-center justify-center hidden">
                        <span class="material-symbols-outlined block text-orange-500 text-xl">email</span>
                    </div>
                    <h3 class="text-sm">jen@tigerprocessingllc.com</h3>
                </a>
                <div class="flex flex-col lg:flex-row items-start gap-3 justify-between w-full">
                    <!-- Opciones de préstamos -->
                    <div class="mt-4 text-sm">
                        <ul class="list-disc pl-5">
                            <li><span class="font-bold">Owner of Tiger Processing Services LLC</span></li>
                            <li><span class="font-bold">Third Party Processor</span></li>
                            <li><span class="font-bold">Office</span> 225-469-6858</li>
                            <li><span class="font-bold">Individual NMLS # 1409144</span></li>
                            <li><span class="font-bold">Company NMLS # 2407930 </span></li>
                            <li><span class="font-bold">Licensed in LA</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white">
        <div class="w-full h-auto bg-[url('https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg')] bg-center bg-cover mt-[73px] lg:mt-[90px]">
        <div class="d-flex flex-column fill-height justify-center align-center text-white bg-black/80 lg:w-[65%] py-28 px-4 lg:px-0">
            <div class="w-full flex flex-col justify-between max-w-3xl mx-auto" data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                <div class="flex flex-col gap-2 justify-center mb-5">
                    <h2 class="text-3xl lg:text-4xl font-bold">
                        Contact us!
                    </h2>
                    <div class="h-1 w-14 bg-orange-500 rounded-full"></div>
                    <p class="max-w-[600px] text-xs lg:text-base">
                        We believe that life is for living and you should be passionate about what you do.
                    </p>
                </div>

                <div class="relative">
                        <div class="">
                            <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                            <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-3">
                                <v-text-field
                                    label="Name"
                                    color="green"
                                    append-inner-icon="mdi-account"
                                    clearable
                                    class="w-full lg:w-[50%] backdrop-blur-sm"
                                    hint="Its recommended to use your full name"
                                    persistent-hint=""
                                    v-model="name"
                                    :rules="[rules.required, rules.description]"
                                ></v-text-field>

                                <v-text-field
                                    append-inner-icon="mdi-email"
                                    label="Email"
                                    autocomplete="email"
                                    color="green"
                                    clearable
                                    class="w-full lg:w-[50%] backdrop-blur-sm"
                                    hint="Your email to subscribe"
                                    persistent-hint=""
                                    v-model="email"
                                    :rules="[rules.required, rules.email]"
                                ></v-text-field>

                            </div>
                                <v-textarea
                                    append-inner-icon="mdi-message"
                                    label="Message"
                                    v-model="message"
                                    auto-grow
                                    hint="What do you want to know"
                                    persistent-hint=""
                                    class="mt-3 backdrop-blur-sm"
                                    clearable
                                    :rules="[rules.required, rules.description]"
                                    color="green"
                                ></v-textarea>

                                <div class="w-full flex items-center justify-end mt-12">
                                    <div class='flex items-center justify-center relative'>
                                        <div class="animate-ping absolute inline-flex h-12 w-24 lg:h-14 lg:w-32 rounded-lg bg-green-500 opacity-75"></div>
                                        <div class="h-10 flex items-center justify-center w-full relative z-5">
                                            <v-btn type="submit" :loading="loading" rounded="xs" size="x-large" class="!hidden lg:!block text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Send now</v-btn>
                                            <v-btn type="submit" :loading="loading" rounded="xs" size="large" class="lg:!hidden text-none !bg-green-500 !text-white hover:!bg-white hover:!text-green-600 !transition-all !duration-700">Send now</v-btn>
                                        </div>
                                    </div>
                                </div>

                            </v-form>
                        </div>
                    </div>
            </div>
        </div>
     </div>
    </div>

    <section class="mt-40 lg:mt-[250px]">
        <Footer />
    </section>

</template>

<style scoped>

</style>
