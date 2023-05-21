<script setup>
import { usePage } from "@inertiajs/inertia-vue3";
import { ref, onMounted,watch, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { getTodayCallDatas,getTodayPutDatas, } from "@/constant/DateComon";
import {checkingExistUpdateData,originDataProcess,getCuttentDetailDatas,entryMiniCost} from "@/constant/DateManager";

const props = defineProps({   
    base:Object,
    calcMode:Boolean,
    sumSqNiki:Number,
});

const emits = defineEmits(['update-detail-datas'])

const currentDate = ref(null);
const updateDate = ref(null);

const selectedType = ref();
const types = ref([
    { name: "コール", code: "call" },
    { name: "プット", code: "put" },
]);

const baseData = ref();
const workingDate = ref(null);
const todayDate = ref(null);
const sqDate = ref();
const mini_cost = ref();
const call_cost = ref();
const put_cost = ref();
const center_cost = ref();
const interval_cost = ref(200);

const call_base_val =  computed(() => props.base.call_base_val);
const call_base_rate = computed(() => props.base.call_base_rate);
const put_base_val =  computed(() => props.base.put_base_val);
const put_base_rate = computed(() => props.base.put_base_rate);
const sum_sq_niki = computed(() => props.sumSqNiki);

const c_value= ref();
const p_value= ref();
const c_delta= ref();
const p_delta= ref();
const loss_cost = ref('-----------');

const setting_cost = ref(200);
const new_run_cost = ref(20000);
const terminal_cost = ref();
const nike_mini_cost = ref(20000);
const interval_update_cost = ref(250);
const mini_pay = ref(0);
const total_loss = ref(0);

onMounted(() => {
    selectedType.value = types.value[0];
    currentDate.value = moment().format("yyyy/MM/DD");
    console.log("current ", currentDate.value);

    todayDate.value = moment().format("yyyy/MM/DD");
    mini_cost.value = 27500;
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
        call_base_val.value = props.base.call_base_val;
        call_base_rate.value = props.base.call_base_rate;
        put_base_val.value = props.base.put_base_val;
        put_base_rate.value = props.base.put_base_rate;
    }, 500);

});
const calculateUpdate =async () => {
    console.log("calculateUpdate");
    
    var selectedData=null;
    if(selectedType.value.code=='call'){
        selectedData = getTodayCallDatas('origin',new_run_cost.value,todayDate.value,sqDate.value,
            new_run_cost.value,call_base_rate.value,entryMiniCost,setting_cost.value,-1,interval_cost.value);
    }
    if (selectedType.value.code=='put'){
        selectedData = getTodayPutDatas('origin',new_run_cost.value,todayDate.value,sqDate.value,
            new_run_cost.value,put_base_rate.value,entryMiniCost,setting_cost.value,-1,interval_cost.value);
    }
        
    c_value.value = selectedData.c_value;
    c_delta.value = selectedData.c_delta;
    p_value.value = selectedData.p_value;
    p_delta.value = selectedData.p_delta;
    loss_cost.value=selectedData.loss_cost;

    selectedData.type='update';
   
    console.log('selectedCallData :: ',selectedData);

    if(checkingExistUpdateData(selectedData.self_type)){       
        return;
    }

    let result = getCuttentDetailDatas();
    result.push(selectedData);
   
    console.log('selectdData ',result);
    emits('update-detail-datas',result);
};
const saveUpdate = async() => {
    console.log("saveUpdate");
    
    var selectedData=null;
    if(selectedType.value.code=='call'){
        selectedData = getTodayCallDatas('origin',new_run_cost.value,todayDate.value,sqDate.value,
        new_run_cost.value,call_base_rate.value,entryMiniCost,setting_cost.value,-1,interval_cost.value);
    }
    if (selectedType.value.code=='put'){
        selectedData = getTodayPutDatas('origin',new_run_cost.value,todayDate.value,sqDate.value,
        new_run_cost.value,put_base_rate.value,entryMiniCost,setting_cost.value,-1,interval_cost.value);
    }
        
    c_value.value = selectedData.c_value;
    c_delta.value = selectedData.c_delta;
    p_value.value = selectedData.p_value;
    p_delta.value = selectedData.p_delta;
    loss_cost.value=selectedData.loss_cost;

    selectedData.type='update';
   
    console.log('selectedCallData :: ',selectedData);

    if(checkingExistUpdateData(selectedData.self_type)){   
        alert('updated data already exist!')    
        return;
    }

    let result = await originDataProcess(selectedData);
   
    console.log('selectdData ',result);
    emits('update-detail-datas',result);
};
const calculateOneTimeUpdate = () => {
    console.log("calculateOneTime");
    var selectedData=null;
    if(selectedType.value.code=='call'){
        selectedData = getTodayCallDatas('origin',nike_mini_cost.value,todayDate.value,sqDate.value,
            new_run_cost.value,call_base_rate.value,nike_mini_cost.value,setting_cost.value,-1,interval_cost.value);
    }
    if (selectedType.value.code=='put'){
        selectedData =  getTodayPutDatas('origin',new_run_cost.value,todayDate.value,sqDate.value,
            new_run_cost.value,put_base_rate.value,new_run_cost.value,setting_cost.value,-1,interval_cost.value);
    }
        
    c_value.value = selectedData.c_value;
    c_delta.value = selectedData.c_delta;
    p_value.value = selectedData.p_value;
    p_delta.value = selectedData.p_delta;
    loss_cost.value=selectedData.loss_cost;

    selectedData.type='update';
   
    console.log('selectedCallData :: ',selectedData);

    if(checkingExistUpdateData(selectedData.self_type)){       
        return;
    }

    let result = getCuttentDetailDatas();
    result.push(selectedData);
   
    console.log('selectdData ',result);
    emits('update-detail-datas',result);
};
const saveOneTimeUpdate = async () => {
    console.log("saveOneTime");
    console.log("calculateToday");
    
    // var selectedData = getTodayCallDatas('origin',call_base_val.value,todayDate.value,sqDate.value,
    // call_base_val.value,call_base_rate.value,mini_cost.value,call_cost.value,-1,interval_cost.value);
    var selectedData=null;
    if(selectedType.value.code=='call'){
        selectedData = getTodayCallDatas('origin',nike_mini_cost.value,todayDate.value,sqDate.value,
            new_run_cost.value,call_base_rate.value,nike_mini_cost.value,setting_cost.value,-1,interval_cost.value);
    }
    if (selectedType.value.code=='put'){
        selectedData = getTodayPutDatas('origin',nike_mini_cost.value,todayDate.value,sqDate.value,
            new_run_cost.value,put_base_rate.value,nike_mini_cost.value,setting_cost.value,-1,interval_cost.value);
    }
        
    c_value.value = selectedData.c_value;
    c_delta.value = selectedData.c_delta;
    p_value.value = selectedData.p_value;
    p_delta.value = selectedData.p_delta;
    loss_cost.value=selectedData.loss_cost;

    selectedData.type='update';
   
    if(checkingExistUpdateData(selectedData.self_type)){   
        alert('updated data already exist!')    
        return;
    }

    let result = await originDataProcess(selectedData);
   
    console.log('selectdData ',result);
    emits('update-detail-datas',result);
};

