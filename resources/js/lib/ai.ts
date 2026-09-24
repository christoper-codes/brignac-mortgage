import { answer, plan } from '@/routes/dashboard/ai';

export type AiSource = { id: string; label: string };
export type AiTurn = { role: 'user' | 'assistant'; content: string };

export type AiPlan = { sources: AiSource[]; days: number };

const HISTORY_TURNS = 6;
const HISTORY_CONTENT_LIMIT = 800;

/** The last few turns, trimmed, so follow-up questions work without resending the whole chat. */
export function recentHistory(turns: AiTurn[]): AiTurn[] {
    return turns
        .slice(-HISTORY_TURNS)
        .map((turn) => ({
            role: turn.role,
            content: turn.content.slice(0, HISTORY_CONTENT_LIMIT),
        }));
}

function xsrfToken(): string {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);

    return match ? decodeURIComponent(match[1]) : '';
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': xsrfToken(),
        },
        body: JSON.stringify(body),
        credentials: 'same-origin',
    });

    const data = (await response.json().catch(() => ({}))) as {
        message?: string;
    };

    if (!response.ok) {
        throw new Error(
            data.message ?? 'Something went wrong. Please try again.',
        );
    }

    return data as T;
}

/** Step 1: which pieces of website data does this question need? */
export function requestPlan(
    message: string,
    history: AiTurn[],
): Promise<AiPlan> {
    return postJson<AiPlan>(plan().url, { message, history });
}

/** Step 2: the answer, using only the data chosen in step 1. */
export async function requestAnswer(
    message: string,
    history: AiTurn[],
    aiPlan: AiPlan,
): Promise<string> {
    const { answer: text } = await postJson<{ answer: string }>(answer().url, {
        message,
        history,
        sources: aiPlan.sources.map((source) => source.id),
        days: aiPlan.days,
    });

    return text;
}
