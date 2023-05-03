import { postSetContacts } from "apps/crm-front/data/fetch/integration";
import { Contact } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddContact = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState);

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [contact, setContacts] = useState({} as Contact);
    const onChange = (e) => {
        setContacts({...contact, [e.target.name]: e.target.value});
    }

    const setContact = async () => {
        await postSetContacts(contact, auth.authToken);
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
                {getParams('addcontact')}
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
                        {getParams('addcontact')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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