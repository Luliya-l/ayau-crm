import { extend } from '@syncfusion/ej2-base';
import { 
    KanbanComponent, 
    ColumnsDirective, 
    ColumnDirective, 
    DialogFieldsModel 
} from "@syncfusion/ej2-react-kanban";

import { registerLicense } from "@syncfusion/ej2-base";

import DataSource from '../../data/datasource.json';

const Contracts = ({ lang = 'ru'}) => {
    registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQl5hTn9Tc0RnXXxeeXQ=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSX1RcURjXH5adHdXQmA=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBWRWhc;MTQ4NjE2MEAzMjMxMmUzMTJlMzMzNUJnSDVJbXZqODU4NVB5QWV1aXJjMFVFMENtNWhhT2NJdy9ydXMrMFlObmM9;MTQ4NjE2MUAzMjMxMmUzMTJlMzMzNW9HWW1TTkZnOG1aOVR3YndRTmJHZ2xZdVFycjYzWm1FS2pXVkVZSDlDQjg9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUdkWH9bcXBRQmFeUQ==;MTQ4NjE2M0AzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9;MTQ4NjE2NEAzMjMxMmUzMTJlMzMzNVZRUERQZEljR1lVKzZoUk5GL1VsUkpKNi9ZUDVFVjBLaC9oQ3kxSDdleDA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBQR2Bc;MTQ4NjE2NkAzMjMxMmUzMTJlMzMzNUJSWWIrMGhjL0lqclFGNHM5MVl6SE1OSmVwZEpjc3VoTmptU1dnSHZISFE9;MTQ4NjE2N0AzMjMxMmUzMTJlMzMzNVlvcnFjdkY1Q0VVRHF6aWJ3SkFyZlE1WmZldGJHTnNHT1ZwM2FOcmpCQTQ9;MTQ4NjE2OEAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9');

    const {kanbanData} = DataSource;
    const data: any  = extend([], kanbanData, null, true);
    const fields: DialogFieldsModel[] = [
        { key: 'Id', type: 'TextBox' },
        { key: 'Status', type: 'DropDown' },
        { key: 'Estimate', type: 'Numeric' },
        { key: 'Summary', type: 'TextArea' }
    ];

    return (
        <>
            <KanbanComponent 
                id="kanban" 
                keyField="Status" 
                dataSource={data} 
                cardSettings={{ contentField: "Summary", headerField: "Id" }} 
                dialogSettings={{ fields: fields }}
            >
                <ColumnsDirective>
                  <ColumnDirective headerText="Первичный контакт" keyField="new" />
                  <ColumnDirective headerText="Переговоры" keyField="InProgress" />
                  <ColumnDirective headerText="Принимают решение" keyField="Testing" />
                  <ColumnDirective headerText="Согласование договора" keyField="Close" />
                </ColumnsDirective>
            </KanbanComponent>
        </>
    );
}

export default Contracts;