<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $fillable = [
        'id','route_name', 'start_location', 'end_location','distance','user_id',
    ];
}
