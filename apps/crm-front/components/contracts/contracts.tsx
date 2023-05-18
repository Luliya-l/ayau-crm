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
import { GetParams, contractsDS } from "apps/crm-front/specs/custom-service";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Langs } from "apps/crm-front/specs/custom-types";
import ContractCard from "./contract-card";
import ColumnTemplate from "./budget-total";

const Contracts = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState) as Langs;
    const dispatch = useDispatch();

    const kanban = useRef(null);

    const cardRendered = (args) => {
        const val = args.data.priority;
        addClass([args.element], val);
    }

    const cardTemplate = (props) => {
        return (<ContractCard {...props} />);
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
                    locale={localization.currentLang}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            headerText={`${GetParams('primaryContact', localization)}`} 
                            keyField="new" 
                            template={ColumnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${GetParams('negotiation', localization)}`} 
                            keyField="InProgress" 
                            template={ColumnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${GetParams('makeDecision', localization)}`} 
                            keyField="Testing" 
                            template={ColumnTemplate.bind(this)}
                        />
                        <ColumnDirective 
                            headerText={`${GetParams('Harmonizationofcontract', localization)}`} 
                            keyField="Close" 
                            template={ColumnTemplate.bind(this)}
                        />
                    </ColumnsDirective>
                </KanbanComponent>
            </div>
        </>
    );
}

export default Contracts;