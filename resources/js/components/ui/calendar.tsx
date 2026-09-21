import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-1', className)}
            classNames={{
                months: 'relative flex flex-col gap-4',
                month: 'relative flex flex-col gap-3',
                month_caption: 'flex h-9 items-center justify-center text-sm font-semibold',
                caption_label: 'text-sm font-semibold',
                nav: 'absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between',
                button_previous: 'grid size-9 place-items-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground',
                button_next: 'grid size-9 place-items-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground',
                month_grid: 'w-full border-collapse',
                weekdays: 'flex',
                weekday: 'w-10 pb-2 text-center text-xs font-medium text-foreground/40',
                week: 'mt-1 flex w-full',
                day: 'size-10 p-0 text-center text-sm',
                day_button:
                    'size-10 rounded-full font-normal text-foreground transition-colors hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none aria-selected:hover:bg-primary',
                selected: '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:font-semibold',
                today: '[&>button]:border [&>button]:border-primary/40',
                outside: 'opacity-30',
                disabled: 'opacity-30',
                hidden: 'invisible',
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation, className: chevronClass }) =>
                    orientation === 'left' ? <ChevronLeft className={cn('size-4', chevronClass)} /> : <ChevronRight className={cn('size-4', chevronClass)} />,
            }}
            {...props}
        />
    );
}

export { Calendar };
