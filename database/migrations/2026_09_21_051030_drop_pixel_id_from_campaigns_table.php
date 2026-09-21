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
        // Pixels are site-wide now (tracking_settings), so a per-campaign pixel id is redundant.
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn('pixel_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->string('pixel_id')->nullable();
        });
    }
};
