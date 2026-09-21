import { Head, useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import type { FormEvent } from 'react';
import { Card, PageHeader, PlatformMark } from '@/components/dashboard/ui';
import InputError from '@/components/input-error';
import { GoogleMark } from '@/components/platform-marks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/dashboard/tracking';

type Props = {
    settings: { metaPixelId: string | null; tiktokPixelId: string | null; googleAnalyticsId: string | null };
};

const fieldClass = 'h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary';

export default function Tracking({ settings }: Props) {
    const form = useForm({
        meta_pixel_id: settings.metaPixelId ?? '',
        tiktok_pixel_id: settings.tiktokPixelId ?? '',
        google_analytics_id: settings.googleAnalyticsId ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.put(update().url, { preserveScroll: true });
    };

    const fields = [
        {
            key: 'meta_pixel_id' as const,
            title: 'Meta Pixel',
            hint: 'Facebook and Instagram ads. Find it in Events Manager → Data sources.',
            placeholder: '123456789012345',
            icon: <PlatformMark platform="facebook" className="size-5" />,
        },
        {
            key: 'tiktok_pixel_id' as const,
            title: 'TikTok Pixel',
            hint: 'TikTok Ads Manager → Assets → Events.',
            placeholder: 'C1A2B3C4D5E6F7G8H9',
            icon: <PlatformMark platform="tiktok" className="size-5" />,
        },
        {
            key: 'google_analytics_id' as const,
            title: 'Google Analytics 4',
            hint: 'Measurement ID from Admin → Data streams.',
            placeholder: 'G-XXXXXXXXXX',
            icon: <GoogleMark className="size-5" />,
        },
    ];

    return (
        <>
            <Head title="Pixels" />

            <div className="mx-auto flex max-w-3xl flex-col gap-6">
                <PageHeader title="Pixels" description="Connect your ad accounts once. The scripts load on every public page and report views, CTA clicks and leads." />

                <form onSubmit={submit}>
                    <Card className="space-y-6">
                        {fields.map((field) => (
                            <div key={field.key} className="grid gap-2">
                                <Label htmlFor={field.key} className="flex items-center gap-2">
                                    {field.icon}
                                    {field.title}
                                </Label>
                                <Input
                                    id={field.key}
                                    value={form.data[field.key]}
                                    onChange={(event) => form.setData(field.key, event.target.value.toUpperCase())}
                                    className={fieldClass}
                                    placeholder={field.placeholder}
                                    autoComplete="off"
                                />
                                <p className="text-xs text-foreground/50">{field.hint}</p>
                                <InputError message={form.errors[field.key]} />
                            </div>
                        ))}

                        <div className="flex items-center gap-4">
                            <button type="submit" disabled={form.processing} className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50">
                                Save
                            </button>
                            {form.recentlySuccessful && (
                                <span className="inline-flex items-center gap-1.5 text-sm text-primary">
                                    <Check className="size-4" />
                                    Saved
                                </span>
                            )}
                        </div>
                    </Card>
                </form>

                <p className="px-2 text-xs leading-relaxed text-foreground/50">
                    Leave a field empty to keep that platform off. These pixels can set cookies on visitors, so make sure the Privacy Policy covers them.
                </p>
            </div>
        </>
    );
}

Tracking.layout = {
    breadcrumbs: [{ title: 'Pixels', href: edit() }],
};
