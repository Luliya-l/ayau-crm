import { ColumnDirective, ColumnsDirective, ExcelExport, GridComponent, PdfExport } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';

import { useDispatch, useSelector } from 'react-redux';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { GetParams, ToolbarExport, responsiblesDS, usersDS } from 'apps/crm-front/specs/custom-service';
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
        name:'Руководитель'
    },
    {
        id:'manager',
        name:'Менеджер'
    },
    {
        id:'user',
        name:'Администратор'
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
              field='name' 
              headerText={'Ф.И.О.'.toUpperCase()} 
              width='100' 
          />
          <ColumnDirective 
              field='phone' 
              headerText={GetParams('phone', localization).toUpperCase()} 
              width='100'
          />
          <ColumnDirective 
              field='email' 
              headerText={GetParams('email', localization).toUpperCase()} 
              width='100' 
          />
          <ColumnDirective 
              field='gender' 
              headerText={'Пол'.toUpperCase()} 
              width='100' 
          />
          <ColumnDirective 
              field='role' 
              headerText={'Роль'.toUpperCase()} 
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