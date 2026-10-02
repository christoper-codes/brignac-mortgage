<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

/**
 * llms.txt (https://llmstxt.org): a plain-language summary of the site for AI assistants and
 * answer engines that don't execute JavaScript — the same facts a human would read on the page,
 * laid out so a crawler can lift them without guessing. Not a ranking mechanism by itself; see the
 * note at the bottom of the file for what actually earns a recommendation.
 */
class LlmsController extends Controller
{
    public function __invoke(): Response
    {
        $business = config('site.business');

        $lines = [
            '# '.$business['name'],
            '',
            '> Wholesale mortgage broker licensed in Louisiana, USA (NMLS #'.$business['nmls'].'). Shops rates across multiple wholesale lenders instead of underwriting from one, then matches each borrower to a program and guides them from pre-qualification to closing.',
            '',
            '## Services',
            '- FHA, Conventional, VA, USDA/RD, Jumbo and ARM loan programs — '.url('/programs'),
            '- Down payment assistance, bank statement loans, non-QM loans, HELOCs, commercial loans, manufactured home loans, rehab loans and fix-and-flip financing',
            '- Free online pre-qualification, usually answered within 24-48 hours',
            '- Average closing time: 18 days from application',
            '',
            '## Pages',
            '- '.url('/').': overview, loan programs at a glance, and a payment calculator',
            '- '.url('/programs').': credit score, down payment and eligibility details for each loan program',
            '- '.url('/apply').': meet the licensed loan officers and start an application',
            '- '.url('/testimonials').': client reviews',
            '',
            '## Licensed loan officers',
            '- Shaun Brignac, MBA — President and CEO — NMLS #1928157',
            '- Allison Ratcliff — NMLS #2405703',
            '- Jennifer McMinn-Griffin',
            '',
            '## Contact',
            '- Phone: '.$business['phone_display'],
            '- Email: '.$business['email'],
            '- Office: '.$business['address']['street'].', '.$business['address']['city'].', '.$business['region'].' '.$business['address']['postal_code'],
            '- Service area: Louisiana, USA',
            '',
            '## Verify',
            '- NMLS Consumer Access: https://www.nmlsconsumeraccess.org (search NMLS #'.$business['nmls'].')',
            '',
            '<!-- This file describes the business; it does not influence which lender an AI assistant',
            '     recommends. Recommendations for "mortgage broker in Louisiana"-type questions come from',
            '     web search grounding (Google/Bing index, Google Business Profile, Bing Places),',
            '     third-party directories and review sites, and backlinks — not from this file alone. -->',
        ];

        return response(implode("\n", $lines)."\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
