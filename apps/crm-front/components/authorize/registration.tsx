import { postRegister } from "apps/crm-front/data/fetch/integration";
import { DB, User } from "apps/crm-front/specs/custom-types";
import { useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Registration = () => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setIsLoading(false);};

    const [isLoading, setIsLoading] = useState(false)

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [user, setUser] = useState({});

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const sendRegistration = async () => {
        setIsLoading(!isLoading);
        await postRegister(user as User)
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
                            {'Ф.И.О.'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="name" name={'name'} placeholder="Ф.И.О." onChange={(e) => onChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Рабочий телефон'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="phone" name={'phone'} placeholder="+7 777 777 77 77" onChange={(e) => onChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            {'Email'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" name={'email'} placeholder="email@example.com" onChange={(e) => onChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Пол'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select name={'gender'} onChange={(e) => onChange(e)}>
                                <option value="мужской">Мужской</option>
                                <option value="женский">Женский</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            {'Пароль'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" name={'password'} onChange={(e) => onChange(e)} />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Container className={`${isLoading ? 'd-none' : ''}`}>
                        <Button 
                            onClick={() => sendRegistration()} 
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
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Registration;