export interface StudentSupervisorUpdate{
        supervisor_name:string;
        supervisor_contact:string;
        supervisor_email:string;
        company_location?:{
                    address:string;
                    latitude:number;
                    longitude:number;
                }
        
        
}



