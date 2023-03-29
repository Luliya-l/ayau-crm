import { DB } from "apps/crm-front/specs/custom-types";
import { setCustomers, updateCustomers, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddCustomer = ({editIndex = -1, setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setEditIndex(-1);};
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [responsible, setResponsible] = useState(editIndex === -1 ? '' : api.customers[editIndex].name ?? '');
    const [phone, setPhone] = useState(editIndex === -1 ? '' : api.customers[editIndex].phone ?? '');
    const [email, setEmail] = useState(editIndex === -1 ? '' : api.customers[editIndex].email ?? '');
    const [website, setWebSite] = useState(editIndex === -1 ? '' : api.customers[editIndex].notes ?? '');
    const [address, setAddress] = useState(editIndex === -1 ? '' : api.customers[editIndex].address ?? '');

    const setCustomer = () => {
        const c = {
            name: responsible,
            phone: phone,
            email: email,
            notes: website,
            id:0,
            created_at:(new Date()).toString(),
            updated_at:(new Date()).toString(),
            deleted_at:null,
            project_id:0,
            user:'',
            assigned_to:0,
            mobile:'',
            fax:'',
            address:address,
            city:'',
            state:'',
            zip:'',
            country:'',
            object_id:0
        }

        if (editIndex === -1) {
            dispatch(setCustomers(c));
        } else {
            dispatch(updateCustomers([c, editIndex]));
        }
        setEditIndex(-1);
        handleClose();
    }

    useEffect(() => {
        if(editIndex !== -1) {
            setResponsible(api.customers[editIndex].name ?? '');
            setPhone(api.customers[editIndex].phone ?? '');
            setEmail(api.customers[editIndex].email ?? '');
            setWebSite(api.customers[editIndex].notes ?? '');
            setAddress(api.customers[editIndex].address ?? '');
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
                {getParams('addcompany')}
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
                        {getParams('addcompany')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ответственный'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="name" value={responsible} placeholder="Ф.И.О." onChange={(e) => console.log(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Раб. тел.'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="phone" value={phone} placeholder="777 777 77 77" onChange={(e) => console.log(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            {'Email'}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" value={email} placeholder="email@example.com" onChange={(e) => console.log(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Website'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="email" value={website} placeholder="www.example.com" onChange={(e) => console.log(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Адрес'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="email" value={address} placeholder="г. Алматы, пр. Достык, 1" onChange={(e) => console.log(e.target.value)} />
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

export default AddCustomer;