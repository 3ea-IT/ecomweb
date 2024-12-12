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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id'); // Foreign key for users table
            $table->string('address_id'); // Foreign key for address table
            $table->integer('total_item'); // Total number of items in the order
            $table->decimal('item_total_amount', 10, 2); // Total amount for items
            $table->decimal('delivery_charge', 10, 2)->default(0.00); // Delivery charge
            $table->decimal('wallet_balance', 10, 2)->default(0.00); // Wallet balance used
            $table->string('promo_code')->nullable(); // Promo code applied
            $table->decimal('promo_discount', 10, 2)->default(0.00); // Discount from promo code
            $table->decimal('discount', 10, 2)->default(0.00); // Other discounts
            $table->decimal('total_payable', 10, 2); // Total payable amount
            $table->string('payment_method'); // Payment method (e.g., COD, card)
            $table->decimal('lat', 10, 7)->nullable(); // Latitude for delivery location
            $table->decimal('long', 10, 7)->nullable(); // Longitude for delivery location
            $table->string('delivery_time')->nullable(); // Preferred delivery time
            $table->date('delivery_date')->nullable(); // Preferred delivery date
            $table->string('otp', 6)->nullable(); // OTP for order confirmation
            $table->text('notes')->nullable(); // Additional notes for the order
            $table->string('status')->default('pending'); // Order status (e.g., pending, completed)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
