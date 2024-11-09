import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                /*
                * | ------------------------------------------------------
                * | Custom Colors
                * | ------------------------------------------------------
                * | Primary colors | brignac mortgage
                */
                'primary-950': '#0A0A0A',
                'primary-900': '#0D0D0D',
                'primary-800': '#141414',
                'primary-700': '#1B1B1B',
                'primary-600': '#222222',
                'primary-500': '#292929',
                'primary-400': '#4D4D4D',
                'primary-300': '#717171',
                'primary-200': '#959595',
                'primary-100': '#B9B9B9',
                'primary-50': '#DCDCDC',
            }
        },
    },

    plugins: [forms],
};
