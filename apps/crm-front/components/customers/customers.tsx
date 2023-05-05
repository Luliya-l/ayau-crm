import { GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Filter,
    Sort,
    ForeignKey,
} from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';

import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading, useLoadingState } from "apps/crm-front/store/loadingState";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponsibleColumn } from '../utils/grid-responsible';
import { CurrentLang, GetParams, companiesDS } from 'apps/crm-front/specs/custom-service';
import AddCustomerForm from './add-customer-form';

const Customers = () => {
    const auth = useSelector(useAuth) as AuthState;
    const loadingState = useSelector(useLoadingState);

    const dispatch = useDispatch();

    const grid = useRef(null);

    const dialogTemplate = (props): any => {
        return (<AddCustomerForm {...props} />);
    }

    const editOptions: EditSettingsModel = { 
        allowEditing: true, 
        allowAdding: true, 
        allowDeleting: true, 
        mode: 'Dialog',
        template:dialogTemplate, 
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
                    dataSource={companiesDS(auth)}
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
                            textAlign="Right" isPrimaryKey={true} 
                            visible={false}
                        />
                        <ColumnDirective 
                            field='name' 
                            headerText={GetParams('name').toUpperCase()} 
                            width='100' 
                        />
                        {ResponsibleColumn('responsible', auth)}
                        <ColumnDirective 
                            field='phone' 
                            headerText={GetParams('phone').toUpperCase()} 
                            width='100' 
                        />
                        <ColumnDirective 
                            field='email' 
                            headerText={GetParams('email').toUpperCase()} 
                            width='100' 
                            format="C2" 
                        />
                        <ColumnDirective 
                            field='description' 
                            headerText={'Примечание'.toUpperCase()} 
                            width='100'
                        />
                        <ColumnDirective 
                            field='address' 
                            headerText={'Адрес'.toUpperCase()} 
                            width='100'
                        />
                    </ColumnsDirective>
                    <Inject services={[Filter, Page, Edit, Sort, ForeignKey, Toolbar]} />
                </GridComponent>
            </div>
        </>
    )
}
export default Customers;