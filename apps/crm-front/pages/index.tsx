import { NextPage } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { Fade } from 'react-bootstrap';
import TopBar from '../components/navigation/top-bar';
import SideMenu from '../components/navigation/side-menu';
import DashBoardMain from '../components/dashboard/dashboardMain';

const Index: NextPage = () =>  {
  const [expanded, setExpanded] = useState({expanded: false});
  const [left, setLeft] = useState(64);

  useEffect(() => {
    if (expanded['expanded']) {
      setLeft(240);
    } else {
      setLeft(64);
    }
    console.log('expanded', expanded['expanded']);
  }, [expanded]);

  return (
    <>
      <Row>
        <Col lg={expanded ? 2 : 1} xs={expanded ? 2 : 1} style={{width:`${left}px`}}>
          <SideMenu setExpanded={setExpanded} />
        </Col>
        <Col>
          <Container fluid className='w-100'>
            <Row style={{minHeight:'67px'}}>
              <Col className='position-relative'>
                <TopBar />
              </Col>
            </Row>
            <Row>
              <Col>
                <DashBoardMain />
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
