<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class AuthenticationController extends Controller
{
    public function index()
    {
        try {

            $users = User::get();
            $entities = array(
                'userdet' => $users
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
                'email' => ['required', 'email', Rule::unique('users')],
                'user_role' => 'required',
                'password' => 'required',
            ]);


            $user = new User();
            $user->first_name = $validatedData['first_name'];
            $user->last_name = $validatedData['last_name'];
            $user->email = $validatedData['email'];
            $user->user_role = $validatedData['user_role'];
            $user->password =  Hash::make($validatedData['password']);
            $user->status =  1;

            $user->save();

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
                'id' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
                'user_role' => 'required',
                'password' => 'required',
            ]);

            $user = User::where('id', $request->id)->first();
            $user->first_name = $validatedData['first_name'];
            $user->last_name = $validatedData['last_name'];
            $user->user_role = $validatedData['user_role'];
            $user->password =  Hash::make($validatedData['password']);
            $user->status =  1;

            $user->save();

            return response()->json('save successfully', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }
    
    public function login(Request $request)
    {

        try {
            $this->validate($request, [
                'email' => 'required|max:255',
                'password' => 'required'
            ]);

            $login = $request->only('email', 'password');

            if (!Auth::attempt($login)) {
                return response(['message' => 'Invalid login credential!!'], 401);
            }
            /**
             * @var User $user
             */
            $user = Auth::user();

            if ($user->status == '0') {
                return response(['message' => 'Inactive User!!'], 401);
            }
            $token = $user->createToken($user->name);

            return response([
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'status' => $user->status,
                'user_role' => $user->user_role,
                'token' => $token->accessToken,
                'token_expires_at' => $token->token->expires_at,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error Login'], 401);
        }
    }

    public function logout(Request $request)
    {

        /**
         * @var user $user
         */
        $user = Auth::user();
        if ($request->allDevice) {
            $user->tokens->each(function ($token) {
                $token->delete();
            });
            return response(['message' => 'Logged out !!'], 200);
        }

        $userToken = $user->token();
        $userToken->delete();
        return response(['message' => 'Logged Successful !!'], 200);
    }

    public function loadOne($id)
    {
        try {
            $users = User::where('id', $id)->first();
            $entities = array(
                'userdet' => $users
            );

            return response()->json($entities, 200);
        } catch (\Exception $e) {
            return response()->json($e, 401);
        }
    }
    
    public function changeStatus(Request $request)
    {
        try {

        $user = User::where('id',  $request->id)->first();
        $user->status = $request->status;
        $user->save();

        return response()->json('Status Change Done', 200);
        } catch (\Exception $e) {
            return response()->json('error saving', 401);
        }
    }
}
