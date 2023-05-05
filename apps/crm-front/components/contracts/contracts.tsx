import { 
    KanbanComponent, 
    ColumnsDirective, 
    ColumnDirective
} from "@syncfusion/ej2-react-kanban";
import { addClass } from '@syncfusion/ej2-base';

import { useDispatch, useSelector } from 'react-redux';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import AddContractForm from "./add-contract-form";
import { CurrentLang, GetParams, contractsDS } from "apps/crm-front/specs/custom-service";

const Contracts = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);

    const dispatch = useDispatch();

    const kanban = useRef(null);

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
                    dataSource={contractsDS(auth)} 
                    cardSettings={{ 
                        contentField: "description", 
                        headerField: "id", 
                        showHeader: false,
                        template: cardTemplate.bind(this)
                    }} 
                    dialogSettings={{ template: dialogTemplate.bind(this) }}
                    cardRendered={cardRendered.bind(this)}
                    locale={CurrentLang()}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            headerText={`${GetParams('primaryContact')}`} 
                            keyField="new" 
                            template={columnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${GetParams('negotiation')}`} 
                            keyField="InProgress" 
                            template={columnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${GetParams('makeDecision')}`} 
                            keyField="Testing" 
                            template={columnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${GetParams('Harmonizationofcontract')}`} 
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