import type { ReactNode } from 'react';

// Hand-drawn 24px icons for the dashboard navigation (rounded strokes, same weight as the header
// menu), so the sidebar has its own visual identity instead of the stock icon set.
function Icon({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            {children}
        </svg>
    );
}

type IconProps = { className?: string };

export function OverviewIcon({ className }: IconProps) {
    return (
        <Icon className={className}>
            <rect x="3.5" y="3.5" width="7" height="8.5" rx="2.2" />
            <rect x="13.5" y="3.5" width="7" height="5" rx="2.2" />
            <rect x="13.5" y="11.5" width="7" height="9" rx="2.2" />
            <rect x="3.5" y="15" width="7" height="5.5" rx="2.2" />
        </Icon>
    );
}

export function CampaignsIcon({ className }: IconProps) {
    return (
        <Icon className={className}>
            <path d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l6.2 3.6a.8.8 0 0 0 1.2-.7V6.6a.8.8 0 0 0-1.2-.7L7 9H5.5A1.5 1.5 0 0 0 4 10.5Z" />
            <path d="M17.5 9.2a4 4 0 0 1 0 5.6" />
            <path d="M7.5 15.2 8.6 19a1 1 0 0 0 1 .7h.6a1 1 0 0 0 1-1.2L10.4 17" />
        </Icon>
    );
}

export function LeadsIcon({ className }: IconProps) {
    return (
        <Icon className={className}>
            <path d="M4 13.5 6 6.4A2 2 0 0 1 7.9 5h8.2a2 2 0 0 1 1.9 1.4l2 7.1" />
            <path d="M4 13.5v3.8A2.2 2.2 0 0 0 6.2 19.5h11.6a2.2 2.2 0 0 0 2.2-2.2v-3.8h-4.3a1.2 1.2 0 0 0-1.1.8 3 3 0 0 1-5.2 0 1.2 1.2 0 0 0-1.1-.8Z" />
        </Icon>
    );
}

export function AnalyticsIcon({ className }: IconProps) {
    return (
        <Icon className={className}>
            <path d="M4 19.5h16" />
            <rect x="5.5" y="12" width="3" height="5.5" rx="1.2" />
            <rect x="10.5" y="7.5" width="3" height="10" rx="1.2" />
            <rect x="15.5" y="4" width="3" height="13.5" rx="1.2" />
        </Icon>
    );
}

export function SettingsIcon({ className }: IconProps) {
    return (
        <Icon className={className}>
            <circle cx="12" cy="12" r="3.2" />
            <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
        </Icon>
    );
}

export function LogoutIcon({ className }: IconProps) {
    return (
        <Icon className={className}>
            <path d="M14 4.5h3.3A2.2 2.2 0 0 1 19.5 6.7v10.6a2.2 2.2 0 0 1-2.2 2.2H14" />
            <path d="M10.5 8.5 6.5 12l4 3.5M6.5 12h9" />
        </Icon>
    );
}
