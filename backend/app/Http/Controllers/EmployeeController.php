<?php

namespace App\Http\Controllers;

use App\Employee;
use App\Schedule;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        try {

            $employees = Employee::get();
            $entities = array(
                'employeedet' => $employees
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
                'first_name' => 'required',
                'last_name' => 'required',
                'position' => 'required',
                'contact' => 'required',
                'user_id' => 'required',

            ]);

            $employees = new Employee();
            $employees->first_name = $validatedData['first_name'];
            $employees->last_name = $validatedData['last_name'];
            $employees->position = $validatedData['position'];
            $employees->contact = $validatedData['contact'];
            $employees->user_id =  $validatedData['user_id'];

            $employees->save();

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
                'first_name' => 'required',
                'last_name' => 'required',
                'position' => 'required',
                'contact' => 'required',
                'user_id' => 'required',
            ]);

        
            $employees = Employee::where('id', $request->id)->first();
            $employees->first_name = $validatedData['first_name'];
            $employees->last_name = $validatedData['last_name'];
            $employees->position = $validatedData['position'];
            $employees->contact = $validatedData['contact'];
            $employees->user_id = $validatedData['user_id'];

            $employees->save();

            return response()->json('save successfully', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }
    public function destroy($id)
    {
        $employees = employee::find($id);

        if (!$employees) {
            return response()->json('employee not found', 404);
        }
        $employees->delete();

        return response()->json('employee deleted successfully', 200);
    }

    public function loadOne($id)
    {
        try {

            $employees = Employee::where('id', $id)->first();
            $entities = array(
                'employeedet' => $employees
            );

            return response()->json($entities, 200);
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
    public function loadStatus($id)
    {
        try {
            $invoiceCount = Schedule::where('emp_id', $id)->count();

            if ($invoiceCount > 0) {
                return response()->json('Cant delete employee', 401);
            } else {
                return response()->json('ok', 200);
            }
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
}
