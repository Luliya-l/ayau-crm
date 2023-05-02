import { extend } from '@syncfusion/ej2-base';
import { 
    KanbanComponent, 
    ColumnsDirective, 
    ColumnDirective, 
    DialogFieldsModel 
} from "@syncfusion/ej2-react-kanban";

import { registerLicense } from "@syncfusion/ej2-base";

import { useDispatch, useSelector } from 'react-redux';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';

const baseURL = "https://crm-backend-two.vercel.app/";

const Contracts = ({setEditIndex}) => {
    const auth = useSelector(useAuth) as AuthState;

    const localization = useSelector(selectLangState);
    registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQl5hTn9Tc0RnXXxeeXQ=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSX1RcURjXH5adHdXQmA=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBWRWhc;MTQ4NjE2MEAzMjMxMmUzMTJlMzMzNUJnSDVJbXZqODU4NVB5QWV1aXJjMFVFMENtNWhhT2NJdy9ydXMrMFlObmM9;MTQ4NjE2MUAzMjMxMmUzMTJlMzMzNW9HWW1TTkZnOG1aOVR3YndRTmJHZ2xZdVFycjYzWm1FS2pXVkVZSDlDQjg9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUdkWH9bcXBRQmFeUQ==;MTQ4NjE2M0AzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9;MTQ4NjE2NEAzMjMxMmUzMTJlMzMzNVZRUERQZEljR1lVKzZoUk5GL1VsUkpKNi9ZUDVFVjBLaC9oQ3kxSDdleDA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBQR2Bc;MTQ4NjE2NkAzMjMxMmUzMTJlMzMzNUJSWWIrMGhjL0lqclFGNHM5MVl6SE1OSmVwZEpjc3VoTmptU1dnSHZISFE9;MTQ4NjE2N0AzMjMxMmUzMTJlMzMzNVlvcnFjdkY1Q0VVRHF6aWJ3SkFyZlE1WmZldGJHTnNHT1ZwM2FOcmpCQTQ9;MTQ4NjE2OEAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9');

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const data = new DataManager({
        url: `${baseURL}crm/contracts/get`,
        updateUrl: `${baseURL}crm/contracts/update`,
        insertUrl: `${baseURL}crm/contracts/set`,
        removeUrl: `${baseURL}crm/contracts/delete`,
        adaptor: new UrlAdaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${auth.authToken}` }]
    });
    const fields: DialogFieldsModel[] = [
        { text:'Задача', key: 'name', type: 'TextBox' },
        { text:'Шаг', key: 'step', type: 'DropDown' },
        { text:'Бюджет', key: 'budget', type: 'Numeric' },
        { text:'Задача', key: 'description', type: 'TextArea' }
    ];

    return (
        <>
            <div className="App mt-4">
                <KanbanComponent 
                    id="kanban" 
                    keyField="step" 
                    dataSource={data} 
                    cardSettings={{ contentField: "description", headerField: "id", showHeader: false }} 
                    dialogSettings={{ fields: fields }}
                >
                    <ColumnsDirective>
                    <ColumnDirective headerText = {`${getParams('primaryContact')}`} keyField="new" />
                    <ColumnDirective headerText={`${getParams('negotiation')}`} keyField="InProgress" />
                    <ColumnDirective headerText={`${getParams('makeDecision')}`} keyField="Testing" />
                    <ColumnDirective headerText={`${getParams('Harmonizationofcontract')}`} keyField="Close" />
                    </ColumnsDirective>
                </KanbanComponent>
            </div>
        </>
    );
}

export default Contracts;