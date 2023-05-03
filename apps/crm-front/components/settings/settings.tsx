import { Container, Form, Tabs } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { registerLicense } from "@syncfusion/ej2-base";
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setAcceptTerms, setAuthState, setRememberMe, setTokens, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef, useState } from "react";
import { Organization, User } from 'apps/crm-front/specs/custom-types';
import { postGetProfile, postOrganization } from 'apps/crm-front/data/fetch/integration';

const Settings = ({lang='ru'}) => {
  registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQl5hTn9Tc0RnXXxeeXQ=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSX1RcURjXH5adHdXQmA=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBWRWhc;MTQ4NjE2MEAzMjMxMmUzMTJlMzMzNUJnSDVJbXZqODU4NVB5QWV1aXJjMFVFMENtNWhhT2NJdy9ydXMrMFlObmM9;MTQ4NjE2MUAzMjMxMmUzMTJlMzMzNW9HWW1TTkZnOG1aOVR3YndRTmJHZ2xZdVFycjYzWm1FS2pXVkVZSDlDQjg9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUdkWH9bcXBRQmFeUQ==;MTQ4NjE2M0AzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9;MTQ4NjE2NEAzMjMxMmUzMTJlMzMzNVZRUERQZEljR1lVKzZoUk5GL1VsUkpKNi9ZUDVFVjBLaC9oQ3kxSDdleDA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBQR2Bc;MTQ4NjE2NkAzMjMxMmUzMTJlMzMzNUJSWWIrMGhjL0lqclFGNHM5MVl6SE1OSmVwZEpjc3VoTmptU1dnSHZISFE9;MTQ4NjE2N0AzMjMxMmUzMTJlMzMzNVlvcnFjdkY1Q0VVRHF6aWJ3SkFyZlE1WmZldGJHTnNHT1ZwM2FOcmpCQTQ9;MTQ4NjE2OEAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9');

  const auth = useSelector(useAuth) as AuthState;

  const dispatch = useDispatch();

  const [profile, setProfile] = useState({} as User);
  const [org, setOrg] = useState({} as Organization);

  const onChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    postGetProfile(auth.authToken).then((res) => {
      setProfile(res.data.profile as User);
    }).catch((err) => {
      console.log(err);
    });
    postOrganization(auth.authToken).then((res) => {
      setOrg(res.data.org as Organization);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Container fluid className='mt-4'>
      <Tab.Container id="left-tabs-example" 
        defaultActiveKey="profile" 
        onSelect={(select) => console.log(select)}
      >
        <Row className='bg-light py-3 pt-4'>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column px-2">
              <Nav.Item>
                <Nav.Link eventKey="profile">{'Профиль'}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="general">{'Общие настройки'}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="payment">{'Счет и оплата'}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="users">{'Пользователи'}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="chats">{'Чаты и мессенджеры'}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="exit"
                  onClick={() => {
                    dispatch(setAuthState(false));
                    dispatch(setRememberMe(false));
                    dispatch(setTokens({
                      authToken:'', 
                      refreshToken:''
                    }));
                    dispatch(setAcceptTerms(false));
                  }}
                >{'Выход'}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                  <Container fluid className='text-black'>
                    <h2>{'Профиль'}</h2>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                          <Form.Label column sm="2">
                              {'Ф.И.О.'}
                          </Form.Label>
                          <Col sm="10">
                          <Form.Control 
                              type="name" 
                              name="name"
                              value={profile?.name} 
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
                              value={profile?.phone} 
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
                                  value={profile?.email} 
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
                                  name="gender"
                                  value={profile?.gender} 
                                  onChange={(e) => onChange(e)}
                              >
                                  <option value="1">Мужской</option>
                                  <option value="2">Женский</option>
                              </Form.Select>
                          </Col>
                      </Form.Group>
                  </Container>
                  <Container fluid className='text-black'>
                    <h2>{'Организация'}</h2>
                    <Form.Group as={Row} className="mb-3" controlId="title">
                          <Form.Label column sm="2">
                              {'Наименование'}
                          </Form.Label>
                          <Col sm="10">
                              <Form.Control 
                                  type="title" 
                                  name="title"
                                  value={org?.title} 
                                  placeholder="ТОО Ладья" 
                                  onChange={(e) => onChange(e)} 
                              />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="activity">
                          <Form.Label column sm="2">
                              {'Род деятельности'}
                          </Form.Label>
                          <Col sm="10">
                              <Form.Control 
                                  as={'textarea'}
                                  rows={5} 
                                  name="activity"
                                  value={org?.activity} 
                                  onChange={(e) => onChange(e)} 
                              />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="description">
                          <Form.Label column sm="2">
                              {'Примечание'}
                          </Form.Label>
                          <Col sm="10">
                              <Form.Control 
                                  as={'textarea'} 
                                  rows={5}
                                  name="description"
                                  value={org?.description} 
                                  onChange={(e) => onChange(e)} 
                              />
                          </Col>
                      </Form.Group>
                  </Container>
                  <Container fluid className='text-black'>
                    <Tabs
                      defaultActiveKey="filials"
                      id="fill-tab-example"
                      className="mb-3"
                      fill
                    >
                      <Tab eventKey="filials" title={'Филиалы'}>
                        <Container fluid className='text-black'>
                          
                        </Container>
                      </Tab>
                      <Tab eventKey="users" title={'Пользователи'}>
                        Tab content for Profile
                      </Tab>
                    </Tabs>
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="general">
                  <Container fluid className='text-black'>
                      
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="payment">
                  <Container fluid className='text-black'>
                      
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                  <Container className='text-black'>
                      
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="chats">
                  <Container className='text-black'>
                      
                  </Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Settings;