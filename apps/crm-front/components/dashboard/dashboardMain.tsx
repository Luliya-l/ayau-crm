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
import { GetParams } from "apps/crm-front/specs/custom-service";

const DashBoardMain = () => {
    const cellSpacing = [6, 6];

    return (
        <>
            <Container fluid className="mb-4">
                <Row>
                    <Col className="text-center mt-3">
                        <h1>{GetParams('dashboard')}</h1>
                    </Col>
                </Row>
            </Container>
            <div className="control-section">
                <DashboardLayoutComponent 
                    id='defaultLayout' 
                    cellSpacing={cellSpacing} 
                    allowResizing={true} 
                    columns={6}
                >
                    <div id="one" 
                        className="e-panel kpi" 
                        data-row="0" 
                        data-col="0" 
                        data-sizex="6" 
                        data-sizey="1"
                    >
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Kpi />
                        </div>
                    </div>
                    <div id="two" className="e-panel" data-row="1" data-col="0" data-sizex="4" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container chart">
                            <TransactionsSource />
                        </div>
                    </div>
                    <div id="three" className="e-panel" data-row="1" data-col="5" data-sizex="2" data-sizey="2">
                    <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <DealsBymanager />
                        </div>
                    </div>    
                    <div id="four" className="e-panel" data-row="3" data-col="0" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Purpose />
                        </div>
                    </div>
                    <div id="five" className="e-panel" data-row="3" data-col="2" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <SystemUse />
                        </div>
                    </div>
                    <div id="six" className="e-panel" data-row="3" data-col="4" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <LatestFiles />
                        </div>
                    </div>
                    <div id="seven" className="e-panel" data-row="5" data-col="0" data-sizex="4" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Salesforecast />
                        </div>
                    </div>
                    <div id="eight" className="e-panel" data-row="5" data-col="4" data-sizex="2" data-sizey="2">
                        <span id="close" className="e-template-icon e-clear-icon"/>
                        <div className="e-panel-container">
                            <Calls />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </div>
        </>
    )
}

export default DashBoardMain;