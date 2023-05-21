<script setup>
import { computed, ref, onMounted } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";

const props = defineProps({   
    mainresult:Array,
    nikivalue:String
});

const auto_calc = ref(false);
const products = ref(null);
 
onMounted(()=>{  
    
    setTimeout(() => {
        products.value = props.mainresult;
        console.log('products.value ',products.value);
        // console.log('test',test);
    }, 700);
})

    

</script>

<template>
    <div class="w-full px-4 pt-2">
        <div class="flex items-center ml-14 l-5">
            <Checkbox
                v-model="auto_calc"
                inputId="ingredient1"
                name="pizza"
                value="Cheese"
                :binary="true"
            />
            <label for="ingredient1" class="ml-2 font-bold text-[16px]"> 自動計算 </label>
            <!-- <div class="flex justify-center mx-auto items-center font-bold text-green-900 text-[18px]">
                <div>日経合計:  {{props.nikivalue}}</div>
            </div> -->
        </div>
        <div class="flex m-2 w-full">

            <table class="w-full m-2">
                <thead>
                    <tr>
                        <th>売買</th>
                        <th>価格</th>
                        <th>決済</th>
                        <th>Delta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="cursor-pointer text-center" v-for="result in products" :key="result.row_id">
                        <td>{{ result.type }}{{result.type_val}}</td>
                        <td>{{ result.price }}</td>
                        <td>{{ result.status }}</td>
                        <td>{{ result.diff }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <DataTable :value="products" class="mx-2" tableStyle="min-width: 20rem">
            <Column field="type" class="text-center" header="売買"></Column>
            <Column field="cost" class="text-center" header="価格"></Column>
            <Column field="payment" class="text-center" header="決済"></Column>
            <Column
                field="quantity"
                class="text-center"
                header="delta"
            ></Column>
        </DataTable> -->
        <div class="flex justify-center mt-1 mx-auto font-bold text-green-900 text-[18px]">
            <div>日経合計:  {{props.nikivalue}}</div>
        </div>
    </div>
</template>
<style scoped>
    table thead tr {
        background-color: #8ffeba !important;
    }
    table tbody tr {
        background-color: rgb(247, 255, 246) !important;
        border-bottom: solid 1.5px #c7c7c7;
    }
    table tbody tr.selected  {
        background-color: rgb(82, 82, 237) !important;
    }
    table th,
    table td {
        min-width: 40px;
        padding: 3px 1px;
    }
</style>
