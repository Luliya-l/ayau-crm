import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { postGetResponsible } from "apps/crm-front/data/fetch/integration";
import { Company, User } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddCustomerForm = (props) => {
    const auth = useSelector(useAuth) as AuthState;

    const fields = { text: 'name', value: 'id' };

    const [responsible, setResponsible] = useState([] as User[]);

    const [state, setState] = useState(extend({}, {}, props, true));
    const company = state as Company;

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
    }, []);

    return (
        <>
            <div className="grid-group-editor">
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
            </div>
        </>
    )
}

export default AddCustomerForm;