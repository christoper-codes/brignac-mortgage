import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// A tiny renderer for the plain-text style the assistant is told to use: paragraphs, "- " bullets,
// "1. " numbered lists and **bold**. Deliberately not a full markdown parser (no extra dependency).

function inline(text: string): ReactNode[] {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
            <strong key={index} className="font-semibold text-white">
                {part.slice(2, -2)}
            </strong>
        ) : (
            part
        ),
    );
}

type Block =
    { type: 'p'; text: string } | { type: 'ul' | 'ol'; items: string[] };

function parse(text: string): Block[] {
    const blocks: Block[] = [];

    for (const line of text.split('\n')) {
        const trimmed = line.trim();
        const bullet = trimmed.match(/^[-•*]\s+(.*)/);
        const numbered = trimmed.match(/^\d+[.)]\s+(.*)/);
        const last = blocks[blocks.length - 1];

        if (trimmed === '') {
            blocks.push({ type: 'p', text: '' });
        } else if (bullet || numbered) {
            const type = bullet ? 'ul' : 'ol';
            const item = (bullet ?? numbered)![1];

            if (last && last.type === type) {
                last.items.push(item);
            } else {
                blocks.push({ type, items: [item] });
            }
        } else if (last && last.type === 'p' && last.text !== '') {
            last.text += ` ${trimmed}`;
        } else {
            blocks.push({ type: 'p', text: trimmed });
        }
    }

    return blocks.filter((block) => block.type !== 'p' || block.text !== '');
}

export function FormattedText({ text }: { text: string }) {
    return (
        <div className="space-y-3 text-[15px] leading-relaxed text-white/85">
            {parse(text).map((block, index) =>
                block.type === 'p' ? (
                    <p key={index}>{inline(block.text)}</p>
                ) : block.type === 'ul' ? (
                    <ul key={index} className="space-y-1.5">
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex gap-2.5">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/35" />
                                <span>{inline(item)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ol key={index} className="space-y-1.5">
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex gap-2.5">
                                <span className="w-4 shrink-0 text-right text-sm font-medium text-white/40 tabular-nums">
                                    {itemIndex + 1}.
                                </span>
                                <span>{inline(item)}</span>
                            </li>
                        ))}
                    </ol>
                ),
            )}
        </div>
    );
}

/** Reveals `text` word by word (like the answer is being written); instantly when disabled. */
export function useWordReveal(
    text: string,
    enabled: boolean,
    onProgress?: () => void,
): string {
    const words = text.split(/(\s+)/);
    const [count, setCount] = useState(enabled ? 0 : words.length);

    useEffect(() => {
        if (!enabled || count >= words.length) {
            return;
        }

        const timer = window.setTimeout(() => {
            setCount((current) => Math.min(words.length, current + 2));
            onProgress?.();
        }, 22);

        return () => window.clearTimeout(timer);
    }, [count, enabled, words.length, onProgress]);

    return enabled ? words.slice(0, count).join('') : text;
}
