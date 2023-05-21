import moment from "moment/moment";

import { DetailItem } from "./DetailItem";
import { TotalItem } from "./TotalItem";

const one_year = 360;

const getSecondFridayOfMonth = (in_date) => {
    const year = in_date.year();
    const month = in_date.month();
    const date = moment({ year, month, date: 1 });
    const firstFriday = date.day(5).date();
    const secondFriday = date.day(5 + 7);
    return secondFriday.format("yyyy/MM/DD");
};

const unitCalculate=(type,normal_cost,remain_days,call_base_val,call_base_rate, 
    mini_cost, add_call_cost,quantity,self_type)=>{

    const sigma = call_base_rate / 100;
    const remain_period = remain_days / one_year;
    const short_rate = 0;   
    const dim_1 =(Math.log(mini_cost / call_base_val) + (Math.pow(sigma, 2) / 2) * remain_period) /(sigma * Math.pow(remain_period, 0.5));
    const dim_2 = dim_1 - sigma * Math.sqrt(remain_period);
    const norm_1 = standardNormalDistribution(dim_1);
    const norm_2 = standardNormalDistribution(dim_2);   
    const exp_t = Math.exp(-short_rate * remain_period);
    const call_value = exp_t * (mini_cost * norm_1 - call_base_val * norm_2);
    const put_value = Math.round(exp_t * (call_base_val * (1 - norm_2) - mini_cost * (1 - norm_1))) ;
    const call_delta = exp_t * norm_1;
    const put_delta = Math.round(exp_t * (norm_1 - 1)*10**4)/10**4;
    const gamma =(exp_t * Math.exp(-0.5 * Math.pow(dim_1, 2))) /Math.sqrt(2 * Math.PI)/mini_cost/sigma /Math.sqrt(remain_period);
    const gatta_per =(exp_t * mini_cost * Math.exp(-0.5 * Math.pow(dim_1, 2))) / Math.sqrt(2 * Math.PI) *Math.sqrt(remain_period) /100;
    const call_sqare = (-mini_cost*sigma*standardNormalDistributionWithMean(dim_1,0,1)/(2*Math.sqrt(remain_period))-short_rate*call_base_val*exp_t*dim_2)/one_year;
    const put_sqare =  (-mini_cost*sigma*standardNormalDistributionWithMean(dim_1,0,1)/(2*Math.sqrt(remain_period))+short_rate*call_base_val*exp_t*(1-dim_2))/one_year;
    const c_value = Math.round(call_value);
    const c_delta = Math.round(call_delta*10**4)/10**4;
    const loss_cost = (type=='origin'&&self_type=='call')?(c_value-add_call_cost)*(-1)
         :((type=='origin'&&self_type=='put')?(put_value-add_call_cost)*quantity:(normal_cost-add_call_cost)*quantity);
    const self_diff = self_type == 'call'?Math.round(call_delta*quantity*10**2)/10**2:Math.round(put_delta*quantity*10**2)/10**2;
    
    
//     console.log(' <type> ', type,' : ',self_type,' : ',put_value,' : ',add_call_cost,'  :: ')
// console.log(' <> ', dim_1,' : ',dim_2,' : ',norm_1,' : ',norm_2,' : ',exp_t,' : ',call_value,' : ',put_value,' : ',
// gamma,' : ',gatta_per,' : ',call_sqare,' : ',put_sqare,' : ',c_value,' : ',c_delta,' : ',loss_cost,' : ',self_diff,' :: ')

var detailItem = new DetailItem();
    detailItem.type=type;
    detailItem.run_cost= type=='origin'?call_base_val:'0';
    detailItem.quantity=quantity;
    detailItem.add_call_cost=add_call_cost;
    detailItem.loss_cost=loss_cost;
    detailItem.mini_cost=mini_cost;
    detailItem.c_value=c_value;
    detailItem.p_value=put_value;
    detailItem.c_delta=c_delta;
    detailItem.p_delta=put_delta;
    detailItem.self_diff=self_diff;

    detailItem.id=-1;

    return detailItem;
}

