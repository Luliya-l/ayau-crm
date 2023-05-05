import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { postGetResponsible, postSetCompanies } from "apps/crm-front/data/fetch/integration";
import { GetParams } from "apps/crm-front/specs/custom-service";
import { Company, User } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddCustomer = () => {
    const auth = useSelector(useAuth) as AuthState;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [company, setCompany] = useState({} as Company);
    const onChange = (e) => {
        setCompany({...company, [e.target.name]: e.target.value});
    }

    const setCustomer = async () => {
        await postSetCompanies(company, auth.authToken);
        dispatch(setLoading(true));
        setCompany({} as Company);
        handleClose();
    }

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            if (data)
                setResponsible(data.data);
        })
    }, []);

    return (
        <>
            <Button 
                variant='all-orange' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-plus-lg me-1"></i>
                {GetParams('addcompany')}
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
                        {GetParams('addcompany')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-group-editor">
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Наименование'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="name" 
                            name="name"
                            value={company.name} 
                            placeholder="ТОО 'АйАу'" 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {'Ответственный'}
                        </Form.Label>
                        <Col sm="10">
                            <DropDownListComponent 
                                id='responsible' 
                                name="responsible" 
                                fields={fields}
                                dataSource={responsible} 
                                className="e-field" 
                                placeholder='Ответственный' 
                                value={company.responsible}
                                onChange={(e) => onChange(e)}
                            >

                            </DropDownListComponent>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            {'Раб. тел.'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="phone" 
                            name="phone"
                            value={company.phone} 
                            placeholder="777 777 77 77" 
                            onChange={(e) => onChange(e)} 
                        />
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
                                value={company.email} 
                                placeholder="email@example.com" 
                                onChange={(e) => onChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Website'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="email" 
                            name="web_site"
                            value={company.web_site} 
                            placeholder="www.example.com" 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Адрес'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            type="text" 
                            name="address"
                            value={company.address} 
                            placeholder="г. Алматы, пр. Достык, 1" 
                            onChange={(e) => onChange(e)} 
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            {'Примечание'}
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            as={'textarea'}
                            rows={5} 
                            name="description"
                            value={company.description} 
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

export default AddCustomer;