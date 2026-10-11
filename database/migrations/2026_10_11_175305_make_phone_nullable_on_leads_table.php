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
        // Leads imported from the old site's contact form never collected a phone number — leaving
        // this required would force a fabricated placeholder into real customer records.
        Schema::table('leads', function (Blueprint $table) {
            $table->string('phone', 32)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->string('phone', 32)->nullable(false)->change();
        });
    }
};
