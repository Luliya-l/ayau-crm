import { postRegister } from "apps/crm-front/data/fetch/integration";
import { GetParams } from "apps/crm-front/specs/custom-service";
import { User } from "apps/crm-front/specs/custom-types";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Registration = ({checkAuth}) => {
    const localization = useSelector(selectLangState);

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
            setReq({...req, [e.target.name]: String(e.target.value).length > 3 ? true : false});
        } else {
            setReq({...req, [e.target.name]: String(e.target.value) === String(user['password']) ? true : false});
        }
    }

    const sendRegistration = async () => {
        if (checkFrm()) {
            setIsLoading(!isLoading);
            const result = await postRegister(user as User)
            if (result) {
                if (!result.detail) {
                    checkAuth();
                    handleClose();
                } else {
                    if (result.detail === "Account already exist") {
                        console.log("")
                    }
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
                        {GetParams('registration', localization)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  className={`${isLoading ? 'd-none' : ''}`}>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {GetParams('lastName', localization)}*
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="name" 
                                name={'name'}  
                                placeholder="Аты-жөні" 
                                required 
                                isInvalid = {!req['name']}
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {GetParams('enterfullname', localization)}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="phone">
                            <Form.Label column>
                                {GetParams('worknumber', localization)}*
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
                                {GetParams('enterphone', localization)}
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
                                {GetParams('enteremail', localization)}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {GetParams('gender', localization)}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select name={'gender'} onChange={(e) => onChange(e)}>
                                <option value="мужской">{GetParams('man', localization)}</option>
                                <option value="женский">{GetParams('woman', localization)}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="email">
                            <Form.Label column sm="2">
                                {GetParams('password', localization)}*
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                name={'password'} 
                                required 
                                isInvalid = {!req['password']}
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {GetParams('enterpass', localization)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="email">
                            <Form.Label column>
                                {GetParams('repeat', localization)}
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                name={'password_check'} 
                                required 
                                isInvalid = {!req['password_check']}
                                onChange={(e) => onChange(e)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {GetParams('dontmatch', localization)}
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
                        {GetParams('login', localization)}
                    </Button>
                    <Button 
                        onClick={handleClose} 
                        variant='outline-warning'
                    >
                        {GetParams('cancel', localization)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Registration;