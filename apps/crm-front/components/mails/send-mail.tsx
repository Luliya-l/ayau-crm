import { postSetMail } from "apps/crm-front/data/fetch/integration";
import { Mail } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const SendMail = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState);

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [mail, setMail] = useState({} as Mail);

    const onChange = (e) => {
        setMail({...mail, [e.target.name]: e.target.value});
    }

    const acceptMail = async () => {
        await postSetMail(mail, auth.authToken);
        dispatch(setLoading(true));
        setMail({} as Mail);
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
                {getParams('write')}
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
                        {getParams('write')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <InputGroup className="my-2">
                                <InputGroup.Text>
                                    <i className="bi bi-input-cursor"></i>
                                </InputGroup.Text>
                                <Form.Control 
                                    type="email"
                                    aria-label="name" 
                                    name="to_mail"
                                    value={mail.to_mail} 
                                    placeholder={'example@example.com'} 
                                    onChange={(e) => onChange(e)} 
                                />
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
                                    name="title"
                                    value={mail.title} 
                                    placeholder={'Тема сообщения'} 
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
                                    as={'textarea'}
                                    rows={10}
                                    aria-label="responsible" 
                                    name="text"
                                    value={mail.text} 
                                    onChange={(e) => onChange(e)} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={acceptMail} 
                        variant='outline-success'
                    >
                        {'Отправить'}
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

export default SendMail;