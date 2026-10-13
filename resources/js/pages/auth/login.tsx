import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
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

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                className="h-11 rounded-full px-5"
                                autoComplete="current-password"
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                tabIndex={3}
                            />
                            <Label htmlFor="remember" className="font-normal">
                                Remember me
                            </Label>
                        </div>

                        <button
                            type="submit"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                            className="group inline-flex h-11.75 w-full items-center justify-center rounded-[40px] bg-[#080a10] px-5 text-base font-medium tracking-tighter text-white shadow-[inset_0_4px_19px_rgba(255,255,255,0.55),0_2px_14px_rgba(129,141,151,0.35)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:shadow-[inset_0_4px_19px_rgba(255,255,255,0.65),0_6px_20px_rgba(129,141,151,0.45)] focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:opacity-60"
                        >
                            {processing ? (
                                <Spinner className="text-white" />
                            ) : (
                                'Log in'
                            )}
                        </button>
                    </div>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password to continue',
};
