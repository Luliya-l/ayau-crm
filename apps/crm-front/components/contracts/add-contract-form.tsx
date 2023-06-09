import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Company, Contract, Langs, User } from "apps/crm-front/specs/custom-types";
import { postGetCompaniesList, postGetResponsible } from 'apps/crm-front/data/fetch/integration';
import { GetParams } from 'apps/crm-front/specs/custom-service';
import { selectLangState } from 'apps/crm-front/store/langSlice';

const AddContractForm = (props = null) => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const fields = { text: 'name', value: 'id' };

    const [responsibles, setResponsibles] = useState([] as User[]);
    const [companies, setComapnies] = useState([] as Company[]);
    
    const [state, setState] = useState(extend({}, {}, props, true));
    const data = state as Contract;

    const onChange = (args) => {
        const key = args.target.name;
        const value = args.target.value;
        setState({ [key]: value });
    }

    useEffect(() => {
        postGetResponsible(auth.authToken).then((data) => {
            setResponsibles(data.data);
        })
        postGetCompaniesList(auth.authToken).then((data) => {
            setComapnies(data.data);
        })
    }, []);

    return (
        <>
            <Form.Group as={Row} className="bg-info bg-gradient py-2 mb-3 grid-group-editor" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    <i className="bi bi-question-octagon fs-5"></i>
                </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        value={data.step} 
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
            <Form.Group as={Row} className="py-2 mb-3 grid-group-editor" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    <i className="bi bi-exclamation-octagon fs-5"></i>
                </Form.Label>
                <Col sm="10">
                    <DropDownListComponent 
                        id='priority' 
                        name="priority" 
                        fields={fields}
                        dataSource={
                            [
                                {id:"low", name:"Төмен"}, 
                                {id:"medium", name:"Орташа"},
                                {id:"high", name:"Жоғары"},
                            ]
                        } 
                        className="e-field" 
                        value={data.priority ?? 'low'}>

                    </DropDownListComponent>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="responsible">
                <Form.Label column sm="2">
                {GetParams('contract', localization)}
                </Form.Label>
                <Col sm="10">
                <Form.Control 
                    type="name" 
                    name="name"
                    value={data.name} 
                    placeholder="Контракт №1" 
                    onChange={(e) => onChange(e)} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="responsible">
                <Form.Label column sm="2">
                {GetParams('sources', localization)}
                </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        value={data.source ?? 'instagram'} 
                        name="source"
                        onChange={(e) => onChange(e)}
                    >
                        <option value="instagram" className="bg-gradient fs-4">{'Instagram'}</option>
                        <option value="google" className="bg-gradient fs-4">{'Google'}</option>
                        <option value="facebook" className="bg-gradient fs-4">{'Facebook'}</option>
                    </Form.Select>
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
                        dataSource={responsibles} 
                        className="e-field" 
                        placeholder='Ответственный' 
                        value={data.responsible}>

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
                        value={data.company_id}>

                    </DropDownListComponent>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phone">
                <Form.Label column sm="2">
                {GetParams('budget', localization)}
                </Form.Label>
                <Col sm="10">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>₸</InputGroup.Text>
                        <Form.Control 
                            type="number" 
                            value={data.budget} 
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
                    value={data.description} 
                    name="description" 
                    onChange={(e) => onChange(e)} 
                />
                </Col>
            </Form.Group>
        </>
    )
}

export default AddContractForm;