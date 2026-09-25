<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\User;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Owner-only (see the `view-users` gate): every account, whether it has signed in, and when.
     */
    public function index(): Response
    {
        $users = User::query()
            ->orderByRaw('coalesce(last_seen_at, last_login_at) is null')
            ->orderByRaw('coalesce(last_seen_at, last_login_at) desc')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/users', [
            'users' => TeamMemberResource::collection($users)->resolve(),
            'summary' => [
                'total' => $users->count(),
                'roles' => collect(UserRole::cases())->map(fn (UserRole $role): array => [
                    'key' => $role->value,
                    'label' => $role->label().'s',
                    'count' => $users->where('role', $role)->count(),
                ])->all(),
                'activity' => $this->activity($users),
            ],
        ]);
    }

    /**
     * How recently each account was active (last seen, or last sign-in when never seen), in mutually
     * exclusive buckets that add up to the total.
     *
     * @param  Collection<int, User>  $users
     * @return list<array{key: string, label: string, count: int}>
     */
    private function activity(Collection $users): array
    {
        $bucket = function (User $user): string {
            $lastActive = $user->last_seen_at ?? $user->last_login_at;

            return match (true) {
                $lastActive === null => 'never',
                $lastActive->gte(now()->subDay()) => 'last_24_hours',
                $lastActive->gte(now()->subDays(7)) => 'this_week',
                default => 'earlier',
            };
        };

        $counts = $users->countBy($bucket);

        return [
            ['key' => 'last_24_hours', 'label' => 'Last 24 hours', 'count' => $counts->get('last_24_hours', 0)],
            ['key' => 'this_week', 'label' => 'Earlier this week', 'count' => $counts->get('this_week', 0)],
            ['key' => 'earlier', 'label' => 'Over a week ago', 'count' => $counts->get('earlier', 0)],
            ['key' => 'never', 'label' => 'Never signed in', 'count' => $counts->get('never', 0)],
        ];
    }
}
