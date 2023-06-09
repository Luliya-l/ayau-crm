import { ColumnDirective, ColumnsDirective, ExcelExport, GridComponent, PdfExport } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';

import { useDispatch, useSelector } from 'react-redux';
import { AuthState, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef } from "react";
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { GetParams, ToolbarExport } from 'apps/crm-front/specs/custom-service';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { Langs } from 'apps/crm-front/specs/custom-types';

const baseURL = "https://crm-backend-two.vercel.app/";

const Filials = ({lang='ru'}) => {
  const auth = useSelector(useAuth) as AuthState;
  const loadingState = useSelector(useLoadingState);
  const localization = useSelector(selectLangState) as Langs;

  const dispatch = useDispatch();

  const grid = useRef(null);

  const filialsDS: DataManager = new DataManager({
      adaptor: new UrlAdaptor(),
      updateUrl: `${baseURL}crm/filials/update`,
      insertUrl: `${baseURL}crm/filials/set`,
      removeUrl: `${baseURL}crm/filials/delete`,
      url: `${baseURL}crm/filials/get`,
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
        dataSource={filialsDS}
        allowResizing={true} 
        autoFit={true}
        allowPaging={false}
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
              field='id' 
              textAlign="Right" isPrimaryKey={true} 
              visible={false}
          />
          <ColumnDirective 
              field='name' 
              headerText={GetParams('name', localization).toUpperCase()} 
               
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
              field='responsible' 
              headerText={GetParams('responsible', localization).toUpperCase()} 
               
              visible={false}
          />
          <ColumnDirective 
              field='address' 
              headerText={GetParams('address', localization).toUpperCase()} 
              
          />
          <ColumnDirective 
              field='description' 
              headerText={GetParams('notes', localization).toUpperCase()} 
              
          />
        </ColumnsDirective>
        <Inject services={[Edit, Toolbar, PdfExport, ExcelExport]} />
      </GridComponent>
  );
}

export default Filials;