<?php

use App\Support\UserAgentParser;

test('it reads device, browser and os', function (string $ua, array $expected) {
    expect(UserAgentParser::parse($ua))->toMatchArray($expected);
})->with([
    'iPhone Safari' => ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1', ['device_type' => 'mobile', 'browser' => 'Safari', 'os' => 'iOS']],
    'Android Chrome' => ['Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36', ['device_type' => 'mobile', 'browser' => 'Chrome', 'os' => 'Android']],
    'Windows Edge' => ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36 Edg/120.0', ['device_type' => 'desktop', 'browser' => 'Edge', 'os' => 'Windows']],
    'iPad' => ['Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Safari/604.1', ['device_type' => 'tablet', 'browser' => 'Safari', 'os' => 'iOS']],
    'Instagram in-app' => ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148 Instagram 300.0', ['browser' => 'Instagram App']],
    'TikTok in-app' => ['Mozilla/5.0 (Linux; Android 14) Chrome/120 Mobile Safari/537.36 musical_ly_30.0', ['browser' => 'TikTok App']],
]);

test('it flags bots and empty agents', function (?string $ua) {
    expect(UserAgentParser::parse($ua)['is_bot'])->toBeTrue();
})->with(['Googlebot/2.1', 'facebookexternalhit/1.1', '', null]);
