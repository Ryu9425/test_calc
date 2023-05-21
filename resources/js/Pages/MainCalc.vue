<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import { ref, onMounted } from "vue";
import AdditionResult from "@/Components/AdditionResult.vue";
import DetailCalc from "@/Components/DetailCalc.vue";
import MainResult from "@/Components/MainResult.vue";
import FirstCalc from "@/Components/FirstCalc.vue";
import SecondCalc from "@/Components/SecondCalc.vue";
import ThirdCalc from "@/Components/ThirdCalc.vue";
import MainInput from "@/Components/MainInput.vue";
import moment from "moment";

import { getSecondFridayOfMonth,caclculateTotalResult } from "@/constant/DateComon";
import {getSQDetailDatas,removeDataProcess,updateDataProcess} from "@/constant/DateManager"

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
const logo_img = "/images/castlee_logo.png";

const auto_calc = ref(false);
const show_delta = ref(false);
const selectedIndex  = ref(100);

const is_selected_depart = ref("first");
const selected_item = ref(null);
const currentDate = ref(new moment());
const sqDate = ref(moment());
const setDepart = (depart) => {
    is_selected_depart.value = depart;
    console.log(depart);
};
const calcResults = ref([]);
const mainResults = ref([]);
const nikiResult = ref(0);
const sum_sq=ref(0);

const baseData = ref([]);

const settingBaseData = (obj)=>{
    baseData.value=obj;
}

onMounted(async() => {
    sqDate.value= getSecondFridayOfMonth(sqDate.value);
    baseData.value = {
        currentDate:currentDate.value,
        sqDate: sqDate.value,
        call_base_val: 30000,
        call_base_rate: 19.0,
        put_base_val: 27000,
        put_base_rate: 42.0,
    };
    
    calcResults.value= await getSQDetailDatas(sqDate.value);
    
    mainResults.value = caclculateTotalResult(calcResults.value).total_items.reverse();
    nikiResult.value = caclculateTotalResult(calcResults.value).sum_quantity_niki;
    sum_sq.value=caclculateTotalResult(calcResults.value).sum_sq;

    console.log('sum_sq ',sum_sq.value)
    console.log('calcResults ',nikiResult.value)
});

const onRowClick = (item,index)=>{    
    console.log('onRowClick, ',item.id);
    selectedIndex.value = index;
    selected_item.value = item;
}

const updateDatas = (datas)=>{
    console.log('updateDatas11111', datas);
    calcResults.value=null;
    calcResults.value=datas;

    mainResults.value = caclculateTotalResult(datas).total_items.reverse();
    nikiResult.value = caclculateTotalResult(calcResults.value).sum_quantity_niki;
    sum_sq.value=caclculateTotalResult(calcResults.value).sum_sq;
    selected_item.value=null;
    console.log('sum_sq ',sum_sq.value)
}

const removeDatas = async ()=>{

    if(selected_item==null) {
        alert('selected item is null');
        return;
    }
    if(selected_item.type=='origin') {
        alert('Origin Data cannot remove.');
        return;
    }
    let datas = await removeDataProcess(selected_item.value);

    calcResults.value=null;
    calcResults.value=datas;
    mainResults.value = caclculateTotalResult(datas).total_items.reverse();
    nikiResult.value = caclculateTotalResult(calcResults.value).sum_quantity_niki;
    sum_sq.value=caclculateTotalResult(calcResults.value).sum_sq;
    selected_item.value=null;
    selectedIndex.value=100;

    console.log('sum_sq ',sum_sq.value)
    console.log('removeDatas2222222222 ',mainResults.value)
}
const updateOneDatas = async (item)=>{
    console.log('selected item is item... ',item);
    if(selected_item==null) {
        alert('selected item is null');
        return;
    }
    
    let datas = await updateDataProcess(item);

    calcResults.value=null;
    calcResults.value=datas;

    mainResults.value = caclculateTotalResult(datas).total_items.reverse();
    nikiResult.value = caclculateTotalResult(calcResults.value).sum_quantity_niki;
    sum_sq.value=caclculateTotalResult(calcResults.value).sum_sq;
    selected_item.value=null;
    console.log('sum_sq ',sum_sq.value)
    console.log('updateDatas2222222222 ',mainResults.value)
}


const onRowBlur = (item)=>{  
    console.log('onRowBlur, ',item);
}

</script>

