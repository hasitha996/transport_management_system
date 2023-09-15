<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'id','first_name', 'last_name', 'position','contact','user_id',
    ];
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
