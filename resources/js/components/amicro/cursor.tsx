import { useEffect, useRef, useState } from 'react';

// An arrow cursor painted pure white with mix-blend-mode "difference": it inverts against whatever
// sits underneath it — black over light sections, white over dark ones, automatically (works over
// photos, gradients, brand-color buttons, anything). It tracks the pointer 1:1 with no animation
// or easing. Desktop only: gated behind a fine-pointer check, so touch devices are untouched.
export function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const query = window.matchMedia('(pointer: fine)');
        const syncEnabled = () => setEnabled(query.matches);

        syncEnabled();
        query.addEventListener('change', syncEnabled);

        return () => query.removeEventListener('change', syncEnabled);
    }, []);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        document.documentElement.classList.add('has-custom-cursor');

        const handleMove = (event: MouseEvent) => {
            const cursor = cursorRef.current;

            if (cursor) {
                cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) rotate(-30deg)`;
                cursor.style.opacity = '1';
            }
        };

        const handleLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0';
            }
        };

        document.addEventListener('mousemove', handleMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleLeave);

        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
            document.removeEventListener('mousemove', handleMove);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-9999 mix-blend-difference"
            // Margins pull the arrow's tip (12.5px, 2.5px into the 25x27 box) onto the pointer.
            style={{ opacity: 0, marginLeft: -12.5, marginTop: -2.5, transformOrigin: '12.5px 2.5px' }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={27} viewBox="0 0 50 54" fill="white" className="block">
                <path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" />
            </svg>
        </div>
    );
}
