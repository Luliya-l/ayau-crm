import { useMail } from "apps/crm-front/specs/custom-hooks";
import { Container, Table } from "react-bootstrap";

const MailBox = ({inbox = true}) => {
    const {mails} = useMail(inbox);

    return (
        <>
            <Container fluid className="my-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h5>{`${inbox ? 'от кого' : 'кому'}`}</h5></th>
                            <th><h5>{'сделка, тема и сообщение'}</h5></th>
                            <th><h5>{'дата'}</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (mails ?? []).map((task, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{task['dateComplete'] ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{task['responsible'] ?? ''}</span></td>
                                    <td><span className="fs-6">{task['object'] ?? ''}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default MailBox;