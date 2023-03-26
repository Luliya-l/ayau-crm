import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { selectAuthState, setAcceptTerms, setRememberMe, setSmsCode, setUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AppService from "apps/ys-site/specs/gosuService";
import { postRegister } from "apps/ys-site/data/fetching/auth";

const FirstStep = ({step, nextStep}): JSX.Element => {
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const onChange = (e) => {
        if(e.target.id === "phone") {
          dispatch(setUser({
            ...authState.user, phone: e.target.value
          }));
        } 
        if (e.target.id === "rememberMe") {
          dispatch(setRememberMe(e.target.value));
        }
        if (e.target.id === "acceptTerms") {
          dispatch(setAcceptTerms(e.target.value));
        }
    }

    const getSmsCode = async () => {
      const result = await AppService.getCode(authState.user?.phone);
      if ( result ) {
        nextStep();
      } else {
        const result = await postRegister(authState.user?.phone);
        if ( result ) {
          nextStep();
        }
      }
    }

    return (
        <Container id={'step-1'} className={`px-5 mt-5 ${step === 1 ? '' : 'd-none'}`}>
            <Row>
              <Col lg={12} xs={12} className='text-center'>
                <h1 className='text-darck-blue'>Авторизация</h1>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col lg={12} xs={12} className='d-flex align-items-center justify-content-start'>
                <Form.Control
                  type="phone"
                  id="phone"
                  aria-describedby="phoneNumberHelpBlock"
                  value={authState.user?.phone}
                  onChange={onChange}
                  placeholder="+998"
                />
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col lg={12} xs={12} className='text-start'>
                <Form.Check 
                  type={'checkbox'}
                  id={'rememberMe'}
                  label={'Запомнить меня'}
                  className='text-darck-blue'
                  onChange={(e) => {onChange(e)}}
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col lg={12} xs={12} className='text-start'>
                <Form.Check 
                  type={'checkbox'}
                  id={'acceptTerms'}
                  label={'Я согласен и принимаю условия политики конфиденциальности и пользовательского соглашения'}
                  className='text-darck-blue'
                  onChange={(e) => {onChange(e)}}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} xs={12} className='text-center'>
                <Container  className='my-3 pb-5 px-5'>
                  <Button variant="all-orange" onClick={getSmsCode} className='w-100 text-uppercase'>Далее</Button>
                </Container>
              </Col>
            </Row>
          </Container>
    )
}

export default FirstStep;