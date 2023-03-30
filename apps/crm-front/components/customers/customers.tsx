import { deleteCustomers, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Customers = ({setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI);

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <Container fluid className="my-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h5>{getParams('name')}</h5></th>
                            <th><h5>{getParams('company_id')}</h5></th>
                            <th><h5>{getParams('phone')}</h5></th>
                            <th><h5>{getParams('email')}</h5></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (api.customers ?? []).map((customer, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{customer.name ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{customer.notes ?? ''}</span></td>
                                    <td><span className="fs-6">{customer.phone ?? ''}</span></td>
                                    <td>
                                        <i className="bi bi-envelope-fill mx-1" />
                                        <span className="fs-6 text-capitalize">{customer.email ?? ''}</span>
                                    </td>
                                    <td className="text-center">
                                        <i role='button' className="bi bi bi-pencil mx-4" onClick={() => setEditIndex(index)}/>
                                        <i role='button' className="bi bi-trash3" onClick={() => dispatch(deleteCustomers(index))} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Customers;