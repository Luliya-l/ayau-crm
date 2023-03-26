import { NextPage } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { Fade } from 'react-bootstrap';

const Index: NextPage = () =>  {
  const [isLoading, setLoading] = useState([false,false]);
  const setIsLoading = (state, index) => {
    const s = [...isLoading];
    s[index] = state;
    setLoading([...s]);
  }

  useEffect(() => {
    if (isLoading.includes(false)){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      <Fade in={!isLoading.includes(false)}>
        <Container>

          {/* content */}
          <Row id='comp-content' className='mx-0'>
            <Col className='px-0'>
              <Container fluid 
                className='bg-light rounded-ys my-1 main-container position-relative'
              >

              </Container>
            </Col>
          </Row>
          {/* footer */}
          <Row id='comp-footer' className='footer text-blue-gray m-0 m-sm-auto'>
            <Col className='mb-4 px-0'>
              <Container fluid className='footer-body'>

              </Container>
            </Col>
          </Row>
        </Container>
      </Fade>
      {/* <Splash show={isLoading.includes(false)} /> */}
    </>
  );
}

export default Index;
