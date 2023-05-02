import { Msg, Organization, User } from 'apps/crm-front/specs/custom-types';
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

export async function postGPT(
    msgs:Msg[]
) {
    return api.post(
        "gpt/question", 
        JSON.stringify(msgs)
    )
    .then((res) => {
        return res;
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