import { Button, Container, Form, Tabs } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setAcceptTerms, setAuthState, setRememberMe, setTokens, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useState } from "react";
import { Langs, Organization, User } from 'apps/crm-front/specs/custom-types';
import { postGetProfile, postOrganization, postSetProfile } from 'apps/crm-front/data/fetch/integration';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import Filials from './filials';
import Users from './users';
import { GetParams } from 'apps/crm-front/specs/custom-service';

const Settings = ({lang='ru'}) => {
  const auth = useSelector(useAuth) as AuthState;
  const localization = useSelector(selectLangState) as Langs;

  const dispatch = useDispatch();

  const [profile, setProfile] = useState({} as User);
  const [org, setOrg] = useState({} as Organization);

  const onChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  }

  const onChangeOrg = (e) => {
    setOrg({
      ...org,
      [e.target.name]: e.target.value
    });
  }

  const setProfileData = () => {
    postSetProfile(profile, auth.authToken).then((res) => {
      console.log(res);
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
                <Nav.Link eventKey="profile">{GetParams('profile', localization)}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="general">{GetParams('settingEmails', localization)}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                {/* <Nav.Link eventKey="payment">{'Счет и оплата'}</Nav.Link> */}
              </Nav.Item>
              <Nav.Item>
                {
                  auth.user?.role === 'user' ?
                  <Nav.Link eventKey="users">{GetParams('users', localization)}</Nav.Link>
                  : null
                }
              </Nav.Item>
              <Nav.Item>
                {/* <Nav.Link eventKey="chats">{'Чаты и мессенджеры'}</Nav.Link> */}
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
                >{GetParams('exit', localization)}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                  <Container fluid className='text-black'>
                    <h2>{GetParams('profile', localization)}</h2>
                    <Form.Group as={Row} className="mb-3" controlId="responsible">
                          <Form.Label column sm="2">
                              {GetParams('lastName', localization)}
                          </Form.Label>
                          <Col sm="10">
                          <Form.Control 
                              type="name" 
                              name="name"
                              value={profile?.name ?? ''} 
                              placeholder="Ф.И.О." 
                              onChange={(e) => onChange(e)} 
                          />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="phone">
                          <Form.Label column sm="2">
                              {GetParams('worknumber', localization)}
                          </Form.Label>
                          <Col sm="10">
                          <Form.Control 
                              type="phone" 
                              name="phone"
                              value={profile?.phone ?? ''} 
                              placeholder="777 777 77 77" 
                              onChange={(e) => onChange(e)} />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="email">
                          <Form.Label column sm="2">
                              {GetParams('email', localization)}
                          </Form.Label>
                          <Col sm="10">
                              <Form.Control 
                                  type="email" 
                                  name="email"
                                  value={profile?.email ?? ''} 
                                  placeholder="email@example.com" 
                                  onChange={(e) => onChange(e)} 
                              />
                          </Col>
                      </Form.Group>
                      {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                          <Form.Label column sm="2">
                              {'Роль'}
                          </Form.Label>
                          <Col sm="10">
                              <Form.Select 
                                  name="role"
                                  value={profile?.role ?? 'head'} 
                                  onChange={(e) => onChange(e)}
                              >
                                  <option value="head">Руководитель</option>
                                  <option value="manager">Менеджер</option>
                              </Form.Select>
                          </Col>
                      </Form.Group> */}
                  </Container>
                  {
                    auth.user?.role === 'user' ?
                    <>
                      <Container fluid className='text-black'>
                      <h2>{GetParams('organization', localization)}</h2>
                      <Form.Group as={Row} className="mb-3" controlId="title">
                            <Form.Label column sm="2">
                                {GetParams('name', localization)}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    type="text" 
                                    name="title"
                                    value={org?.title ?? ''} 
                                    placeholder="ТОО " 
                                    onChange={(e) => onChangeOrg(e)} 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="activity">
                            <Form.Label column sm="2">
                                {GetParams('occupation', localization)}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    as={'textarea'}
                                    rows={5} 
                                    name="activity"
                                    value={org?.activity ?? ''} 
                                    onChange={(e) => onChangeOrg(e)} 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="description">
                            <Form.Label column sm="2">
                                {GetParams('notes', localization)}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    as={'textarea'} 
                                    rows={5}
                                    name="description"
                                    value={org?.description ?? ''} 
                                    onChange={(e) => onChangeOrg(e)} 
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
                        <Tab eventKey="filials" title={GetParams('filial', localization)}>
                          <Container fluid className='text-black'>
                            <Filials />
                          </Container>
                        </Tab>
                        <Tab eventKey="users" title={GetParams('users', localization)}>
                          <Container fluid className='text-black'>
                            <Users />
                          </Container>
                        </Tab>
                      </Tabs>
                    </Container>
                    </>
                    : null
                  }
              </Tab.Pane>
              <Tab.Pane eventKey="general">
                  <Container fluid className='text-black'>
                    <Form.Group as={Row} className="mb-3" controlId="title">
                      <Form.Label column sm="2">
                          {'email'}
                      </Form.Label>
                      <Col sm="10">
                          <Form.Control 
                              type="text" 
                              name="email"
                              value={profile?.email ?? ''} 
                              placeholder="ТОО Ладья" 
                              disabled
                              onChange={(e) => onChange(e)} 
                          />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="title">
                      <Form.Label column sm="2">
                          {GetParams('passwordemail', localization)}
                      </Form.Label>
                      <Col sm="10">
                          <Form.Control 
                              type="password" 
                              name="email_password"
                              value={profile?.email_password ?? ''} 
                              onChange={(e) => onChange(e)} 
                          />
                      </Col>
                    </Form.Group>
                    <Button 
                        onClick={() => setProfileData()} 
                        variant='outline-success'
                    >
                        {GetParams('save', localization)}
                    </Button>
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="payment">
                  <Container fluid className='text-black'>
                      
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                  <Container className='text-black'>
                    <Users />
                  </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="chats">
                  <Container className='text-black'>
                      
                  </Container>
              </Tab.Pane>
            </Tab.Content>
            <Row style={{minHeight:'30vh'}}>
              <Col>&nbsp;</Col>
            </Row>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Settings;