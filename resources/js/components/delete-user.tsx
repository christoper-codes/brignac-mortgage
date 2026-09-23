import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="rounded-4xl border border-red-200 bg-red-50/60 p-6 dark:border-red-500/20 dark:bg-red-500/10">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />

            <div className="space-y-4">
                <div className="space-y-0.5 text-red-600 dark:text-red-200">
                    <p className="text-sm font-medium">Warning</p>
                    <p className="text-sm text-red-600/80 dark:text-red-200/70">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            data-test="delete-user-button"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            Delete account
                        </button>
                    </DialogTrigger>
                    <DialogContent className="rounded-4xl">
                        <DialogTitle>
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will also be permanently deleted. Please
                            enter your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({ resetAndClearErrors, processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Password
                                        </Label>

                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            className="h-11 rounded-full px-5"
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    resetAndClearErrors()
                                                }
                                                className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-accent"
                                            >
                                                Cancel
                                            </button>
                                        </DialogClose>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            data-test="confirm-delete-user-button"
                                            className="inline-flex h-11 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                        >
                                            Delete account
                                        </button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
