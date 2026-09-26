import { CalendarRange, Download, Infinity as AllIcon } from 'lucide-react';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Mode = 'all' | 'range';

type Props = {
    /** What is being exported, e.g. "leads" — used in the dialog copy. */
    subject: string;
    /** Builds the download URL from the query (empty for everything, from/to for a period). */
    url: (query?: { query: { from: string; to: string } }) => { url: string };
};

// "Export to Excel" button + the dialog that asks whether to download everything or one period.
export function ExportDialog({ subject, url }: Props) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<Mode>('all');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const ready = mode === 'all' || (from !== '' && to !== '');
    const href = mode === 'all' ? url().url : url({ query: { from, to } }).url;

    // Picking a start after the current end moves the end along, so the period is never inverted.
    const changeFrom = (value: string) => {
        setFrom(value);

        if (value && to && value > to) {
            setTo(value);
        }
    };

    const options: {
        value: Mode;
        icon: typeof AllIcon;
        title: string;
        description: string;
    }[] = [
        {
            value: 'all',
            icon: AllIcon,
            title: `All ${subject}`,
            description: 'Everything recorded so far.',
        },
        {
            value: 'range',
            icon: CalendarRange,
            title: 'A specific period',
            description: 'Choose the first and last day.',
        },
    ];

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
                <Download className="size-4" />
                Export to Excel
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="rounded-4xl sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Export {subject} to Excel
                        </DialogTitle>
                        <DialogDescription>
                            Download an .xlsx file with{' '}
                            {subject === 'analytics'
                                ? 'every table on the page'
                                : 'the details shown on each card, without the journey'}
                            .
                        </DialogDescription>
                    </DialogHeader>

                    <div
                        role="radiogroup"
                        aria-label="What to export"
                        className="grid gap-3"
                    >
                        {options.map((option) => {
                            const Icon = option.icon;
                            const selected = mode === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => setMode(option.value)}
                                    className={cn(
                                        'flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors',
                                        selected
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-foreground/30',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'grid size-10 shrink-0 place-items-center rounded-full',
                                            selected
                                                ? 'bg-primary/15 text-primary'
                                                : 'bg-foreground/5 text-foreground/60',
                                        )}
                                    >
                                        <Icon className="size-5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium text-foreground">
                                            {option.title}
                                        </span>
                                        <span className="block text-xs text-foreground/50">
                                            {option.description}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {mode === 'range' && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="export-from">From</Label>
                                <DatePicker
                                    id="export-from"
                                    value={from}
                                    onChange={changeFrom}
                                    placeholder="Start date"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="export-to">To</Label>
                                <DatePicker
                                    id="export-to"
                                    value={to}
                                    onChange={setTo}
                                    placeholder="End date"
                                    min={from || undefined}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
                        >
                            Cancel
                        </button>
                        {ready ? (
                            <a
                                href={href}
                                onClick={() => setOpen(false)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                            >
                                <Download className="size-4" />
                                Download
                            </a>
                        ) : (
                            <span
                                aria-disabled="true"
                                className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background opacity-40"
                            >
                                <Download className="size-4" />
                                Download
                            </span>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
