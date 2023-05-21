<script setup>
import { usePage, useForm } from "@inertiajs/inertia-vue3";
import { ref,toRefs, computed, onMounted, watch,defineEmits,watchEffect, inject } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { getTodayCallDatas,getTodayPutDatas } from "@/constant/DateComon";
import {checkingExistOriginData,checkingExistSavedOriginData,originDataProcess,getCuttentDetailDatas,setEntryMiniCost} from "@/constant/DateManager";

const props = defineProps({
    base:Object,
    calcMode:Boolean,
});

const emits = defineEmits(['update-detail-datas'])


const baseData = ref();
const workingDate = ref(null);
const todayDate = ref(null);
const sqDate = ref();
const mini_cost = ref();
const call_cost = ref();
const put_cost = ref();
const center_cost = ref();
const interval_cost = ref();

const call_base_val =  computed(() => props.base.call_base_val);
const call_base_rate = computed(() => props.base.call_base_rate);
const put_base_val =  computed(() => props.base.put_base_val);
const put_base_rate = computed(() => props.base.put_base_rate);

const c_value= ref();
const p_value= ref();
const c_delta= ref();
const p_delta= ref();

const selectedCallData = ref(null);
const selectedPutData = ref(null);

onMounted(() => {

    todayDate.value = moment().format("yyyy/MM/DD");
    
    mini_cost.value = 27500;
    setEntryMiniCost(mini_cost.value);
    call_cost.value = 250;
    put_cost.value = 250;
    center_cost.value = 27500;
    interval_cost.value = 200;
    setTimeout(() => {
        baseData.value = props.base;
        sqDate.value=baseData.value.sqDate;
        workingDate.value = props
            ? moment(props.base.currentDate).format("YYYY/MM")
            : moment().format("YYYY/MM");
        // call_base_val.value = props.base.call_base_val;
        // call_base_rate.value = props.base.call_base_rate;
        // put_base_val.value = props.base.put_base_val;
        // put_base_rate.value = props.base.put_base_rate;
    }, 500);
    
});

watch([call_base_val,call_base_rate,put_base_val,put_base_rate,todayDate,mini_cost], (newValue, oldValue) => {   
    if(props.calcMode) calculateToday();
});

watch([call_cost,put_cost,center_cost,interval_cost], (newValue, oldValue) => {   
    if(props.calcMode) calculateOneTime();
});

const calculateToday = async () => {    

   var selectedCallDataCalc = getTodayCallDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         call_base_val.value,call_base_rate.value,mini_cost.value,call_cost.value,-1,interval_cost.value);
   var selectedPutDataCalc = getTodayPutDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         put_base_val.value,put_base_rate.value,mini_cost.value,put_cost.value,-1,interval_cost.value);
     
    selectedCallDataCalc.p_value=selectedCallDataCalc.p_value;   
    c_value.value = selectedCallDataCalc.c_value;
    c_delta.value = selectedCallDataCalc.c_delta;
    p_value.value = selectedPutDataCalc.p_value;
    p_delta.value = selectedPutDataCalc.p_delta;
    
    if(checkingExistOriginData()){       
        return;
    }
   
    let result = getCuttentDetailDatas();
    result.push(selectedCallDataCalc);
    result.push(selectedPutDataCalc);
   
    console.log('selectdData ',result);
    emits('update-detail-datas',result);    
};

const saveToday = async () => {

    if(checkingExistSavedOriginData()){
        alert('origin data already exist!')
        return;
    }

    selectedCallData.value = getTodayCallDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         call_base_val.value,call_base_rate.value,mini_cost.value,call_cost.value,-1,interval_cost.value);
    selectedPutData.value = getTodayPutDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         put_base_val.value,put_base_rate.value,mini_cost.value,put_cost.value,-1,interval_cost.value);

    selectedCallData.value.p_value=selectedPutData.value.p_value;   
    c_value.value = selectedCallData.value.c_value;
    c_delta.value = selectedCallData.value.c_delta;
    p_value.value = selectedPutData.value.p_value;
    p_delta.value = selectedPutData.value.p_delta;

    let result;
    await originDataProcess(selectedCallData.value);
    result = await originDataProcess(selectedPutData.value);   
   // console.log('selectdData ',result);
    emits('update-detail-datas',result);
};

