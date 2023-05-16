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
import { GetParams, contractsDS, currency } from "apps/crm-front/specs/custom-service";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Langs } from "apps/crm-front/specs/custom-types";

const ContractCard = (props) => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const getString = (assignee) => {
        return assignee.match(/\b(\w)/g).join("").toUpperCase();
    }

    const getPriority = (priority) => {
        switch (priority) {
            case 'low':
                return 'rgb(89 237 40)';
            case 'medium':
                return 'rgb(230 144 37)';
            case 'high':
                return 'rgb(228 43 10)';
            default:
                return '#f55f44';
        }
    }
    
    return (
        <div className={"card-template"} style={{borderLeft:`1px solid ${getPriority(props.priority)}`}}>
            <div className="e-card-header">
                <div className="e-card-header-caption">
                    <div className="e-card-header-title e-tooltip-text">{props.name}</div>
                </div>
            </div>
            <div className="e-card-content e-tooltip-text">
                <div className="e-text text-info">{props.description}</div>
            </div>
            <div className="e-card-content e-tooltip-text">
                <div className="e-text">{currency(props.budget)} ₸ *</div>
            </div>
            <div className="e-card-custom-footer d-none">
                {props.step.split(",").map((tag) => <div key={tag} className="e-card-tag-field e-tooltip-text">{tag}</div>)}
                <div className="e-card-avatar">{getString(props.step)}</div>
            </div>
        </div>
    );
}

export default ContractCard;