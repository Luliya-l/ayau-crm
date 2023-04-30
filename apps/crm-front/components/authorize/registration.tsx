import { postLogin, postRegister } from "apps/crm-front/data/fetch/integration";
import { DB, User } from "apps/crm-front/specs/custom-types";
import { useAPI } from "apps/crm-front/store/apiSlice";
import { setAcceptTerms, setAuthState, setRememberMe, setTokens } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
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
    const [req, setReq] = useState({
        name: true,
        phone: true,
        email: true,
        password: true,
        password_check: true
    });

    const checkFrm = () => {
        if (!req.name)
            return false;
        if (!req.phone)
            return false;
        if (!req.email)
            return false;
        if (!req.password)
            return false;
        if (!req.password_check)
            return false;
        return true;
    }
    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        if (e.target.name !== 'password_check') {
            setReq({...req, [e.target.name]: String(e.target.value).length > 3 ? true : false})
        } else {
            setReq({...req, [e.target.name]: String(e.target.value) === String(user['password']) ? true : false})
        }
    }

    const sendRegistration = async () => {
        if (checkFrm()) {
            setIsLoading(!isLoading);
            const result = await postRegister(user as User)
            if (result) {
                const login = await postLogin(
                    user['email'], 
                    user['password']
                  );
                  if (login) {
                    // dispatch(setUser(user);
                    dispatch(setAuthState(true));
                    dispatch(setRememberMe(true));
                    dispatch(setTokens({
                      authToken:login.authToken, 
                      refreshToken:login.refreshToken
                    }));
                    // dispatch(setSmsCode('123'));
                    dispatch(setAcceptTerms(true));

                    handleClose();
                  }
            }
        }
    }

    return (
        <>
            <Button 
                variant="link" 
                size='lg' 
                className='fs-6 px-5 text-decoration-none' 
                onClick={() => handleShow()}>{'Регистрация'}</Button>
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
                <Modal.Body  className={`${isLoading ? 'd-none' : ''}`}>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ф.И.О.'}*
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="name" 
                                name={'name'}  
                                placeholder="Ф.И.О." 
                                required 
                                isInvalid = {!req['name']}
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {'Укажите Ф.И.О.'}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="phone">
                            <Form.Label column>
                                {'Рабочий телефон'}*
                            </Form.Label>
                            <Form.Control 
                                type="phone" 
                                name={'phone'} 
                                required 
                                isInvalid = {!req['phone']}
                                placeholder="+7 777 777 77 77" 
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {'Укажите рабочий телефон'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}controlId="email">
                            <Form.Label column sm="2">
                                {'Email'}*
                            </Form.Label>
                            <Form.Control 
                                type="email" 
                                name={'email'} 
                                required 
                                isInvalid = {!req['email']}
                                placeholder="email@example.com" 
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {'Укажите email'}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
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
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="email">
                            <Form.Label column sm="2">
                                {'Пароль'}*
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                name={'password'} 
                                required 
                                isInvalid = {!req['password']}
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {'Укажите пароль'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="email">
                            <Form.Label column>
                                {'Повторите пароль'}
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                name={'password_check'} 
                                required 
                                isInvalid = {!req['password_check']}
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {'Пароли не совпадают'}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Body  
                    className={`${isLoading ? '' : 'd-none'}
                    d-flex justify-content-center
                    align-items-center`}
                >
                    <Spinner animation="grow" />
                </Modal.Body>
                <Modal.Footer className={`${isLoading ? 'd-none' : ''}`}>
                    <Button 
                        onClick={() => sendRegistration()} 
                        variant='outline-success'
                        disabled={!checkFrm()}
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