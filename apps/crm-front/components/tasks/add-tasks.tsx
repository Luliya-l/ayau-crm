import { Langs, Task } from "apps/crm-front/specs/custom-types";

import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "../spec/datetime-picker";
import { postSetTask } from "apps/crm-front/data/fetch/integration";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading } from "apps/crm-front/store/loadingState";

const AddTask = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;
    
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [taskExecutionDate, setTaskExecutionDate] = useState(new Date());

    const [task, setTask] = useState({
        title: "",
        task_type:"Звонок",
        text: "",
        contract_id: "",
        responsible: "",
    } as Task);

    const onChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    }

    const acceptTask = async () => {
        await postSetTask(task, auth.authToken);
        dispatch(setLoading(true));
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
                                            <Form.Control 
                                                aria-label="name" 
                                                name="title"
                                                value={task.title} 
                                                placeholder={'Тема'} onChange={(e) => onChange(e)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-people"></i>
                                            </InputGroup.Text>
                                            <Form.Control 
                                                aria-label="object" 
                                                name="contract_id"
                                                value={task.contract_id} 
                                                placeholder={'Объект'} 
                                                onChange={(e) => onChange(e)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-person-lines-fill"></i>
                                            </InputGroup.Text>
                                            <Form.Control 
                                                aria-label="responsible" 
                                                name="responsible"
                                                value={task.responsible} 
                                                placeholder={'Исполнитель'} 
                                                onChange={(e) => onChange(e)} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className={`bi ${task.task_type === 'Звонок' ? 'bi-telephone-fill' : 'bi-briefcase-fill'}`}></i>
                                            </InputGroup.Text>
                                            <Form.Select 
                                                aria-label="type" 
                                                name="task_type"
                                                value={task.task_type} 
                                                onChange={(e) => onChange(e)}>
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
                                            <Form.Control 
                                                aria-label="description" 
                                                name="text"
                                                value={task.text} 
                                                placeholder={'Задача'} 
                                                onChange={(e) => onChange(e)} />
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