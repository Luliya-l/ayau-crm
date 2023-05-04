import { 
    ColumnDirective,
} from '@syncfusion/ej2-react-grids';
import { GetParams, responsiblesDS } from 'apps/crm-front/specs/custom-service';

export const CompanyColumn = (field, auth ) => 
        <ColumnDirective 
            field={field} 
            dataSource={responsiblesDS(auth)}
            headerText={GetParams('company_id').toUpperCase()} 
            width='100'
            // validationRules={{required: false}}
            foreignKeyValue="name"
            foreignKeyField="id" 
        />;