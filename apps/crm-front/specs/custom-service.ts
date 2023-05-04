import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { useSelector } from "react-redux";
import { selectLangState } from "../store/langSlice";
import { Langs } from "./custom-types";


const baseURL = "https://crm-backend-two.vercel.app/";
// const baseURL = "http://localhost:8000/";



export const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd' };

export const GetParams = (param: string): string => {
    const localization = useSelector(selectLangState) as Langs;
    return localization.langs[localization.currentLang].params[param];
}

export const responsiblesDS = (auth): DataManager => new DataManager({
    url: `${baseURL}crm/responsibles/get`,
    updateUrl: `${baseURL}crm/users/update`,
    insertUrl: `${baseURL}crm/users/set`,
    removeUrl: `${baseURL}crm/users/delete`,
    dataType: 'json',
    adaptor: new UrlAdaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

export const taskDS = (auth): DataManager => new DataManager({
    adaptor: new UrlAdaptor(),
    updateUrl: `${baseURL}crm/tasks/update`,
    insertUrl: `${baseURL}crm/tasks/set`,
    removeUrl: `${baseURL}crm/tasks/delete`,
    url: `${baseURL}crm/tasks/get`,
    crossDomain: true,
    requestType: 'POST',
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});