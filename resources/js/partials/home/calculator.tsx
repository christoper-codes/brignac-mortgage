import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Matches the reference simulator: any whole-year term from 5 through 35.
const TERM_OPTIONS = Array.from({ length: 31 }, (_, index) => {
    const years = index + 5;

    return { value: String(years), label: `${years} years` };
});

// 30-year fixed national average. Snapshot from Freddie Mac's Primary Mortgage Market Survey
// (6.71%, week ending Sep 3 2026), nudged to 6.75% to sit between Freddie Mac and the slightly
// higher Bankrate / U.S. News readings. Refresh this periodically — ideally feed it from the server.
const AVERAGE_RATE = 6.75;
const RATE_MIN = 5.5;
const RATE_MAX = 8;

const RATE_SOURCES = [
    { label: 'fred.stlouisfed.org', href: 'https://fred.stlouisfed.org/series/MORTGAGE30US/' },
    { label: 'www.bankrate.com', href: 'https://www.bankrate.com/mortgages/mortgage-rates/' },
    { label: 'money.usnews.com', href: 'https://money.usnews.com/loans/rates/mortgages/mortgage-rates' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const currencyPrecise = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

const MONTHS_PER_PAGE = 12;
const YEARS_PER_PAGE = 12;

type ScheduleRow = { month: number; payment: number; principal: number; interest: number; balance: number };
type YearRow = { year: number; payment: number; principal: number; interest: number; balance: number };
type CalcParams = { loan: number; years: number; rate: number; property: number };
type CalcResult = { monthlyPayment: number; schedule: ScheduleRow[]; params: CalcParams };

function calculateAmortization(principal: number, annualRatePct: number, years: number): Omit<CalcResult, 'params'> {
    const monthlyRate = annualRatePct / 100 / 12;
    const totalPayments = years * 12;
    const monthlyPayment =
        monthlyRate === 0
            ? principal / totalPayments
            : (principal * monthlyRate * (1 + monthlyRate) ** totalPayments) / ((1 + monthlyRate) ** totalPayments - 1);

    let balance = principal;
    const schedule: ScheduleRow[] = [];

    for (let month = 1; month <= totalPayments; month++) {
        const interest = balance * monthlyRate;
        const principalPaid = Math.min(monthlyPayment - interest, balance);
        balance = Math.max(0, balance - principalPaid);
        schedule.push({ month, payment: monthlyPayment, principal: principalPaid, interest, balance });
    }

    return { monthlyPayment, schedule };
}

// Rolls the 12 monthly rows of each year into a single annual row for the "By Year" view.
function toYearlySchedule(schedule: ScheduleRow[]): YearRow[] {
    const rows: YearRow[] = [];

    for (let index = 0; index < schedule.length; index += 12) {
        const chunk = schedule.slice(index, index + 12);
        rows.push({
            year: index / 12 + 1,
            payment: chunk.reduce((sum, row) => sum + row.payment, 0),
            principal: chunk.reduce((sum, row) => sum + row.principal, 0),
            interest: chunk.reduce((sum, row) => sum + row.interest, 0),
            balance: chunk[chunk.length - 1].balance,
        });
    }

    return rows;
}

export function Calculator() {
    const [propertyValue, setPropertyValue] = useState('450000');
    const [loanNeeded, setLoanNeeded] = useState('360000');
    const [termYears, setTermYears] = useState('30');
    const [interestRate, setInterestRate] = useState(AVERAGE_RATE);
    const [errors, setErrors] = useState<{ property?: string; loan?: string }>({});
    const [result, setResult] = useState<CalcResult | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
    const [page, setPage] = useState(0);

    const yearly = useMemo(() => (result ? toYearlySchedule(result.schedule) : []), [result]);

    const totals = useMemo(() => {
        if (!result) {
            return null;
        }

        const totalInterest = result.schedule.reduce((sum, row) => sum + row.interest, 0);
        const totalPrincipal = result.schedule.reduce((sum, row) => sum + row.principal, 0);
        const payoff = new Date();
        payoff.setMonth(payoff.getMonth() + result.params.years * 12);

        return {
            totalInterest,
            totalPaid: totalInterest + totalPrincipal,
            payoffLabel: payoff.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            downPayment: Math.max(0, result.params.property - result.params.loan),
            ltv: result.params.property > 0 ? (result.params.loan / result.params.property) * 100 : 0,
        };
    }, [result]);

    const activeRows = result ? (viewMode === 'month' ? result.schedule : yearly) : [];
    const pageSize = viewMode === 'month' ? MONTHS_PER_PAGE : YEARS_PER_PAGE;
    const pageCount = Math.max(1, Math.ceil(activeRows.length / pageSize));
    const safePage = Math.min(page, pageCount - 1);
    const pagedRows = activeRows.slice(safePage * pageSize, safePage * pageSize + pageSize);

    const changeView = (mode: 'month' | 'year') => {
        setViewMode(mode);
        setPage(0);
    };

    const handleCalculate = (event: FormEvent) => {
        event.preventDefault();

        const property = Number(propertyValue);
        const loan = Number(loanNeeded);
        const nextErrors: typeof errors = {};

        if (!propertyValue || Number.isNaN(property) || property <= 0) {
            nextErrors.property = 'Enter a valid property value';
        }

        if (!loanNeeded || Number.isNaN(loan) || loan <= 0) {
            nextErrors.loan = 'Enter a valid loan amount';
        } else if (property > 0 && loan < property * 0.05) {
            nextErrors.loan = 'The loan cannot be less than 5% of the property value';
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setResult({
            ...calculateAmortization(loan, interestRate, Number(termYears)),
            params: { loan, years: Number(termYears), rate: interestRate, property },
        });
        setViewMode('month');
        setPage(0);
        setDialogOpen(true);
    };

    const handleReset = () => {
        setResult(null);
        setDialogOpen(false);
    };

    return (
        <div className="bg-neutral-100/80 [background-image:radial-gradient(rgba(100,100,100,0.25)_1px,transparent_1px)] [background-size:14px_14px]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="h-full overflow-hidden bg-white">
                    <div className="px-4 pt-40 text-neutral-900 sm:pt-52">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <span className="inline-flex rounded-full bg-neutral-100 px-5 py-1.5 text-xs font-medium tracking-wide text-neutral-600 uppercase">
                                    Simulator
                                </span>
                                <h2 className="text-3xl text-neutral-900 sm:text-4xl">
                                    Mortgage <span className="text-primary">Loan</span> Calculator
                                </h2>
                                <div className="flex flex-col items-center gap-2 text-xs text-neutral-500 sm:flex-row sm:gap-4">
                                    <p className="font-medium">
                                        30-year fixed national average (Freddie Mac Primary Mortgage Market Survey). Sources:
                                    </p>
                                    {RATE_SOURCES.map((source) => (
                                        <a
                                            key={source.href}
                                            href={source.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-900"
                                        >
                                            {source.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleCalculate} className="mt-10 space-y-8">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                    <label className="block">
                                        <span className="mb-1.5 block text-sm font-medium text-neutral-700">Property Value</span>
                                        <div className="flex h-12 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 focus-within:border-primary">
                                            <span className="text-neutral-400">$</span>
                                            <input
                                                inputMode="numeric"
                                                value={propertyValue}
                                                onChange={(event) => setPropertyValue(event.target.value.replace(/[^0-9.]/g, ''))}
                                                className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 outline-none"
                                                placeholder="450,000"
                                            />
                                        </div>
                                        {errors.property ? (
                                            <span className="mt-1 block text-xs text-red-500">{errors.property}</span>
                                        ) : (
                                            <span className="mt-1 block text-xs text-neutral-400"></span>
                                        )}
                                    </label>

                                    <label className="block">
                                        <span className="mb-1.5 block text-sm font-medium text-neutral-700">Loan Needed</span>
                                        <div className="flex h-12 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 focus-within:border-primary">
                                            <span className="text-neutral-400">$</span>
                                            <input
                                                inputMode="numeric"
                                                value={loanNeeded}
                                                onChange={(event) => setLoanNeeded(event.target.value.replace(/[^0-9.]/g, ''))}
                                                className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 outline-none"
                                                placeholder="360,000"
                                            />
                                        </div>
                                        {errors.loan ? (
                                            <span className="mt-1 block text-xs text-red-500">{errors.loan}</span>
                                        ) : (
                                            <span className="mt-1 block text-xs text-neutral-400">
                                            </span>
                                        )}
                                    </label>

                                    <label className="block">
                                        <span className="mb-1.5 block text-sm font-medium text-neutral-700">Loan Term</span>
                                        <Select value={termYears} onValueChange={setTermYears}>
                                            <SelectTrigger className="h-12 w-full rounded-full border-neutral-200 bg-neutral-50 px-5 data-[size=default]:h-12 text-neutral-900 shadow-none focus-visible:border-primary focus-visible:ring-0 [&_svg]:text-neutral-400">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-3xl p-1.5">
                                                {TERM_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value} className="rounded-full py-2.5 pl-3">
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <span className="mt-1 block text-xs text-neutral-400"></span>
                                    </label>
                                </div>

                                <div>
                                    <div className="text-center">
                                        <p className="font-medium text-neutral-900">What interest rate?</p>
                                        <p className="mt-1 text-xs text-neutral-500">
                                            This rate depends on your credit history and the lender you apply with.
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                                        <input
                                            type="range"
                                            min={RATE_MIN}
                                            max={RATE_MAX}
                                            step={0.01}
                                            value={interestRate}
                                            onChange={(event) => setInterestRate(Number(event.target.value))}
                                            className="h-2 w-full flex-1 cursor-pointer appearance-none rounded-full bg-neutral-200 accent-primary"
                                        />
                                        <div className="shrink-0 text-center text-sm text-neutral-900 sm:text-right">
                                            <p>
                                                Annual rate: <span className="font-semibold">{interestRate.toFixed(2)}%</span>
                                            </p>
                                            <p className="text-neutral-500">Monthly rate: {(interestRate / 12).toFixed(2)}%</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-center text-xs text-neutral-600">
                                            The 30-year fixed national average is around {AVERAGE_RATE.toFixed(2)}% (Freddie Mac).
                                            Your actual rate depends on credit, down payment and lender.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-2">
                                    <button
                                        type="submit"
                                        className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        Calculate Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-h-[88dvh] overflow-y-auto overscroll-contain rounded-4xl p-5 sm:max-w-5xl sm:p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">Calculation Results</DialogTitle>
                    </DialogHeader>

                    {result && totals && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    { label: 'Monthly Payment', value: currencyPrecise.format(result.monthlyPayment) },
                                    { label: 'Total of Payments', value: currency.format(totals.totalPaid) },
                                    { label: 'Total Interest', value: currency.format(totals.totalInterest) },
                                    { label: 'Payoff Date', value: totals.payoffLabel },
                                    { label: 'Loan Amount', value: currency.format(result.params.loan) },
                                    { label: 'Down Payment', value: currency.format(totals.downPayment) },
                                    { label: 'Loan-to-Value', value: `${totals.ltv.toFixed(1)}%` },
                                    { label: 'Rate / Term', value: `${result.params.rate.toFixed(2)}% · ${result.params.years} yrs` },
                                ].map((card) => (
                                    <div key={card.label} className="rounded-2xl border border-border bg-muted/40 p-3">
                                        <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{card.label}</p>
                                        <p className="mt-1 text-sm font-semibold text-foreground">{card.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="inline-flex rounded-full border border-border p-0.5 text-xs font-medium">
                                    <button
                                        type="button"
                                        onClick={() => changeView('month')}
                                        className={cn(
                                            'rounded-full px-3.5 py-1.5 transition-colors',
                                            viewMode === 'month'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        By Month
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => changeView('year')}
                                        className={cn(
                                            'rounded-full px-3.5 py-1.5 transition-colors',
                                            viewMode === 'year'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        By Year
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPage(safePage - 1)}
                                        disabled={safePage === 0}
                                        className="inline-flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>
                                    <span className="min-w-40 text-center text-xs text-muted-foreground">
                                        {viewMode === 'month'
                                            ? `Year ${safePage + 1} · Months ${safePage * 12 + 1}–${Math.min((safePage + 1) * 12, activeRows.length)}`
                                            : `Page ${safePage + 1} of ${pageCount}`}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setPage(safePage + 1)}
                                        disabled={safePage >= pageCount - 1}
                                        className="inline-flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Phones get one compact card per row: a wide table there forces sideways scrolling that fights the page's vertical scroll. */}
                            <ul className="space-y-2 sm:hidden">
                                {pagedRows.map((row) => {
                                    const label = 'month' in row ? row.month : row.year;

                                    return (
                                        <li key={label} className="rounded-2xl border border-border p-3.5">
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-sm font-semibold">
                                                    {viewMode === 'month' ? 'Month' : 'Year'} {label}
                                                </span>
                                                <span className="text-xs text-muted-foreground">Balance {currencyPrecise.format(row.balance)}</span>
                                            </div>
                                            <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
                                                {[
                                                    [viewMode === 'month' ? 'Payment' : 'Paid', row.payment],
                                                    ['Principal', row.principal],
                                                    ['Interest', row.interest],
                                                ].map(([name, value]) => (
                                                    <div key={name as string} className="rounded-xl bg-muted/50 p-2">
                                                        <dt className="text-[10px] text-muted-foreground uppercase">{name}</dt>
                                                        <dd className="mt-0.5 font-medium">{currencyPrecise.format(value as number)}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="hidden overflow-x-auto rounded-3xl border border-border sm:block">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted text-xs uppercase text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-2.5">{viewMode === 'month' ? 'Month' : 'Year'}</th>
                                            <th className="px-4 py-2.5">{viewMode === 'month' ? 'Monthly Payment' : 'Paid This Year'}</th>
                                            <th className="px-4 py-2.5">Principal</th>
                                            <th className="px-4 py-2.5">Interest</th>
                                            <th className="px-4 py-2.5">Remaining Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedRows.map((row) => {
                                            const label = 'month' in row ? row.month : row.year;

                                            return (
                                                <tr key={label} className="border-t border-border">
                                                    <td className="px-4 py-2.5 font-medium">{label}</td>
                                                    <td className="px-4 py-2.5">{currencyPrecise.format(row.payment)}</td>
                                                    <td className="px-4 py-2.5">{currencyPrecise.format(row.principal)}</td>
                                                    <td className="px-4 py-2.5">{currencyPrecise.format(row.interest)}</td>
                                                    <td className="px-4 py-2.5">{currencyPrecise.format(row.balance)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-accent"
                                >
                                    <RotateCcw className="size-4" />
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
