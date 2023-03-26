
export type Langs = {
    langs: {ru: Lang, en: Lang, kz: Lang}
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
