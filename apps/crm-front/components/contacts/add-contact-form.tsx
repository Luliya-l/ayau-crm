import { postSetContacts } from "apps/crm-front/data/fetch/integration";
import { Contact } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { setLoading } from "apps/crm-front/store/loadingState";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddContactForm = (props) => {
    const auth = useSelector(useAuth) as AuthState;

    const dispatch = useDispatch();

    const [contact, setContacts] = useState({} as Contact);
    const onChange = (e) => {
        setContacts({...contact, [e.target.name]: e.target.value});
    }

    const setContact = async () => {
        await postSetContacts(contact, auth.authToken);
        dispatch(setLoading(true));
    }

    return (
        <>
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
        </>
    )
}

export default AddContactForm;