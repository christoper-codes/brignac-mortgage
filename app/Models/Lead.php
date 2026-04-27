<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'loan_purpose',
        'property_value',
        'monthly_income',
        'credit_score_range',
        'purchase_timeline',
        'quiz_answers',
        'score',
        'status',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'ip_address',
        'user_agent',
        'opt_in_sms',
    ];

    protected $casts = [
        'quiz_answers' => 'array',
        'property_value' => 'decimal:2',
        'monthly_income' => 'decimal:2',
        'opt_in_sms' => 'boolean',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(LeadEvent::class);
    }
}
