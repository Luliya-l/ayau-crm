import { extend } from '@syncfusion/ej2-base';

import { useState } from "react";
import { Col, Form,  Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Langs, User } from "apps/crm-front/specs/custom-types";
import { selectLangState } from 'apps/crm-front/store/langSlice';

const AddUserForm = (props = null) => {
    const localization = useSelector(selectLangState) as Langs;

    const [state, setState] = useState(extend({}, {}, props, true));
    const data = state as User;

    const onChange = (args) => {
        const key = args.target.name;
        const value = args.target.value;
        setState({ [key]: value });
    }

    return (
        <>
            <Form.Group as={Row} className="bg-info bg-gradient py-2 mb-3 grid-group-editor" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    <i className="bi bi-question-octagon fs-5"></i>
                </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        value={data.role} 
                        name="role"
                        onChange={(e) => onChange(e)}
                    >
                        <option value="head" className="bg-gradient fs-4">{'Руководитель'}</option>
                        <option value="manager" className="bg-gradient fs-4">{'Менеджер'}</option>
                        <option value="user" className="bg-gradient fs-4">{'Администратор'}</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="responsible">
                <Form.Label column sm="2">
                    {'Ф.И.О.'}
                </Form.Label>
                <Col sm="10">
                <Form.Control 
                    type="name" 
                    name="name"
                    value={data.name} 
                    placeholder="Фамилия имя отчество" 
                    onChange={(e) => onChange(e)} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phone">
                <Form.Label column sm="2">
                    {'email'}
                </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        type="email" 
                        value={data.email} 
                        name="email"
                        placeholder="example@example.com" 
                        onChange={(e) => onChange(e)} 
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phone">
                <Form.Label column sm="2">
                    {'Телефон'}
                </Form.Label>
                <Col sm="10">
                <Form.Control 
                    type="phone" 
                    value={data.phone} 
                    name="phone"  
                    onChange={(e) => onChange(e)} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="bg-warning bg-gradient py-2 mb-3 grid-group-editor" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    <i className="bi bi-people fs-5"></i>
                </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        value={data.gender} 
                        name="gender"
                        onChange={(e) => onChange(e)}
                    >
                        <option value="Мужской" className="bg-gradient fs-4">{'Мужской'}</option>
                        <option value="Женский" className="bg-gradient fs-4">{'Женский'}</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phone">
                <Form.Label column sm="2">
                    {'Пароль'}
                </Form.Label>
                <Col sm="10">
                <Form.Control 
                    type="password" 
                    value={data.password} 
                    name="password"  
                    onChange={(e) => onChange(e)} 
                />
                </Col>
            </Form.Group>
        </>
    )
}

export default AddUserForm;