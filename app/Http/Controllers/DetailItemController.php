<?php

namespace App\Http\Controllers;

use App\Models\DetailItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DetailItemController extends Controller
{
    // /**
    //  * Handle the incoming request.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function __invoke(Request $request)
    // {
    //     //
    // }


    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request  
     */
    public function getAllItems(Request $request)
    {     
        
        $user_id =Auth::user()->id;
        $sq_date = $request->sq_date;

        $all_items =DetailItem::where('sq_date',$sq_date)
        ->where('user_id',$user_id)->orderBy('id','asc')->get();  
        // var_export($all_items);die;  
       
        return response()->json(['status'=>'ok','datas'=>$all_items]);
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request  
     */
    public function saveItem(Request $request)
    {
        $user_id =Auth::user()->id;
        $params = $request->item;

       
       
        if($params['type']=='origin'){
            $pre_datas = DetailItem::where('sq_date',$params['sq_date'])
            ->where('type','origin')
            ->where('self_type',$params['self_type'])
            ->where('user_id',$user_id)
            ->get(); 
            if(count($pre_datas)>0){
                $update_item = $pre_datas[0];

                $update_item->run_cost= $params['run_cost'];
                $update_item->quantity= $params['quantity'];
                $update_item->add_call_cost= $params['add_call_cost'];
                $update_item->diff_1= $params['self_diff_items'][0];
                $update_item->diff_2= $params['self_diff_items'][1];
                $update_item->diff_3=  $params['self_diff_items'][2];
                $update_item->diff_4= $params['self_diff_items'][3];
                $update_item->diff_5= $params['self_diff_items'][4];
                $update_item->diff_6= $params['self_diff_items'][5];
                $update_item->diff_7= $params['self_diff_items'][6];
                $update_item->diff_8= $params['self_diff_items'][7];
                $update_item->diff_9= $params['self_diff_items'][8];
                $update_item->diff_10= $params['self_diff_items'][9];
                $update_item->diff_11=  $params['self_diff_items'][10];
                $update_item->loss_cost= $params['loss_cost'];
                $update_item->mini_cost= $params['mini_cost'];
                $update_item->c_value= $params['c_value'];
                $update_item->p_value= $params['p_value'];
                $update_item->center_cost= $params['center_cost'];
                $update_item->interval= $params['interval'];
                $update_item->c_delta= $params['c_delta'];
                $update_item->p_delta= $params['p_delta'];
                $update_item->self_diff= $params['self_diff'];
                $update_item->work_status= $params['work_status'];
        
                $update_item->save();

                $new_datas = DetailItem::where('sq_date',$params['sq_date'])
                ->where('user_id',$user_id)        
                ->orderBy('id','asc')->get();         
        
                return response()->json(['status'=>'ok','datas'=>$new_datas]);
            } 
        }
        
       
        $new_item = DetailItem::create([
            'gen_date' => $params['gen_date'],
            'sq_date' => $params['sq_date'],
            'type' => $params['type'],
            'run_cost' => $params['run_cost'],
            'quantity' => $params['quantity'],
            'add_call_cost' => $params['add_call_cost'],
            'diff_1' => $params['self_diff_items'][0],
            'diff_2' => $params['self_diff_items'][1],
            'diff_3' => $params['self_diff_items'][2],
            'diff_4' => $params['self_diff_items'][3],
            'diff_5' => $params['self_diff_items'][4],
            'diff_6' => $params['self_diff_items'][5],
            'diff_7' => $params['self_diff_items'][6],
            'diff_8' => $params['self_diff_items'][7],
            'diff_9' => $params['self_diff_items'][8],
            'diff_10' => $params['self_diff_items'][9],
            'diff_11' => $params['self_diff_items'][10],
            'loss_cost' => $params['loss_cost'],
            'mini_cost' => $params['mini_cost'],
            'c_value' => $params['c_value'],
            'p_value' => $params['p_value'],
            'center_cost' => $params['center_cost'],
            'interval' => $params['interval'],
            'c_delta' => $params['c_delta'],
            'p_delta' => $params['p_delta'],
            'self_diff' => $params['self_diff'],
            'self_type' => $params['self_type'],
            'work_status' => $params['work_status'],
            'user_id' => $user_id,
        ]); 
   
        $new_datas = DetailItem::where('sq_date',$params['sq_date'])
        ->where('user_id',$user_id)
        ->orderBy('id','asc')->get();            

        return response()->json(['status'=>'ok','datas'=>$new_datas]);
    }

    
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request  
     */
    public function removeItem(Request $request)
    {       
        $user_id =Auth::user()->id;
        $params = $request->item;
       
        $item = DetailItem::find($params['id']);
        $item->delete();  

        $new_datas = DetailItem::where('sq_date',$params['sq_date'])
        ->where('user_id',$user_id)
        ->orderBy('id','asc')->get(); 

        return response()->json(['status'=>'ok','datas'=>$new_datas]);
    }

       /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request  
     */
    public function updateItem(Request $request)
    {
        $user_id =Auth::user()->id;
       
        $params = $request->item;
        // var_export($params);die;
       
        $new_item = DetailItem::find($params['id']);

        $new_item->run_cost= $params['run_cost'];
        $new_item->quantity= $params['quantity'];
        $new_item->add_call_cost= $params['add_call_cost'];
        $new_item->diff_1= $params['self_diff_items'][0];
        $new_item->diff_2= $params['self_diff_items'][1];
        $new_item->diff_3=  $params['self_diff_items'][2];
        $new_item->diff_4= $params['self_diff_items'][3];
        $new_item->diff_5= $params['self_diff_items'][4];
        $new_item->diff_6= $params['self_diff_items'][5];
        $new_item->diff_7= $params['self_diff_items'][6];
        $new_item->diff_8= $params['self_diff_items'][7];
        $new_item->diff_9= $params['self_diff_items'][8];
        $new_item->diff_10= $params['self_diff_items'][9];
        $new_item->diff_11=  $params['self_diff_items'][10];
        $new_item->loss_cost= $params['loss_cost'];
        $new_item->mini_cost= $params['mini_cost'];
        $new_item->c_value= $params['c_value'];
        $new_item->p_value= $params['p_value'];
        $new_item->center_cost= $params['center_cost'];
        $new_item->interval= $params['interval'];
        $new_item->c_delta= $params['c_delta'];
        $new_item->p_delta= $params['p_delta'];
        $new_item->self_diff= $params['self_diff'];
        $new_item->work_status= $params['work_status'];

        $new_item->save();

        $new_datas = DetailItem::where('sq_date',$params['sq_date'])
                       ->where('user_id',$user_id)
                       ->orderBy('id','asc')->get(); 

        return response()->json(['status'=>'ok','datas'=>$new_datas]);
    }


}
