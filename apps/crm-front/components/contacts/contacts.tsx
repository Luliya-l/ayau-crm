import { GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Filter,
    Sort,
    ForeignKey,
    toolbarClick,
} from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems,
    ExcelExport,
    PdfExport, } from '@syncfusion/ej2-react-grids';

import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from 'react';
import { GetParams, ToolbarExport, contactsDS } from 'apps/crm-front/specs/custom-service';
import { CompanyColumn } from '../utils/grid-company';
import { ResponsibleColumn } from '../utils/grid-responsible';
import AddContactForm from './add-contact-form';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';

const Contacts = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const grid = useRef(null);

    const dialogTemplate = (props): any => {
        return (<AddContactForm {...props} />);
    }

    const editOptions: EditSettingsModel = { 
        allowEditing: true, 
        allowAdding: true, 
        allowDeleting: true, 
        mode: 'Dialog',
        template:(props) => dialogTemplate(props), 
    };
    const toolbarOptions: ToolbarItems[] = ['Search', 'Edit', 'Delete', 'Update', 'Cancel', 'PdfExport', 'ExcelExport'];
    
    const actionComplete = (args) => {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            const dialog = args.dialog;
            dialog.header = args.requestType === 'beginEdit' ? 'Редактирование: ' + args.rowData['name'] : 'Новая запись';
        }
    }

    useEffect(() => {
        grid.current.refresh();
        dispatch(setLoading(false));
    }, [loadingState.loading, dispatch]);

    return (
        <>
            <div className='App mt-4'>
                <GridComponent 
                    ref={grid}
                    dataSource={contactsDS(auth)}
                    allowPaging={true}
                    pageSettings={{ pageSize: 50 }}
                    allowSorting={true}
                    editSettings={editOptions}
                    toolbar={toolbarOptions}
                    locale={localization.currentLang}
                    allowExcelExport={true}
                    allowPdfExport={true}
                    actionComplete={actionComplete}
                    toolbarClick={(e) => ToolbarExport(grid, e)}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            field='id' width='100' 
                            textAlign="Right" isPrimaryKey={true} 
                            visible={false}
                        />
                        <ColumnDirective 
                            field='fio' 
                            headerText={GetParams('lastName', localization).toUpperCase()} 
                            width='100' 
                        />
                        {CompanyColumn('company_id', auth)}
                        {ResponsibleColumn('responsible', auth)}
                        <ColumnDirective 
                            field='phone' 
                            headerText={GetParams('phone', localization).toUpperCase()} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='email' 
                            headerText={GetParams('email', localization).toUpperCase()} 
                            width='100' 
                            format="C2" 
                        />
                    </ColumnsDirective>
                    <Inject services={[Filter, Page, Edit, Sort, ForeignKey, Toolbar, PdfExport, ExcelExport]} />
                </GridComponent>
            </div>
        </>
    )
}
export default Contacts;