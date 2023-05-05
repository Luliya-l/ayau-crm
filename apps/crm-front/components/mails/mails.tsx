import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';

import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailsDS } from 'apps/crm-front/specs/custom-service';


const MailBox = ({inbox = true}) => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);

    const dispatch = useDispatch();

    const grid = useRef(null);

    const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd HH:mm' };

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
                    dataSource={mailsDS(auth)}
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
                            headerText={'от кого'.toUpperCase()} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='to_mail' 
                            headerText={'кому'.toUpperCase()} 
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