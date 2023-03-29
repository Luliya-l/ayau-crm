
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
    phone: string;
    role: string;
    email: string;
    gender: string;
    birthdate: string;
} | null;

export type DB = {
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
    user_id:number,
    object_id:number
}

export type Contract = {
    id:number,
    name:string,
    description:string,
    status:string,
    start_date:string,
    end_date:string,
    created_at:string,
    updated_at:string,
    deleted_at:string | null,
    company_id:number,
    user_id:number,
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
    user_id:number,
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
    user_id:number,
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
    user_id:number,
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
    user_id:number,
    object_id:number
}