import { selectLangState } from "apps/crm-front/store/langSlice";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./registration";

const Authorize = ({setLogin, setPassword, checkAuth}) => {
    const localization = useSelector(selectLangState);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
        <Container 
          className='position-absolute top-50 start-50 translate-middle'
          style={{width:'380px', height:'380px', backgroundColor:'white', borderRadius:'10px', boxShadow:'0 0 10px 0 rgba(0,0,0,0.5)'}}
        >
          <Row>
            <Col className='my-3 fs-3 text-black text-center'>
              {'Авторизация'}
            </Col>
          </Row>
          <FloatingLabel
            controlId="floatingInput"
            label="Телефон или Email"
            className="text-secondary mx-3 mb-3"
          >
            <Form.Control type="login" placeholder="name@example.com" onChange={(e) => setLogin(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel 
            controlId="floatingPassword" 
            label="Пароль"
            className='text-secondary mx-3 mb-3'
          >
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </FloatingLabel>
          <Row>
            <Col>
              <Form.Check 
                type={'checkbox'}
                id={`rememberMe`}
                label={`Запомнить меня`}
                className='text-secondary mx-3 mb-3'
              />
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <Button 
                variant="events" 
                size='lg' 
                className='px-5' 
                onClick={() => checkAuth()}>{'Войти'}</Button>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
                <Registration checkAuth={checkAuth} />
            </Col>
          </Row>
        </Container>
      </>
    )
}
export default Authorize;