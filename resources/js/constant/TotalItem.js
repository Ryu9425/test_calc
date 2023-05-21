export class TotalItem {
    constructor(
        row_id,       
        type,
        type_val,
        price,
        status,
        diff,      
        sq_date,
    ) {
        this.row_id=row_id,
        this.type_val = type_val;
        this.price = price,
        this.type = type;
        this.status = status;
        this.diff = diff;
        this.sq_date=sq_date;
    }
}

