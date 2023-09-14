<?php

namespace App\Http\Controllers;

use App\Bus;
use App\Schedule;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
   public function index(){
    try {

        $shadule = Schedule::count();
        $tdate = (new Carbon())->format('Y-m-d');
        $day_shadule = Schedule::where('departure_time',$tdate)->count();
        $no_of_bus = Bus::count();
        $users=User::count();

        $entities = array(
            'user_count' => $users,
            'no_of_bus' => $no_of_bus,
            'day_shadule' => $day_shadule,
            'total_shadule' => $shadule
        );

        return response()->json($entities, 200);
    } catch (\Exception $e) {
        return response()->json($e, 401);
    }
   }
}
