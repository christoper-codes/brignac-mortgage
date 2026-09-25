<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // owner | admin. Everyone starts as admin; only the owner can see who has signed in and when.
            $table->string('role', 16)->default('admin')->index()->after('email');
            $table->timestamp('last_login_at')->nullable()->after('remember_token');
            $table->unsignedInteger('login_count')->default(0)->after('last_login_at');
            $table->string('last_login_ip', 45)->nullable()->after('login_count');
        });

        DB::table('users')->where('email', 'christoper.patiho@gmail.com')->update(['role' => 'owner']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropColumn(['role', 'last_login_at', 'login_count', 'last_login_ip']);
        });
    }
};
