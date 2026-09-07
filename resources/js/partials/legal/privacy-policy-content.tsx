import { Link } from '@inertiajs/react';
import { LabeledList, Section, SubSection } from '@/partials/legal/legal-section';

export function PrivacyPolicyContent() {
    return (
        <div className="space-y-8">
            <p className="text-sm leading-relaxed text-foreground/70">
                Brignac Mortgage ("Company," "we," "us," or "our") respects your privacy and is committed to protecting the personal
                information you provide when using our website,{' '}
                <a href="https://brignacmortgage.com" className="text-primary hover:underline">
                    https://brignacmortgage.com
                </a>
                . This Privacy Policy explains how we collect, use, share, and protect your information.
            </p>

            <Section number={1} title="Information We Collect">
                <p>We collect personal and non-personal information when you use our website or interact with us.</p>

                <SubSection letter="a" title="Personal Information" />
                <LabeledList
                    items={[
                        { label: 'Contact Details', description: 'Name, email address, phone number, and mailing address.' },
                        { label: 'Financial Information', description: 'Employment and income details (if voluntarily submitted).' },
                        {
                            label: 'Mortgage Preferences',
                            description: 'Information related to your mortgage inquiries, such as loan preferences and property details.',
                        },
                    ]}
                />

                <SubSection letter="b" title="Non-Personal Information" />
                <LabeledList
                    items={[
                        { label: 'Technical Data', description: 'IP address, browser type, and operating system.' },
                        { label: 'Usage Data', description: 'Website usage statistics and analytics.' },
                        {
                            label: 'Cookies',
                            description: 'Information collected through cookies and similar tracking technologies (see Section 6 for details).',
                        },
                    ]}
                />
            </Section>

            <Section number={2} title="How We Use Your Information">
                <LabeledList
                    items={[
                        { label: 'Brokerage Services', description: 'Assist you in identifying mortgage loan products and lenders.' },
                        { label: 'Communication', description: 'Respond to inquiries and provide customer support.' },
                        {
                            label: 'Marketing',
                            description: 'Send updates, promotional messages, and mortgage-related communications (with your consent).',
                        },
                        { label: 'Improvement', description: 'Enhance our website and services.' },
                        { label: 'Compliance', description: 'Adhere to legal and regulatory requirements.' },
                    ]}
                />
                <p>
                    Note: We do not make loan decisions, underwrite, fund, or service mortgage loans. All financial decisions, approvals, or
                    loan terms are determined by third-party lenders.
                </p>
            </Section>

            <Section number={3} title="How We Share Your Information">
                <SubSection letter="a" title="Third-Party Lenders & Partners" />
                <p>
                    As a mortgage broker, we may share relevant details with wholesale lenders to process your mortgage inquiries. We do not
                    control how third-party lenders use your information. You should review their privacy policies before proceeding with any
                    loan application.
                </p>

                <SubSection letter="b" title="Service Providers" />
                <p>
                    We may engage third-party service providers to perform functions on our behalf, such as data analysis, marketing
                    assistance, and customer service. These providers have access to your information only as necessary to perform their
                    functions and are obligated to maintain its confidentiality.
                </p>

                <SubSection letter="c" title="Legal Obligations" />
                <p>
                    We may disclose your information when required by law, regulation, or legal process, or to protect the rights, property,
                    or safety of Brignac Mortgage, our clients, or others.
                </p>
            </Section>

            <Section number={4} title="Your Choices and Rights">
                <LabeledList
                    items={[
                        { label: 'Access', description: 'Request a copy of the personal information we hold about you.' },
                        { label: 'Correction', description: 'Request correction of any inaccurate or incomplete information.' },
                        { label: 'Deletion', description: 'Request deletion of your personal information, subject to legal obligations.' },
                        {
                            label: 'Opt-Out',
                            description: 'Unsubscribe from marketing communications by following the instructions in the communication or contacting us directly.',
                        },
                    ]}
                />
                <p>
                    To exercise these rights, please contact us via our{' '}
                    <Link href="/about" className="text-primary hover:underline">
                        About Us
                    </Link>{' '}
                    page.
                </p>
            </Section>

            <Section number={5} title="Security Measures">
                <p>
                    We implement reasonable security measures to protect your personal information from unauthorized access, use, or
                    disclosure. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we
                    cannot guarantee absolute security.
                </p>
            </Section>

            <Section number={6} title="Cookies and Tracking Technologies">
                <p>
                    We use cookies and similar tracking technologies to enhance your experience on our website. You can set your browser to
                    refuse all or some browser cookies or to alert you when websites set or access cookies. If you disable or refuse cookies,
                    some parts of the Website may become inaccessible or not function properly.
                </p>
            </Section>

            <Section number={7} title="Third-Party Links">
                <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of
                    these sites. We encourage you to read the privacy policies of any linked websites you visit.
                </p>
            </Section>

            <Section number={8} title="Children's Privacy">
                <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from
                    children under 18. If we become aware that we have inadvertently received personal information from a user under the age
                    of 18, we will delete such information from our records.
                </p>
            </Section>

            <Section number={9} title="Changes to This Privacy Policy">
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision
                    date. Your continued use of the Website after such changes constitutes your acceptance of the new Privacy Policy.
                </p>
            </Section>

            <Section number={10} title="Contact Us">
                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-medium text-foreground">Brignac Mortgage</p>
                    <p className="mt-2">
                        <a href="mailto:shaun@brignacmortgage.com" className="text-primary hover:underline">
                            shaun@brignacmortgage.com
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
