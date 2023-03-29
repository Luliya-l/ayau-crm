import { DB } from "apps/crm-front/specs/custom-types";
import { setContracts, updateContracts, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddContract = ({editIndex = -1, setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setEditIndex(-1);};
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [status, setStatus] = useState(editIndex === -1 ? '' : api.contracts[editIndex].status ?? '');
    const [responsible, setResponsible] = useState(editIndex === -1 ? '' : api.contracts[editIndex].name ?? '');
    const [phone, setPhone] = useState(editIndex === -1 ? '' : api.contracts[editIndex].phone ?? '');
    const [email, setEmail] = useState(editIndex === -1 ? '' : api.contracts[editIndex].email ?? '');
    const [post, setPost] = useState(editIndex === -1 ? '' : api.contracts[editIndex].post ?? '');
    const [budget, setBudget] = useState(editIndex === -1 ? '' : api.contracts[editIndex].budget ?? '');

    const setCustomer = () => {
        const c = {
            id: editIndex === -1 ? api.contracts.length : editIndex,
            status: status,
            name: responsible,
            phone: phone,
            email: email,
            post: post,
            budget: budget,
            description:'',
            start_date:'',
            end_date:'',
            created_at:(new Date()).toString(),
            updated_at:(new Date()).toString(),
            deleted_at:null,
            company_id:0,
            user:'',
            object_id:0
        }

        if (editIndex === -1) {
            dispatch(setContracts(c));
        } else {
            dispatch(updateContracts([c, editIndex]));
        }
        setEditIndex(-1);
        handleClose();
    }

    useEffect(() => {
        if(editIndex !== -1) {
            setStatus(api.contracts[editIndex].status ?? '');
            setResponsible(api.contracts[editIndex].name ?? '');
            setPhone(api.contracts[editIndex].phone ?? '');
            setEmail(api.contracts[editIndex].email ?? '');
            setPost(api.contracts[editIndex].post ?? '');
            handleShow();
        }
    }, [editIndex]);

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
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option className="bg-warning bg-gradient fs-4">{'Первичный контакт'}</option>
                                <option value="1" className="bg-primary bg-gradient text-light fs-4">{'Переговоры'}</option>
                                <option value="2" className="bg-light bg-gradient fs-4">{'Принимают решение'}</option>
                                <option value="3" className="bg-danger bg-gradient text-light fs-4">{'Согласование договора'}</option>
                                <option value="3" className="bg-success bg-gradient text-light fs-4">{'Успешно реализовано'}</option>
                                <option value="3" className="bg-secondary bg-gradient text-light fs-4">{'Закрыто и не реализовано'}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
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
                            {'Бюджет'}
                        </Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₸</InputGroup.Text>
                                <Form.Control type="number" value={budget} placeholder="100 000" onChange={(e) => setBudget(e.target.value)} />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Раб. тел.'}
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
                        <Form.Control type="text" value={post} placeholder="www.example.com" onChange={(e) => setPost(e.target.value)} />
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