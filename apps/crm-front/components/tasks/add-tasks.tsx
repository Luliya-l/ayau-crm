import { DB, Langs } from "apps/crm-front/specs/custom-types";
import { setTasks, updateTasks, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "../spec/datetime-picker";

const AddTask = ({editIndex = -1, setEditIndex,}) => {
    const localization = useSelector(selectLangState) as Langs;
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setEditIndex(-1);}
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [taskExecutionDate, setTaskExecutionDate] = useState(editIndex === -1 ? new Date() : new Date(api.tasks[editIndex].execution_date));
    const [taskType, setTaskType] = useState(editIndex === -1 ? 'Звонок' : api.tasks[editIndex].type);

    const [taskName, setTaskName] = useState(editIndex === -1 ? '' : api.tasks[editIndex].name ?? '');
    const [taskDescription, setTaskDescription] = useState(editIndex === -1 ? '' : api.tasks[editIndex].description ??'');
    const [taskObject, setTaskObject] = useState(editIndex === -1 ? '' : api.tasks[editIndex].object ??'');
    const [taskResponsible, setTaskResponsible] = useState(editIndex === -1 ? '' : api.tasks[editIndex].responsible ??'');

    const acceptTask = () => {
        const t = {
            execution_date: taskExecutionDate.toString(),
            responsible: taskResponsible,
            object: taskObject,
            type: taskType,
            name: taskName,
            result: '',
            id:0,
            description:taskDescription,
            status:'open',
            priority:'low',
            created_at:(new Date()).toString(),
            updated_at:(new Date()).toString(),
            deleted_at:null,
            project_id:0,
            user_id:0,
            assigned_to:0,
        };

        if (editIndex === -1) {
            dispatch(setTasks(t));
        } else {
            dispatch(updateTasks([t, editIndex]));
        }
        setEditIndex(-1);
        handleClose();
    }

    useEffect(() => {
        if(editIndex !== -1) {
            setTaskExecutionDate(new Date(api.tasks[editIndex].execution_date));
            setTaskType(api.tasks[editIndex].type);
            setTaskName(api.tasks[editIndex].name ?? '');
            setTaskDescription(api.tasks[editIndex].description ?? '');
            setTaskObject(api.tasks[editIndex].object ?? '');
            setTaskResponsible(api.tasks[editIndex].responsible ?? '');
            handleShow();
        }
    }, [editIndex]);

    return (
        <>
            <Button 
                variant='all-orange' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-plus-lg me-1"></i>
                {getParams('addtask')}
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getParams('addtask')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <DateTimePicker 
                                birthday={taskExecutionDate} 
                                setBirthday={setTaskExecutionDate} 
                                isYear={false}
                                isTime={true} 
                            />
                        </Col>
                        <Col>
                            <Container className="pt-5">
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-input-cursor"></i>
                                            </InputGroup.Text>
                                            <Form.Control aria-label="name" value={taskName} placeholder={'Тема'} onChange={(e) => setTaskName(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-people"></i>
                                            </InputGroup.Text>
                                            <Form.Control aria-label="object" value={taskObject} placeholder={'Объект'} onChange={(e) => setTaskObject(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-person-lines-fill"></i>
                                            </InputGroup.Text>
                                            <Form.Control aria-label="responsible" value={taskResponsible} placeholder={'Исполнитель'} onChange={(e) => setTaskResponsible(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className={`bi ${taskType === 'Звонок' ? 'bi-telephone-fill' : 'bi-briefcase-fill'}`}></i>
                                            </InputGroup.Text>
                                            <Form.Select aria-label="type" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                                                <option>{'Звонок'}</option>
                                                <option>{'Встреча'}</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-list-task"></i>
                                            </InputGroup.Text>
                                            <Form.Control aria-label="description" value={taskDescription} placeholder={'Задача'} onChange={(e) => setTaskDescription(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={acceptTask} 
                        variant='outline-success'
                    >
                        {'Поставить'}
                    </Button>
                    <Button 
                        onClick={handleClose} 
                        variant='outline-warning'
                    >
                        {'Отменить'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTask;