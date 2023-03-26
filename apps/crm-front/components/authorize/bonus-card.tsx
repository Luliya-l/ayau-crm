import { Alert, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import FirstStep from './first-step';
import SecondStep from './second-step';
import { getBalance, postRefresh } from 'apps/ys-site/data/fetching/auth';
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState, setTokens, setUser } from "../../store/authSlice";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BonusCard = (): JSX.Element => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0)
  const router = useRouter();

  useEffect(() => {
    getBalance(authState.authToken).then((res) => {
      if (!res) {
        postRefresh(authState.refreshToken).then((res) => {
          if (res) {
            dispatch(setAuthState(true));
            dispatch(setTokens(res));
            getBalance(res.authToken).then((res) => {
              if (res) {
                dispatch(setUser(res?.user))
              }
            })
          } else {
            dispatch(setAuthState(false));
            router.push('/');
          }
        })
      }
      setBalance(res?.balance ?? 0)
    })
  }, [])

  return (
    <>
      <Row>
        <Col lg="4" xs="4">
        <Alert variant="secondary">
          <Alert.Heading className='fs-6'>Сумма Ваших бонусов</Alert.Heading>
          <Row><Col className='text-end fw-bolder'>{`${balance} сум`}</Col></Row>
        </Alert>
        </Col>
        <Col lg="8" xs="8">
          <Alert variant="dark">
            <Alert.Heading>Бонусная карта</Alert.Heading>
            <Image src='/img/barcode.svg' fluid alt='' />
          </Alert>  
        </Col>
      </Row>
    </>
  );
}
export default BonusCard;