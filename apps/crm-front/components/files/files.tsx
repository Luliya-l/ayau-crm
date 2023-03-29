import { useTasks } from "apps/crm-front/specs/custom-hooks";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Files = ({setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const {tasks} = useTasks();

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
                            <th><h5>{getParams('user')}</h5></th>
                            <th><h5>{getParams('object_id')}</h5></th>
                            <th><h5>{getParams('created_at')}</h5></th>
                            <th><h5>{getParams('updated_at')}</h5></th>
                            <th><h5>{getParams('file')}</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (tasks ?? []).map((task, index) => (
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
                                    <td><span className="fs-6">{task['task'] ?? ''}</span></td>
                                    <td><span className="fs-6">{task['result'] ?? ''}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Files;