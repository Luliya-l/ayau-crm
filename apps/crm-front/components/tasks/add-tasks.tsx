import { DateTime } from "@syncfusion/ej2-charts";
import { DB, Langs } from "apps/crm-front/specs/custom-types";
import { setTasks, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "../spec/datetime-picker";

const AddTask = () => {
    const localization = useSelector(selectLangState) as Langs;
    const tasks = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [taskExecutionDate, setTaskExecutionDate] = useState(new Date());
    const [taskType, setTaskType] = useState('Звонок');

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskObject, setTaskObject] = useState('');
    const [taskResponsible, setTaskResponsible] = useState('');

    const acceptTask = () => {
        dispatch(setTasks({
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
        }));
        handleClose();
    }

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
                                            <Form.Control aria-label="Search" placeholder={'Тема'} onChange={(e) => setTaskName(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-people"></i>
                                            </InputGroup.Text>
                                            <Form.Control aria-label="Search" placeholder={'Объект'} onChange={(e) => setTaskObject(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-person-lines-fill"></i>
                                            </InputGroup.Text>
                                            <Form.Control aria-label="Search" placeholder={'Исполнитель'} onChange={(e) => setTaskResponsible(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className={`bi ${taskType === 'Звонок' ? 'bi-telephone-fill' : 'bi-briefcase-fill'}`}></i>
                                            </InputGroup.Text>
                                            <Form.Select aria-label="Search" onChange={(e) => setTaskType(e.target.value)}>
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
                                            <Form.Control aria-label="Search" placeholder={'Задача'} onChange={(e) => setTaskDescription(e.target.value)} />
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