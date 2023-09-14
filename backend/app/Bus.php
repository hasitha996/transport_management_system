<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    protected $fillable = [
        'id','bus_reg_no', 'capacity', 'model','user_id',
    ];
}
