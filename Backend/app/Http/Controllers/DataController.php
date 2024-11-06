<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;
use Psy\Readline\Hoa\Console;

class DataController extends Controller
{
    function get_data($id=null){
        return $id?Data::find($id):Data::all();
    }

    public function add(Request $request)
    {
        $Data = new Data();

        $Data->name = $request->input('name'); 
        $Data->description = $request->input('description'); 
        $Data->creator = $request->input('creator');
        $Data->creator_type = $request->input('creator_type');
        $Data->status = $request->input('status');
        $Data->save();

        // return response()->json($request->all());
        // dd(111);
        
        return response()->json(['result' => 'Successful'], 200);
    }

    public function update(Request $req)
    {
        $Data = Data::find($req->id);
        if (!$Data) {
            return response()->json(["result" => "Note not found"], 404);
        }
        $Data->name = $req->input('name', $Data->name);
        $Data->description = $req->input('description', $Data->description);
        $Data->creator = $req->input('creator', $Data->creator);
        $Data->creator_type = $req->input('creator_type', $Data->creator_type);
        $Data->status = $req->input('status', $Data->status);

        $Data->save();
        return response()->json($Data, 200);
    }

    public function delete($id)
    {
        $Note = Data::find($id);
        if (!$Note) {
            return response()->json(["result" => "Note not found"], 404);
        }
        $Note->delete();
        return response()->json(["result" => "Successfully deleted"], 200);
    }

    
}
