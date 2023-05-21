<script setup>
import { usePage } from "@inertiajs/inertia-vue3";

import { ref, onMounted, computed, watch, defineEmits } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

import { getSecondFridayOfMonth } from "@/constant/DateComon";

const props = defineProps({
    base: Object,
});

const workingDate = ref();
const sqDate = ref();
const call_base_val = ref();
const call_base_rate = ref();
const put_base_val = ref();
const put_base_rate = ref();
const baseData = ref([]);

const emits = defineEmits(['setting-base-input'])

onMounted(() => {
       setTimeout(() => {
        baseData.value = props.base;
        console.log("bbbb ", baseData.value);
        workingDate.value = props
            ? moment(props.base.sqDate).format("YYYY/MM")
            : moment().format("YYYY/MM");

        sqDate.value = props
            ? getSecondFridayOfMonth(moment(props.base.sqDate))
            : getSecondFridayOfMonth(moment());

        call_base_val.value = props.base.call_base_val;
        call_base_rate.value = props.base.call_base_rate;
        put_base_val.value = props.base.put_base_val;
        put_base_rate.value = props.base.put_base_rate;
    }, 500);
});

watch(baseData, (newValue, oldValue) => {   
    console.log("new dase ", newValue);
});
watch(sqDate, (newValue, oldValue) => {   
    baseData.value.sqDate=newValue;
    emits('setting-base-input',baseData.value);
});
watch(call_base_val, (newValue, oldValue) => {
    baseData.value.call_base_val=newValue;
    emits('setting-base-input',baseData.value);
});
watch(call_base_rate, (newValue, oldValue) => {
    baseData.value.call_base_rate=newValue;
    emits('setting-base-input',baseData.value);
});
watch(put_base_val, (newValue, oldValue) => {
    baseData.value.put_base_val=newValue;
    emits('setting-base-input',baseData.value);
});
watch(put_base_rate, (newValue, oldValue) => {
    baseData.value.put_base_rate=newValue;
    emits('setting-base-input',baseData.value);
});

const preMonth = () => {
    workingDate.value = moment(workingDate.value)
        .subtract("months", 1)
        .format("yyyy/MM");
    sqDate.value = getSecondFridayOfMonth(moment(workingDate.value));
    console.log("pre ", sqDate);
};
const nextMonth = () => {
    workingDate.value = moment(workingDate.value)
        .add("months", 1)
        .format("yyyy/MM");
    sqDate.value = getSecondFridayOfMonth(moment(workingDate.value));
    console.log("pre ", sqDate);
};


</script>

<template>
    <div class="max-w-md flex h-full m-2 p-4 mx-auto">
        <div class="text-center mt-4 text-[16px] ls:text-[20px] mx-auto">
            <!-- <div class="m-4 font-sans text-red-400 text-[36px]">
                {{ workingDate }}
            </div> -->
            <VueDatePicker
                class="!w-52 ls:!w-64 mx-auto"
                v-model="workingDate"
                locale="ja"
                format="yyyy年MM月"
                modelType="yyyy/MM"
                month-picker
                auto-apply
                :clearable="false"
                input-class-name="!border-green-600 !placeholder:text-red-400 text-center !text-[22px] la:!text-[30px] !text-bold "
                placeholder="Select the month"
            />
            <div class="inline-flex mb-2 ls:mb-4 mx-auto">
                <button
                    @click="preMonth"
                    class="inline-flex w-16 ls:w-20 justify-center items-center m-2 p-4 bg-green-700 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-green-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-backward-step fa-sm ls:fa-lg"></i>
                </button>
                <button
                    @click="nextMonth"
                    class="inline-flex  w-16 ls:w-20 justify-center items-center m-2 p-4 bg-green-700 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-green-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i
                        class="fa-solid fa-backward-step fa-rotate-180 fa-sm ls:fa-lg"
                    ></i>
                </button>
            </div>
            <div class="grid grid-cols-3 justify-between items-center m-4">
                <div class="text-center p-2">SQ</div>
                <div class="w-full col-span-2 flex items-center">
                    <VueDatePicker
                        v-model="sqDate"
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
                <div class="text-center">コール</div>
                <div class="w-full col-span-2 flex items-center">
                    <div>
                        <InputNumber
                            v-model="call_base_val"
                            inputId="minmax-buttons"
                            showButtons
                            :step="500"
                            class="h-9 ls:h-10"
                            input-class="!w-full !text-[20px] ls:!text-[24px] text-center"
                            :min="0"
                            :max="4000000"
                            :value="$event"
                        />
                    </div>
                    <div class="pl-2">円</div>
                </div>
            </div>
            <div class="grid grid-cols-3 items-center justify-between mt-4">
                <div class="text-center">変動率</div>
                <div class="w-full col-span-2 flex items-center">
                    <div>
                        <InputNumber
                            v-model="call_base_rate"
                            inputId="minmax-buttons"
                            showButtons
                            :step="0.1"
                            class="h-9 ls:h-10"
                            input-class="!w-full !text-[20px] ls:!text-[24px] text-center"
                            :min="0"
                            :max="2000"
                            :minFractionDigits="2"
                        />
                    </div>
                    <div class="pl-2">%</div>
                </div>
            </div>
            <div class="grid grid-cols-3 items-center justify-between mt-4">
                <div class="text-center">コール</div>
                <div class="w-full col-span-2 flex items-center">
                    <div>
                        <InputNumber
                            v-model="put_base_val"
                            inputId="minmax-buttons"
                            showButtons
                            :step="500"
                            class="h-9 ls:h-10"
                            input-class="!w-full !text-[20px] ls:!text-[24px] text-center"
                            :min="0"
                            :max="4000000"
                        />
                    </div>
                    <div class="pl-2">円</div>
                </div>
            </div>
            <div class="grid grid-cols-3 items-center justify-between mt-4">
                <div class="text-center">変動率</div>
                <div class="w-full col-span-2 flex items-center">
                    <div>
                        <InputNumber
                            v-model="put_base_rate"
                            inputId="minmax-buttons"
                            showButtons
                            :step="0.1"
                            class="h-9 ls:h-10"
                            input-class="!w-full !text-[20px] ls:!text-[24px] text-center"
                            :min="0"
                            :max="2000"
                            :minFractionDigits="2"
                        />
                    </div>
                    <div class="pl-2">%</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.w-215 {
    width: 215px !important;
}

@media (prefers-color-scheme: dark) {
}
</style>
