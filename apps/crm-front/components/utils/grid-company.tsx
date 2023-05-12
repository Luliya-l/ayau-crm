import { 
    ColumnDirective,
} from '@syncfusion/ej2-react-grids';
import { GetParams, companiesListDS } from 'apps/crm-front/specs/custom-service';
import { Langs } from 'apps/crm-front/specs/custom-types';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { useSelector } from 'react-redux';

export const CompanyColumn = (field, auth ) => {
    const localization = useSelector(selectLangState) as Langs;
    return (<ColumnDirective 
        field={field} 
        dataSource={companiesListDS(auth)}
        headerText={GetParams('company_id', localization).toUpperCase()} 
        width='100'
        // validationRules={{required: false}}
        foreignKeyValue="name"
        foreignKeyField="id" 
    />);
}