import { ColumnDirective, ColumnsDirective, ExcelExport, GridComponent, PdfExport } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';

import { useDispatch, useSelector } from 'react-redux';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { GetParams, ToolbarExport, usersDS } from 'apps/crm-front/specs/custom-service';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';
import AddUserForm from './add-users-form';

const Users = ({lang='ru'}) => {
  const auth = useSelector(useAuth) as AuthState;
  const loadingState = useSelector(useLoadingState);
  const localization = useSelector(selectLangState) as Langs;

  const dispatch = useDispatch();

  const grid = useRef(null);

  const userRoles = [
    {
        id:'head',
        name:'Басшы'
    },
    {
        id:'manager',
        name:'Менеджер'
    },
    {
        id:'user',
        name:'Әкімші'
    }
  ]

  const dialogTemplate = (props) => {
    return (<AddUserForm {...props}/>);
  }

  const editOptions: EditSettingsModel = { 
    allowEditing: true, 
    allowAdding: true, 
    allowDeleting: true, 
    mode: 'Dialog', 
    template: (props) => dialogTemplate(props) 
  };

  const toolbarOptions: ToolbarItems[] = ['Search', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  
  const actionComplete = (args) => {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
        const dialog = args.dialog;
        dialog.header = args.requestType === 'beginEdit' ? 'Өзгерту'  + args.rowData['name'] : 'Жаңа жазба';
    }
  }

  useEffect(() => {
      grid.current.refresh();
      dispatch(setLoading(false));
  }, [loadingState.loading, dispatch]);

  return (
    <GridComponent 
        ref={grid}
        dataSource={usersDS(auth)}
        allowPaging={true}
        pageSettings={{ pageSize: 50 }}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        locale={localization.currentLang}
        allowResizing={true} 
        autoFit={true}
        allowExcelExport={true}
        allowPdfExport={true}
        actionComplete={actionComplete}
        toolbarClick={(e) => ToolbarExport(grid, e)}
    >
        <ColumnsDirective>
          <ColumnDirective 
              field='id'  
              textAlign="Right" 
              isPrimaryKey={true} 
              visible={false}
          />
          <ColumnDirective 
              field='name' 
              headerText={GetParams('lastName', localization).toUpperCase()} 
               
          />
          <ColumnDirective 
              field='phone' 
              headerText={GetParams('phone', localization).toUpperCase()} 
              
          />
          <ColumnDirective 
              field='email' 
              headerText={GetParams('email', localization).toUpperCase()} 
              
          />
          <ColumnDirective 
              field='gender' 
              headerText={GetParams('gender', localization).toUpperCase()} 
               
          />
          <ColumnDirective 
              field='role' 
              headerText={GetParams('role', localization).toUpperCase()} 
              dataSource={userRoles}
              foreignKeyValue="name"
              foreignKeyField="id"
          />
        </ColumnsDirective>
        <Inject services={[Edit, Toolbar, PdfExport, ExcelExport]} />
      </GridComponent>
  );
}

export default Users;