<template>
    <Head title="Welcome" />
    <div class="h-full lg:h-screen w-full bg-pink-50 ">
        <div class="w-full">
            <div
                class="sticky top-0 bg-white z-[99999] flex w-full pl-3 lg:pl-10 pt-1 mx-auto border-b-4 border-b-orange-500 shadow-cyan-500/50"
            >
                <div class="flex justify-center cursor-pointer items-center">
                    <img class="w-16 lg:w-20" :src="logo_img" />
                </div>
                <div class="flex w-full justify-between items-center">
                    <ul class="flex text-center text-[10px] lg:text-[20px]  font-bold">
                        <li 
                            @click="setDepart('first')"
                            class="w-18 lg:w-40 m-1 p-2 rounded-xl hover:bg-green-500 text-white cursor-pointer duration-150"
                            :class="is_selected_depart == 'first' ? 'bg-red-500 text-green-900' : 'bg-green-700 text-white'"
                        >
                            エントリー
                        </li>
                        <li
                            @click="setDepart('second')"
                            class="w-16 lg:w-40 m-1 p-2 rounded-xl hover:bg-green-500 text-white cursor-pointer duration-150"
                            :class="is_selected_depart == 'second' ? 'bg-red-500 text-green-900' : 'bg-green-700 text-white'"
                        >
                            継続
                        </li>
                        <li
                            @click="setDepart('third')"
                            class="w-215 lg:w-40 m-1 p-2 lg:p-2 rounded-xl hover:bg-green-500 text-white cursor-pointer duration-150"
                            :class="is_selected_depart == 'third' ? 'bg-red-500 text-green-900' : 'bg-green-700 text-white'"
                        >
                            ポジション変更
                        </li>
                    </ul>
                    <div class="flex cursor-pointer">
                        <Link :href="route('logout')" method="post" > 
                            <a class="flex items-center justify-center mx-3 lg:mx-10  lg:hover:mx-8 duration-150">
                                <i class="fa-solid fa-right-from-bracket fa-lg text-[18px] lg:text-[28px]"></i>
                                <span class="hidden lg:flex text-center font-bold mx-2 text-[18px]">ログアウト</span>   
                            </a>     
                        </Link>                                                            
                    </div>
                </div>
                
            </div>
            <div class="m-2 w-full  px-4 mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full justify-around">
                    <div class="col-span-1 m-1 lg:m-2 rounded-2xl bg-white font-semibold">
                        <MainInput
                            :standardDate="currentDate"
                            :base="baseData" 
                            @setting-base-input="settingBaseData"
                        ></MainInput>                                      
                    </div>
                    <div class="grid-cols-1 lg:col-span-2 m-1 lg:m-2 rounded-2xl bg-white font-semibold">
                        <div class="h-full" v-if="is_selected_depart == 'first'">
                            <FirstCalc
                                :base="baseData" :calcMode="auto_calc"
                                @update-detail-datas="updateDatas"
                            ></FirstCalc>
                        </div>
                        <div class="h-full" v-else-if="is_selected_depart == 'second'">
                            <SecondCalc
                                :base="baseData" :calcMode="auto_calc"
                                :selectedItem="selected_item"
                                @update_one_data="updateOneDatas"
                                @update-detail-datas="updateDatas"
                                @remove-detail-data="removeDatas"
                            ></SecondCalc>
                        </div>
                        <div class="h-full" v-else-if="is_selected_depart == 'third'">
                            <ThirdCalc
                                :base="baseData" :calcMode="auto_calc" :sumSqNiki="sum_sq"                             
                                @update-detail-datas="updateDatas"
                            ></ThirdCalc>
                        </div>
                    </div>                   
                    <div class="col-span-1 m-1 lg:m-2 rounded-2xl bg-white font-semibold">
                        <div class="w-full px-4 pt-2">
                            <div class="grid grid-cols-2 items-center justify-between mt-4">
                                <div class="col-span-1 items-center mx-auto l-5">
                                    <Checkbox
                                        v-model="auto_calc"
                                        inputId="ingredient1"
                                        name="pizza"
                                        value="Cheese"
                                        :binary="true"
                                    />
                                    <label for="ingredient1" class="ml-2 font-bold text-[16px]"> 自動計算 </label>
                                    
                                </div>
                                <div class="col-span-1 items-center mx-auto l-5">
                                    <Checkbox
                                        v-model="show_delta"
                                        inputId="ingredient2"
                                        name="detail"
                                        value="Detail"
                                        :binary="true"
                                    />
                                    <label for="ingredient2" class="ml-2 font-bold text-[16px]"> デルタ表示 </label>
                                </div>
                            </div>
                            
                            <div class="flex mx-auto lg:m-2 w-full">                    
                                <table class="w-full m-2" id="main-result">
                                    <thead>
                                        <tr>
                                            <th>売買</th>
                                            <th>価格</th>
                                            <th>決済</th>
                                            <th>Delta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="cursor-pointer text-center" v-for="result in mainResults" :key="result.row_id">
                                            <td>{{ result.type }}{{result.type_val}}</td>
                                            <td>{{ result.price }}</td>
                                            <td  :class="result.status != '' ? 'text-red-400' : ''">{{ result.status }}</td>
                                            <td>{{ result.diff }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="flex justify-center my-1 mx-auto font-bold text-green-900 text-[18px]">
                                <div>日経合計:  {{nikiResult}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex mx-auto my-2 pt-6 w-full overflow-x-auto rounded-xl bg-white">
                    <table class="w-full m-2" id="detail-result">
                        <thead class="m-2 p-4 ">
                            <tr>
                                <th>年月日</th>
                                <th>種類</th>
                                <th id="cost">権利行使価格</th>
                                <th>枚数</th>
                                <th>価格</th>
                                <th v-if="show_delta==true">デルタ1</th>
                                <th v-if="show_delta==true">デルタ2</th>
                                <th v-if="show_delta==true">デルタ3</th>
                                <th v-if="show_delta==true">デルタ4</th>
                                <th v-if="show_delta==true">デルタ5</th>
                                <th v-if="show_delta==true">デルタ6</th>
                                <th v-if="show_delta==true">デルタ7</th>
                                <th v-if="show_delta==true">デルタ8</th>
                                <th v-if="show_delta==true">デルタ9</th>
                                <th v-if="show_delta==true">デルタ10</th>
                                <th v-if="show_delta==true">デルタ11</th>
                                <th>損益</th>
                                <th>ミニ終値</th>
                                <th>Ｃ終値</th>
                                <th>Ｐ終値</th>
                                <th>間隔</th>
                                <th>中心価格</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="cursor-pointer text-center" v-for="(result, index) in calcResults" :key="index" :class="{ 'selected': index === selectedIndex }" @click="onRowClick(result,index)" @blur="onRowBlur(result)">
                                <td >{{ result.gen_date }}</td>
                                <td v-if="result.type!='continue'&&result.self_type=='call'" class="font-bold text-red-400">コール</td>
                                <td v-else-if="result.type!='continue'&&result.self_type=='put'" class="font-bold text-red-400">プット</td>
                                <td v-else-if="result.type=='continue'" class="font-bold text-green-600">日経</td>
                                <td>{{ result.run_cost }}</td>
                                <td>{{ result.quantity }}</td>
                                <td>{{ result.add_call_cost }}</td>

                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_1 }}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[0] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_2 }}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[1] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_3 }}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[2] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_4 }}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[3] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_5}}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[4] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_6}}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[5] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_7}}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[6] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_8 }}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[7] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_9}}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[8] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_10}}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[9] }}
                                </td>
                                <td v-if="show_delta==true&&result.id>0">
                                    {{ result.diff_11}}
                                </td>
                                <td v-if="show_delta==true&&result.id<0">
                                    {{ result.self_diff_items[10] }}
                                </td>

                                <td>{{ result.loss_cost }}</td>
                                <td>{{ result.mini_cost }}</td>
                                <td>{{ result.c_value }}</td>
                                <td>{{ result.p_value }}</td>
                                <td>{{ result.interval }}</td>
                                <td>{{ result.center_cost }}</td>
                            </tr>
                        </tbody>
                    </table>                  
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
thead tr{
    border-style: dotted;
    border-bottom: solid 2.5px rgb(194 195 194 / 66%);
}

table tbody tr{
    border-bottom: solid 1.75px #a5b7a9a7;
}
table tbody tr.selected  {
    background-color: rgb(181, 181, 255) !important;
}
#detail-result th,
#detail-result td {
    min-width: 80px;
    padding: 5px 2px;
}
#detail-result tr.selected {
    background-color: #d06a6a;
  }
#main-result th,
#main-result td{
    min-width: 40px;
    padding: 3px 1px;
}

@media only screen and (max-width:600px) {
    #detail-result th,
    #detail-result td {
        min-width: 80px;
        padding: 3px 0px;
    }
    #detail-result th:first-child,
    #detail-result td:first-child {
        min-width: 92px;
    }
    #cost{
        min-width: 96px !important;
    }
}
</style>
