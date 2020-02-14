export interface StudentDetails{
    user_id:string;
    index_number:string;
    surname:string;
    other_names:string;
    phone:string;
    email:string;
    department:string;
    location:{
        name:string;
        address: string;
        latitude: string;
        longitude: string;
    }

    want_placement?:string;
    foreign_student?:string;
    company?:{
        name : string;
        email : string;
        phone :string;
        post_office_box :string;
        representative_name :string;
        representative_number :string;
        location : {
            name: string;
            address: string;
            latitude: string;
            longitude: string;
            updated_by: string;

        }
    }
    company_id?:string;
    registered_company?:boolean;
    supervisor_name?: string;
    supervisor_contact?:string;
    supervisor_email?: string;
    time_of_starting_internship:string;
    acceptance_letter_url?:string;
    reason_for_rejection?:string;
    picture_url?:string;

}

