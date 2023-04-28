import { DB } from "apps/crm-front/specs/custom-types";
import { useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Registration = () => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [responsible, setResponsible] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [post, setPost] = useState('');

    const setContact = () => {
        
        handleClose();
    }

    return (
        <>
            <Button variant="link" size='lg' className='fs-6 px-5' onClick={() => handleShow()}>{'Регистрация'}</Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {'Регистрация'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ответственный'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="name" value={responsible} placeholder="Ф.И.О." onChange={(e) => setResponsible(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Рабочий телефон'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="phone" value={phone} placeholder="777 777 77 77" onChange={(e) => setPhone(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            {'Email'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" value={email} placeholder="email@example.com" onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Должность'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select value={post} onChange={(e) => setPost(e.target.value)}>
                                <option>Выберите должность</option>
                                <option value="1">Директор</option>
                                <option value="2">Менеджер</option>
                                <option value="3">Бухгалтер</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={() => setContact()} 
                        variant='outline-success'
                    >
                        {'Зарегистрироватся'}
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

export default Registration;