const getTodayCallDatas = (type,normal_cost, today_date,sq_date,call_base_val,call_base_rate, 
    mini_cost, add_call_cost,quantity, interval) => {
        // console.log('interval',interval);
    const remain_days = moment(today_date).diff(moment(sq_date),'days');
    // const remain_days = 4;
   
    let detailItem = new DetailItem();

    detailItem = unitCalculate(type,normal_cost,remain_days,call_base_val,call_base_rate, 
        mini_cost, add_call_cost,quantity,'call');

    let self_diff_items = [];
    for(var i=-5;i<6;i++){
        // console.log(i, ' - ',mini_cost+interval*i) 
        var self_diff_item = unitCalculate(type,normal_cost,remain_days,call_base_val,call_base_rate, 
            mini_cost+interval*i, add_call_cost,quantity,'call').self_diff;
        self_diff_items.push(self_diff_item);    
    } 
    detailItem.gen_date=today_date;
    detailItem.sq_date=sq_date;
    detailItem.self_diff_items=self_diff_items;
    detailItem.self_type='call';
    detailItem.center_cost=mini_cost;
    detailItem.interval=interval;
    detailItem.work_status=0;
    // console.log(' unit_getContinueDatas ass', detailItem);
    return detailItem;
};

const getTodayPutDatas = (type,normal_cost, today_date,sq_date,put_base_val, put_base_rate, mini_cost,add_put_cost,quantity, interval) => {
    const remain_days = moment(today_date).diff(moment(sq_date),'days');   
    //  const remain_days = 4;
   
    let detailItem = new DetailItem();

    detailItem = unitCalculate(type,normal_cost,remain_days,put_base_val,put_base_rate, 
        mini_cost, add_put_cost,quantity,'put');

    let self_diff_items = [];
    for(var i=-5;i<6;i++){
        // console.log(i, ' - ',mini_cost+interval*i) 
        var self_diff_item = unitCalculate(type,normal_cost,remain_days,put_base_val,put_base_rate, 
            mini_cost+interval*i, add_put_cost,quantity,'put').self_diff;
        self_diff_items.push(self_diff_item);    
    } 
    detailItem.gen_date=today_date;   
    detailItem.sq_date=sq_date;
    detailItem.self_diff_items=self_diff_items;
    detailItem.self_type='put';
    detailItem.center_cost=mini_cost;
    detailItem.interval=interval;
    detailItem.work_status=0;

    return detailItem;
};

const getContinueDatas = (type,normal_cost, today_date,sq_date,call_base_val, call_base_rate, mini_cost,add_call_cost,quantity, interval) => {
    const remain_days = moment(today_date).diff(moment(sq_date),'days');   
    //  const remain_days = 4;

    //  console.log(' getContinueDatas ass', add_call_cost);
   
    let detailItem = new DetailItem();

    detailItem = unitCalculate(type,normal_cost,remain_days,call_base_val,call_base_rate, 
        mini_cost, add_call_cost,quantity,'call');

    let self_diff_items = [];
    for(var i=-5;i<6;i++){        
        self_diff_items.push(quantity);    
    }     

    detailItem.gen_date=today_date;   
    detailItem.sq_date=sq_date;
    detailItem.self_diff_items=self_diff_items;
    detailItem.self_type='call';
    detailItem.center_cost=mini_cost;
    detailItem.interval=interval;
    detailItem.work_status=0;

    return detailItem;
};

