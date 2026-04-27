<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\LeadEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'               => 'required|string|max:255',
            'email'              => 'nullable|email|max:255',
            'phone'              => 'nullable|string|max:30',
            'loan_purpose'       => 'nullable|string|max:50',
            'property_value'     => 'nullable|numeric|min:0',
            'monthly_income'     => 'nullable|numeric|min:0',
            'credit_score_range' => 'nullable|string|max:50',
            'purchase_timeline'  => 'nullable|string|max:50',
            'quiz_answers'       => 'nullable|array',
            'opt_in_sms'         => 'nullable|boolean',
            'utm_source'         => 'nullable|string|max:255',
            'utm_medium'         => 'nullable|string|max:255',
            'utm_campaign'       => 'nullable|string|max:255',
            'utm_content'        => 'nullable|string|max:255',
            'utm_term'           => 'nullable|string|max:255',
        ]);

        $lead = Lead::create([
            ...$validated,
            'score'      => $this->calculateScore($validated),
            'status'     => 'new',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        LeadEvent::create([
            'lead_id'    => $lead->id,
            'event_type' => 'lead_submit',
            'metadata'   => ['source' => 'quiz'],
            'utm_source' => $validated['utm_source'] ?? null,
            'utm_campaign' => $validated['utm_campaign'] ?? null,
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['success' => true, 'lead_id' => $lead->id], 201);
    }

    public function trackEvent(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_type'    => 'required|string|max:100',
            'session_id'    => 'nullable|string|max:100',
            'lead_id'       => 'nullable|integer|exists:leads,id',
            'metadata'      => 'nullable|array',
            'utm_source'    => 'nullable|string|max:255',
            'utm_campaign'  => 'nullable|string|max:255',
        ]);

        LeadEvent::create([
            ...$validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['success' => true]);
    }

    private function calculateScore(array $data): int
    {
        $score = 0;

        $score += match ($data['credit_score_range'] ?? '') {
            'excellent' => 40,
            'good'      => 30,
            'fair'      => 15,
            default     => 0,
        };

        $score += match ($data['purchase_timeline'] ?? '') {
            'asap'       => 30,
            '1-3months'  => 25,
            '3-6months'  => 15,
            'exploring'  => 5,
            default      => 0,
        };

        if (!empty($data['phone'])) $score += 15;
        if (!empty($data['email'])) $score += 15;

        return min($score, 100);
    }
}
