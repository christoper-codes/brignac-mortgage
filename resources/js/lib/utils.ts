import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

const PAGE_LABELS: Record<string, string> = {
    '/': 'Home (welcome)',
    '/programs': 'Loan Programs',
    '/apply': 'Apply',
    '/testimonials': 'Testimonials',
    '/disclaimers': 'Disclaimers',
    '/privacy-policy': 'Privacy Policy',
    '/terms-and-conditions': 'Terms & Conditions',
};

/** A human-readable label for a tracked page path, falling back to the raw path when unknown. */
export function pageLabel(path: string): string {
    return PAGE_LABELS[path] ?? path;
}
