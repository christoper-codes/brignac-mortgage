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
        // Server-side companion to the Meta browser pixel: a permanent access token from Events
        // Manager, plus an optional test event code used only while verifying setup there.
        Schema::table('tracking_settings', function (Blueprint $table) {
            $table->text('meta_capi_token')->nullable()->after('meta_pixel_id');
            $table->string('meta_test_event_code')->nullable()->after('meta_capi_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tracking_settings', function (Blueprint $table) {
            $table->dropColumn(['meta_capi_token', 'meta_test_event_code']);
        });
    }
};
