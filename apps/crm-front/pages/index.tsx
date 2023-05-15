import { NextPage } from 'next';
import Container from 'react-bootstrap/Container';
import { L10n } from '@syncfusion/ej2-base';
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
import { AuthState, setAcceptTerms, setAuthState, setRememberMe, setTokens, setUser, useAuth } from '../store/authSlice';
import { setCurrentLang } from '../store/langSlice';
import Chat from '../components/utils/chat';
import Authorize from '../components/authorize/authorize';
import { postLogin, postOrganization } from '../data/fetch/integration';
import Finish from '../components/authorize/finish_registration/finish';
import { Col, Row, Spinner } from 'react-bootstrap';
import { sf } from '../data/localization/sf';

L10n.load(sf);

const Index: NextPage = () =>  {
  const auth = useSelector(useAuth) as AuthState;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState({expanded: false});
  const [left, setLeft] = useState(64);
  const [content, setContent] = useState('dashboard');
  const [lang, setLang] = useState('ru');
  const [editIndex, setEditIndex] = useState(-1);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [org, setOrg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getOrg = async () => {
    postOrganization(auth.authToken).then((res) => {
      if (res) {
        if (res.data.ok) {
          setOrg(res.data.org);
        }
      } else {
        dispatch(setAuthState(false));
        dispatch(setRememberMe(false));
        dispatch(setTokens({
          authToken:'', 
          refreshToken:''
        }));
        dispatch(setAcceptTerms(false));
      }
      setIsLoading(true);
    });
  }

  const checkAuth = async () => {
    if (login !== '' && password !== '') {
      const user = await postLogin(
        login, 
        password
      );
      if (user) {
        dispatch(setUser(user.data.user));
        dispatch(setAuthState(true));
        dispatch(setRememberMe(true));
        dispatch(setTokens({
          authToken:user.data.authToken, 
          refreshToken:user.data.refreshToken
        }));
        // dispatch(setSmsCode('123'));
        dispatch(setAcceptTerms(true));
        postOrganization(user.data.authToken).then((res) => {
          if (res) {
            if (res.data.ok) {
              setOrg(res.data.org);
            }
          } else {
            dispatch(setAuthState(false));
            dispatch(setRememberMe(false));
            dispatch(setTokens({
              authToken:'', 
              refreshToken:''
            }));
            dispatch(setAcceptTerms(false));
          }
          setIsLoading(true);
        });
      }
    }
  }

  const getContent = () => {
    if (isLoading){
      if (org) {
        switch (content) {
          case 'dashboard':
            return <DashBoardMain org={org?.title} />;
          case 'contracts':
            return <Contracts />;
          case 'tasks':
            return <Tasks />;
          case 'contacts':
            return <Contacts />;
          case 'list/contacts':
            return <Contacts />;
          case 'list/customers':
            return <Customers />;
          case 'list/files':
            return <Files setEditIndex={setEditIndex} />;
          case 'email':
            return <MailBox />;
          case 'bi':
            return <BI />;
          case 'settings':
            return <Settings />;
        } 
      } else {
        return <Finish setIsLoading={setIsLoading} getOrg={getOrg} />;
      }
    } else {
      return (
        <>
          <Container 
            className='w-100 h-100 d-flex justify-content-center align-items-center'
            style={{minHeight:'100vh'}}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        </>
      );
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
  }, [lang, dispatch]);

  useEffect(() => {
    if (auth.authState) {
      if (!org){
        getOrg();
      }
    }
  }, [])

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
                <TopBar expanded={expanded['expanded']} addCommand={content} editIndex={editIndex} setEditIndex={setEditIndex} org={org?.title} />
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
