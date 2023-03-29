import { deleteTasks, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Tasks = ({setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const db = useSelector(useAPI);

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
                            <th><h5>{getParams('execution_date')}</h5></th>
                            <th><h5>{getParams('responsible')}</h5></th>
                            <th><h5>{getParams('object')}</h5></th>
                            <th><h5>{getParams('taskType')}</h5></th>
                            <th><h5>{getParams('taskDescription')}</h5></th>
                            <th><h5>{getParams('result')}</h5></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (db.tasks ?? []).map((task, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{new Date(task.execution_date ?? '').toLocaleDateString('ru-RU')}</span></td>
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
                                    <td className="text-center">
                                        <i role='button' className="bi bi bi-pencil mx-4" onClick={() => setEditIndex(index)}/>
                                        <i role='button' className="bi bi-trash3" onClick={() => dispatch(deleteTasks(index))} />
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
export default Tasks;