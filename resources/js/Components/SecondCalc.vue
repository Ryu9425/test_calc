<script setup>
import { usePage } from "@inertiajs/inertia-vue3";
import { ref, onMounted, watch,computed,defineEmits } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { originDataProcess,getCuttentDetailDatas } from "@/constant/DateManager";
import { getTodayCallDatas,getTodayPutDatas,getContinueDatas } from "@/constant/DateComon";

const props = defineProps({
    base:Object,
    selectedItem:Object,
    calcMode:Boolean,
});

const emits = defineEmits(['update-detail-datas','remove-detail-data','update_one_data'])

const is_updating = ref(false);

const baseData = ref();
const workingDate = ref(null);
const sqDate = ref();

const call_base_val =  computed(() => props.base.call_base_val);
const call_base_rate = computed(() => props.base.call_base_rate);
const put_base_val =  computed(() => props.base.put_base_val);
const put_base_rate = computed(() => props.base.put_base_rate);

const todayDate = ref(null);
const mini_cost = ref();
const call_cost = ref();
const put_cost = ref();
const center_cost = ref();
const interval_cost = ref();
const add_call_cost = ref(0);
const quantity = ref(0.0);

const setting_visible = ref(false);

const c_value= ref();
const p_value= ref();
const c_delta= ref();
const p_delta= ref();
const loss_cost = ref();

const modal_title = ref('プロパティ追加');

watch([call_base_val,call_base_rate,put_base_val,put_base_rate,todayDate,mini_cost], (newValue, oldValue) => {   
    if(props.calcMode) calculateContinue();
});

watch([center_cost,interval_cost], (newValue, oldValue) => {   
    if(props.calcMode) calculateOneTimeContinue();
});

onMounted(() => {    

    todayDate.value = moment().format("yyyy/MM/DD");
    mini_cost.value = 27500;
    call_cost.value = 250;
    put_cost.value = 250;
    center_cost.value = 27500;
    interval_cost.value = 200;
    setTimeout(() => {
        baseData.value = props.base;
        sqDate.value=baseData.value.sqDate;
        //  getTodayCallDatas('origin',29620,todayDate.value,sqDate.value,30000,19,29620,165,-1,230);
        // const test=getTodayPutDatas('origin',todayDate.value,sqDate.value,27000,42,29620,395,-1,230);
        workingDate.value = props
            ? moment(props.base.todayDate).format("YYYY/MM")
            : moment().format("YYYY/MM");
      //  sqDate.value = moment(props.base.todayDate).format("YYYY/MM/DD");
        call_base_val.value = props.base.call_base_val;
        call_base_rate.value = props.base.call_base_rate;
        put_base_val.value = props.base.put_base_val;
        put_base_rate.value = props.base.put_base_rate;

    }, 500);
});


