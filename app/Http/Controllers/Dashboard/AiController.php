<?php

namespace App\Http\Controllers\Dashboard;

use App\Exceptions\AiUnavailableException;
use App\Http\Controllers\Controller;
use App\Http\Requests\AiAnswerRequest;
use App\Http\Requests\AiPlanRequest;
use App\Services\AiAssistant;
use App\Services\AiDataCatalog;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AiController extends Controller
{
    public function index(AiAssistant $assistant): Response
    {
        return Inertia::render('dashboard/ai', [
            'configured' => $assistant->isConfigured(),
        ]);
    }

    /**
     * Step 1: which pieces of website data does this question need?
     */
    public function plan(AiPlanRequest $request, AiAssistant $assistant, AiDataCatalog $catalog): JsonResponse
    {
        try {
            $plan = $assistant->plan($request->validated('message'), $request->history());
        } catch (AiUnavailableException $exception) {
            return response()->json(['message' => $exception->getMessage()], 503);
        }

        $options = $catalog->options();

        return response()->json([
            'sources' => array_map(fn (string $id): array => ['id' => $id, 'label' => $options[$id]['label']], $plan['sources']),
            'days' => $plan['days'],
        ]);
    }

    /**
     * Step 2: answer with only the data the plan asked for.
     */
    public function answer(AiAnswerRequest $request, AiAssistant $assistant): JsonResponse
    {
        try {
            $answer = $assistant->answer(
                $request->validated('message'),
                $request->history(),
                $request->validated('sources'),
                $request->validated('days'),
            );
        } catch (AiUnavailableException $exception) {
            return response()->json(['message' => $exception->getMessage()], 503);
        }

        return response()->json(['answer' => $answer]);
    }
}
