import { postSetContract } from "apps/crm-front/data/fetch/integration";
import { Contract } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddContract = () => {
    const auth = useSelector(useAuth) as AuthState;

    const localization = useSelector(selectLangState);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [contract, setContract] = useState({} as Contract);

    const onChange = (e) => {
        setContract({
            ...contract,
            [e.target.name]: e.target.value
        })
    }

    const setCustomer = async () => {
        await postSetContract(contract, auth.authToken);
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
                {getParams('addcontract')}
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
                        {getParams('addcontract')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="bg-info bg-gradient py-2 mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            <i className="bi bi-question-octagon fs-5"></i>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select 
                                value={contract.step} 
                                name="step"
                                onChange={(e) => onChange(e)}
                            >
                                <option value="new" className="bg-gradient fs-4">{'Первичный контакт'}</option>
                                <option value="InProgress" className="bg-gradient fs-4">{'Переговоры'}</option>
                                <option value="Testing" className="bg-gradient fs-4">{'Принимают решение'}</option>
                                <option value="Close" className="bg-gradient fs-4">{'Успешно реализовано'}</option>
                                <option value="Stop" className="bg-gradient fs-4">{'Закрыто и не реализовано'}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Контракт'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="name" 
                            name="name"
                            value={contract.name} 
                            placeholder="Контракт №1" 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ответственный'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="name" 
                            value={contract.responsible} 
                            name="responsible"
                            placeholder="Ф.И.О." 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Бюджет'}
                        </Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₸</InputGroup.Text>
                                <Form.Control 
                                    type="number" 
                                    value={contract.budget} 
                                    name="budget"
                                    placeholder="100 000" 
                                    onChange={(e) => onChange(e)} 
                                />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Описание'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            as="textarea"
                            rows={5} 
                            value={contract.description} 
                            name="description" 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={() => setCustomer()} 
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

export default AddContract;