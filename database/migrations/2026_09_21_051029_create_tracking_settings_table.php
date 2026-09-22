<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // A single row: the site-wide ad / analytics IDs (one pixel per platform, not per campaign).
        Schema::create('tracking_settings', function (Blueprint $table) {
            $table->id();
            $table->string('meta_pixel_id')->nullable();
            // Server-side companion to the Meta browser pixel: a permanent access token from Events
            // Manager, plus an optional test event code used only while verifying setup there.
            $table->text('meta_capi_token')->nullable();
            $table->string('meta_test_event_code')->nullable();
            $table->string('tiktok_pixel_id')->nullable();
            $table->string('google_analytics_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracking_settings');
    }
};
