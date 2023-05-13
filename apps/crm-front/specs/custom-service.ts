import { DataManager, UrlAdaptor, Query, Predicate } from "@syncfusion/ej2-data";
import { useSelector } from "react-redux";
import { selectLangState } from "../store/langSlice";
import { Contract, Langs, Task } from "./custom-types";

// export const baseURL = "https://crm-backend-two.vercel.app/";
const baseURL = "http://localhost:8000/";

export const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd' };

export const GetParams = (param: string, localization): string => {
    // const localization = useSelector(selectLangState) as Langs;
    return localization?.langs[localization.currentLang].params[param];
}

export const CurrentLang =():string => {
    const localization = useSelector(selectLangState) as Langs;
    return localization.currentLang;
}

export const eventsDS = (auth): DataManager => new DataManager({
    url: `${baseURL}crm/events/get`,
    dataType: 'json',
    adaptor: new UrlAdaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

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

export const usersDS = (auth): DataManager => new DataManager({
    url: `${baseURL}crm/users/get`,
    updateUrl: `${baseURL}crm/users/update`,
    insertUrl: `${baseURL}crm/users/set`,
    removeUrl: `${baseURL}crm/users/delete`,
    dataType: 'json',
    adaptor: new UrlAdaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

export const contractsDS = (auth):DataManager => new DataManager({
    url: `${baseURL}crm/contracts/get`,
    updateUrl: `${baseURL}crm/contracts/update`,
    insertUrl: `${baseURL}crm/contracts/set`,
    removeUrl: `${baseURL}crm/contracts/delete`,
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

export const companiesDS = (auth): DataManager => new DataManager({
    adaptor: new UrlAdaptor(),
    updateUrl: `${baseURL}crm/companies/update`,
    insertUrl: `${baseURL}crm/companies/set`,
    removeUrl: `${baseURL}crm/companies/delete`,
    url: `${baseURL}crm/companies/get`,
    crossDomain: true,
    requestType: 'POST',
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

export const contactsDS = (auth): DataManager => new DataManager({
    adaptor: new UrlAdaptor(),
    updateUrl: `${baseURL}crm/contacts/update`,
    insertUrl: `${baseURL}crm/contacts/set`,
    removeUrl: `${baseURL}crm/contacts/delete`,
    url: `${baseURL}crm/contacts/get`,
    crossDomain: true,
    requestType: 'POST',
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

export const companiesListDS = (auth): DataManager => new DataManager({
    adaptor: new UrlAdaptor(),
    updateUrl: `${baseURL}crm/companies/update`,
    insertUrl: `${baseURL}crm/companies/set`,
    removeUrl: `${baseURL}crm/companies/delete`,
    url: `${baseURL}crm/companies_list/get`,
    crossDomain: true,
    requestType: 'POST',
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

export const mailsDS = (auth): DataManager => new DataManager({
    adaptor: new UrlAdaptor(),
    updateUrl: `${baseURL}crm/mails/update`,
    insertUrl: `${baseURL}crm/mails/set`,
    removeUrl: `${baseURL}crm/mails/delete`,
    url: `${baseURL}crm/mails/get`,
    crossDomain: true,
    requestType: 'POST',
    headers: [{ Authorization: `Bearer ${auth.authToken}` }]
});

// DASHBOARD

export const TasksData = async(auth) => {
    return taskDS(auth).executeQuery(
        new Query().where(new Predicate('completed', 'equal', true)))
        .then((e) => {
            if (e) {
                const c = {overdueTasks:0, newTasks:0, completedTasks:0};
                e['result']['result'].forEach((el:Task) => {
                    if (!el.completed) {
                        c.newTasks++;
                    } else {
                        c.completedTasks++;
                    }
                    if (el.finish_at && new Date(el.finish_at) < new Date()) {
                        c.overdueTasks++;
                    }
                })
                return c;
            }
        })
}

export const ContractsData = async(auth) => {
    return contractsDS(auth).executeQuery(
        new Query().where(new Predicate('step', 'equal', 'new')))
        .then((e) => {
            if (e) {
                const c = {withoutTask:0};
                if (!e['result']['result']) {
                    return c;
                }
                e['result']['result'].forEach((el:Contract) => {
                    if (!el.tasks) {
                        c.withoutTask++;
                    } 
                })
                return c;
            }
        })
}