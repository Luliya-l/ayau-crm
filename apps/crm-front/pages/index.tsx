import { NextPage } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { Fade } from 'react-bootstrap';
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

const Index: NextPage = () =>  {
  const [expanded, setExpanded] = useState({expanded: false});
  const [left, setLeft] = useState(64);
  const [content, setContent] = useState('dashboard');

  const getContent = () => {
    switch (content) {
      case 'dashboard':
        return <DashBoardMain />;
      case 'contracts':
        return <Contracts />;
      case 'tasks':
        return <Tasks />;
      case 'contacts':
        return <Contacts />;
      case 'list':
        return <Customers />;
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

  return (
    <>
      <Row>
        <Col lg={expanded ? 2 : 1} xs={expanded ? 2 : 1} style={{width:`${left}px`}}>
          <SideMenu setExpanded={setExpanded} setContent={setContent} />
        </Col>
        <Col>
          <Container fluid className='w-100'>
            <Row style={{minHeight:'65px'}}>
              <Col className='position-relative'>
                <TopBar expanded={expanded['expanded']} addCommand={content} />
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
