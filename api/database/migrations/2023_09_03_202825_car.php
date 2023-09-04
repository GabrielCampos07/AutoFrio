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
        Schema::create('car', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('brand_id');
            $table->unsignedBigInteger('license_plate');
            $table->integer('year');
            $table->integer('mileage');
            $table->string('color');
            $table->timestamps();

            $table->foreign('brand_id')->references('id')->on('car_brand');
            $table->foreign('model_id')->references('id')->on('car_model');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car');

    }
};
