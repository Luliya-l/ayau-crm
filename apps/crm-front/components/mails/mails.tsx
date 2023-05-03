import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';

import { Langs } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// const baseURL = "https://crm-backend-two.vercel.app/";
const baseURL = "http://localhost:8000/";

const MailBox = ({inbox = true}) => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang].params[param];
    }

    const grid = useRef(null);

    const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd HH:mm' };

    const taskDS: DataManager = new DataManager({
        adaptor: new UrlAdaptor(),
        updateUrl: `${baseURL}crm/mails/update`,
        insertUrl: `${baseURL}crm/mails/set`,
        removeUrl: `${baseURL}crm/mails/delete`,
        url: `${baseURL}crm/mails/get`,
        crossDomain: true,
        requestType: 'POST',
        headers: [{ Authorization: `Bearer ${auth.authToken}` }]
    });

    const editOptions: EditSettingsModel = { allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    const toolbarOptions: ToolbarItems[] = ['Search', 'Delete'];
    
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
                            field='from_mail' 
                            headerText={`${inbox ? 'от кого' : 'кому'}`.toUpperCase()} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='title' 
                            headerText={'сделка, тема и сообщение'.toUpperCase()} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='created_at' 
                            headerText={'дата'.toUpperCase()} 
                            width='100' 
                            format={dateFormat}
                        />
                    </ColumnsDirective>
                    <Inject services={[Edit, Toolbar]} />
                </GridComponent>
            </div>
        </>
    )
}
export default MailBox;