<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * The real inquiries submitted through the old site's plain contact form (table `emails` in the
 * legacy `db_brignac_mortgage` MySQL database), carried over as a one-time historical import.
 *
 * That form only ever collected an email, a subject and a message — no name field, no phone, and
 * none of the campaign/UTM/device context this app tracks for new leads. Rather than fabricate
 * any of that:
 * - `full_name` uses the old `subject` field verbatim. Most rows have a real name there, but two
 *   just say "I request information" (the form's own placeholder-like default) — left as-is
 *   rather than guessing a name that was never actually given.
 * - `phone` is null for every row (see the migration that made leads.phone nullable).
 * - Everything else this app tracks today (campaign_id, UTM, IP, device, consent, etc.) is null —
 *   none of it exists for these older, pre-tracking submissions.
 *
 * Three of the original ten rows were deliberately left out of this list entirely: two were job
 * applications (resumes attached) and one was a vendor sales pitch — not mortgage inquiries, so
 * importing them as "leads" would misrepresent what the Leads dashboard is for.
 */
class LegacyLeadsSeeder extends Seeder
{
    public function run(): void
    {
        $leads = [
            [
                'full_name' => 'Cole Wade',
                'email' => 'colewade15@gmail.com',
                'message' => "Curious if yall provide self build construction loans. If so could you send a packet of possible interest rates, what's y'all requirements, and how y'all process works. Only reason why I'm asking because everybody is a little bit different. Thanks.",
                'created_at' => '2025-09-16 19:11:09',
            ],
            [
                'full_name' => 'I request information',
                'email' => 'bobby@humanhouser.com',
                'message' => 'I would like to see the plans that you offer on your website and information about them',
                'created_at' => '2025-10-24 17:19:05',
            ],
            [
                'full_name' => 'Brooke Fayard',
                'email' => 'brookefayard@yahoo.com',
                'message' => 'Hi, I am looking to finance a used double wide mobile home. It needs to be moved to my property. Do yall do this?',
                'created_at' => '2026-02-20 17:12:38',
            ],
            [
                'full_name' => 'Brooke Fayard',
                'email' => 'brookefayard@yahoo.com',
                'message' => "Hi, Josh Romine with EFCU gave me Shaun's number. I am looking to try and finance a used 2022 double wide mobile home. They are asking \$140,000 for it. It needs to be moved to my property.",
                'created_at' => '2026-02-20 17:24:35',
            ],
            [
                'full_name' => 'Katrina Gregory',
                'email' => 'k.gregory30@hotmail.com',
                'message' => 'Looking to buy a home in 2026',
                'created_at' => '2026-03-27 16:34:25',
            ],
            [
                'full_name' => 'Kanisha McKinney-Roberts',
                'email' => 'kandishair2@lgmail.com',
                'message' => 'I am interested in working with Cynthia Roman, thank you.',
                'created_at' => '2026-04-14 02:25:31',
            ],
            [
                'full_name' => 'I request information',
                'email' => 'kandishair2@gmail.com',
                'message' => 'I would like to see the plans that you offer on your website and information about them',
                'created_at' => '2026-04-14 02:26:29',
            ],
        ];

        // Inserted directly (not Lead::create()) so each row keeps its real historical
        // created_at/updated_at instead of Eloquent stamping them to "now".
        DB::table('leads')->insert(array_map(
            fn (array $lead) => [
                ...$lead,
                'phone' => null,
                'status' => 'new',
                'updated_at' => $lead['created_at'],
            ],
            $leads,
        ));
    }
}
