export interface StudentPasswordRecovery{
        index_number:string;
        encrypted_key:string;
        passwords:{
                    password:string;
                    confirm_password:string;
                }
                }
