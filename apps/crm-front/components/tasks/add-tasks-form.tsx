import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Contract, Task, User } from "apps/crm-front/specs/custom-types";
import { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import DateTimePicker from "../spec/datetime-picker";
import { postGetContracts, postGetResponsible } from "apps/crm-front/data/fetch/integration";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";


const AddTaskForm = (props) => {
    const auth = useSelector(useAuth) as AuthState;

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [contracts, setContracts] = useState([] as Contract[]);

    const [state, setState] = useState(extend({}, {}, props, true));
    const task = state as Task;

    const onChange = (args) => {
        const key = args.target.name;
        const value = args.target.value;
        setState({ [key]: value });
    }

    const setTaskExecutionDate = (date: Date) => {
        setState({['completed_at']: date});
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
            <Row className='grid-editor'>
                <Col lg="7" xs="7" >
                    <DateTimePicker 
                        birthday={task.completed_at ?? new Date()} 
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
                                    <Form.Check 
                                        aria-label="name" 
                                        name="completed"
                                        checked={task.completed}
                                        onChange={(e) => onChange(e)} />
                                </InputGroup>
                            </Col>
                        </Row>
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
        </>
    )
}

export default AddTaskForm;