<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Models\SocialProfile;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register','loginoauth']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Failed ! Email or password not matches.'], 401);
        }
        
        return $this->createNewToken($token);
    }

    /**
     * Login a Social User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function loginoauth(Request $request){
              
        $social_profile = SocialProfile::where('social_id', $request->id)
                                        ->where('social_name', 'Gmail')->first();

        if(!$social_profile){

            $user = User::where('email', $request->email)->first();

            if(!$user){
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                ]);
            }

            SocialProfile::create([
                'user_id' => $user->id,
                'social_id' => $request->id,
                'social_name' => 'Gmail',
                'social_avatar' => $request->image,
            ]);
        }

        /*$token = auth()->attempt([
            'email' => $request->email,
            'password' => NULL,
        ]);*/

        auth()->login($social_profile->user);
        return $this->createNewToken($request->token);
        //return $this->createNewToken($token);
    }


    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1,
            'user' => auth()->user()
        ]);
    }
}