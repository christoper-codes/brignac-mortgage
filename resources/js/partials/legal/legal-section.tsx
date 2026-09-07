import type { ReactNode } from 'react';

export function Section({ number, title, children }: { number: number; title: string; children: ReactNode }) {
    return (
        <section className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground">
                {number}. {title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/70">{children}</div>
        </section>
    );
}

export function SubSection({ letter, title }: { letter: string; title: string }) {
    return (
        <p className="font-medium text-foreground">
            {letter}. {title}
        </p>
    );
}

export function List({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export function LabeledList({ items }: { items: { label: string; description: string }[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item.label} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    <span>
                        <span className="font-medium text-foreground">{item.label}:</span> {item.description}
                    </span>
                </li>
            ))}
        </ul>
    );
}
