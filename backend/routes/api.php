<?php

use Illuminate\Support\Facades\Route;

//User Authentication Routes
Route::group(['namespace'=>'Api\Auth'], function(){
    Route::post('/login', 'AuthenticationController@login');
    Route::post('/logout', 'AuthenticationController@logout');
    Route::post('/register', 'AuthenticationController@store')->middleware('auth:api');
    Route::post('/update_user', 'AuthenticationController@update')->middleware('auth:api');
    Route::get('/users_det', 'AuthenticationController@index')->middleware('auth:api');
    Route::get('/get_user_det/{id}', 'AuthenticationController@loadOne')->middleware('auth:api');  
    Route::get('/get_user_status/{id}','AuthenticationController@loadStatus')->middleware('auth:api'); 
    Route::post('/update_user_status', 'AuthenticationController@changeStatus')->middleware('auth:api');   
});
//Home Route
Route::get('/home','HomeController@index')->middleware('auth:api');

//Bus Routes
Route::get('/bus_det','BusController@index')->middleware('auth:api');
Route::post('/save_bus','BusController@store')->middleware('auth:api');
Route::post('/update_bus','BusController@update')->middleware('auth:api');
Route::get('/destroy_bus/{id}','BusController@destroy')->middleware('auth:api');
Route::get('/get_bus_det/{id}','BusController@loadOne')->middleware('auth:api');
Route::get('/get_bus_status/{id}','BusController@loadStatus')->middleware('auth:api');


