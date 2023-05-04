import { Company, Contact, Contract, Mail, Msg, Organization, Question, Task, User } from 'apps/crm-front/specs/custom-types';
import api from './axios'

export async function postRegister(user: User) {
    return api.post(
        "auth/register", 
        JSON.stringify(user)
    )
    .then((res) => {
        return res
    })
    .catch((e) => {
        return null;
    });
}

export async function postLogin(
    login: string,
    password: string
) {
    return api.post(
        "auth/login", 
        {
            "phone":login,
            "email":login,
            "password":password
        }
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postGetProfile(
    token:string
) {
    return api.post(
        "auth/getme", 
        '',
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res
    })
    .catch((e) => {
        return null;
    });
}

export async function postOrganization(token:string) {
    return api.post(
        "crm/get_organization_info",
        '',
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetOrganization(
    org:Organization,
    token:string
) {
    return api.post(
        "crm/set_organization_info", 
        JSON.stringify(org),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetContract(
    contract:Contract,
    token:string
) {
    return api.post(
        "crm/contracts/set", 
        JSON.stringify(contract),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetTask(
    task:Task,
    token:string
) {
    return api.post(
        "crm/tasks/set", 
        JSON.stringify(task),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetContacts(
    contact:Contact,
    token:string
) {
    return api.post(
        "crm/contacts/set", 
        JSON.stringify(contact),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetCompanies(
    company:Company,
    token:string
) {
    return api.post(
        "crm/companies/set", 
        JSON.stringify(company),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetMail(
    mail:Mail,
    token:string
) {
    return api.post(
        "crm/mails/set", 
        JSON.stringify(mail),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postSetQuestions(
    question:Question,
    token:string
) {
    return api.post(
        "gpt/question", 
        JSON.stringify(question),
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postGetChatHistory(
    token:string
) {
    return api.post(
        "gpt/questions/get", 
        '',
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postGetResponsible(
    token:string
) {
    return api.post(
        "crm/responsibles/get", 
        '',
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}

export async function postGetCompaniesList(
    token:string
) {
    return api.post(
        "crm/companies_list/get", 
        '',
        {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
        return res;
    })
    .catch((e) => {
        return null;
    });
}