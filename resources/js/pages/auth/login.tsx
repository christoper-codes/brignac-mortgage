import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { GoogleMark } from '@/components/platform-marks';
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
                                className="h-11 rounded-full px-5"
                                autoComplete="email"
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <button
                            type="submit"
                            tabIndex={2}
                            disabled={processing}
                            data-test="google-login-button"
                            className="group inline-flex h-11.75 w-full items-center justify-center rounded-[40px] bg-[#080a10] pr-1.5 pl-5 text-base font-medium tracking-tighter text-white shadow-[inset_0_4px_19px_rgba(255,255,255,0.55),0_2px_14px_rgba(129,141,151,0.35)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:shadow-[inset_0_4px_19px_rgba(255,255,255,0.65),0_6px_20px_rgba(129,141,151,0.45)] focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:opacity-60"
                        >
                            Continue with Google
                            <span className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-white/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                                {processing ? <Spinner className="text-black" /> : <GoogleMark className="size-4" />}
                            </span>
                        </button>
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
