import { 
    KanbanComponent, 
    ColumnsDirective, 
    ColumnDirective, 
    DialogFieldsModel 
} from "@syncfusion/ej2-react-kanban";

import { useDispatch, useSelector } from 'react-redux';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";

const baseURL = "https://crm-backend-two.vercel.app/";

const Contracts = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState);

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const kanban = useRef(null);

    const data = new DataManager({
        url: `${baseURL}crm/contracts/get`,
        updateUrl: `${baseURL}crm/contracts/update`,
        insertUrl: `${baseURL}crm/contracts/set`,
        removeUrl: `${baseURL}crm/contracts/delete`,
        dataType: 'json',
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

    useEffect(() => {
        kanban.current.refresh();
        dispatch(setLoading(false));
    }, [loadingState.loading, dispatch]);

    return (
        <>
            <div className="App mt-4">
                <KanbanComponent 
                    ref={kanban}
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