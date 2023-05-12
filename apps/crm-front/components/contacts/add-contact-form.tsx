import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { postGetCompaniesList, postGetResponsible } from "apps/crm-front/data/fetch/integration";
import { Company, Contact, Langs, User } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddContactForm = (props) => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);
    const [company, setCompany] = useState([] as Company[]);

    const [state, setState] = useState(extend({}, {}, props, true));
    const contact = state as Contact;

    const onChange = (args) => {
        const key = args.target.name;
        const value = args.target.value;
        setState({ [key]: value });
    }

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            if (data)
                setResponsible(data.data);
        })
        postGetCompaniesList(auth.authToken).then((data) => {
            if (data)
                setCompany(data.data);
        })
    }, []);

    return (
        <>
            <div className="grid-group-editor">
                <Form.Group as={Row} className="mb-3" controlId="responsible">
                    <Form.Label column sm="2">
                        {'Ф.И.О.'}
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control 
                        type="name" 
                        name="fio"
                        value={contact.fio} 
                        placeholder="Ф.И.О." 
                        onChange={(e) => onChange(e)} 
                    />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="company_id">
                    <Form.Label column sm="2">
                        {'Компания'}
                    </Form.Label>
                    <Col sm="10">
                        <DropDownListComponent 
                            id='company_id' 
                            name="company_id" 
                            fields={fields}
                            dataSource={company} 
                            className="e-field" 
                            placeholder='Компания' 
                            value={contact.company_id}
                        >

                        </DropDownListComponent>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="phone">
                    <Form.Label column sm="2">
                        {'Рабочий телефон'}
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control 
                        type="phone" 
                        name="phone"
                        value={contact.phone} 
                        placeholder="777 777 77 77" 
                        onChange={(e) => onChange(e)} />
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
                            value={contact.email} 
                            placeholder="email@example.com" 
                            onChange={(e) => onChange(e)} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        {'Должность'}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select 
                            name="post"
                            value={contact.post} 
                            onChange={(e) => onChange(e)}
                        >
                            <option>Выберите должность</option>
                            <option value="1">Директор</option>
                            <option value="2">Менеджер</option>
                            <option value="3">Бухгалтер</option>
                        </Form.Select>
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
                            value={contact.responsible}
                        >

                        </DropDownListComponent>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm="2">
                        {'Примечание'}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control 
                            as={'textarea'} 
                            rows={5}
                            name="description"
                            value={contact.description} 
                            onChange={(e) => onChange(e)} 
                        />
                    </Col>
                </Form.Group>
            </div>
        </>
    )
}

export default AddContactForm;