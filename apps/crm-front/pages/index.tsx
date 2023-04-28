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
import { setCurrentLang } from '../store/langSlice';
import Chat from '../components/utils/chat';
import Authorize from '../components/authorize/authorize';

const Index: NextPage = () =>  {
  const api = useSelector(useAPI) as DB;
  const auth = useSelector(useAuth) as AuthState;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState({expanded: false});
  const [left, setLeft] = useState(64);
  const [content, setContent] = useState('dashboard');
  const [lang, setLang] = useState('ru');
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
    }
  }
  
  useEffect(() => {
    if (expanded['expanded']) {
      setLeft(240);
    } else {
      setLeft(64);
    }
  }, [expanded]);

  useEffect(() => {
    dispatch(setCurrentLang(lang));
  }, [lang]);

  if (!auth.authState) {
    return (
      <Authorize setLogin={setLogin}  setPassword={setPassword} checkAuth={checkAuth} />
    );
  }

  return (
    <>
      <Row>
        <Col lg={expanded ? 2 : 1} xs={expanded ? 2 : 1} style={{width:`${left}px`}}>
          <SideMenu setExpanded={setExpanded} setContent={setContent} setLang={setLang} />
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
      <Chat />
      {/* <Splash show={isLoading.includes(false)} /> */}
    </>
  );
}

export default Index;
