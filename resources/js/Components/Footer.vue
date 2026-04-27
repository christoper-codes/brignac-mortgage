<script setup>
import { Link } from '@inertiajs/vue3';
import useCurrentYear from '@/composables/currentYear';

const { currentYear } = useCurrentYear();
</script>

<template>
    <footer class="bg-dark border-t border-light/6 text-light/50">
        <div class="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            <!-- Brand -->
            <div class="lg:col-span-1">
                <Link :href="route('welcome')">
                    <img src="/img/primary-logo-dark.png" alt="Brignac Mortgage" class="h-9 w-auto mb-5">
                </Link>
                <p class="text-sm text-light/35 leading-relaxed">
                    Louisiana's trusted wholesale mortgage broker. Expert guidance for purchases, refinancing, and home equity loans.
                </p>
                <div class="flex items-center gap-2 mt-5">
                    <a href="https://www.facebook.com/brignacmortgage" target="_blank"
                       class="h-9 w-9 rounded-lg border border-light/8 hover:border-primary/50 hover:bg-primary/8 flex items-center justify-center text-light/30 hover:text-primary transition-all duration-200">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://maps.app.goo.gl/6YyqmAGQ8nJtZ9Jk6" target="_blank"
                       class="h-9 w-9 rounded-lg border border-light/8 hover:border-primary/50 hover:bg-primary/8 flex items-center justify-center text-light/30 hover:text-primary transition-all duration-200">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-light/80 font-semibold text-xs uppercase tracking-widest mb-5">Quick Links</h3>
                <ul class="space-y-3 text-sm">
                    <li><Link :href="route('welcome')"          class="footer-link">Home</Link></li>
                    <li><Link :href="route('about-us.index')"   class="footer-link">About Us</Link></li>
                    <li><Link :href="route('our-team.index')"   class="footer-link">Our Team</Link></li>
                    <li><Link :href="route('programs.index')"   class="footer-link">Loan Programs</Link></li>
                    <li><Link :href="route('contact-us.index')" class="footer-link">Contact Us</Link></li>
                </ul>
            </div>

            <!-- Legal -->
            <div>
                <h3 class="text-light/80 font-semibold text-xs uppercase tracking-widest mb-5">Legal</h3>
                <ul class="space-y-3 text-sm">
                    <li><Link :href="route('privacy-policy-website')" class="footer-link">Privacy Policy</Link></li>
                    <li><Link :href="route('disclaimers-website')"    class="footer-link">Disclaimers</Link></li>
                    <li><Link :href="route('terms-of-use-website')"   class="footer-link">Terms of Use</Link></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h3 class="text-light/80 font-semibold text-xs uppercase tracking-widest mb-5">Contact</h3>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a href="mailto:Shaun@brignacmortgage.com" class="footer-link flex items-start gap-2">
                            <span class="material-symbols-outlined text-primary mt-0.5 shrink-0" style="font-size:16px">mail</span>
                            Shaun@brignacmortgage.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:+15045592821" class="footer-link flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary shrink-0" style="font-size:16px">phone</span>
                            +1 504-559-2821
                        </a>
                    </li>
                    <li>
                        <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank" class="footer-link flex items-start gap-2">
                            <span class="material-symbols-outlined text-primary mt-0.5 shrink-0" style="font-size:16px">location_on</span>
                            21121 Waterfront East Dr,<br>Maurepas, LA
                        </a>
                    </li>
                </ul>
                <Link :href="route('contact-us.index')">
                    <button class="mt-6 bg-primary hover:bg-primary/90 text-dark text-sm font-bold px-6 py-2.5 rounded-full transition-colors duration-200 cursor-pointer">
                        Get Pre-Qualified
                    </button>
                </Link>
            </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-light/6 px-6 py-5">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-light/25">
                <p>© {{ currentYear }} Brignac Mortgage. All rights reserved.</p>
                <p class="text-center">
                    Brignac Mortgage and Consulting Services, LLC — NMLS #1928157 ·
                    <a href="https://maps.app.goo.gl/R2Gu7ezyuNRhw3C6A" target="_blank" class="hover:text-primary transition-colors">Maurepas, LA</a>
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-link {
    color: rgba(240, 238, 232, 0.40);
    text-decoration: none;
    transition: color 0.2s;
}
.footer-link:hover { color: #E37A52; }
</style>
