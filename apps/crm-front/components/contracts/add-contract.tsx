import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { postGetCompaniesList, postGetResponsible, postSetContract } from "apps/crm-front/data/fetch/integration";
import { GetParams } from "apps/crm-front/specs/custom-service";
import { Company, Contract, Langs, User } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddContract = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [companies, setComapnies] = useState([] as Company[]);

    const [contract, setContract] = useState({} as Contract);

    const onChange = (e) => {
        setContract({
            ...contract,
            [e.target.name]: e.target.value
        })
    }

    const setCustomer = async () => {
        await postSetContract(contract, auth.authToken);
        dispatch(setLoading(true));
        setContract({} as Contract);
        handleClose();
    }

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            setResponsible(data.data);
        })
        postGetCompaniesList(auth.authToken).then((data) => {
            setComapnies(data.data);
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
                {GetParams('addcontract', localization)}
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
                        {GetParams('addcontract', localization)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-group-editor">
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
                                <option value="new" className="bg-gradient fs-4">{GetParams('primaryContact', localization)}</option>
                                <option value="InProgress" className="bg-gradient fs-4">{GetParams('negotiation', localization)}</option>
                                <option value="Testing" className="bg-gradient fs-4">{GetParams('makeDecision', localization)}</option>
                                <option value="Close" className="bg-gradient fs-4">{GetParams('successfullyImplemented', localization)}</option>
                                <option value="Stop" className="bg-gradient fs-4">{GetParams('closed', localization)}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {GetParams('sources', localization)}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select 
                                value={contract.source ?? 'instagram'} 
                                name="source"
                                onChange={(e) => onChange(e)}
                            >
                                <option value="instagram" className="bg-gradient fs-4">{'Instagram'}</option>
                                <option value="google" className="bg-gradient fs-4">{'Google'}</option>
                                <option value="facebook" className="bg-gradient fs-4">{'Facebook'}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {GetParams('contact', localization)}
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
                    { auth.user.role === 'head' || auth.user.role === 'user' ?
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {GetParams('responsible', localization)}
                        </Form.Label>
                        <Col sm="10">
                            <DropDownListComponent 
                                id='responsible' 
                                name="responsible" 
                                fields={fields}
                                dataSource={responsible} 
                                className="e-field" 
                                placeholder='Ответственный' 
                                value={contract.responsible}
                                onChange={(e) => onChange(e)}
                            >

                            </DropDownListComponent>
                        </Col>
                    </Form.Group>
                    : null
                    }
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                        <Form.Label column sm="2">
                            {GetParams('company_id', localization)}
                        </Form.Label>
                        <Col sm="10">
                            <DropDownListComponent 
                                id='company_id' 
                                name="company_id" 
                                fields={fields}
                                dataSource={companies} 
                                className="e-field" 
                                placeholder={GetParams('company_id', localization)} 
                                value={contract.company_id}
                                onChange={(e) => onChange(e)}
                            >

                            </DropDownListComponent>
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
                            {GetParams('description', localization)}
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
                        {GetParams('create', localization)}
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

export default AddContract;