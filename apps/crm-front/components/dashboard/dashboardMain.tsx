import { DashboardLayoutComponent } from '@syncfusion/ej2-react-layouts';
import { Col, Container, Row } from "react-bootstrap";

import Kpi from "./kpi";
import TransactionsSource from "./transaction-source";
import DealsBymanager from "./deals-by-managers";
import Purpose from "./purpose";
import SystemUse from "./system-use";
import LatestFiles from "./latest-files";
import Salesforecast from "./sales-forecast";
import Calls from "./calls";
import { ContractsData, GetParams, TasksData } from "apps/crm-front/specs/custom-service";
import { useSelector } from 'react-redux';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useState } from 'react';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';

const DashBoardMain = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const [tasks, setTasks] = useState({overdueTasks:0, newTasks:0, completedTasks:0});
    const [contracts, setContracts] = useState({withoutTask:0});

    useEffect(() => {
        TasksData(auth).then((data) => {
            if (data)
                setTasks(data);
        });
        ContractsData(auth).then((data) => {
            if (data)
                setContracts(data);
        });
    }, []);

    const cellSpacing = [6, 6];
    return (
        <>
            <Container fluid className="mb-4">
                <Row>
                    <Col className="text-center mt-3">
                        <h1>{GetParams('dashboard', localization)}</h1>
                    </Col>
                </Row>
            </Container>
            <div className="control-section">
                <DashboardLayoutComponent 
                    id='defaultLayout' 
                    cellSpacing={cellSpacing} 
                    allowResizing={true} 
                    columns={12}
                >
                    <div id="overdueTasks" 
                        className="e-panel kpi" 
                        data-row="0" 
                        data-col="0" 
                        data-sizex="3" 
                        data-sizey="2"
                    >
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Kpi 
                                title={GetParams('overdueTasks', localization)} 
                                value={tasks.overdueTasks} 
                                period={GetParams('onweek', localization)} 
                            />
                        </div>
                    </div>
                    <div id="newTasks" 
                        className="e-panel kpi" 
                        data-row="0" 
                        data-col="3" 
                        data-sizex="3" 
                        data-sizey="2"
                    >
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Kpi 
                                title={GetParams('newTasks', localization)} 
                                value={tasks.newTasks} 
                                period={GetParams('onweek', localization)} 
                                className='text-info'
                            />
                        </div>
                    </div>
                    <div id="completeTasks" 
                        className="e-panel kpi" 
                        data-row="0" 
                        data-col="6" 
                        data-sizex="3" 
                        data-sizey="2"
                    >
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Kpi 
                                title={GetParams('completeTasks', localization)} 
                                value={tasks.completedTasks} 
                                period={GetParams('onweek', localization)} 
                                className='text-success'
                            />
                        </div>
                    </div>
                    <div id="withoutTask" 
                        className="e-panel kpi" 
                        data-row="0" 
                        data-col="9" 
                        data-sizex="3" 
                        data-sizey="2"
                    >
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Kpi 
                                title={GetParams('withoutTask', localization)} 
                                value={contracts.withoutTask} 
                                period={GetParams('onweek', localization)} 
                                className='text-warning'
                            />
                        </div>
                    </div>
                    <div id="two" className="e-panel" data-row="2" data-col="0" data-sizex="8" data-sizey="4">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container chart">
                            <TransactionsSource />
                        </div>
                    </div>
                    <div id="three" className="e-panel" data-row="2" data-col="8" data-sizex="4" data-sizey="4">
                    <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <DealsBymanager />
                        </div>
                    </div>    
                    <div id="four" className="e-panel" data-row="6" data-col="0" data-sizex="4" data-sizey="4">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Purpose />
                        </div>
                    </div>
                    <div id="five" className="e-panel" data-row="6" data-col="4" data-sizex="4" data-sizey="4">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <SystemUse />
                        </div>
                    </div>
                    <div id="six" className="e-panel" data-row="10" data-col="8" data-sizex="4" data-sizey="4">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <LatestFiles />
                        </div>
                    </div>
                    <div id="seven" className="e-panel" data-row="10" data-col="0" data-sizex="8" data-sizey="4">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Salesforecast />
                        </div>
                    </div>
                    <div id="IncomingCalls" className="e-panel" data-row="14" data-col="8" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Calls title={GetParams('IncomingCalls', localization)} value={'0'} period={GetParams('onweek', localization)} />
                        </div>
                    </div>
                    <div id="notes" className="e-panel" data-row="14" data-col="10" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Calls title={GetParams('notes', localization)} value={'0'} period={GetParams('onweek', localization)} className='text-info' />
                        </div>
                    </div>
                    <div id="outgoingcalls" className="e-panel" data-row="16" data-col="8" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Calls title={GetParams('outgoingcalls', localization)} value={'0'} period={GetParams('onweek', localization)} className='text-success' />
                        </div>
                    </div>
                    <div id="successfuldeals" className="e-panel" data-row="16" data-col="10" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Calls title={GetParams('successfuldeals', localization)} value={'0'} period={GetParams('onweek', localization)} className='text-warning' />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </div>
        </>
    )
}

export default DashBoardMain;