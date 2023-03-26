import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { selectAuthState, setAuthState, setSmsCode, setTokens, setUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AppService from "apps/ys-site/specs/gosuService";

const SecondStep = ({step, login, prevStep}): JSX.Element => {
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const onCodeChange = (e) => {
        dispatch(setSmsCode(e.target.value));
    }

    const checkCode = async () => {
      const result = await AppService.checkCode(authState.user?.phone, authState.smsCode);
      console.log("🚀 ~ file: second-step.tsx:16 ~ checkCode ~ result:", result)
      if ( result ) {
          dispatch(setAuthState(true));
          dispatch(setTokens(result));
          login(result.authToken);
      }
  }

    return (
      <Container id={'step-1'} className={`px-5 mt-5 ${step === 2 ? '' : 'd-none'}`}>
        <Row>
          <Col lg={12} xs={12} className='text-center'>
            <h1 className='text-darck-blue'>Авторизация</h1>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col lg={12} xs={12} className='d-flex align-items-center justify-content-start'>
            <Form.Control
              type="number"
              id="code"
              aria-describedby="codeNumberHelpBlock"
              value={authState.smsCode}
              onChange={onCodeChange}
              placeholder="Введите код подтверждения"
            />  
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={12} className="ps-4 pt-2 text-start">
            <Form.Text id="codeNumberHelpBlock" className="w-100 text-darck-blue" muted>
              Код подтверждения отправлен на номер {authState.user?.phone}
            </Form.Text>
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={12} className='text-center'>
            <Container  className='my-3 px-5'>
              <Button variant="all-orange" onClick={checkCode} className='w-100 text-uppercase'>Далее</Button>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={12} className='text-center'>
            <Container  className='mb-5 pb-5 px-5'>
              <Button variant="out-orange" onClick={prevStep} className='w-100 text-uppercase'>Назад</Button>
            </Container>
          </Col>
        </Row>
      </Container>
    )
}

export default SecondStep;