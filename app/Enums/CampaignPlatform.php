<?php

namespace App\Enums;

enum CampaignPlatform: string
{
    case Facebook = 'facebook';
    case Instagram = 'instagram';
    case TikTok = 'tiktok';
    case Meta = 'meta';
    case YouTube = 'youtube';

    public function label(): string
    {
        return match ($this) {
            self::Facebook => 'Facebook',
            self::Instagram => 'Instagram',
            self::TikTok => 'TikTok',
            self::Meta => 'Meta',
            self::YouTube => 'YouTube',
        };
    }
}
