<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue';
import Footer from '@/Components/Footer.vue';
import NavigationDrawerGuest from '@/Components/NavigationDrawerGuest.vue';
import GuestNav from '@/Components/Navs/GuestNav.vue';
import { Head } from '@inertiajs/vue3';
import { onMounted, onUnmounted, ref } from 'vue';

const form = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const loading = ref(false);

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

const contactUs = ref(null);
const scrollContactUsSection = () => {
    const offset = 100;
    const elementPosition = contactUs.value.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
};
onMounted(() => {
    window.addEventListener('scroll-contact-us-section', scrollContactUsSection);
});
onUnmounted(() => {
    window.removeEventListener('scroll-contact-us-section', scrollContactUsSection);
});

</script>

<template>
    <Head title="About us" />
    <NavigationDrawerGuest @scroll-contact-us-section="scrollContactUsSection" />
    <GuestNav @scroll-contact-us-section="scrollContactUsSection"/>
    <Breadcrumb>
        <template #title>
            <span>About us</span>
        </template>
        <template #description>
            <span>We believe that life is for living and you should be passionate about what you do.</span>
        </template>
    </Breadcrumb>

    <section class="lg:mt-14">
        <div class="w-full flex flex-col-reverse lg:flex-col lg:mt-10">
            <div class="w-full pt-14 pb-14 lg:mb-10">
                <div class="max-w-6xl mx-auto gap-16 flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-0 overflow-hidden">
                    <div class="w-full lg:w-[40%] px-2"  data-aos="fade-right" data-aos-duration="2000" data-aos-once="true">
                        <div class="relative h-[400px] lg:h-[600px] border-[10px] shadow-xl border-white w-full after:w-[20px] lg:after:w-[30px] after:h-[250px] lg:after:h-[500px] after:absolute after:top-1/2 after:-left-[20px] lg:after:-left-[30px] after:-translate-y-1/2 after:bg-orange-500">
                            <img class="w-full h-full object-cover" src="https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/14.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-full lg:w-[60%]" data-aos="fade-left" data-aos-duration="3000" data-aos-once="true">
                        <div class="flex flex-col gap-5">
                            <div>
                                <div class="bg-orange-100 rounded-full py-2 px-5 inline-flex text-orange-600">
                                    <span class="inline-flex">About us</span>
                                </div>
                            </div>
                            <h2 class="text-3xl lg:text-4xl font-bold">Brignac Mortgage Company</h2>
                            <p class="text-sm lg:text-base">Shaun Brignac, President and CEO welcomes you to our site.  We believe that life is for living and you should be passionate about what you do. We hold our team to a high standard, and we only hire the best!  We look forward to working with you and your family.</p>
                            <p></p>
                        </div>
                        <div class="bg-orange-100 border-l-8 border-l-orange-500 p-3">
                            <p class="text-sm lg:text-sm">Explore our diverse range of loan products and programs <span class="font-bold">designed to meet your unique financial needs.</span></p>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 mt-6">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">real_estate_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Conventional and Construction Loans</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">support_agent</span>
                                </div>
                                <h3 class="text-sm flex-grow">Mobile Home Loans - Single and Double Wide</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">location_away</span>
                                </div>
                                <h3 class="text-sm flex-grow">Fixed, ARMs, 3-2-1, 2-1, 1-1 and 1-0 Buydowns</h3>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex-shrink-0 h-14 w-14 overflow-hidden rounded-full items-center justify-center flex bg-orange-200">
                                    <span class="material-symbols-outlined text-2xl text-orange-500">badge</span>
                                </div>
                                <h3 class="text-sm flex-grow">Mobile Home Loans - Single and Double Wide</h3>
                            </div>
                        </div>
                    <ServiceDialog />
                </div>
            </div>
        </div>
         </div>
    </section>

    <section class="">
        <div class="w-full h-[500px] bg-[url('https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/slider/11.jpg')] bg-center bg-cover">
            <div class="h-full w-full bg-black/60 pt-14 px-4 lg:px-0">
                <div class="flex flex-col gap-3 items-center justify-center">
                    <div class="bg-black/20 rounded-full py-2 px-5 inline-flex text-white">
                        <span>Testimonials</span>
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-white text-center">
                        Our
                        <span style="color: #4285F4;">G</span>
                        <span style="color: #EA4335;">o</span>
                        <span style="color: #FBBC05;">o</span>
                        <span style="color: #4285F4;">g</span>
                        <span style="color: #34A853;">l</span>
                        <span style="color: #EA4335;">e</span>
                        Testimonials
                    </h2>
                </div>
            </div>
        </div>

        <main class="bg-white relative z-10" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
            <div class="w-[90%] lg:w-[80%] mx-auto shadow-xl rounded-sm p-4 lg:p-10 absolute top-[-300px] left-1/2 transform -translate-x-1/2 bg-white">
                <div class="relative">
                    <iframe class="h-[450px] z-50 w-full" src="https://widget.tagembed.com/2135662" style="border:none;"></iframe>
                </div>
            </div>
        </main>

    </section>


    <section class="mt-80" ref="contactUs">
        <div class="flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
            <div class="bg-green-100 rounded-full py-2 px-5 inline-flex text-green-600">
                <span>Contact</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-bold">Contact us</h2>
         </div>
         <div class="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 mt-10 mb-0">
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card_green_persistent lg:hover:scale-105 lg:transition-all lg:duration-700">
                <div><span class="material-symbols-outlined text-5xl text-green-500">location_on</span></div>
                <h3 class="text-2xl font-bold">Office Address</h3>
                <p class="text-sm">12481 Home Port Dr Suite 101, Maurepas, LA 70449, Estados Unidos</p>
                <p class="text-sm">66XH+RC Maurepas, Luisiana, EE. UU.</p>
            </div>
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card_green lg:hover:scale-105 lg:transition-all lg:duration-700">
                <div><span class="material-symbols-outlined text-5xl text-green-500">perm_phone_msg</span></div>
                <h3 class="text-2xl font-bold">Phone Number</h3>
                <p class="text-sm">+1 225-435-9287</p>
                <p class="text-sm">NMLS ID: 2401214</p>
            </div>
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-once="true" class="w-full px-10 py-12 shadow-xl mx-auto flex flex-col gap-3 items-center justify-center text-center card_green lg:hover:scale-105 lg:transition-all lg:duration-700">
                <div><span class="material-symbols-outlined text-5xl text-green-500">mail</span></div>
                <h3 class="text-2xl font-bold">Email Address</h3>
                <p class="text-sm">Shaun@brignacmortgage.com</p>
                <p class="text-sm">Allie@brignacmortgage.com</p>
            </div>
         </div>

        <div class="mt-20">
           <div class="max-w-7xl mx-auto flex items-center flex-col justify-center gap-7 mb-3">
                <div class="border-l-4 border-l-green-500 text-2xl px-2 font-bold">
                    Apply now for a mortgage
                </div>
                <div class="flex flex-col lg:flex-row items-center gap-3 lg:gap-7">
                    <p class="text-base"> <span class="font-bold">Monday - Friday:</span> 9am - 5pm</p>
                    <p class="text-base"> <span class="font-bold">Saturday:</span> By appointment</p>
                    <p class="text-base"> <span class="font-bold">Sunday:</span> By appointment</p>
                </div>
           </div>

           <main class="bg-white relative z-10" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                <div class="w-[90%] lg:w-[70%] mx-auto rounded-sm py-10 px-6 absolute top-[0px] left-1/2 transform -translate-x-1/2 bg-white">
                    <div class="relative">
                        <div class="lg:px-10">
                            <v-form v-model="form" @submit.prevent="onSubmit" lazy-validation>
                            <div class="flex flex-col lg:flex-row items-center justify-between gap-7 mt-3">
                                <v-text-field
                                    label="Name"
                                    color="green"
                                    append-inner-icon="mdi-account"
                                    variant="solo"
                                    clearable
                                    class="w-full lg:w-[50%]"
                                    hint="Its recommended to use your full name"
                                    persistent-hint=""
                                    v-model="name"
                                    :rules="[rules.required, rules.description]"
                                ></v-text-field>

                                <v-text-field
                                    append-inner-icon="mdi-email"
                                    variant="solo"
                                    label="Email"
                                    autocomplete="email"
                                    color="green"
                                    clearable
                                    class="w-full lg:w-[50%]"
                                    hint="Your email to subscribe"
                                    persistent-hint=""
                                    v-model="email"
                                    :rules="[rules.required, rules.email]"
                                ></v-text-field>

                            </div>
                                <v-textarea
                                    append-inner-icon="mdi-message"
                                    variant="solo"
                                    label="Message"
                                    v-model="message"
                                    auto-grow
                                    hint="What do you want to know"
                                    persistent-hint=""
                                    class="mt-3"
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
            </main>

            <iframe class="w-full h-[600px] mt-60" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6893.12326712053!2d-90.771464!3d30.249575!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8626cf3dc655337f%3A0x3b15aacf38947f0c!2sBrignac%20Mortgage%20and%20Consulting%20Services%20LLC!5e0!3m2!1ses-419!2smx!4v1730790533348!5m2!1ses-419!2smx" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
    </section>

    <section class="mt-60">
        <Footer />
    </section>

</template>

<style scoped>
.card_green_persistent {
position: relative;
}
.card_green_persistent::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: #22c55e;
width: 100%;
}

.card_green {
position: relative;
}
.card_green::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 0;
height: 0.25rem;
background-color: #22c55e;
transition: width 0.5s ease-in-out;
}
.card_green:hover::after {
width: 100%;
}
</style>
