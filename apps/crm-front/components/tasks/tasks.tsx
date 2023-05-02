import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

import { Langs } from "apps/crm-front/specs/custom-types";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useSelector } from "react-redux";
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';

const baseURL = "https://crm-backend-two.vercel.app/";
// const baseTaskURL = "http://localhost:8000/";
const Tasks = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang].params[param];
    }

    const taskDS: DataManager = new DataManager({
        adaptor: new UrlAdaptor(),
        updateUrl: `${baseURL}crm/tasks/update`,
        insertUrl: `${baseURL}crm/tasks/set`,
        removeUrl: `${baseURL}crm/tasks/delete`,
        url: `${baseURL}crm/tasks/get`,
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${auth.authToken}` }]
    });

    const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Cancel'];

    return (
        <>
            <div className='App mt-4'>
                <GridComponent 
                    dataSource={taskDS}
                    editSettings={editOptions}
                    toolbar={toolbarOptions}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='title' width='100' textAlign="Right" isPrimaryKey={true} />
                        <ColumnDirective field='created_at' headerText={getParams('execution_date')} width='100' textAlign="Right"/>
                        <ColumnDirective field='responsible' headerText={getParams('responsible')} width='100'/>
                        <ColumnDirective field='contract_id' headerText={getParams('object')} width='100' textAlign="Right"/>
                        <ColumnDirective field='tast_type' headerText={getParams('taskType')} width='100' format="C2" textAlign="Right"/>
                        <ColumnDirective field='text' headerText={getParams('taskDescription')} width='100'/>
                        <ColumnDirective field='result' headerText={getParams('result')} width='100'/>
                    </ColumnsDirective>
                    <Inject services={[Edit, Toolbar]} />
                </GridComponent>
            </div>
        </>
    )
}
export default Tasks;