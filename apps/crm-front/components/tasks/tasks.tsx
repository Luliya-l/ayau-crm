import { useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Tasks = () => {
    const localization = useSelector(selectLangState);
    const db = useSelector(useAPI);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <Container fluid className="my-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h5>{getParams('execution_date')}</h5></th>
                            <th><h5>{getParams('responsible')}</h5></th>
                            <th><h5>{getParams('object')}</h5></th>
                            <th><h5>{getParams('taskType')}</h5></th>
                            <th><h5>{getParams('taskDescription')}</h5></th>
                            <th><h5>{getParams('result')}</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (db.tasks ?? []).map((task, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{task.execution_date ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{task.responsible ?? ''}</span></td>
                                    <td><span className="fs-6">{task.object ?? ''}</span></td>
                                    <td>
                                        {task.type === 'связаться' ? 
                                        <i className="bi bi-telephone-fill mx-1" /> : 
                                        <i className="bi bi-briefcase-fill mx-1" />}
                                        <span className="fs-6 text-capitalize">{task.type ?? ''}</span>
                                    </td>
                                    <td><span className="fs-6">{task.name ?? ''}</span></td>
                                    <td><span className="fs-6">{task.result ?? ''}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Tasks;