const calculateContinue = async () => {
   
    if(quantity.value==0) {
        alert('select add_call_cost');
        return;
    }

    console.log("calculateToday");
    var selectedCallData = getContinueDatas('continue',mini_cost.value,todayDate.value,sqDate.value,
            call_base_val.value,call_base_rate.value,mini_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
    var selectedPutData = getTodayPutDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
            put_base_val.value,put_base_rate.value,mini_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
   
   // selectedCallData.p_value=selectedPutData.p_value;
    c_value.value = selectedCallData.c_value;
    c_delta.value = selectedCallData.c_delta;
    p_value.value = selectedPutData.p_value;
    p_delta.value = selectedPutData.p_delta;

    loss_cost.value=selectedCallData.loss_cost;
   
    var result =  getCuttentDetailDatas();
    console.log('selectdData ',result);
    result.push(selectedCallData);
    emits('update-detail-datas',result);
    console.log("calculateContinue");
};

const saveContinue = async () => {

    console.log("saveContinue");
    if(quantity.value==0) {
        alert('select add_call_cost');
        return;
    }

    console.log("calculateToday");
    var selectedCallData = getContinueDatas('continue',mini_cost.value,todayDate.value,sqDate.value,
            call_base_val.value,call_base_rate.value,mini_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
    var selectedPutData =  getTodayPutDatas('origin',mini_cost.value,todayDate.value,sqDate.value,
            put_base_val.value,put_base_rate.value,mini_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
   
    selectedCallData.p_value=selectedPutData.p_value;
    c_value.value = selectedCallData.c_value;
    c_delta.value = selectedCallData.c_delta;
    p_value.value = selectedPutData.p_value;
    p_delta.value = selectedPutData.p_delta;

    loss_cost.value=selectedCallData.loss_cost;
   // await originDataProcess(selectedCallData);
    var result =  await originDataProcess(selectedCallData);
    console.log('selectdData ',result);
    emits('update-detail-datas',result);
    console.log("calculateContinue");
};
const calculateOneTimeContinue = () => {
    console.log("calculateOneTimeContinue");
    if(quantity.value==0) {
        alert('select add_call_cost');
        return;
    }

    console.log("calculateToday");
    var selectedCallData = getContinueDatas('continue',center_cost.value,todayDate.value,sqDate.value,
            call_base_val.value,call_base_rate.value,center_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
    var selectedPutData = getTodayPutDatas('origin',center_cost.value,todayDate.value,sqDate.value,
            put_base_val.value,put_base_rate.value,center_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
   
   // selectedCallData.p_value=selectedPutData.p_value;
    c_value.value = selectedCallData.c_value;
    c_delta.value = selectedCallData.c_delta;
    p_value.value = selectedPutData.p_value;
    p_delta.value = selectedPutData.p_delta;

    loss_cost.value=selectedCallData.loss_cost;
   
    var result =  getCuttentDetailDatas();
    console.log('selectdData ',result);
    result.push(selectedCallData);
    emits('update-detail-datas',result);
    console.log("calculateContinue");
};
const saveOneTimeContinue = async () => {
    console.log("saveOneTimeContinue");
    if(quantity.value==0) {
        alert('select add_call_cost');
        return;
    }

    console.log("calculateToday");
    var selectedCallData = getContinueDatas('continue',center_cost.value,todayDate.value,sqDate.value,
            call_base_val.value,call_base_rate.value,center_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
    var selectedPutData =  getTodayPutDatas('origin',center_cost.value,todayDate.value,sqDate.value,
            put_base_val.value,put_base_rate.value,center_cost.value,add_call_cost.value,quantity.value,interval_cost.value);
   
    selectedCallData.p_value=selectedPutData.p_value;
    c_value.value = selectedCallData.c_value;
    c_delta.value = selectedCallData.c_delta;
    p_value.value = selectedPutData.p_value;
    p_delta.value = selectedPutData.p_delta;

    loss_cost.value=selectedCallData.loss_cost;
   // await originDataProcess(selectedCallData);
    var result =  await originDataProcess(selectedCallData);
    console.log('selectdData ',result);
    emits('update-detail-datas',result);
    console.log("calculateContinue");
};

const addContinue = () => {
    modal_title.value='プロパティ追加'
    setting_visible.value = true;
    console.log("saveOneTimeContinue");
};
const removeContinue = () => {
    emits('remove-detail-data');
    console.log("saveOneTimeContinue");
};
const updateContinue = () => {
    console.log('selectedItem ',props.selectedItem);
    if(props.selectedItem==null) {
        return;
    }
    if(props.selectedItem.type=='origin') {
        return;
    }
    console.log('selectedItem+++ ',props.selectedItem);
    modal_title.value='プロパティ更新'

    workingDate.value = props.selectedItem.gen_date;
    add_call_cost.value = props.selectedItem.add_call_cost;
    quantity.value = props.selectedItem.quantity;
    setting_visible.value = true;
    is_updating.value = true;
};

const settingProps = () => {
    console.log("saveOneTimeContinue");
    if(is_updating.value==true){      
        if(quantity.value==0) {
            alert('select add_call_cost');            
            return;
        }

        var selectedCallData = getContinueDatas('continue',29620,todayDate.value,sqDate.value,30000,19,28500,28350,0.1,290);
        var selectedPutData = getTodayPutDatas('origin',29620,todayDate.value,sqDate.value,27000,42,28500,28350,0.1,290);
    
        selectedCallData.id=props.selectedItem.id;

        selectedCallData.p_value=selectedPutData.p_value;
        c_value.value = selectedCallData.c_value;
        c_delta.value = selectedCallData.c_delta;
        p_value.value = selectedPutData.p_value;
        p_delta.value = selectedPutData.p_delta;

        loss_cost.value=selectedCallData.loss_cost;  
        
        emits('update_one_data',selectedCallData);
        quantity.value=0.0;
        add_call_cost.value=0;
        console.log("saveOneTimeContinue");
        is_updating.value=false;
    }
    setting_visible.value = false;

};
const closeModal = () => {
    setting_visible.value = false;
    console.log("saveOneTimeContinue");
};
</script>

<template>
    <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 m-2 p-4 mx-auto">
        <div
            class="col-span-1 text-center flex flex-col justify-between mt-2 py-2 px-4 text-[16px] lg:text-[20px] mx-auto"
        >
            <div>
                <div class="flex justify-center items-center m-4 mx-auto">
                    <!-- <div class="flex items-center"> -->
                    <VueDatePicker
                        v-model="todayDate"
                        locale="ja"
                        format="yyyy年MM月dd日"
                        modelType="yyyy/MM/dd"
                        auto-apply
                        :clearable="false" 
                        class="!w-52"
                        input-class-name="!py-2 !px-0 !border-green-600 !placeholder:text-red-400 text-center !text-[20px] !text-bold w-full"
                        placeholder="Select the date!"
                    /><span class="mx-4">の入力</span>
                    <!-- </div>  -->
                    <!-- <div class="text-center p-2"></div> -->
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-8">
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
                    <div class="text-center">C: {{c_value}}</div>
                    <div class="w-full col-span-2 mx-auto flex items-center">
                        Cデルタ :  {{ c_delta }}
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-4">
                    <div class="text-center">P: {{p_value}}</div>
                    <div class="w-full col-span-2 flex mx-auto items-center">
                        Pデルタ: {{ p_delta }}
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-between mt-4">
                    <div class="text-center">損益</div>
                    <div class="w-full col-span-2 flex mx-auto items-center">
                        {{ loss_cost }}
                    </div>
                </div>
            </div>
            <div class="inline-flex m4-4 mx-auto">
                <button
                    @click="calculateContinue"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>計算
                </button>
                <button
                    @click="saveContinue"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>保存
                </button>
            </div>
        </div>
        <div
            class="flex flex-col justify-between col-span-1 text-center mt-2 py-2 px-4 text-[16px] lg:text-[20px] mx-auto"
        >
            <div>
                <div class="inline-flex m-4 mx-auto">
                    <button
                        @click="addContinue"
                        class="inline-flex w-20 lg:w-32 justify-evenly items-center text-[12px] lg:text-[20px] m-1 lg:m-2 px-2 lg:px-4 py-1 lg:py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                    >
                        <i class="fa-solid fa-calculator fa-sm lg:fa-lg mx-2"></i>追加
                    </button>
                    <button
                        @click="removeContinue"
                        class="inline-flex w-20 lg:w-32 justify-evenly items-center text-[12px] lg:text-[20px] m-1 lg:m-2 px-2 lg:px-4 py-1 lg:py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                    >
                        <i class="fa-solid fa-trash fa-sm lg:fa-lg mx-2"></i>取消
                    </button>
                    <button
                        @click="updateContinue"
                        class="inline-flex w-20 lg:w-32 justify-evenly items-center text-[12px] lg:text-[20px] m-1 lg:m-2 px-2 lg:px-4 py-1 lg:py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                    >
                        <i class="fa-solid fa-trash fa-sm lg:fa-lg mx-2"></i>更新
                    </button>
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
            </div>
            <div class="inline-flex mt-4 mx-auto">
                <button
                    @click="calculateOneTimeContinue"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>計算
                </button>
                <button
                    @click="saveOneTimeContinue"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>保存
                </button>
            </div>
        </div>
    </div>
    <Dialog
        v-model:visible="setting_visible"
        modal 
        :header="modal_title" 
        class="w-5/6 lg:w-1/3"
    >
         <template #header></template>
        <div class="flex flex-col">
            <div class="flex flex-col justify-center items-center m-4 mx-auto">
                <div class="w-full grid grid-cols-3 items-center justify-between m-2 px-5">
                    <div class="text-center p-2">日付</div>
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
                <div class="w-full grid grid-cols-3 items-center justify-between m-2 px-5">
                    <div class="text-center">数量</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="quantity"
                                inputId="minmax-buttons"
                                showButtons
                                :step="0.1"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="-400"
                                :max="400"
                                :minFractionDigits="2"
                            />
                        </div>
                    </div>
                </div>
                <div class="w-full grid grid-cols-3 items-center justify-between m-2 px-5">
                    <div class="text-center">価格</div>
                    <div class="w-full col-span-2 flex items-center">
                        <div>
                            <InputNumber
                                v-model="add_call_cost"
                                inputId="minmax-buttons"
                                showButtons
                                :step="100"
                                class="h-9 lg:h-10"
                                input-class="!w-full !text-[20px] lg:!text-[24px] text-center"
                                :min="-200000"
                                :max="200000"                                
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="inline-flex mt-4 mx-auto">
                <button
                    @click="settingProps"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-calculator fa-lg mx-2"></i>OK
                </button>
                <button
                    @click="closeModal"
                    class="inline-flex w-32 justify-evenly items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-trash fa-lg mx-2"></i>CANCEL
                </button>
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
.customHeaderClass{
   background-color: aqua !important;
}
</style>