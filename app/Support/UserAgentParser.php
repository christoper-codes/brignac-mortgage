<?php

namespace App\Support;

class UserAgentParser
{
    /**
     * Reduces a raw user agent to the few facts the dashboard reports on.
     *
     * @return array{device_type: string, browser: string, os: string, is_bot: bool}
     */
    public static function parse(?string $userAgent): array
    {
        $ua = (string) $userAgent;

        return [
            'device_type' => self::device($ua),
            'browser' => self::browser($ua),
            'os' => self::os($ua),
            'is_bot' => $ua === '' || (bool) preg_match('/bot|crawl|spider|slurp|headless|lighthouse|monitor|preview|curl|wget|python-requests|facebookexternalhit/i', $ua),
        ];
    }

    private static function device(string $ua): string
    {
        return match (true) {
            (bool) preg_match('/ipad|tablet|android(?!.*mobile)/i', $ua) => 'tablet',
            (bool) preg_match('/mobi|iphone|ipod|android/i', $ua) => 'mobile',
            default => 'desktop',
        };
    }

    private static function browser(string $ua): string
    {
        // In-app browsers first: traffic from ads is mostly opened inside the social app itself.
        return match (true) {
            (bool) preg_match('/FBAN|FBAV|FB_IAB/i', $ua) => 'Facebook App',
            (bool) preg_match('/Instagram/i', $ua) => 'Instagram App',
            (bool) preg_match('/TikTok|musical_ly|BytedanceWebview/i', $ua) => 'TikTok App',
            (bool) preg_match('/Edg(e|A|iOS)?\//i', $ua) => 'Edge',
            (bool) preg_match('/OPR\/|Opera/i', $ua) => 'Opera',
            (bool) preg_match('/SamsungBrowser/i', $ua) => 'Samsung Internet',
            (bool) preg_match('/Firefox|FxiOS/i', $ua) => 'Firefox',
            (bool) preg_match('/Chrome|CriOS/i', $ua) => 'Chrome',
            (bool) preg_match('/Safari/i', $ua) => 'Safari',
            (bool) preg_match('/MSIE|Trident/i', $ua) => 'Internet Explorer',
            default => 'Other',
        };
    }

    private static function os(string $ua): string
    {
        return match (true) {
            (bool) preg_match('/iPhone|iPad|iPod/i', $ua) => 'iOS',
            (bool) preg_match('/Android/i', $ua) => 'Android',
            (bool) preg_match('/CrOS/i', $ua) => 'ChromeOS',
            (bool) preg_match('/Windows/i', $ua) => 'Windows',
            (bool) preg_match('/Macintosh|Mac OS X/i', $ua) => 'macOS',
            (bool) preg_match('/Linux/i', $ua) => 'Linux',
            default => 'Other',
        };
    }
}
