import { format, parseISO } from 'date-fns';
import { CalendarDays, X } from 'lucide-react';
import { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
    id?: string;
    /** ISO date (YYYY-MM-DD) or empty string. */
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Days before this ISO date are not selectable. */
    min?: string;
};

// A calendar popover in place of the browser's native date input: same value format (YYYY-MM-DD),
// but styled like the rest of the dashboard.
export function DatePicker({ id, value, onChange, placeholder = 'Pick a date', min }: Props) {
    const [open, setOpen] = useState(false);
    const selected = value ? parseISO(value) : undefined;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    id={id}
                    type="button"
                    className={cn(
                        'flex h-11 w-full items-center gap-3 rounded-full border border-border bg-background px-5 text-left text-sm outline-none transition-colors focus-visible:border-primary data-[state=open]:border-primary',
                        selected ? 'text-foreground' : 'text-foreground/40',
                    )}
                >
                    <CalendarDays className="size-4 shrink-0 text-foreground/50" />
                    <span className="flex-1 truncate">{selected ? format(selected, 'MMM d, yyyy') : placeholder}</span>
                    {selected && (
                        <span
                            role="button"
                            tabIndex={0}
                            aria-label="Clear date"
                            onClick={(event) => {
                                event.stopPropagation();
                                onChange('');
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.stopPropagation();
                                    onChange('');
                                }
                            }}
                            className="grid size-6 place-items-center rounded-full text-foreground/40 hover:bg-foreground/5 hover:text-foreground"
                        >
                            <X className="size-3.5" />
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto">
                <Calendar
                    mode="single"
                    selected={selected}
                    defaultMonth={selected}
                    disabled={min ? { before: parseISO(min) } : undefined}
                    onSelect={(date) => {
                        onChange(date ? format(date, 'yyyy-MM-dd') : '');
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
