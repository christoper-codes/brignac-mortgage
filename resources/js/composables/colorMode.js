import { ref } from 'vue';

const mode = ref('dark');

const apply = (m) => {
    const html = document.documentElement;
    html.classList.remove('dark', 'light', 'system');
    html.classList.add(m);
    mode.value = m;
};

export function useColorMode() {
    const init = () => {
        const saved = localStorage.getItem('colorMode') ?? 'dark';
        apply(saved);
    };

    const setMode = (m) => {
        localStorage.setItem('colorMode', m);
        apply(m);
    };

    const cycle = () => {
        const order = ['dark', 'light'];
        const next = order[(order.indexOf(mode.value) + 1) % order.length];
        setMode(next);
    };

    return { mode, init, setMode, cycle };
}
