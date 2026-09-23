import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import { Card } from '@/components/dashboard/ui';
import Heading from '@/components/heading';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance settings</h1>

            <Card>
                <Heading
                    variant="small"
                    title="Appearance"
                    description="Update the appearance settings for your account"
                />
                <AppearanceTabs />
            </Card>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
};
