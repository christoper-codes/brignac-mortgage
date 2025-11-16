import '../css/app.css';
import './bootstrap';
import '@mdi/font/css/materialdesignicons.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Aos from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const vuetify = createVuetify({
    components: {
        VDateInput,
        ...components,
    },
    directives,
    icons: {
        iconfont: 'mdi',
    },
});

const toastOptions = {
    position: 'top-right',
    autoClose: 5000,
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(vuetify)
            .use(Toast, toastOptions)
            .mount(el);
    },
    progress: {
        color: '#22c55e',
    },
});

document.addEventListener('DOMContentLoaded', () => {
    Aos.init();
    FB.init({ xfbml: true, version: 'v21.0' });
});
