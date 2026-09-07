import { Link } from '@inertiajs/react';
import { List, Section } from '@/partials/legal/legal-section';

export function TermsContent() {
    return (
        <div className="space-y-8">
            <p className="text-sm leading-relaxed text-foreground/70">
                Welcome to Brignac Mortgage ("Company," "we," "us," or "our"). By accessing or using our website,{' '}
                <a href="https://www.brignacmortgage.com" className="text-primary hover:underline">
                    www.brignacmortgage.com
                </a>
                , you agree to be bound by these Terms of Use. If you do not agree, please do not use this Website.
            </p>

            <Section number={1} title="Company Role and Services">
                <p>
                    Brignac Mortgage is a wholesale mortgage broker. We do not fund, underwrite, or service loans. Our role is to assist
                    clients in identifying and applying for mortgage loan products offered by third-party lenders. Loan approval, terms, and
                    funding are determined solely by the respective lenders and not by Brignac Mortgage.
                </p>
            </Section>

            <Section number={2} title="Permitted Use">
                <p>
                    You are granted a limited, non-exclusive, non-transferable right to use this Website for lawful purposes, including
                    researching mortgage options, requesting consultations, and submitting loan inquiries. You agree not to:
                </p>
                <List
                    items={[
                        'Use the Website for any fraudulent, unlawful, or unauthorized purpose.',
                        "Copy, reproduce, modify, distribute, sell, or lease any part of the Website's content without our prior written consent.",
                        "Attempt to interfere with or disrupt the Website's operation.",
                    ]}
                />
            </Section>

            <Section number={3} title="No Guarantee of Loan Approval">
                <p>
                    The information provided on this Website is for informational purposes only and does not constitute an offer to lend or a
                    guarantee of approval. Loan programs, rates, and terms are subject to change at any time without notice. All final
                    lending decisions are made by third-party lenders.
                </p>
            </Section>

            <Section number={4} title="No Financial or Legal Advice">
                <p>
                    The content provided on this Website is not financial, legal, or professional advice. You should consult with a
                    qualified financial advisor, attorney, or mortgage professional before making any financial decisions.
                </p>
            </Section>

            <Section number={5} title="Privacy and Communication Consent">
                <p>By submitting your contact information on this Website, you consent to:</p>
                <List
                    items={[
                        'Receive communications from Brignac Mortgage and its affiliates, including phone calls, emails, and text messages regarding mortgage-related services.',
                        'Be contacted via automated systems, SMS/text messages, or prerecorded voice messages, even if your number is on a Do-Not-Call list.',
                        'Opt out at any time by following the instructions in the communication. Standard message and data rates may apply.',
                    ]}
                />
                <p>
                    For details on how we collect and use your personal data, please review our{' '}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </Section>

            <Section number={6} title="Third-Party Links and Content">
                <p>
                    This Website may contain links to third-party websites. Brignac Mortgage does not endorse or assume responsibility for
                    the content, policies, or practices of any third-party site.
                </p>
            </Section>

            <Section number={7} title="Limitation of Liability">
                <p>
                    To the fullest extent permitted by law, Brignac Mortgage is not liable for any direct, indirect, incidental,
                    consequential, or punitive damages arising from:
                </p>
                <List
                    items={[
                        'Your use of or inability to use the Website.',
                        'Any decision made based on Website content.',
                        'Any errors, omissions, or changes in loan terms by third-party lenders.',
                    ]}
                />
            </Section>

            <Section number={8} title="Indemnification">
                <p>
                    You agree to indemnify and hold harmless Brignac Mortgage, its employees, and affiliates from any claims, damages, or
                    losses resulting from your use of the Website or violation of these Terms.
                </p>
            </Section>

            <Section number={9} title="Changes to Terms">
                <p>
                    Brignac Mortgage reserves the right to update or modify these Terms at any time. Your continued use of the Website after
                    changes are posted constitutes acceptance of the revised Terms.
                </p>
            </Section>

            <Section number={10} title="Governing Law">
                <p>These Terms are governed by the laws of the State of Louisiana, without regard to conflict of law principles.</p>
            </Section>

            <Section number={11} title="Contact Information">
                <p>For questions regarding these Terms, contact us at:</p>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-medium text-foreground">Brignac Mortgage</p>
                    <p className="mt-2">
                        <a href="mailto:Shaun@brignacmortgage.com" className="text-primary hover:underline">
                            Shaun@brignacmortgage.com
                        </a>
                    </p>
                    <p>
                        <a href="tel:+15045592821" className="text-primary hover:underline">
                            504-559-2821
                        </a>
                    </p>
                </div>
            </Section>
        </div>
    );
}
