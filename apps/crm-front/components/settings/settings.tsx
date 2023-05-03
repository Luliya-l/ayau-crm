import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';

import { Container, Form, Tabs } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setAcceptTerms, setAuthState, setRememberMe, setTokens, useAuth } from 'apps/crm-front/store/authSlice';
import { useEffect, useRef, useState } from "react";
import { Langs, Organization, User } from 'apps/crm-front/specs/custom-types';
import { postGetProfile, postOrganization } from 'apps/crm-front/data/fetch/integration';
import { setLoading, useLoadingState } from 'apps/crm-front/store/loadingState';
import { selectLangState } from 'apps/crm-front/store/langSlice';

const baseURL = "https://crm-backend-two.vercel.app/";
// const baseURL = "http://localhost:8000/";

const Settings = ({lang='ru'}) => {
  const auth = useSelector(useAuth) as AuthState;
  const loadingState = useSelector(useLoadingState);
  const localization = useSelector(selectLangState) as Langs;

  const dispatch = useDispatch();

  const getParams = (param: string) => {
    return localization.langs[localization.currentLang].params[param];
  }

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

  const grid = useRef(null);

    const dateFormat = { type: 'dateTime', format: 'yyyy-MM-dd' };

    const taskDS: DataManager = new DataManager({
        adaptor: new UrlAdaptor(),
        updateUrl: `${baseURL}crm/tasks/update`,
        insertUrl: `${baseURL}crm/tasks/set`,
        removeUrl: `${baseURL}crm/tasks/delete`,
        url: `${baseURL}crm/tasks/get`,
        crossDomain: true,
        requestType: 'POST',
        headers: [{ Authorization: `Bearer ${auth.authToken}` }]
    });

    const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    const toolbarOptions: ToolbarItems[] = ['Search', 'Edit', 'Delete', 'Update', 'Cancel'];
    
    useEffect(() => {
        grid.current.refresh();
        dispatch(setLoading(false));
    }, [loadingState.loading, dispatch]);

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
                  <Container fluid className='text-black d-none'>
                    <Tabs
                      defaultActiveKey="filials"
                      id="fill-tab-example"
                      className="mb-3"
                      fill
                    >
                      <Tab eventKey="filials" title={'Филиалы'}>
                        <Container fluid className='text-black'>
                        <GridComponent 
                            ref={grid}
                            dataSource={taskDS}
                            allowPaging={false}
                            pageSettings={{ pageSize: 5 }}
                            editSettings={editOptions}
                            toolbar={toolbarOptions}
                        >
                            <ColumnsDirective>
                              <ColumnDirective 
                                  field='id' width='100' 
                                  textAlign="Right" isPrimaryKey={true} 
                                  visible={false}
                              />
                              <ColumnDirective 
                                  field='created_at' 
                                  headerText={getParams('execution_date').toUpperCase()} 
                                  width='100' 
                                  format={dateFormat}
                              />
                              <ColumnDirective 
                                  field='responsible' 
                                  headerText={getParams('responsible').toUpperCase()} 
                                  width='100'
                              />
                              <ColumnDirective 
                                  field='contract_id' 
                                  headerText={getParams('object').toUpperCase()} 
                                  width='100' 
                              />
                              <ColumnDirective 
                                  field='task_type' 
                                  headerText={getParams('taskType').toUpperCase()} 
                                  width='100' 
                                  format="C2" 
                              />
                              <ColumnDirective 
                                  field='text' 
                                  headerText={getParams('taskDescription').toUpperCase()} 
                                  width='100'
                              />
                              <ColumnDirective 
                                  field='result' 
                                  headerText={getParams('result').toUpperCase()} 
                                  width='100'
                              />
                            </ColumnsDirective>
                            <Inject services={[Edit, Toolbar]} />
                          </GridComponent>
                        </Container>
                      </Tab>
                      <Tab eventKey="users" title={'Пользователи'}>
                        <Container fluid className='text-black'>
                          
                        </Container>
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