<?php

namespace App\Http\Controllers;

use App\Route;
use App\Schedule;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        try {

            $routes = Route::get();
            $entities = array(
                'routedet' => $routes
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
                'route_name' => 'required',
                'start_location' => 'required',
                'end_location' => 'required',
                'distance' => 'required',
                'user_id' => 'required',

            ]);

            $routes = new Route();
            $routes->route_name = $validatedData['route_name'];
            $routes->start_location = $validatedData['start_location'];
            $routes->end_location = $validatedData['end_location'];
            $routes->distance = $validatedData['distance'];
            $routes->user_id =  $validatedData['user_id'];

            $routes->save();

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
                'route_name' => 'required',
                'start_location' => 'required',
                'end_location' => 'required',
                'distance' => 'required',
                'user_id' => 'required',

            ]);

        
            $routes = Route::where('id', $request->id)->first();
            $routes->route_name = $validatedData['route_name'];
            $routes->start_location = $validatedData['start_location'];
            $routes->end_location = $validatedData['end_location'];
            $routes->distance = $validatedData['distance'];
            $routes->user_id = $validatedData['user_id'];

            $routes->save();

            return response()->json('save successfully', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }
    public function destroy($id)
    {
        $routes = Route::find($id);

        if (!$routes) {
            return response()->json('route not found', 404);
        }
        $routes->delete();

        return response()->json('route deleted successfully', 200);
    }

    public function loadOne($id)
    {
        try {

            $routes = Route::where('id', $id)->first();
            $entities = array(
                'routedet' => $routes
            );

            return response()->json($entities, 200);
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
    public function loadStatus($id)
    {
        try {
            $invoiceCount = Schedule::where('route_id', $id)->count();

            if ($invoiceCount > 0) {
                return response()->json('Cant delete route', 401);
            } else {
                return response()->json('ok', 200);
            }
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
   
}
