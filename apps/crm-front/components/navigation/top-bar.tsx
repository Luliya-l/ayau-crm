import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectLangState } from 'apps/crm-front/store/langSlice';

const TopBar = ({msg = '65 компаний', addCommand='add-company', lang = 'ru'}): JSX.Element => {
  const langs = useSelector(selectLangState);

  return (
    <>
      <Container fluid className='top-bar position-absolute top-0 w-100 m-0 p-0'>
        <Row className='d-flex align-items-center w-100 top-menu bg-light'>
          <Col lg={2} xs={2}  role='button' className='py-2'>
            <span className='text-uppercase'>{langs[lang].params.contacts}</span>
          </Col>
          <Col lg={4} xs={4} className=''>
            <InputGroup className="my-2">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control aria-label="Search" placeholder={langs[lang].params.search} />
            </InputGroup>
          </Col>
          <Col lg={2} xs={2} className='d-flex justify-content-center'>
            <span className='fs-6'>{msg}</span>
          </Col>
          <Col lg={1} xs={1} className='d-flex justify-content-center'>
            <i className="bi bi-three-dots"></i>
          </Col>
          <Col lg={3} xs={3}>
            <Button variant='all-orange' className='my-2 py-3 text-uppercase'>
              <i className="bi bi-plus-lg me-1"></i>
              {langs[lang].params[addCommand]}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TopBar;