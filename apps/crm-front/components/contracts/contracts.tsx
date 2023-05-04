import { 
    KanbanComponent, 
    ColumnsDirective, 
    ColumnDirective, 
    DialogFieldsModel 
} from "@syncfusion/ej2-react-kanban";
import { extend, addClass } from '@syncfusion/ej2-base';

import { useDispatch, useSelector } from 'react-redux';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import AddContract from "./add-contract";
import AddContractForm from "./add-contract-form";

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
        { text:'Задача', key: 'description', type: 'TextArea'},
    ];

    const cardRendered = (args) => {
        const val = args.data.priority;
        addClass([args.element], val);
    }

    const columnTemplate = (props) => {
        return (<div className="header-template-wrap">
            <div className={"header-icon e-icons " + props.keyField}></div>
            <div className="header-text">{props.headerText}</div>
        </div>);
    }

    const cardTemplate = (props) => {
        return (<div className={"card-template"}>
            <div className="e-card-header">
                <div className="e-card-header-caption">
                    <div className="e-card-header-title e-tooltip-text">{props.name}</div>
                </div>
            </div>
            <div className="e-card-content e-tooltip-text">
                <div className="e-text">{props.description}</div>
            </div>
            <div className="e-card-custom-footer">
                {props.step.split(",").map((tag) => <div key={tag} className="e-card-tag-field e-tooltip-text">{tag}</div>)}
                <div className="e-card-avatar">{getString(props.step)}</div>
            </div>
        </div>);
    }

    const getString = (assignee) => {
        return assignee.match(/\b(\w)/g).join("").toUpperCase();
    }

    const dialogTemplate = (props) => {
        return (<AddContractForm {...props}/>);
    }

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
                    cardSettings={{ 
                        contentField: "description", 
                        headerField: "id", 
                        showHeader: false,
                        template: cardTemplate.bind(this)
                    }} 
                    dialogSettings={{ template: dialogTemplate.bind(this) }}
                    cardRendered={cardRendered.bind(this)}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            headerText={`${getParams('primaryContact')}`} 
                            keyField="new" 
                            template={columnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${getParams('negotiation')}`} 
                            keyField="InProgress" 
                            template={columnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${getParams('makeDecision')}`} 
                            keyField="Testing" 
                            template={columnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${getParams('Harmonizationofcontract')}`} 
                            keyField="Close" 
                            template={columnTemplate.bind(this)}
                        />
                    </ColumnsDirective>
                </KanbanComponent>
            </div>
        </>
    );
}

export default Contracts;