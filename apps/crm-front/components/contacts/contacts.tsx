import { useContacts } from "apps/crm-front/specs/custom-hooks";
import { Container, Table } from "react-bootstrap";

const Contacts = () => {
    const {contacts} = useContacts();

    return (
        <>
            <Container fluid className="my-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h5>{'наименование'}</h5></th>
                            <th><h5>{'компания'}</h5></th>
                            <th><h5>{'телефон'}</h5></th>
                            <th><h5>{'email'}</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (contacts ?? []).map((task, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{task['dateComplete'] ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{task['responsible'] ?? ''}</span></td>
                                    <td><span className="fs-6">{task['object'] ?? ''}</span></td>
                                    <td>
                                        {task['type'] === 'связаться' ? 
                                        <i className="bi bi-telephone-fill mx-1" /> : 
                                        <i className="bi bi-briefcase-fill mx-1" />}
                                        <span className="fs-6 text-capitalize">{task['type'] ?? ''}</span>
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