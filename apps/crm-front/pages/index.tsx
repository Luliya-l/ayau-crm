import { NextPage } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import TopBar from '../components/navigation/top-bar';
import SideMenu from '../components/navigation/side-menu';
import DashBoardMain from '../components/dashboard/dashboardMain';
import Contracts from '../components/contracts/contracts';
import Tasks from '../components/tasks/tasks';
import Contacts from '../components/contacts/contacts';
import Customers from '../components/customers/customers';
import MailBox from '../components/mails/mails';
import BI from '../components/bi/buisines-inteligence';
import Settings from '../components/settings/settings';
import Files from '../components/files/files';
import { useDispatch, useSelector } from 'react-redux';
import { DB } from '../specs/custom-types';
import { useAPI } from '../store/apiSlice';
import { AuthState, setAcceptTerms, setAuthState, setRememberMe, setSmsCode, setTokens, setUser, useAuth } from '../store/authSlice';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

const Index: NextPage = () =>  {
  const api = useSelector(useAPI) as DB;
  const auth = useSelector(useAuth) as AuthState;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState({expanded: false});
  const [left, setLeft] = useState(64);
  const [content, setContent] = useState('dashboard');
  const [editIndex, setEditIndex] = useState(-1);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const checkAuth = () => {
    if (login !== '' && password !== '') {
      const idx = api.users.findIndex((user) => user.login === login && user.password === password);
      if (idx !== -1) {
        dispatch(setUser(api.users[idx]));
        dispatch(setAuthState(true));
        dispatch(setRememberMe(true));
        dispatch(setTokens({authToken:'', refreshToken:''}));
        dispatch(setSmsCode('123'));
        dispatch(setAcceptTerms(true));
      }
    }
  }

  const getContent = () => {
    switch (content) {
      case 'dashboard':
        return <DashBoardMain />;
      case 'contracts':
        return <Contracts setEditIndex={setEditIndex} />;
      case 'tasks':
        return <Tasks setEditIndex={setEditIndex} />;
      case 'contacts':
        return <Contacts setEditIndex={setEditIndex} />;
      case 'list/contacts':
        return <Contacts setEditIndex={setEditIndex} />;
      case 'list/customers':
        return <Customers setEditIndex={setEditIndex} />;
      case 'list/files':
        return <Files setEditIndex={setEditIndex} />;
      case 'email':
        return <MailBox />;
      case 'bi':
        return <BI />;
      case 'settings':
        return <Settings />;
      default:
        return <DashBoardMain />;
    }
  }
  
  useEffect(() => {
    if (expanded['expanded']) {
      setLeft(240);
    } else {
      setLeft(64);
    }
  }, [expanded]);

  if (!auth.authState) {
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
              <Button variant="events" size='lg' className='px-5' onClick={() => checkAuth()}>{'Войти'}</Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col lg={expanded ? 2 : 1} xs={expanded ? 2 : 1} style={{width:`${left}px`}}>
          <SideMenu setExpanded={setExpanded} setContent={setContent}  />
        </Col>
        <Col>
          <Container fluid className='w-100'>
            <Row style={{minHeight:'65px'}}>
              <Col className='position-relative'>
                <TopBar expanded={expanded['expanded']} addCommand={content} editIndex={editIndex} setEditIndex={setEditIndex} />
              </Col>
            </Row>
            <Row>
              <Col>
                {getContent()}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {/* <Splash show={isLoading.includes(false)} /> */}
    </>
  );
}

export default Index;
