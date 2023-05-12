import { ColumnDirective, ColumnsDirective, ExcelExport, GridComponent, PdfExport } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';

import { useDispatch, useSelector } from 'react-redux';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { GetParams } from 'apps/crm-front/specs/custom-service';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';

const baseURL = "https://crm-backend-two.vercel.app/";
// const baseURL = "http://localhost:8000/";

const Users = ({lang='ru'}) => {
  const auth = useSelector(useAuth) as AuthState;
  const loadingState = useSelector(useLoadingState);
  const localization = useSelector(selectLangState) as Langs;

  const dispatch = useDispatch();

  const grid = useRef(null);

  const taskDS: DataManager = new DataManager({
      adaptor: new UrlAdaptor(),
      updateUrl: `${baseURL}crm/users/update`,
      insertUrl: `${baseURL}crm/users/set`,
      removeUrl: `${baseURL}crm/users/delete`,
      url: `${baseURL}crm/users/get`,
      crossDomain: true,
      requestType: 'POST',
      headers: [{ Authorization: `Bearer ${auth.authToken}` }]
  });

  const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const toolbarOptions: ToolbarItems[] = ['Search', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  
  useEffect(() => {
      grid.current.refresh();
      dispatch(setLoading(false));
  }, [loadingState.loading, dispatch]);

  return (
    <GridComponent 
        ref={grid}
        dataSource={taskDS}
        allowPaging={false}
        pageSettings={{ pageSize: 5 }}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        locale={localization.currentLang}
        allowExcelExport={true}
        allowPdfExport={true}
    >
        <ColumnsDirective>
          <ColumnDirective 
              field='id' width='100' 
              textAlign="Right" isPrimaryKey={true} 
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
              format="C2" 
          />
          <ColumnDirective 
              field='role' 
              headerText={'Роль'.toUpperCase()} 
              width='100'
          />
        </ColumnsDirective>
        <Inject services={[Edit, Toolbar, PdfExport, ExcelExport]} />
      </GridComponent>
  );
}

export default Users;