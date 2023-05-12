import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { postGetCompaniesList, postGetContracts, postGetResponsible, postSetMail } from "apps/crm-front/data/fetch/integration";
import { GetParams } from "apps/crm-front/specs/custom-service";
import { Company, Contract, Langs, Mail, User } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const SendMail = () => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [contracts, setContracts] = useState([] as Contract[]);
    const [company, setCompany] = useState([{
        name: "",
        responsible: "",
        address: "",
        phone: "",
        email: "",
        web_site: "",
        description: "",
        user_id: "",
    }] as Company[]);

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

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            if (data)
                setResponsible(data.data);
        })
        postGetContracts(auth.authToken).then((data) => {
            if (data)
                setContracts(data.data);
        })
        postGetCompaniesList(auth.authToken).then((data) => {
            if (data)
                setCompany(data.data);
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
                {GetParams('write', localization)}
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
                        {GetParams('write', localization)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-editor">
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
                                    <i className="bi bi-fonts"></i>
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
                                    <i className="bi bi-currency-dollar"></i>
                                </InputGroup.Text>
                                <DropDownListComponent 
                                    id='contract_id' 
                                    name="contract_id" 
                                    fields={fields}
                                    dataSource={contracts} 
                                    className="e-field" 
                                    placeholder='Сделка' 
                                    value={mail.contract_id}
                                    onChange={(e) => onChange(e)}
                                >

                                </DropDownListComponent>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="my-2">
                                <InputGroup.Text>
                                    <i className="bi bi-person-lines-fill"></i>
                                </InputGroup.Text>
                                <DropDownListComponent 
                                    id='responsible' 
                                    name="responsible" 
                                    fields={fields}
                                    dataSource={responsible} 
                                    className="e-field" 
                                    placeholder='Ответственный' 
                                    value={mail.responsible}
                                    onChange={(e) => onChange(e)}
                                >

                                </DropDownListComponent>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="my-2">
                                <InputGroup.Text>
                                    <i className="bi bi-building"></i>
                                </InputGroup.Text>
                                <DropDownListComponent 
                                    id='company_id' 
                                    name="company_id" 
                                    fields={fields}
                                    dataSource={company} 
                                    className="e-field" 
                                    placeholder='Компания' 
                                    value={mail.company_id}
                                    onChange={(e) => onChange(e)}
                                >

                                </DropDownListComponent>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="my-2">
                                <InputGroup.Text>
                                    <i className="bi bi-card-text"></i>
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