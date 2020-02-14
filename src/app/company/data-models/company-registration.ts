export interface CompanyRegister{
        name:string;
        email:string;
        phone:string;
        location:{
                    name:string;
                    address:string;
                    latitude:number;
                    longitude:number;
                }
        post_office_box:string;
        website:string;
        passwords?:{
                    password:string;
                    confirm_password:string;
                }
        acceptance_letter?:File;
        company_representative_name:string;
        company_representative_email:string;
        company_representative_phone:string;
        order_made?: boolean;
        
        
}



