import { postGetCompaniesList, postGetResponsible, postSetContacts } from "apps/crm-front/data/fetch/integration";
import { Company, Contact, User } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetParams } from "apps/crm-front/specs/custom-service";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const AddContact = () => {
    const auth = useSelector(useAuth) as AuthState;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [company, setCompany] = useState([] as Company[]);

    const [contact, setContacts] = useState({} as Contact);
    const onChange = (e) => {
        setContacts({...contact, [e.target.name]: e.target.value});
    }

    const setContact = async () => {
        await postSetContacts(contact, auth.authToken);
        dispatch(setLoading(true));
        handleClose();
    }

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            if (data)
                setResponsible(data.data);
        })
        postGetCompaniesList(auth.authToken).then((data) => {
            if (data)
                setCompany(data.data);
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
                {GetParams('addcontact')}
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
                        {GetParams('addcontact')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-group-editor">
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ф.И.О.'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="name" 
                            name="fio"
                            value={contact.fio} 
                            placeholder="Ф.И.О." 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="company_id">
                        <Form.Label column sm="2">
                            {'Компания'}
                        </Form.Label>
                        <Col sm="10">
                            <DropDownListComponent 
                                id='company_id' 
                                name="company_id" 
                                fields={fields}
                                dataSource={company} 
                                className="e-field" 
                                placeholder='Компания' 
                                value={contact.company_id}
                                onChange={(e) => onChange(e)}
                            >

                            </DropDownListComponent>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Рабочий телефон'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="phone" 
                            name="phone"
                            value={contact.phone} 
                            placeholder="777 777 77 77" 
                            onChange={(e) => onChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            {'Email'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="email" 
                                name="email"
                                value={contact.email} 
                                placeholder="email@example.com" 
                                onChange={(e) => onChange(e)} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Должность'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select 
                                name="post"
                                value={contact.post} 
                                onChange={(e) => onChange(e)}
                            >
                                <option>Выберите должность</option>
                                <option value="1">Директор</option>
                                <option value="2">Менеджер</option>
                                <option value="3">Бухгалтер</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ответственный'}
                        </Form.Label>
                        <Col sm="10">
                            <DropDownListComponent 
                                id='responsible' 
                                name="responsible" 
                                fields={fields}
                                dataSource={responsible} 
                                className="e-field" 
                                placeholder='Ответственный' 
                                value={contact.responsible}
                                onChange={(e) => onChange(e)}
                            >

                            </DropDownListComponent>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            {'Примечание'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                as={'textarea'} 
                                rows={5}
                                name="description"
                                value={contact.description} 
                                onChange={(e) => onChange(e)} 
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={() => setContact()} 
                        variant='outline-success'
                    >
                        {'Создать'}
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

export default AddContact;