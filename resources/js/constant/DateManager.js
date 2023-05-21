import moment from "moment/moment";
import axios from "axios";

import { DetailItem } from "./DetailItem";

let entryMiniCost = 0;

let allDetailDatas = [];

const getSQDetailDatas = async (sqDate) => {
    
    let res = await axios.get("/allitems",{
        params:{
            sq_date:sqDate
        }
    });
    let new_datas = res.data.datas;  
    
    allDetailDatas = new_datas;
    return allDetailDatas; 
};

const initingCallData = (today, sqDate) => {
    allDetailDatas.map((item) => {
        if (
            item.sqDate == sqDate &&
            item.type == "origin" &&
            item.self_type == "call"
        )
            return;
    });

    let newCallData = new DetailItem(today, sqDate);
    newCallData.type = "origin";
    newCallData.self_type = "call";
    newCallData.run_cost = 0;
    newCallData.quantity = -1;
    newCallData.add_call_cost = 0;
    newCallData.loss_cost = 0;
    newCallData.center_cost = 0;
    newCallData.interval = 0;
    newCallData.self_diff = 0;
    newCallData.mini_cost = 0;
    newCallData.self_diff_items = [];
    newCallData.work_status = 0;
    newCallData.id = 0;

    // AllDetailDatas.push(newCallData);

    originCallDataProcess(newCallData);

    return newCallData;
};

const initingPutData = (today, sqDate) => {
    let newPutlData = new DetailItem(today, sqDate);
    newPutlData.type = "origin";
    newPutlData.self_type = "put";
    return newPutlData;
};

const checkingExistOriginData=()=>{
    var origin_exist_status=false;
    allDetailDatas.map((item)=>{        
        if(item.type=='origin') origin_exist_status=true;
    })
    return origin_exist_status;
}
const checkingExistSavedOriginData=()=>{
    var origin_saved_exist_status=false;
    allDetailDatas.map((item)=>{        
        if(item.type=='origin'&&item.id>0) origin_saved_exist_status=true;
    })
    return origin_saved_exist_status;
}
const checkingExistUpdateData=(self_type)=>{
    var update_exist_status=false;
    allDetailDatas.map((item)=>{        
        if(item.type=='update'&&item.self_type==self_type&&item.id>0) update_exist_status=true;
    })
    return update_exist_status;
}

const originDataProcess = async (item_data) => {
    
    // console.log('item_data',item_data)
    let res = await axios.post("/additem", {
        item: item_data,
    });
    let new_datas = res.data.datas;  
    // console.log('originDataProcess ',new_datas);

    allDetailDatas = new_datas;
    return allDetailDatas;   
};
const getCuttentDetailDatas=()=>{   
    allDetailDatas.map((item,index)=>{      
         if(item.id<0) allDetailDatas.splice(index);
    })
   
    return allDetailDatas;   
}
const removeDataProcess = async (remove_item) => {
    // console.log('remove_item',remove_item)
    let res = await axios.post("/removeitem",{
        item:remove_item
    });
    // console.log('remove ',res);
    let new_datas = res.data.datas;      
    
    allDetailDatas = new_datas;
    return allDetailDatas; 
};
const updateDataProcess = async (update_item) => {
    // console.log('item_data',update_item)
    let res =  await axios.put("/updateitem/"+update_item.id,{
        item:update_item
    });   
 
    let new_datas = res.data.datas;  
    // console.log('update ',new_datas);
    
    allDetailDatas = new_datas;
    return allDetailDatas; 
};

const setEntryMiniCost=(value)=>{
    entryMiniCost=value;
    console.log('ffff ', entryMiniCost)
}

const getAllUsers = async () => {
    
    let res = await axios.get("/users");
    let users = res.data.datas;  
    return users; 
};

export {
    checkingExistOriginData,
    checkingExistSavedOriginData,
    checkingExistUpdateData,
    getSQDetailDatas,
    initingCallData,
    initingPutData,
    originDataProcess,
    getAllUsers,
    removeDataProcess,
    updateDataProcess,
    getCuttentDetailDatas,
    entryMiniCost,
    setEntryMiniCost,
};
