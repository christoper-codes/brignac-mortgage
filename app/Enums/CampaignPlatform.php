<?php

namespace App\Enums;

enum CampaignPlatform: string
{
    case Facebook = 'facebook';
    case Instagram = 'instagram';
    case TikTok = 'tiktok';

    public function label(): string
    {
        return match ($this) {
            self::Facebook => 'Facebook',
            self::Instagram => 'Instagram',
            self::TikTok => 'TikTok',
        };
    }
}
