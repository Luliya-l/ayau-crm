import { User } from 'apps/crm-front/specs/custom-types';
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
        console.log(e)
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