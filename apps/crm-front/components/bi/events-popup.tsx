import { useTasks } from 'apps/crm-front/specs/custom-hooks';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { useState } from 'react';
import { Button, Container, Offcanvas, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const EventsPopup = ({lang='ru'}) => {
    const langs = useSelector(selectLangState);
    const {tasks} = useTasks();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button 
                variant='events' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-filter-right me-1"></i>
                {langs[lang].params.events}
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{langs[lang].params.events}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container className='text-black'>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th><h5>{'дата'}</h5></th>
                                    <th><h5>{'автор'}</h5></th>
                                    <th><h5>{'объект'}</h5></th>
                                    <th><h5>{'название'}</h5></th>
                                    <th><h5>{'событие'}</h5></th>
                                    <th><h5>{'значение до'}</h5></th>
                                    <th><h5>{'значение после'}</h5></th>
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
                                            <td><span className="fs-6">{task['result'] ?? ''}</span></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default EventsPopup;