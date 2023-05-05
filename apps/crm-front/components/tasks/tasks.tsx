import { GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Filter,
    Sort,
    ForeignKey,
} from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';

import { useDispatch, useSelector } from "react-redux";
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from 'react';
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { CurrentLang, GetParams, dateFormat, taskDS } from 'apps/crm-front/specs/custom-service';
import { ResponsibleColumn } from '../utils/grid-responsible';
import { ContractColumn } from '../utils/grid-contract';
import AddTaskForm from './add-tasks-form';

const Tasks = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    
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
    const toolbarOptions: ToolbarItems[] = ['Search', 'Edit', 'Delete', 'Update', 'Cancel'];
    
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
                    locale={CurrentLang()}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            field='id' width='100' 
                            textAlign="Right" 
                            isPrimaryKey={true} 
                            visible={false}
                        />
                        <ColumnDirective 
                            field='finish_at' 
                            headerText={GetParams('execution_date').toUpperCase()} 
                            width='100' 
                            format={dateFormat}
                        />
                        {ResponsibleColumn('responsible', auth)}
                        {ContractColumn('contract_id', auth)}
                        <ColumnDirective 
                            field='task_type' 
                            headerText={GetParams('taskType').toUpperCase()} 
                            width='100' 
                            format="C2" 
                        />
                        <ColumnDirective 
                            field='text' 
                            headerText={GetParams('taskDescription').toUpperCase()} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='result' 
                            headerText={GetParams('result').toUpperCase()} 
                            width='100'
                        />
                    </ColumnsDirective>
                    <Inject services={[Filter, Page, Edit, Sort, ForeignKey, Toolbar]} />
                </GridComponent>
            </div>
        </>
    )
}
export default Tasks;