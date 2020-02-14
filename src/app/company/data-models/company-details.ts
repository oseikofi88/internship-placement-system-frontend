export interface CompanyDetails{
        user_id:string;
        name:string;
        email:string;
        phone:string;
        location:{
                    name:string;
                    address:string;
                    latitude:number;
                    longitude:number;
                }
        postal_address:string;
        website:string;
        company_representative_name:string;
        company_representative_email:string;
        company_representative_phone:string;
        
        
}



