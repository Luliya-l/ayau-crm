import { DateTime } from "@syncfusion/ej2-charts";

export type Langs = {
    langs: {ru: Lang, en: Lang, kz: Lang},
    currentLang: string
}

export type Lang = {
    icon: string;
    params: LangParams
}

export type LangParams = {
    [key: string]: string | number | boolean | null | undefined | LangParams;
}

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    gender: string;
    role: string;
    birthdate: string | null;
    login: string;
    created_at: DateTime | null;
    updated_at: DateTime | null;
};

export type DB = {
    users: User[],
    tasks: Task[],
    contacts: Contact[],
    contracts: Contract[],
    customers: Customer[],
    files: File[],
    states: State[],
    mails: Mail[]
}

export type Task = {
    id:number,
    name:string,
    description:string,
    status:string,
    priority:string,
    type:string,
    execution_date:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    project_id:number,
    user_id:number,
    assigned_to:number,
    responsible:string,
    object:string,
    result:string,
}

export type Contact = {
    id:number,
    name:string,
    email:string,
    phone:string,
    mobile:string,
    fax:string,
    address:string,
    city:string,
    state:string,
    zip:string,
    country:string,
    notes:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user:string,
    object_id:number
}

export type Contract = {
    id:number,
    name:string,
    description:string,
    budget:number,
    status:string,
    post:string,
    email:string,
    phone:string,
    start_date:string,
    end_date:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user:string,
    object_id:number
}

export type Customer = {
    id:number,
    name:string,
    email:string,
    phone:string,
    mobile:string,
    fax:string,
    address:string,
    city:string,
    state:string,
    zip:string,
    country:string,
    notes:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user:string,
    object_id:number
}

export type File = {
    id:number,
    name:string,
    description:string,
    file:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user:string,
    object_id:number
}

export type State = {
    id:number,
    name:string,
    description:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user:string,
    object_id:number
}

export type Mail = {
    id:number,
    name:string,
    description:string,
    status:string,
    priority:string,
    due_date:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user:string,
    object_id:number
}