const calculateOneTime = () => {
    console.log("calculateOneTime");
    var selectedCallDataCalc =  getTodayCallDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         call_base_val.value,call_base_rate.value,center_cost.value,call_cost.value,-1,interval_cost.value);
    var selectedPutDataCalc =  getTodayPutDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         put_base_val.value,put_base_rate.value,center_cost.value,put_cost.value,-1,interval_cost.value);
     
    selectedCallDataCalc.p_value=selectedCallDataCalc.p_value;   
    c_value.value = selectedCallDataCalc.c_value;
    c_delta.value = selectedCallDataCalc.c_delta;
    p_value.value = selectedPutDataCalc.p_value;
    p_delta.value = selectedPutDataCalc.p_delta;
    
    if(checkingExistOriginData()){       
        return;
    }
   
    let result = getCuttentDetailDatas();
    result.push(selectedCallDataCalc);
    result.push(selectedPutDataCalc);
   
    console.log('selectdData ',result);
    emits('update-detail-datas',result);   
};
const saveOneTime = async () => {
    console.log("saveOneTime");
    if(checkingExistOriginData()){
        alert('origin data already exist!')
        return;
    }

    selectedCallData.value = getTodayCallDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         call_base_val.value,call_base_rate.value,center_cost.value,call_cost.value,-1,interval_cost.value);
    selectedPutData.value = getTodayPutDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
         put_base_val.value,put_base_rate.value,center_cost.value,put_cost.value,-1,interval_cost.value);
    selectedCallData.value.p_value=selectedPutData.value.p_value;   
    c_value.value = selectedCallData.value.c_value;
    c_delta.value = selectedCallData.value.c_delta;
    p_value.value = selectedPutData.value.p_value;
    p_delta.value = selectedPutData.value.p_delta;

    let result;
    await originDataProcess(selectedCallData.value);
    result = await originDataProcess(selectedPutData.value);   
   // console.log('selectdData ',result);
    emits('update-detail-datas',result);
};
</script>

<template>
    <div class="w-full h-full grid  grid-cols-1 lg:grid-cols-2 m-2 p-4 mx-auto">
        <div class="col-span-1 text-center flex flex-col justify-between mt-2 py-2 px-4 text-[16px] lg:text-[20px] mx-auto">
            <div>               
                <div class="grid grid-cols-3 justify-between items-center m-4">
                    <div class="text-center p-2">今日</div>
                    <div class="w-full col-span-2 flex items-center">
                        <VueDatePicker
                            v-model="todayDate"
                            locale="ja"
                            format="yyyy年MM月dd日"
                            modelType="yyyy/MM/dd"
                            auto-apply
                            :clearable="false"
                            input-class-name="!py-2 !px-0 !border-green-600 !placeholder:text-red-400 text-center !text-[20px] !text-bold w-full"
                            placeholder="Select the date!"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-4">
                    <div class="text-center">先物ミニ</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="mini_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="5"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="4000000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-8">
                    <div class="text-center"> C: {{c_value}}</div>
                    <div class="w-full col-span-2 mx-auto flex items-center">
                        Cデルタ : {{ c_delta }}
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-4">
                    <div class="text-center"> P: {{p_value}}</div>
                    <div class="w-full col-span-2 flex mx-auto items-center">
                        Pデルタ: {{p_delta}}
                    </div>
                </div>
            </div>
            <div class="inline-flex mt-4 mx-auto">
                <button
                    @click="calculateToday"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>計算
                </button>
                <button
                    @click="saveToday"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>保存
                </button>
            </div>
        </div>
        <div class="flex flex-col justify-between col-span-1 text-center mt-2 py-2 px-4 text-[16px] lg:text-[20px] mx-auto">
            <div>
                <div class="grid grid-cols-1 justify-between items-center m-4">
                    <div class="text-start p-2">エントリ一時価格</div>
                </div>
                <div class="grid grid-cols-4 items-center justify-between mt-4">
                    <div class="col-span-2 text-center">コール</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="call_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="5"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="4000000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center justify-between mt-4">
                    <div class="col-span-2 text-center">プット</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="put_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="5"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="4000000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-4">
                    <div class="text-center">中心価格</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="center_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="5"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="4000000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-4">
                    <div class="text-center">ヘッジ間隔</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="interval_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="10"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="4000000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
            </div>
            <div class="inline-flex mt-4 mx-auto">
                <button
                    @click="calculateOneTime"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>計算
                </button>
                <button
                    @click="saveOneTime"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>保存
                </button>
            </div>
        </div>
    </div>
</template>
