import { 
    ColumnDirective,
} from '@syncfusion/ej2-react-grids';
import { GetParams, contractsDS } from 'apps/crm-front/specs/custom-service';
import { Langs } from 'apps/crm-front/specs/custom-types';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { useSelector } from 'react-redux';

export const ContractColumn = (field, auth ) => {
    const localization = useSelector(selectLangState) as Langs;
    
        return (<ColumnDirective 
            field={field} 
            dataSource={contractsDS(auth)}
            headerText={GetParams('contacts', localization).toUpperCase()} 
            width='100'
            // validationRules={{required: false}}
            foreignKeyValue="name"
            foreignKeyField="id" 
        />);
}