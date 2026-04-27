<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('loan_purpose')->nullable(); // purchase, refinance
            $table->decimal('property_value', 12, 2)->nullable();
            $table->decimal('monthly_income', 12, 2)->nullable();
            $table->string('credit_score_range')->nullable(); // excellent, good, fair, poor
            $table->string('purchase_timeline')->nullable(); // asap, 1-3months, 3-6months, exploring
            $table->json('quiz_answers')->nullable();
            $table->unsignedSmallInteger('score')->default(0);
            $table->string('status')->default('new'); // new, contacted, qualified, converted
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('utm_content')->nullable();
            $table->string('utm_term')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->boolean('opt_in_sms')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
