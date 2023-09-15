<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'id','bus_id', 'route_id','emp_id','start_location', 'end_location','departure_time','arrival_time','user_id',
    ];

    public function bus()
    {
        return $this->belongsTo(Bus::class, 'bus_id', 'id');
    }
    public function route()
    {
        return $this->belongsTo(Route::class, 'route_id', 'id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id', 'id');
    }
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

}
