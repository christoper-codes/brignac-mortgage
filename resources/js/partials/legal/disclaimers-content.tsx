import type { ReactNode } from 'react';

function Section({ number, title, children }: { number: number; title: string; children: ReactNode }) {
    return (
        <section className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground">
                {number}. {title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/70">{children}</div>
        </section>
    );
}

function List({ items }: { items: string[] }) {
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

export function DisclaimersContent() {
    return (
        <div className="space-y-8">
            <Section number={1} title="General Disclaimer">
                <p>
                    Brignac Mortgage is a wholesale mortgage broker licensed in the State of Louisiana. We do not fund, underwrite, approve, or
                    service mortgage loans. All loan products, terms, and conditions are offered through third-party lenders and are subject to
                    change without notice. Loan approval is based on individual lender criteria, creditworthiness, and market conditions.
                </p>
            </Section>

            <Section number={2} title="No Guarantee of Loan Approval">
                <p>
                    Completing an inquiry on this website does not constitute a loan application or approval. Loan qualification is determined
                    solely by the third-party lenders we work with. We make no guarantees regarding loan terms, interest rates, or approval
                    decisions.
                </p>
            </Section>

            <Section number={3} title="Third-Party Links and Content">
                <p>
                    Our website may contain links to third-party websites or resources. Brignac Mortgage does not control, endorse, or guarantee
                    the accuracy, security, or policies of any external content. Users should review the terms and privacy policies of
                    third-party websites before engaging with them.
                </p>
            </Section>

            <Section number={4} title="No Financial, Legal, or Tax Advice">
                <p>
                    The content on this website is for informational purposes only and should not be construed as financial, legal, or tax
                    advice. You should consult with a qualified financial advisor, attorney, or tax professional before making
                    mortgage-related decisions.
                </p>
            </Section>

            <Section number={5} title="Communications &amp; Consent Disclaimer">
                <p>
                    By submitting your contact information on this website, you consent to receive communication via phone, email, and/or text
                    messages from Brignac Mortgage or our lending partners. This may include automated messaging or prerecorded calls to the
                    number provided.
                </p>
                <List
                    items={[
                        'Message & data rates may apply.',
                        'Consent is not a condition of loan services.',
                        'You may opt out at any time by following the instructions in the communication.',
                        'Brignac Mortgage does not knowingly contact individuals listed on the National Do Not Call Registry unless authorized under an existing business relationship.',
                    ]}
                />
            </Section>

            <Section number={6} title="Equal Housing Opportunity Statement">
                <p>
                    Brignac Mortgage is an Equal Housing Opportunity Mortgage Broker and complies with all Louisiana state fair lending laws and
                    federal regulations, including the Fair Housing Act and Equal Credit Opportunity Act (ECOA). We do not discriminate based on
                    race, color, religion, national origin, sex, marital status, age, disability, or familial status.
                </p>
            </Section>

            <Section number={7} title="Licensing &amp; Regulatory Disclaimer">
                <p>
                    Brignac Mortgage is a Louisiana-licensed mortgage broker. We operate exclusively within the state of Louisiana and comply
                    with all local, state, and federal mortgage brokerage regulations.
                </p>
                <List
                    items={[
                        'Company NMLS ID:',
                        'Louisiana Residential Mortgage Lending License Number:',
                        'Licensed by the Louisiana Office of Financial Institutions (OFI)',
                    ]}
                />
                <p>For questions or complaints about mortgage brokers in Louisiana, you may contact:</p>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-medium text-foreground">Louisiana Office of Financial Institutions (OFI)</p>
                    <p className="mt-2">Main Phone: (225) 925-4660</p>
                    <p>Main Fax: (225) 925-4524</p>
                    <p>
                        Email:{' '}
                        <a href="mailto:ofila@ofi.la.gov" className="text-primary hover:underline">
                            ofila@ofi.la.gov
                        </a>
                    </p>
                    <p>
                        Website:{' '}
                        <a href="https://ofi.la.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            https://ofi.la.gov/
                        </a>
                    </p>
                </div>
            </Section>

            <Section number={8} title="Website Security &amp; Limitation of Liability">
                <p>
                    We take reasonable precautions to protect user data; however, we cannot guarantee that unauthorized access, cyberattacks, or
                    technical errors will never occur. By using this website, you agree that Brignac Mortgage is not liable for any damage
                    resulting from:
                </p>
                <List
                    items={[
                        'The use of this website or third-party links.',
                        'Loss of data or security breaches.',
                        'Errors, inaccuracies, or changes in loan programs.',
                    ]}
                />
            </Section>
        </div>
    );
}
