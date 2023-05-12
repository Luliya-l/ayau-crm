import { GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Filter,
    Sort,
    ForeignKey,
    PdfExport,
    ExcelExport,
} from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { CurrentLang, GetParams, dateFormat, eventsDS } from 'apps/crm-front/specs/custom-service';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';

import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ResponsibleColumn } from '../utils/grid-responsible';

const EventsPopup = () => {
    const auth = useSelector(useAuth) as AuthState;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editOptions: EditSettingsModel = { 
        allowEditing: false, 
        allowAdding: false, 
        allowDeleting: false, 
        mode: 'Dialog', 
    };
    const toolbarOptions: ToolbarItems[] = ['Search', 'Cancel', 'PdfExport', 'ExcelExport'];

    return (
        <>
            <Button 
                variant='events' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-filter-right me-1"></i>
                {GetParams('events')}
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{GetParams('events')}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <GridComponent 
                        dataSource={eventsDS(auth)}
                        allowPaging={true}
                        pageSettings={{ pageSize: 50 }}
                        allowSorting={true}
                        editSettings={editOptions}
                        toolbar={toolbarOptions}
                        locale={CurrentLang()}
                        allowExcelExport={true}
                        allowPdfExport={true}
                    >
                        <ColumnsDirective>
                            <ColumnDirective 
                                field='id' width='100' 
                                textAlign="Right" 
                                isPrimaryKey={true} 
                                visible={false}
                            />
                            <ColumnDirective 
                                field='event_date' 
                                headerText={'Дата'.toUpperCase()} 
                                width='100' 
                                format={dateFormat}
                            />
                            {ResponsibleColumn('user_id', auth)}
                            <ColumnDirective 
                                field='event_type' 
                                headerText={'Тип события'.toUpperCase()} 
                                width='100' 
                                format="C2" 
                            />
                            <ColumnDirective 
                                field='reference' 
                                headerText={'Объект события'.toUpperCase()} 
                                width='100'
                            />
                            <ColumnDirective 
                                field='event_object' 
                                headerText={'Идентификатор объекта'.toUpperCase()} 
                                width='100'
                            />
                        </ColumnsDirective>
                        <Inject services={[Filter, Page, Sort, ForeignKey, Toolbar, PdfExport, ExcelExport]} />
                    </GridComponent>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default EventsPopup;