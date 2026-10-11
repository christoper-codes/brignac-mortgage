<?php

use App\Models\Lead;
use App\Models\User;

test('guests cannot delete a lead', function () {
    $lead = Lead::factory()->create();

    $this->delete(route('dashboard.leads.destroy', $lead))->assertRedirect(route('login'));

    expect(Lead::query()->find($lead->id))->not->toBeNull();
});

test('deleting a lead soft-deletes it instead of removing the record', function () {
    $lead = Lead::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('dashboard.leads.destroy', $lead))
        ->assertRedirect();

    expect(Lead::query()->find($lead->id))->toBeNull()
        ->and(Lead::withTrashed()->find($lead->id))->not->toBeNull()
        ->and(Lead::withTrashed()->find($lead->id)->deleted_at)->not->toBeNull();
});

test('a deleted lead no longer appears in the leads index', function () {
    $kept = Lead::factory()->create(['full_name' => 'Kept Lead']);
    $deleted = Lead::factory()->create(['full_name' => 'Deleted Lead']);
    $deleted->delete();

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.leads.index'))
        ->assertInertia(fn ($page) => $page
            ->where('leads.data', fn ($leads) => collect($leads)->pluck('full_name')->contains('Kept Lead')
                && ! collect($leads)->pluck('full_name')->contains('Deleted Lead')));
});
