export class DetailItem {
    constructor(
        gen_date,
        sq_date,
        type,
        run_cost,
        quantity,
        add_call_cost,
        loss_cost,
        mini_cost,
        c_value,
        p_value,
        c_delta,
        p_delta,
        interval,
        center_cost,
        self_diff,
        self_diff_items, 
        self_type,
        work_status,
        id        
    ) {
        this.gen_date = gen_date;
        this.sq_date = sq_date,
        this.type = type;
        this.run_cost = run_cost;
        this.quantity = quantity;
        this.add_call_cost = add_call_cost;
        this.loss_cost = loss_cost;
        this.mini_cost = mini_cost;
        this.c_value = c_value;
        this.p_value = p_value;
        this.c_delta=c_delta,
        this.p_delta=p_delta,
        this.interval = interval;
        this.center_cost = center_cost;
        this.self_diff = self_diff;
        this.self_diff_items = self_diff_items;       
        this.self_type = self_type;  
        this.work_status = work_status;   
        this.id=id;
    }
}

