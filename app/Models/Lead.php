<?php

namespace App\Models;

use App\Enums\LeadStatus;
use Database\Factories\LeadFactory;
use Illuminate\Database\Eloquent\Attributes\Unguarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Unguarded]
class Lead extends Model
{
    /** @use HasFactory<LeadFactory> */
    use HasFactory;

    // Deleting a lead from the dashboard hides it everywhere (the index, exports, analytics,
    // campaign lead counts — everything already queries through this model) without losing the
    // record, in case it was removed by mistake.
    use SoftDeletes;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => LeadStatus::class,
            'sms_consent_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<Campaign, $this>
     */
    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }
}
