import { Contract, Task, User } from "apps/crm-front/specs/custom-types";

import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "../spec/datetime-picker";
import { postGetContracts, postGetResponsible, postSetTask } from "apps/crm-front/data/fetch/integration";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { GetParams } from "apps/crm-front/specs/custom-service";

const AddTask = () => {
    const auth = useSelector(useAuth) as AuthState;
    
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [send, setSend] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [contracts, setContracts] = useState([] as Contract[]);

    const [task, setTask] = useState({
        title: "",
        task_type:"Звонок",
        text: "",
        contract_id: "",
        responsible: "",
        finish_at: new Date(),
    } as Task);

    const onChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    }

    const setTaskExecutionDate = (date: Date) => {
        setTask({...task, ['finish_at']: date});
    }

    const acceptTask = async () => {
        await postSetTask(task, auth.authToken);
        dispatch(setLoading(true));
        setTask({} as Task);
        handleClose();
    }

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            if (data)
                setResponsible(data.data);
        })
        postGetContracts(auth.authToken).then((data) => {
            if (data)
                setContracts(data.data);
        })
    }, []);

    return (
        <>
            <Button 
                variant='all-orange' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-plus-lg me-1"></i>
                {GetParams('addtask')}
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
                        {GetParams('addtask')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={`${!send ? '' : 'd-none'} grid-editor`}>
                    <Row>
                        <Col lg="7" xs="7">
                            <DateTimePicker 
                                birthday={task.finish_at ?? new Date()} 
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
                                            <DropDownListComponent 
                                                id='contract_id' 
                                                name="contract_id" 
                                                fields={fields}
                                                dataSource={contracts} 
                                                className="e-field" 
                                                placeholder='Сделка' 
                                                value={task.contract_id}
                                                onChange={(e) => onChange(e)}
                                            >

                                            </DropDownListComponent>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="my-2">
                                            <InputGroup.Text>
                                                <i className="bi bi-person-lines-fill"></i>
                                            </InputGroup.Text>
                                            <DropDownListComponent 
                                                id='responsible' 
                                                name="responsible" 
                                                fields={fields}
                                                dataSource={responsible} 
                                                className="e-field" 
                                                placeholder='Ответственный' 
                                                value={task.responsible}
                                                onChange={(e) => onChange(e)}
                                            >

                                            </DropDownListComponent>
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
                <Modal.Body className={`${!send ? 'd-none' : ''} d-flex justify-content-center
                    align-items-center`}>
                    <Spinner animation="grow" />
                </Modal.Body>
                <Modal.Footer className={`${!send ? '' : 'd-none'}`}>
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