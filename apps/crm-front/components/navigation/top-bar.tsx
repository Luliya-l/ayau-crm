import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectLangState } from 'apps/crm-front/store/langSlice';

const TopBar = ({lang = 'ru'}): JSX.Element => {
  const langs = useSelector(selectLangState);

  return (
    <>
      <Container fluid className='m-0 p-0'>
        <Row className='w-100 top-menu bg-light'>
          <Col lg={2} xs={2}>
            <span>{langs[lang].params.contacts}</span>
          </Col>
          <Col lg={8} xs={8}>
            <span></span>
          </Col>
          <Col lg={2} xs={2}>
            <span></span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TopBar;