export interface StudentRegister{
        index_number:string;
        surname:string;
        other_names:string;
        locale:{
                    name:string;
                    address:string;
                    latitude:number;
                    longitude:number;
number                }
        phone:string;
        email:string;
        passwords:{
                    password:string;
                    confirm_password:string;
                }
        department:string;
        foreign_student:boolean;
        want_placement:boolean;
        
        
}



