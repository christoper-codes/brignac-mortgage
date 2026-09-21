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
        // Which team member's button / link was clicked, so the dashboard can show who visitors prefer.
        Schema::table('cta_clicks', function (Blueprint $table) {
            $table->string('team_member')->nullable()->index()->after('target');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cta_clicks', function (Blueprint $table) {
            $table->dropColumn('team_member');
        });
    }
};
