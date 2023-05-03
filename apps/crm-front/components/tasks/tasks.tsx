import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';

import { Langs } from "apps/crm-front/specs/custom-types";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from 'react';
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';

const baseURL = "https://crm-backend-two.vercel.app/";
// const baseURL = "http://localhost:8000/";
const Tasks = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang].params[param];
    }

    const grid = useRef(null);

    const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd' };

    const taskDS: DataManager = new DataManager({
        adaptor: new UrlAdaptor(),
        updateUrl: `${baseURL}crm/tasks/update`,
        insertUrl: `${baseURL}crm/tasks/set`,
        removeUrl: `${baseURL}crm/tasks/delete`,
        url: `${baseURL}crm/tasks/get`,
        crossDomain: true,
        requestType: 'POST',
        headers: [{ Authorization: `Bearer ${auth.authToken}` }]
    });

    const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
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
                    dataSource={taskDS}
                    allowPaging={false}
                    pageSettings={{ pageSize: 5 }}
                    editSettings={editOptions}
                    toolbar={toolbarOptions}
                >
                    <ColumnsDirective>
                        <ColumnDirective 
                            field='id' width='100' 
                            textAlign="Right" isPrimaryKey={true} 
                            visible={false}
                        />
                        <ColumnDirective 
                            field='created_at' 
                            headerText={getParams('execution_date').toUpperCase()} 
                            width='100' 
                            format={dateFormat}
                        />
                        <ColumnDirective 
                            field='responsible' 
                            headerText={getParams('responsible').toUpperCase()} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='contract_id' 
                            headerText={getParams('object').toUpperCase()} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='task_type' 
                            headerText={getParams('taskType').toUpperCase()} 
                            width='100' 
                            format="C2" 
                        />
                        <ColumnDirective 
                            field='text' 
                            headerText={getParams('taskDescription').toUpperCase()} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='result' 
                            headerText={getParams('result').toUpperCase()} 
                            width='100'
                        />
                    </ColumnsDirective>
                    <Inject services={[Edit, Toolbar]} />
                </GridComponent>
            </div>
        </>
    )
}
export default Tasks;