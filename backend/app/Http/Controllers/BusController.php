<?php

namespace App\Http\Controllers;

use App\Bus;
use App\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class BusController extends Controller
{
    public function index()
    {
        try {

            $buss = Bus::get();
            $entities = array(
                'busdet' => $buss
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
                'bus_reg_no' => 'required',
                'capacity' => 'required',
                'model' => 'required',
                'user_id' => 'required',

            ]);

            $buss = new bus();
            $buss->bus_reg_no = $validatedData['bus_reg_no'];
            $buss->capacity = $validatedData['capacity'];
            $buss->model = $validatedData['model'];
            $buss->user_id =  $validatedData['user_id'];

            $buss->save();

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
                'bus_reg_no' => 'required',
                'capacity' => 'required',
                'model' => 'required',
                'user_id' => 'required',

            ]);

        
            $buss = Bus::where('id', $request->id)->first();
            $buss->bus_reg_no = $validatedData['bus_reg_no'];
            $buss->capacity = $validatedData['capacity'];
            $buss->model = $validatedData['model'];
            $buss->user_id = $validatedData['user_id'];

            $buss->save();

            return response()->json('save successfully', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }
    public function destroy($id)
    {
        $buss = bus::find($id);

        if (!$buss) {
            return response()->json('bus not found', 404);
        }
        $buss->delete();

        return response()->json('bus deleted successfully', 200);
    }

    public function loadOne($id)
    {
        try {

            $buss = Bus::where('id', $id)->first();
            $entities = array(
                'busdet' => $buss
            );

            return response()->json($entities, 200);
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
    public function loadStatus($id)
    {
        try {
            $invoiceCount = Schedule::where('bus_id', $id)->count();

            if ($invoiceCount > 0) {
                return response()->json('Cant delete bus', 401);
            } else {
                return response()->json('ok', 200);
            }
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
   
    
}
