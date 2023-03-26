import { Container, Image, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { selectAuthState, setUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AppService from 'apps/ys-site/specs/gosuService';
import FirstStep from './first-step';
import SecondStep from './second-step';
import { useRouter } from 'next/router';

const Login = ({className}): JSX.Element => {
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (step === 3) {
      router.push('/personal-area');
    } else {
      setShow(true);
    }
  };

  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const login = async (token) => {
    const result = await AppService.login(token ?? '');
    if (result) {
      dispatch(setUser(result?.user))
    }
    // PERSIST USER DATA
    if (authState.rememberMe){
      if (result) {
        dispatch(setUser(result?.user))
      }
    }
  }

  useEffect(() => {
    if (authState.authState) {
      setStep(3);
    }
  }, [authState.authState]);

  return (
    <>
      <Image src='/img/account.png' role="button" fluid className='account' onClick={handleShow}/>
      <Modal show={show} onHide={handleClose} centered className={className}>
        <Modal.Header closeButton className={'border-0'}>
        </Modal.Header>
        <Modal.Body>
          {/* STEP 1 - ENTER PHONE NUMBER */}
          <FirstStep  step={step} nextStep={nextStep} />
          {/* STEP 2 - CHECK SMS CODE */}
          <SecondStep step={step} prevStep={prevStep} login={login} />
          {/* STEP 3 - USER AUTHORIZED */}
          <Container id={'step-3'} className={`px-5 mt-5 ${step === 3 ? '' : 'd-none'}`}>
            <h1 className='text-center text-darck-blue'>Вы уже авторизованны</h1>
            <p className='text-start text-darck-blue'>Ваш номер телефона: {authState.user?.phone}</p>
            <p className='text-start text-darck-blue'>Запомнить меня: {authState.rememberMe}</p>
            <p className='text-start text-darck-blue'>Согласие с условиями: {authState.acceptTerms}</p>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;