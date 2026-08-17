export function LoanPrograms() {
    return (
        <section className="relative bg-[#071326] py-24 sm:py-32">
            <svg
                aria-hidden="true"
                viewBox="0 0 1120 330"
                preserveAspectRatio="none"
                className="pointer-events-none absolute top-0 right-0 z-0 h-[115px] w-full md:h-[330px] md:w-[78vw] md:max-w-[1120px]"
            >
                <path d="M0 0H1120V330C853 63 635 0 0 0Z" fill="#ffffff" />
            </svg>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl">Loan Products &amp; Programs</h2>
                    <p className="mt-4 text-lg text-white/60">
                        Whatever you're financing, there's a program built for it — explore the options below.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-72 rounded-3xl border border-white/10 bg-white/5 transition-colors hover:border-white/20"
                        />
                    ))}
                </div>
            </div>

            <svg
                aria-hidden="true"
                viewBox="122 0 390 122"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[122px] left-0 z-0 h-[122px] w-full md:hidden"
            >
                <path d="M633.705 0.002C473.853 0.002 316.853 -1.998 316.853 121.93C316.853 -0.998 163.853 0.002 0 0.002H633.705Z" fill="#071326" />
            </svg>

            <svg
                aria-hidden="true"
                viewBox="0 0 634 122"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[122px] left-1/2 z-0 hidden h-[122px] w-[634px] max-w-[44vw] -translate-x-1/2 md:block"
            >
                <path d="M633.705 0.002C473.853 0.002 316.853 -1.998 316.853 121.93C316.853 -0.998 163.853 0.002 0 0.002H633.705Z" fill="#071326" />
            </svg>
        </section>
    );
}
