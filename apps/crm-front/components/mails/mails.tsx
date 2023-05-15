import { ColumnDirective, ColumnsDirective, ExcelExport, GridComponent, PdfExport } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';

import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetParams, ToolbarExport, mailsDS } from 'apps/crm-front/specs/custom-service';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';


const MailBox = ({inbox = true}) => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const grid = useRef(null);

    const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd HH:mm' };

    const editOptions: EditSettingsModel = { allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    const toolbarOptions: ToolbarItems[] = ['Search', 'Delete', 'PdfExport', 'ExcelExport'];
    
    useEffect(() => {
        grid.current.refresh();
        dispatch(setLoading(false));
    }, [loadingState.loading, dispatch]);

    return (
        <>
            <div className='App mt-4'>
                <GridComponent 
                    ref={grid}
                    dataSource={mailsDS(auth)}
                    allowPaging={false}
                    pageSettings={{ pageSize: 5 }}
                    editSettings={editOptions}
                    toolbar={toolbarOptions}
                    locale={localization.currentLang}
                    allowExcelExport={true}
                    allowPdfExport={true}
                    toolbarClick={(e) => ToolbarExport(grid, e)}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            field='id' width='100' 
                            textAlign="Right" isPrimaryKey={true} 
                            visible={false}
                        />
                        <ColumnDirective 
                            field='from_mail' 
                            headerText={`${GetParams('from', localization).toUpperCase()}`} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='to_mail' 
                            headerText={`${GetParams('to', localization).toUpperCase()}`} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='title' 
                            headerText={`${GetParams('topic2', localization).toUpperCase()}`} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='created_at' 
                            headerText={`${GetParams('date', localization).toUpperCase()}`} 
                            width='100' 
                            format={dateFormat}
                        />
                    </ColumnsDirective>
                    <Inject services={[Edit, Toolbar, PdfExport, ExcelExport]} />
                </GridComponent>
            </div>
        </>
    )
}
export default MailBox;