watch([call_base_val,call_base_rate,put_base_val,put_base_rate,todayDate,selectedType,setting_cost,new_run_cost], (newValue, oldValue) => {   
    if(props.calcMode) calculateUpdate();
});
watch([nike_mini_cost,interval_update_cost], (newValue, oldValue) => {   
    if(props.calcMode) calculateUpdate();
});
watch(sum_sq_niki, (newValue, oldValue) => {   
    total_loss.value = newValue-mini_pay.value;   
});
</script>

<template>
    <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 m-2 p-4 mx-auto">       
        <div
            class="col-span-1 text-center flex flex-col justify-between py-2 px-4 text-[16px] lg:text-[20px] mx-auto"
        >
            <div>
                <div class="grid grid-cols-3 justify-between items-center m-4">
                    <div class="text-center p-2">更新日</div>
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
                    <div class="text-center text-[18px]">買い戻すオプション</div>
                    <div class="w-full col-span-2 flex items-center">
                        <Dropdown
                            v-model="selectedType"
                            :options="types"
                            optionLabel="name"
                            placeholder="Select a City"
                            input-class="!p-0 !pl-2 !flex items-center"
                            class="h-9 lg:h-10 w-full text-[24px] text-center"
                        />
                        <div class="mx-2">
                            <InputNumber
                                v-model="setting_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="1"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="400000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center text-[18px] justify-between mt-4">
                    <div class="col-span-2 text-center">C: {{c_value}}</div>
                    <div class="w-full col-span-2 mx-auto flex items-center">
                        Cデルタ : {{ c_delta }}
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center text-[18px] justify-between mt-1">
                    <div class="col-span-2 text-center">P: {{p_value}}</div>
                    <div class="w-full col-span-2 flex mx-auto items-center">
                        Pデルタ:  {{p_delta}}
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center text-[18px] justify-between mt-1">
                    <div class="col-span-2 text-center">損益</div>
                    <div class="w-full col-span-2 flex mx-auto items-center">
                        {{ loss_cost }}
                    </div>
                </div>             
                <div class="grid grid-cols-4 items-center justify-between mt-1">
                    <div class="col-span-2 text-[18px]">新しい権利行使価格</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div class="">
                            <InputNumber
                                v-model="new_run_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="500"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="40000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center justify-between mt-4">
                    <div class="col-span-2 text-center">終直</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div class="">
                            <InputNumber
                                v-model="terminal_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="1"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="40000"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
            </div>
            <div class="inline-flex mt-4 mx-auto">
                <button
                    @click="calculateUpdate"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>計算
                </button>
                <button
                    @click="saveUpdate"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>保存
                </button>
            </div>
        </div>
        <div
            class="flex flex-col justify-between col-span-1 text-center mt-2 py-2 px-4 text-[16px] lg:text-[20px] mx-auto"
        >
            <div class="mt-20">
                <div class="grid grid-cols-1 justify-between items-center m-4">
                    <div class="text-start mx-auto p-2">確定損 {{total_loss}}</div>
                </div>
                <div class="grid grid-cols-4 items-center justify-between mt-4">
                    <div class="col-span-2 text-center">日経ミニ終値</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="nike_mini_cost"
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
                    <div class="col-span-2 text-center">ヘッジ間隔</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="interval_update_cost"
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
                    <div class="col-span-2 text-center">精算するミニ</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="mini_pay"
                                inputId="minmax-buttons"
                                showButtons
                                :step="0.1"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="0"
                                :max="4000"
                                :minFractionDigits="1"
                            />
                        </div>
                        <div class="pl-2">円</div>
                    </div>
                </div>
            </div>
            <div class="inline-flex mt-4 mx-auto">
                <button
                    @click="calculateOneTimeUpdate"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>計算
                </button>
                <button
                    @click="saveOneTimeUpdate"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>保存
                </button>
            </div>
        </div>
    </div>
</template>
