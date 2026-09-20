<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Google is the only way in. Accounts are provisioned by hand (there is no registration), so the
 * email typed on the login screen is checked against the users table BEFORE the visitor is sent to
 * Google, and the address Google returns must match it and belong to an existing user.
 */
class GoogleController extends Controller
{
    private const SESSION_KEY = 'google_login_email';

    public function redirect(Request $request): Response
    {
        $email = Str::lower(trim($request->validate([
            'email' => ['required', 'email'],
        ])['email']));

        if (! User::query()->whereRaw('lower(email) = ?', [$email])->exists()) {
            return back()->withErrors(['email' => 'This email is not authorized to access the dashboard.']);
        }

        $request->session()->put(self::SESSION_KEY, $email);

        $url = Socialite::driver('google')
            ->with(['login_hint' => $email, 'prompt' => 'select_account'])
            ->redirect()
            ->getTargetUrl();

        return Inertia::location($url);
    }

    public function callback(Request $request): RedirectResponse
    {
        $expected = $request->session()->pull(self::SESSION_KEY);

        if (! $expected) {
            return $this->fail('Your sign-in session expired. Enter your email and try again.');
        }

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable) {
            return $this->fail('Google sign-in could not be completed. Please try again.');
        }

        $email = Str::lower((string) $googleUser->getEmail());

        if ($email === '' || $email !== $expected || ! ($googleUser->user['email_verified'] ?? false)) {
            return $this->fail('The Google account does not match the email you entered.');
        }

        $user = User::query()->whereRaw('lower(email) = ?', [$email])->first();

        if (! $user) {
            return $this->fail('This email is not authorized to access the dashboard.');
        }

        if (! $user->email_verified_at) {
            $user->forceFill(['email_verified_at' => now()])->save();
        }

        Auth::login($user, remember: true);
        $request->session()->regenerate();

        return redirect()->intended(config('fortify.home', '/dashboard'));
    }

    private function fail(string $message): RedirectResponse
    {
        return redirect()->route('login')->withErrors(['email' => $message]);
    }
}
