<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_items', function (Blueprint $table) {
            $table->increments('id');       
            $table->date('gen_date');
            $table->date('sq_date');
            $table->string('type');
            $table->integer('run_cost');
            $table->string('quantity');
            $table->integer('add_call_cost');
            $table->string('diff_1');
            $table->string('diff_2');
            $table->string('diff_3');
            $table->string('diff_4');
            $table->string('diff_5');
            $table->string('diff_6');
            $table->string('diff_7');
            $table->string('diff_8');
            $table->string('diff_9');
            $table->string('diff_10');
            $table->string('diff_11');
            $table->integer('loss_cost');
            $table->integer('mini_cost');
            $table->integer('c_value');
            $table->integer('p_value');            
            $table->integer('center_cost');
            $table->integer('interval')->unsigned();
            $table->string('c_delta');
            $table->string('p_delta');
            $table->string('self_diff');
            $table->string('self_type');
            $table->integer('work_status')->unsigned()->default(0)->nullable();          
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_items');
    }
}
