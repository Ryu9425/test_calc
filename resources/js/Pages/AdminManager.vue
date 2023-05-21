<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import { ref, onMounted } from "vue";
import moment from "moment";

import { getSecondFridayOfMonth,caclculateTotalResult } from "@/constant/DateComon";
import {getAllUsers} from "@/constant/DateManager"

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
const logo_img = "/images/castlee_logo.png";

const allUsers = ref([]);
onMounted(async() => {
    allUsers.value = await getAllUsers();
    console.log('allUsers ',allUsers.value, ' - ' ,formatDate(allUsers.value[0].updated_at));
});

const onRowClick = (item,index)=>{    
 
}

const onRowBlur = (item)=>{  
    console.log('onRowBlur, ',item);
}

const formatDate=(timestamp)=>{
    const date = new moment(timestamp);
    console.log('date ',date)
    return date.format('yyyy年MM月DD日');
}

</script>

<template>
    <Head title="Welcome" />
    <div class="h-screen w-full bg-pink-50 ">
        <div class="w-full">
            <div
                class="flex w-full pl-2 ls:pl-10 pt-1 mx-auto border-b-4 border-b-orange-500"
            >
                <div class="flex justify-center cursor-pointer items-center">
                    <img class="w-20" :src="logo_img" />
                </div>
                <div class="flex w-full justify-between items-center">
                    <div class="flex font-bold text-center ml-2 ls:ml-6 text-[16px] ls:text-[24px]">
                        ユーザー管理ページ
                    </div>
                    <div class="flex cursor-pointer">
                        <Link :href="route('logout')" method="post" > 
                            <a class="flex items-center justify-center mx-10 hover:mx-8 duration-150">
                                <i class="fa-solid fa-right-from-bracket fa-lg text-[28px]"></i>
                                <span class="hidden ls:flex text-center font-bold mx-2 text-[18px]">ログアウト</span>   
                            </a>     
                        </Link>                                                            
                    </div>
                </div>                
            </div>
            <div class="m-2 w-full px-2 ls:px-4 mx-auto">                
                <div class="flex m-2 mx-auto pt-6 w-full overflow-x-auto rounded-md ls:rounded-xl bg-white">
                    <table class="w-full m-2" id="detail-result">
                        <thead class="m-2 p-2 ls:p-4 ">
                            <tr>
                                <th>No</th>
                                <th>氏名</th>
                                <th>メールアドレス</th>
                                <th>登録日</th>
                                <th>登録番号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="cursor-pointer text-center" v-for="(user, index) in allUsers" :key="index" :class="{ 'selected': index === selectedIndex }" @click="onRowClick(user,index)" @blur="onRowBlur(user)">
                                <td>{{ index+1}}</td>                                
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td id="date">{{ formatDate(user.updated_at) }}</td>
                                <td>{{ user.id }}</td>
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
    thead tr{
        border-style: dotted;
        border-bottom: solid 2px rgb(194 195 194 / 66%);
    }
    
    table tbody tr{
        border-bottom: solid 1.75px #a5b7a9a7;
    }
    table tbody tr.selected  {
        background-color: rgb(181, 181, 255) !important;
    }
    table th,
    table td {
        min-width: 40px;
        padding: 2px 1px;
    }   
    #date{
        min-width: 130px !important;
    }
}
</style>
