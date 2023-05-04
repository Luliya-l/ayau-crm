import { 
    ColumnDirective,
} from '@syncfusion/ej2-react-grids';
import { GetParams, contractsDS } from 'apps/crm-front/specs/custom-service';

export const ContractColumn = (field, auth ) => 
        <ColumnDirective 
            field={field} 
            dataSource={contractsDS(auth)}
            headerText={'Сделка'.toUpperCase()} 
            width='100'
            // validationRules={{required: false}}
            foreignKeyValue="name"
            foreignKeyField="id" 
        />;