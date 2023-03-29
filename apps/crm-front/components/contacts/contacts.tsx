import { deleteContacts, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Contacts = ({setEditIndex}) => {
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
                            (api.contacts ?? []).map((contact, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{contact.name ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{contact.object_id ?? ''}</span></td>
                                    <td>
                                        <i className="bi bi-telephone-fill mx-1" />
                                        <span className="fs-6">{contact.phone ?? ''}</span>
                                    </td>
                                    <td>
                                        <i className="bi bi-briefcase-fill mx-1" />
                                        <span className="fs-6 text-capitalize">{contact.email ?? ''}</span>
                                    </td>
                                    <td className="text-center">
                                        <i role='button' className="bi bi bi-pencil mx-4" onClick={() => setEditIndex(index)}/>
                                        <i role='button' className="bi bi-trash3" onClick={() => dispatch(deleteContacts(index))} />
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
export default Contacts;