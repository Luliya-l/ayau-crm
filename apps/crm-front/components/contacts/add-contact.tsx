import { DB } from "apps/crm-front/specs/custom-types";
import { setContacts, updateContacts, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddContact = ({editIndex = -1, setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setEditIndex(-1);};
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [responsible, setResponsible] = useState(editIndex === -1 ? '' : api.contacts[editIndex].name ?? '');
    const [phone, setPhone] = useState(editIndex === -1 ? '' : api.contacts[editIndex].phone ?? '');
    const [email, setEmail] = useState(editIndex === -1 ? '' : api.contacts[editIndex].email ?? '');
    const [post, setPost] = useState(editIndex === -1 ? '' : api.contacts[editIndex].notes ?? '');

    const setContact = () => {
        const c = {
            name: responsible,
            phone: phone,
            email: email,
            notes: post,
            id:0,
            created_at:(new Date()).toString(),
            updated_at:(new Date()).toString(),
            deleted_at:null,
            project_id:0,
            user:'',
            assigned_to:0,
            mobile:'',
            fax:'',
            address:'',
            city:'',
            state:'',
            zip:'',
            country:'',
            company_id:0,
            object_id:0
        }

        if (editIndex === -1) {
            dispatch(setContacts(c));
        } else {
            dispatch(updateContacts([c, editIndex]));
        }
        setEditIndex(-1);
        handleClose();
    }

    useEffect(() => {
        if(editIndex !== -1) {
            setResponsible(api.contacts[editIndex].name ?? '');
            setPhone(api.contacts[editIndex].phone ?? '');
            setEmail(api.contacts[editIndex].email ?? '');
            setPost(api.contacts[editIndex].notes ?? '');
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