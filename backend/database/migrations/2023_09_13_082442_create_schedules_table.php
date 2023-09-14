<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id(); // This creates an auto-increment primary key column.
            $table->unsignedBigInteger('bus_id');
            $table->unsignedBigInteger('route_id');
            $table->string('end_location', 60);
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('schedules');
    }
}
