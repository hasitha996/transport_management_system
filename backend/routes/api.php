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

//Bus
Route::get('/bus_det','BusController@index')->middleware('auth:api');
Route::post('/save_bus','BusController@store')->middleware('auth:api');
Route::post('/update_bus','BusController@update')->middleware('auth:api');
Route::get('/destroy_bus/{id}','BusController@destroy')->middleware('auth:api');
Route::get('/get_bus_det/{id}','BusController@loadOne')->middleware('auth:api');
Route::get('/get_bus_status/{id}','BusController@loadStatus')->middleware('auth:api');

//Bus Routes
Route::get('/route_det','RouteController@index')->middleware('auth:api');
Route::post('/save_route','RouteController@store')->middleware('auth:api');
Route::post('/update_route','RouteController@update')->middleware('auth:api');
Route::get('/destroy_route/{id}','RouteController@destroy')->middleware('auth:api');
Route::get('/get_route_det/{id}','RouteController@loadOne')->middleware('auth:api');
Route::get('/get_route_status/{id}','RouteController@loadStatus')->middleware('auth:api');

//Employee Routes
Route::get('/employee_det','EmployeeController@index')->middleware('auth:api');
Route::post('/save_employee','EmployeeController@store')->middleware('auth:api');
Route::post('/update_employee','EmployeeController@update')->middleware('auth:api');
Route::get('/destroy_employee/{id}','EmployeeController@destroy')->middleware('auth:api');
Route::get('/get_employee_det/{id}','EmployeeController@loadOne')->middleware('auth:api');
Route::get('/get_employee_status/{id}','EmployeeController@loadStatus')->middleware('auth:api');


