import { selectLangState } from "apps/crm-front/store/langSlice";
import { Col, Form} from "react-bootstrap";
import { useSelector } from "react-redux";

const Step1 = ({req, onChange}) => {
    const localization = useSelector(selectLangState);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <Form.Group as={Col} className="mb-3" controlId="title">
                <Form.Label column>
                    {'Название компании'}*
                </Form.Label>
                <Form.Control 
                    type="text" 
                    name={'title'}  
                    placeholder="Название компании" 
                    required 
                    isInvalid = {!req['title']}
                    onChange={(e) => onChange(e)} 
                />
                <Form.Control.Feedback type="invalid">
                    {'Название компании'}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="description">
                <Form.Label column>
                    {'Описание деятельности'}*
                </Form.Label>
                <Form.Control 
                    as="textarea"
                    rows={10}
                    name={'description'} 
                    required 
                    isInvalid = {!req['description']} 
                    onChange={(e) => onChange(e)} 
                />
                <Form.Control.Feedback type="invalid">
                    {'Укажите рабочий телефон'}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    )
}
export default Step1;