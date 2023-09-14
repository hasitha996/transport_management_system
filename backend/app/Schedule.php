<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'id','bus_id', 'route_id','emp_id', 'end_location','departure_time','arrival_time','user_id',
    ];
}
