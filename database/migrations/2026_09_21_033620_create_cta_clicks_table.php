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
        Schema::create('cta_clicks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained()->nullOnDelete();
            $table->string('visitor_id', 64)->index();
            $table->string('label');
            $table->string('target', 1024)->nullable();
            $table->string('path', 512);
            $table->string('ip_address', 45)->nullable();
            $table->string('country_code', 2)->nullable();
            $table->string('region_code', 8)->nullable()->index();
            $table->string('region')->nullable();
            $table->string('city')->nullable();
            $table->text('user_agent')->nullable();
            $table->string('device_type', 16)->nullable();
            $table->string('browser', 32)->nullable();
            $table->string('os', 32)->nullable();
            $table->timestamp('created_at')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cta_clicks');
    }
};
