<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class PostController extends Controller
{
    public function get(Request $request)
    {
        $posts=DB::table('posts')->select('*')->orderby('id','desc')->get();
        return response()->json(['posts'=>$posts]);
    }
    public function create(Request $request)
    {
       
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: PUT, GET, POST");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        
        if ($request->hasFile('image'))
        {
              $file      = $request->file('image');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              $file->move(public_path('img'), $picture);
              $imagepath="http://localhost/blogApplication/public/img/".$picture;
        } 
        else
        {
              return response()->json(["message" => "Select image first."]);
        }
       $id=DB::table('posts')->InsertGetId(['title'=>$request['title'],'body'=>$request['post'],'image'=>$imagepath]);
       $post=DB::table('posts')->select('*')->where(['id'=>$id])->get();
      
       return response()->json(['post'=> $post,'message'=>'saved successfully!']);

    }
}
