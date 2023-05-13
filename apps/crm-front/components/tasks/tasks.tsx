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

import { useDispatch, useSelector } from "react-redux";
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from 'react';
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { CurrentLang, GetParams, ToolbarExport, dateFormat, taskDS } from 'apps/crm-front/specs/custom-service';
import { ResponsibleColumn } from '../utils/grid-responsible';
import { ContractColumn } from '../utils/grid-contract';
import AddTaskForm from './add-tasks-form';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';

const Tasks = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const grid = useRef(null);

    const dialogTemplate = (props): any => {
        return (<AddTaskForm {...props} />);
    }

    const editOptions: EditSettingsModel = { 
        allowEditing: true, 
        allowAdding: true, 
        allowDeleting: true, 
        mode: 'Dialog', 
        template:(props) => dialogTemplate(props), 
    };
    const toolbarOptions: ToolbarItems[] = ['Search', 'Edit', 'Delete', 'Update', 'Cancel', 'PdfExport', 'ExcelExport'];
    
    useEffect(() => {
        grid.current.refresh();
        dispatch(setLoading(false));
    }, [loadingState.loading, dispatch]);

    return (
        <>
            <div className='App mt-4'>
                <GridComponent 
                    ref={grid}
                    dataSource={taskDS(auth)}
                    allowPaging={true}
                    pageSettings={{ pageSize: 50 }}
                    allowSorting={true}
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
                            textAlign="Right" 
                            isPrimaryKey={true} 
                            visible={false}
                        />
                        <ColumnDirective 
                            field='completed_at' 
                            headerText={GetParams('execution_date', localization).toUpperCase()} 
                            width='100' 
                            format={dateFormat}
                        />
                        <ColumnDirective 
                            field='finish_at' 
                            headerText={'Выполнить до'.toUpperCase()} 
                            width='100' 
                            format={dateFormat}
                        />
                        {ResponsibleColumn('responsible', auth)}
                        {ContractColumn('contract_id', auth)}
                        <ColumnDirective 
                            field='task_type' 
                            headerText={GetParams('taskType', localization).toUpperCase()} 
                            width='100' 
                            format="C2" 
                        />
                        <ColumnDirective 
                            field='text' 
                            headerText={GetParams('taskDescription', localization).toUpperCase()} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='result' 
                            headerText={GetParams('result', localization).toUpperCase()} 
                            width='100'
                        />
                    </ColumnsDirective>
                    <Inject services={[Filter, Page, Edit, Sort, ForeignKey, Toolbar, PdfExport, ExcelExport]} />
                </GridComponent>
            </div>
        </>
    )
}
export default Tasks;