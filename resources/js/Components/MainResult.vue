<script setup>
import { computed,ref, onMounted } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";


const props = defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
    base:Object,
});
const errors = computed(() => usePage().props.value.errors);

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

const cal_results = ref(null);
const showDelta = ref(false);



</script>

<template>
    <div class="w-full mt-8">        
        <DataTable :value="cal_results" class="mx-2" tableStyle="min-width: 20rem">
            <Column field="date" class="text-center" header="年月日"></Column>
            <Column field="type" class="text-center" header="種類"></Column>
            <Column field="strike" class="text-center" header="権利行使価格"></Column>
            <Column field="sheets" class="text-center" header="枚数"></Column>
            <Column field="cost" class="text-center" header="価格"></Column>

            <Column v-if="showDelta" field="delta_1" class="text-center" header="Delta1"></Column>
            <Column v-if="showDelta" field="delta_2" class="text-center" header="Delta2"></Column>
            <Column v-if="showDelta" field="delta_3" class="text-center" header="Delta3"></Column>
            <Column v-if="showDelta" field="delta_4" class="text-center" header="Delta4"></Column>
            <Column v-if="showDelta" field="delta_5" class="text-center" header="Delta5"></Column>
            <Column v-if="showDelta" field="delta_6" class="text-center" header="Delta6"></Column>
            <Column v-if="showDelta" field="delta_7" class="text-center" header="Delta7"></Column>
            <Column v-if="showDelta" field="delta_8" class="text-center" header="Delta8"></Column>
            <Column v-if="showDelta" field="delta_9" class="text-center" header="Delta9"></Column>
            <Column v-if="showDelta" field="delta_10" class="text-center" header="Delta10"></Column>
            <Column v-if="showDelta" field="delta_11" class="text-center" header="Delta11"></Column>


            <Column field="profit" class="text-center" header="損益"></Column>
            <Column field="mini_cost" class="text-center" header="ミニ終値"></Column>
            <Column field="c_cost" class="text-center" header="Ｃ終値"></Column>
            <Column field="p_cost" class="text-center" header="Ｐ終値"></Column>
            <Column field="interval" class="text-center" header="間隔"></Column>
            <Column field="cent_cost" class="text-center" header="中心価格"></Column>
        </DataTable>        
    </div>
</template>
