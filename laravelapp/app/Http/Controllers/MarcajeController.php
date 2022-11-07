<?php

namespace App\Http\Controllers;

use App\Models\Marcaje;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MarcajeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $marcajes = Marcaje::all();
        return response()->json($marcajes, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'user_id' => 'required'
        ];
        $messages = [
            'required' => 'El campo :attribute es obligatorio.'
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json([
                'message' => "Información incompleta o inválida -> ".$validator->messages()->first()
            ], 400);
        }
        $marcaje = Marcaje::create($request->all());
        return response()->json([
            'message' => "Marcaje saved successfully!",
            'marcaje' => $marcaje
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Marcaje  $marcaje
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$marcaje = Marcaje::find($id);
        $marcaje = DB::select('SELECT count(*) AS marcajes FROM marcajes WHERE user_id = :uid AND created_at >= CURDATE();', ['uid' => $id]);
        return response()->json($marcaje, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Marcaje  $marcaje
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Marcaje $marcaje)
    {
        $marcaje->update($request->all());

        return response()->json([
            'message' => "Marcaje updated successfully!",
            'marcaje' => $marcaje
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Marcaje  $marcaje
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marcaje $marcaje)
    {
        $marcaje->delete();

        return response()->json([
            'message' => "Marcaje deleted successfully!",
        ], 200);
    }
}
