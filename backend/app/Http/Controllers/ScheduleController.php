<?php

namespace App\Http\Controllers;

use App\Bus;
use App\Employee;
use App\Route;
use App\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        try {

            $schedules = Schedule::with('route', 'employee', 'bus')->get();
            $bus = Bus::get();
            $route = Route::get();
            $employee = Employee::get();
            $entities = array(
                'scheduledet' => $schedules,
                'bus' => $bus,
                'route' => $route,
                'employee' => $employee,
            );

            return response()->json($entities, 200);
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
    public function store(Request $request)
    {

        try {

            // Validate the incoming request data
            $validatedData = $request->validate([
                'bus_id' => 'required',
                'route_id' => 'required',
                'emp_id' => 'required',
                'start_location' => 'required',
                'end_location' => 'required',
                'departure_time' => 'required',
                'arrival_time' => 'required',
                'user_id' => 'required',
            ]);

            $departureTime = date('Y-m-d H:i:s', strtotime($validatedData['departure_time']));
            $arrivalTime = date('Y-m-d H:i:s', strtotime($validatedData['arrival_time']));

            // Assuming $schedules is an instance of your model


            $schedules = new Schedule();
            $schedules->bus_id = $validatedData['bus_id'];
            $schedules->route_id = $validatedData['route_id'];
            $schedules->emp_id = $validatedData['emp_id'];
            $schedules->start_location = $validatedData['start_location'];
            $schedules->end_location = $validatedData['end_location'];
            $schedules->departure_time = $departureTime;
            $schedules->arrival_time = $arrivalTime;
            $schedules->user_id =  $validatedData['user_id'];

            $schedules->save();

            return response()->json('save successfully', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }

    public function update(Request $request)
    {
        try {

            // Validate the incoming request data
            $validatedData = $request->validate([
                'bus_id' => 'required',
                'route_id' => 'required',
                'emp_id' => 'required',
                'start_location' => 'required',
                'end_location' => 'required',
                'departure_time' => 'required',
                'arrival_time' => 'required',
                'user_id' => 'required',
            ]);

            $departureTime = date('Y-m-d H:i:s', strtotime($validatedData['departure_time']));
            $arrivalTime = date('Y-m-d H:i:s', strtotime($validatedData['arrival_time']));

            $schedules = Schedule::where('id', $request->id)->first();
            $schedules->bus_id = $validatedData['bus_id'];
            $schedules->route_id = $validatedData['route_id'];
            $schedules->emp_id = $validatedData['emp_id'];
            $schedules->start_location = $validatedData['start_location'];
            $schedules->end_location = $validatedData['end_location'];
            $schedules->departure_time = $departureTime;
            $schedules->arrival_time = $arrivalTime;
            $schedules->user_id =  $validatedData['user_id'];

            $schedules->save();

            return response()->json('save successfully', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }
    public function destroy($id)
    {
        $schedules = Schedule::find($id);

        if (!$schedules) {
            return response()->json('schedule not found', 404);
        }
        $schedules->delete();

        return response()->json('schedule deleted successfully', 200);
    }

    public function loadOne($id)
    {
        try {

            $schedules = Schedule::where('id', $id)->first();
            $entities = array(
                'scheduledet' => $schedules
            );

            return response()->json($entities, 200);
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
}
