<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailItem extends Model
{
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'gen_date',
        'sq_date',
         'type',
         'run_cost',
         'quantity',
         'add_call_cost',
        'diff_1',
        'diff_2',
        'diff_3',
        'diff_4',
        'diff_5',
        'diff_6',
        'diff_7',
        'diff_8',
        'diff_9',
        'diff_10',
        'diff_11',
        'loss_cost',
        'mini_cost',
        'c_value',
        'p_value',            
        'center_cost',
        'interval',
        'c_delta',
        'p_delta',
        'self_diff',
        'self_type',
        'work_status',          
        'user_id',
    ];

        /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
