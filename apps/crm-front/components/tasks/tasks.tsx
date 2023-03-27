import { useTasks } from "apps/crm-front/specs/custom-hooks";
import { Container, Table } from "react-bootstrap";

const Tasks = ({lang='ru'}) => {
    const {tasks} = useTasks();

    return (
        <>
            <Container fluid className="my-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h5>{'дата исполнения'}</h5></th>
                            <th><h5>{'ответственный'}</h5></th>
                            <th><h5>{'объект'}</h5></th>
                            <th><h5>{'тип задачи'}</h5></th>
                            <th><h5>{'текст задачи'}</h5></th>
                            <th><h5>{'результат'}</h5></th>
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
export default Tasks;