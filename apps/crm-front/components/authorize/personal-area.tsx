import { useEffect, useState } from 'react';
import { Image, Button, ButtonGroup, Col, Container, Form, Nav, Row, Tab, Table, ToggleButton } from 'react-bootstrap';
import BonusCard from './bonus-card';
import DateTimePicker from '../spec/datetime-picker';
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState, setTokens, setUser } from 'apps/ys-site/store/authSlice';
import { useRouter } from 'next/router';
import { postRefresh, putUser } from 'apps/ys-site/data/fetching/auth';
import { getOrderHistory } from 'apps/ys-site/data/fetching/order';

const PersonalArea = (): JSX.Element => {
const authState = useSelector(selectAuthState);

const [gender, setGender] = useState(authState?.user?.gender ?? "male");
const [phone, setPhone] = useState(authState?.user?.phone ?? "");
const [name, setName] = useState(authState?.user?.name ?? "");

const [orders, setOrders] = useState([]);

const dispatch = useDispatch();
const router = useRouter();

const [birthday, setBirthday] = useState<Date>(() => new Date());

const creationStatus = {
  "Error" : "Отмена",
  "InProgress" : "В работе",
  "Success" : "Создан"
}

useEffect(() => {
  getOrderHistory(authState.authToken).then((res) => {
    setOrders(res?.ordersByOrganizations[0]?.orders ?? [])
  })
}, [authState])

  return (
    <>
      <Container
          className={`nav-bar my-2 py-4 w-100`}
      >
        <Row  className='my-5 pt-5'>
          <Col lg="12" xs="12" className="text-center text-module">
            <h1>Личный кабинет</h1>
          </Col>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className='my-1'>
                  <Nav.Link eventKey="first" className='py-4 text-uppercase text-center'>Профиль</Nav.Link>
                </Nav.Item>
                <Nav.Item className='my-1'>
                  <Nav.Link eventKey="second" className='py-4 text-uppercase text-center'>история заказов</Nav.Link>
                </Nav.Item>
                <Nav.Item className='my-1'>
                  <Nav.Link eventKey="exit" className='py-4 text-uppercase text-center' onClick={() => {
                    dispatch(setAuthState(false));
                    router.push('/');
                  }}>выход</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Container>
                    <BonusCard />
                    <Row>
                      <Col lg="6" xs="6">
                        <h2>Ваш телефон*</h2>
                        <Form.Control
                          type="phone"
                          id="phone"
                          aria-describedby="phoneNumberHelpBlock"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+998"
                        />
                      </Col>
                      <Col lg="6" xs="6">
                        <p>
                          * Обязательные для заполнения поля нужны намдля того, чтобы с вами сязаться.
                        </p>
                        <p>
                          Указав дату рождения, вы сможете участвовать в дополнительных акциях и получать ещё больше бонусов!
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" xs="6">
                        <h2>Имя</h2>
                        <Form.Control
                          type="name"
                          id="name"
                          aria-describedby="namerHelpBlock"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Имя"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" xs="6">
                        <h2>Пол</h2>
                        <ButtonGroup className="w-100 rouded">
                          <ToggleButton 
                            id={`radio-1`}
                            type="radio"
                            variant="outline-switch"
                            className="text-uppercase"
                            value={`0`}
                            checked={"male" === gender}
                            onChange={(e) => setGender("male")}
                          >
                            {'мужской'}
                          </ToggleButton>
                          <ToggleButton 
                            id={`radio-2`}
                            type="radio"
                            variant="outline-switch"
                            className="text-uppercase"
                            value={`1`}
                            checked={"female" === gender}
                            onChange={(e) => setGender("female")}
                          >
                            {'женский'}
                          </ToggleButton>
                        </ButtonGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" xs="6">
                        <h2>Дата рождения*</h2>
                      </Col>
                    </Row>
                    <DateTimePicker birthday={birthday} setBirthday={setBirthday} />
                    <Row>
                      <Col lg="6" xs="6">
                        <Button variant="all-orange" className="w-100 text-uppercase" onClick={() => {
                          putUser(authState?.authToken, phone, name, gender, new Date(birthday.getTime() - (birthday.getTimezoneOffset() * 60000 )).toISOString()).then((res) => {
                            if (!res) {
                              postRefresh(authState?.refreshToken).then((res) => {
                                if (res) {
                                  dispatch(setAuthState(true));
                                  dispatch(setTokens(res));
                                  putUser(res.authToken, phone, name, gender, new Date(birthday.getTime() - (birthday.getTimezoneOffset() * 60000 )).toISOString()).then((res) => {
                                    if (res) {
                                      dispatch(setUser(res?.user))
                                    }
                                  })
                                } else {
                                  dispatch(setAuthState(false));
                                  router.push('/');
                                }
                              })
                            } else {
                              dispatch(setUser(res?.user))
                            }
                          })
                        }}>
                          сохранить
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <BonusCard />
                  <Table striped="columns">
                    <thead>
                      <tr>
                        <th>Дата</th>
                        <th>Номер заказа</th>
                        <th>Статус</th>
                        <th>Сумма, сум</th>
                        <th>Бонусы +</th>
                        <th>Бонусы -</th>
                        <th></th>
                        <th>Обновить статус</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orders.map((item : any) => {
                      return (
                          <tr key={item.id}>
                            <td>{new Date(item?.timestamp).toISOString().split("T")[0]}</td>
                            <td>{item?.order?.number ?? "-"}</td>
                            <td>{creationStatus[item.creationStatus] ?? ""}</td>
                            <td>{item?.order?.payments[0]?.sum ?? "-"}</td>
                            <td>{item?.order?.sum ?? "0"}</td>
                            <td>{item?.order?.payments[1]?.sum ?? "0"}</td>
                            <td>
                              <Image src='/img/eye.svg' alt='' />
                            </td>
                            <td>
                              <Button 
                                size="lg" 
                                variant="outline-cart" 
                                className={`w-100 text-uppercase`}
                                onClick={() => console.log('повторить')}
                              >
                                повторить
                              </Button>
                            </td>
                          </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}
export default PersonalArea;