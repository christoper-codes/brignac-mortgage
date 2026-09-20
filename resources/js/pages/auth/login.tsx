import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { GoogleMark } from '@/components/platform-marks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    status?: string;
};

// Google is the only sign-in method. The email is checked on the server first; only an authorized
// address is sent on to Google.
export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form action="/auth/google" method="post" className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <Button type="submit" className="w-full" tabIndex={2} disabled={processing} data-test="google-login-button">
                            {processing ? <Spinner /> : <GoogleMark className="size-4 rounded-full bg-white p-px" />}
                            Continue with Google
                        </Button>
                    </div>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your authorized email, then continue with Google',
};
