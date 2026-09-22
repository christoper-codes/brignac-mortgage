import { Head, useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Card, PageHeader, PlatformMark } from '@/components/dashboard/ui';
import InputError from '@/components/input-error';
import { GoogleMark } from '@/components/platform-marks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/dashboard/tracking';

type Props = {
    settings: {
        metaPixelId: string | null;
        metaCapiTokenPreview: string | null;
        metaTestEventCode: string | null;
        tiktokPixelId: string | null;
        googleAnalyticsId: string | null;
    };
};

const fieldClass = 'h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary';

export default function Tracking({ settings }: Props) {
    const form = useForm({
        meta_pixel_id: settings.metaPixelId ?? '',
        meta_capi_token: '',
        meta_test_event_code: settings.metaTestEventCode ?? '',
        clear_meta_capi_token: false,
        tiktok_pixel_id: settings.tiktokPixelId ?? '',
        google_analytics_id: settings.googleAnalyticsId ?? '',
    });
    const [editingToken, setEditingToken] = useState(!settings.metaCapiTokenPreview);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.put(update().url, {
            preserveScroll: true,
            onSuccess: () => {
                form.setData('meta_capi_token', '');
                form.setData('clear_meta_capi_token', false);
                setEditingToken(false);
            },
        });
    };

    const idFields = [
        {
            key: 'meta_pixel_id' as const,
            title: 'Meta Pixel ID',
            hint: 'Facebook and Instagram ads. Events Manager → Data sources → your pixel.',
            placeholder: '123456789012345',
            icon: <PlatformMark platform="facebook" className="size-5" />,
        },
        {
            key: 'tiktok_pixel_id' as const,
            title: 'TikTok Pixel ID',
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

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <Card className="space-y-6">
                        {idFields.map((field) => (
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
                    </Card>

                    <Card className="space-y-6">
                        <div>
                            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                <PlatformMark platform="facebook" className="size-5" />
                                Meta Conversions API
                            </h2>
                            <p className="mt-1 text-xs text-foreground/50">
                                Optional, but recommended: sends the same Apply Now / Lead events straight from our server, so they still
                                count when a visitor's browser blocks the pixel.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_capi_token">Access token</Label>
                            {editingToken ? (
                                <Input
                                    id="meta_capi_token"
                                    type="password"
                                    value={form.data.meta_capi_token}
                                    onChange={(event) => form.setData('meta_capi_token', event.target.value)}
                                    className={fieldClass}
                                    placeholder="Paste the token from Events Manager → Settings → Conversions API"
                                    autoComplete="off"
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span className={`${fieldClass} flex items-center text-foreground/60`}>{settings.metaCapiTokenPreview}</span>
                                    <button
                                        type="button"
                                        onClick={() => setEditingToken(true)}
                                        className="shrink-0 text-sm font-medium text-primary hover:underline"
                                    >
                                        Replace
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => form.setData('clear_meta_capi_token', !form.data.clear_meta_capi_token)}
                                        className={`shrink-0 text-sm font-medium hover:underline ${form.data.clear_meta_capi_token ? 'text-red-500' : 'text-foreground/50'}`}
                                    >
                                        {form.data.clear_meta_capi_token ? 'Will remove on save' : 'Remove'}
                                    </button>
                                </div>
                            )}
                            <p className="text-xs text-foreground/50">Never shown again in full once saved — only a preview like this stays on screen.</p>
                            <InputError message={form.errors.meta_capi_token} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_test_event_code">Test event code (optional)</Label>
                            <Input
                                id="meta_test_event_code"
                                value={form.data.meta_test_event_code}
                                onChange={(event) => form.setData('meta_test_event_code', event.target.value.toUpperCase())}
                                className={fieldClass}
                                placeholder="TEST12345"
                            />
                            <p className="text-xs text-foreground/50">
                                From Events Manager → Test Events, while checking that events arrive. Remove it once verified — leaving it set
                                stops events from counting for real.
                            </p>
                            <InputError message={form.errors.meta_test_event_code} />
                        </div>
                    </Card>

                    <div className="flex items-center gap-4 px-2">
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
                </form>

                <p className="px-2 text-xs leading-relaxed text-foreground/50">
                    Leave a field empty to keep that platform off. These pixels can set cookies on visitors, so make sure the Privacy Policy
                    covers them.
                </p>
            </div>
        </>
    );
}

Tracking.layout = {
    breadcrumbs: [{ title: 'Pixels', href: edit() }],
};
