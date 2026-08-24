import { RotateCcw } from 'lucide-react';
import {  useState } from 'react';
import type {FormEvent} from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TERM_OPTIONS = [
    { value: '15', label: '15 years' },
    { value: '20', label: '20 years' },
    { value: '30', label: '30 years' },
];

const RATE_SOURCES = [
    { label: 'fred.stlouisfed.org', href: 'https://fred.stlouisfed.org/series/MORTGAGE30US/' },
    { label: 'www.bankrate.com', href: 'https://www.bankrate.com/mortgages/mortgage-rates/' },
    { label: 'money.usnews.com', href: 'https://money.usnews.com/loans/rates/mortgages/mortgage-rates' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const currencyPrecise = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

type ScheduleRow = { month: number; payment: number; principal: number; interest: number; balance: number };

function calculateAmortization(principal: number, annualRatePct: number, years: number): { monthlyPayment: number; schedule: ScheduleRow[] } {
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

export function Calculator() {
    const [propertyValue, setPropertyValue] = useState('450000');
    const [loanNeeded, setLoanNeeded] = useState('360000');
    const [termYears, setTermYears] = useState('30');
    const [interestRate, setInterestRate] = useState(6.91);
    const [errors, setErrors] = useState<{ property?: string; loan?: string }>({});
    const [result, setResult] = useState<{ monthlyPayment: number; schedule: ScheduleRow[] } | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

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

        setResult(calculateAmortization(loan, interestRate, Number(termYears)));
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
                    <div className="px-4 text-neutral-900 sm:pt-52">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <span className="inline-flex rounded-full bg-neutral-100 px-5 py-1.5 text-xs font-medium tracking-wide text-neutral-600 uppercase">
                                    Simulator
                                </span>
                                <h2 className="text-3xl text-neutral-900 sm:text-4xl">
                                    Mortgage <span className="text-primary">Loan</span> Calculator
                                </h2>
                                <div className="flex flex-col items-center gap-2 text-xs text-neutral-500 sm:flex-row sm:gap-4">
                                    <p className="font-medium">Average interest rate in the United States. Sources:</p>
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
                                        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 focus-within:border-primary">
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
                                        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 focus-within:border-primary">
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
                                            <SelectTrigger className="h-auto w-full rounded-xl border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-neutral-900 [&_svg]:text-neutral-400">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TERM_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
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
                                            min={3.5}
                                            max={7.5}
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
                                            The average interest rate is 6.91% according to the U.S. national average.
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
                {/* <div className="relative mx-auto flex w-full items-center justify-center">
                    <img
                        src="/img/calculator.png"
                        alt="lion Brignac Mortgage"
                        className="h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white to-transparent" />
                </div> */}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">Calculation Results</DialogTitle>
                    </DialogHeader>

                    {result && (
                        <div className="space-y-6">
                            <div className="flex flex-wrap justify-center gap-3">
                                <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
                                    Pay {currencyPrecise.format(result.monthlyPayment)} / month
                                </span>
                                <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">Term of {termYears} years</span>
                                <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
                                    Loan of {currency.format(Number(loanNeeded))}
                                </span>
                                <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">Rate: {interestRate.toFixed(2)}%</span>
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

                            <div className="max-h-80 overflow-auto rounded-lg border border-border">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted text-muted-foreground sticky top-0 text-xs uppercase">
                                        <tr>
                                            <th className="px-4 py-2">Month</th>
                                            <th className="px-4 py-2">Payment</th>
                                            <th className="px-4 py-2">Principal</th>
                                            <th className="px-4 py-2">Interest</th>
                                            <th className="px-4 py-2">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.schedule.map((row) => (
                                            <tr key={row.month} className="border-t border-border">
                                                <td className="px-4 py-2">{row.month}</td>
                                                <td className="px-4 py-2">{currencyPrecise.format(row.payment)}</td>
                                                <td className="px-4 py-2">{currencyPrecise.format(row.principal)}</td>
                                                <td className="px-4 py-2">{currencyPrecise.format(row.interest)}</td>
                                                <td className="px-4 py-2">{currencyPrecise.format(row.balance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