const caclculateTotalResult=(items)=>{
    // console.log('caclculateTotalResultitems ',items)
    let sum_loss=0;
    let sum_sq=0;
    let sum_niki=0;
    let sum_sq_niki=0;
    let sum_diffs=[];
    let sum_quantity_niki = 0;
    
    items.map((item,index)=>{
        // console.log('item: ',item,' : ',index);
        sum_loss+=item.loss_cost;
        if(item.type=='continue'){
           sum_niki=sum_niki+ item.add_call_cost*parseFloat(item.quantity);
           sum_quantity_niki+=parseFloat(item.quantity);
        }else{ 
            sum_sq=sum_sq+ item.add_call_cost*parseFloat(item.quantity);            
        }
        sum_sq_niki=(sum_sq+sum_niki)*1000;
        for(let i=0;i<11;i++){
            sum_diffs[i]=0;
        }
        if(item.id>0){
            sum_diffs[0]+=parseFloat(item.diff_1);
            sum_diffs[1]+=parseFloat(item.diff_2);
            sum_diffs[2]+=parseFloat(item.diff_3);
            sum_diffs[3]+=parseFloat(item.diff_4);
            sum_diffs[4]+=parseFloat(item.diff_5);
            sum_diffs[5]+=parseFloat(item.diff_6);
            sum_diffs[6]+=parseFloat(item.diff_7);
            sum_diffs[7]+=parseFloat(item.diff_8);
            sum_diffs[8]+=parseFloat(item.diff_9);
            sum_diffs[9]+=parseFloat(item.diff_10);
            sum_diffs[10]+=parseFloat(item.diff_11);
        }else{
            sum_diffs[0]+=item.self_diff_items[0];
            sum_diffs[1]+=item.self_diff_items[1];
            sum_diffs[2]+=item.self_diff_items[2];
            sum_diffs[3]+=item.self_diff_items[3];
            sum_diffs[4]+=item.self_diff_items[4];
            sum_diffs[5]+=item.self_diff_items[5];
            sum_diffs[6]+=item.self_diff_items[6];
            sum_diffs[7]+=item.self_diff_items[7];
            sum_diffs[8]+=item.self_diff_items[8];
            sum_diffs[9]+=item.self_diff_items[9];
            sum_diffs[10]+=item.self_diff_items[10];
        }        
    });

    var total_items=[];
    sum_diffs.map((sum_diff,index)=>{
        let total_item = new TotalItem();
        total_item.price=items[items.length-1].center_cost+items[items.length-1].interval*(index-5);
        let with_diff = index<5?Math.round(sum_diffs[index+1]*10)/10-Math.round(sum_diffs[index]*10)/10
                               :Math.round(sum_diffs[index-1]*10)/10-Math.round(sum_diffs[index]*10)/10;
       with_diff = Math.round(with_diff*10)/10;
                             

        if(with_diff==0){
            total_item.type='';
            total_item.type_val='';
        }else if(with_diff>0){
            total_item.type='買い';
            total_item.type_val=with_diff;
        }else{
            total_item.type='売り';
            total_item.type_val=-with_diff;
        }
        total_item.diff=sum_diff;

        if(Math.round(sum_quantity_niki*10)/10==0){
            total_item.status='';
        }else if(index<5){
            if(total_item.sum_diff>0){
                if(Math.round(sum_diffs[index+1]*10)/10<sum_quantity_niki){
                    if(sum_quantity_niki<Math.round(sum_diffs[index]*10)/10){
                        total_item.status='決済有';
                    }else{
                        total_item.status='決済';
                    }
                }else{
                    total_item.status='';
                }
            }else{
                if(Math.round(sum_diffs[index+1]*10)/10>sum_quantity_niki){
                    if(sum_quantity_niki>Math.round(sum_diffs[index]*10)/10){
                        total_item.status='決済有';
                    }else{
                        total_item.status='決済';
                    }
                }else{
                    total_item.status='';
                }
            }  
        }else{
            if(total_item.sum_diff<0){
                if(Math.round(sum_diffs[index-1]*10)/10>sum_quantity_niki){
                    if(sum_quantity_niki>Math.round(sum_diffs[index]*10)/10){
                        total_item.status='決済有';
                    }else{
                        total_item.status='決済';
                    }
                }else{
                    total_item.status='';
                }
            }else{
                if(Math.round(sum_diffs[index-1]*10)/10<sum_quantity_niki){
                    if(sum_quantity_niki<Math.round(sum_diffs[index]*10)/10){
                        total_item.status='決済有';
                    }else{
                        total_item.status='決済';
                    }
                }else{
                    total_item.status='';
                }
            }  
        }
        total_item.row_id=index;
        total_item.sq_date=items[0].sq_date;

        total_items.push(total_item);
    });
    sum_quantity_niki = Math.round(sum_quantity_niki*10)/10;

    return {total_items,sum_quantity_niki,sum_sq,sum_niki,sum_sq_niki};
}


const getTodayOneDatas = (
    today_date = "",
    sq_date = "",
    call_base_val = 32100,
    call_base_rate = 0.25,
    put_base_val = 300,
    put_base_rate = 0.5,
    call_cost = 200,
    put_cost = 200,
    center_cost = 27500,
    interval_cost = 250
) => {
    const year = in_data.year();
    const month = in_data.month();
    const date = moment({ year, month, date: 1 });
    const firstFriday = date.day(5).date();
    const secondFriday = date.day(5 + 7);
    return secondFriday.format("yyyy/MM/DD");
};

function standardNormalDistribution(x) {
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = 0.3989423 * Math.exp((-x * x) / 2);
    var p =
        d *
        t *
        (0.3193815 +
            t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) {
        p = 1 - p;
    }
    return p;
}

function standardNormalDistributionWithMean(x, mean, stdDev) {
    const z = (x - mean) / stdDev;
    return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
}



export { caclculateTotalResult, getSecondFridayOfMonth, getTodayCallDatas, getTodayPutDatas, getContinueDatas, getTodayOneDatas };
