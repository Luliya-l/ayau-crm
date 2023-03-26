import { AppType } from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Col, Container, Row, ThemeProvider } from 'react-bootstrap';
import '../styles/styles.css';
import '../styles/fonts.css';
import { wrapper } from "../store/store";
import {Provider} from 'react-redux';
import dynamic from 'next/dynamic';
import BackOnTop from '../components/utils/back-on-top';
import SideMenu from '../components/navigation/side-menu';
import Chat from '../components/utils/chat';
import TopBar from '../components/navigation/top-bar';
import { useEffect, useState } from 'react';

const CustomApp: AppType = ({ Component, pageProps }: AppProps) => {
  const {store} = wrapper.useWrappedStore(pageProps);
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
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Provider store={store}>
          <Row>
            <Col lg={expanded ? 2 : 1} xs={expanded ? 2 : 1} style={{width:`${left}px`}}>
              <SideMenu setExpanded={setExpanded} />
            </Col>
            <Col>
              <Container fluid className='w-100'>
                <Row>
                  <Col className='position-relative'>
                    <TopBar />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ThemeProvider
                      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                      minBreakpoint="xxs"
                    >
                      <Component {...pageProps} />
                      <BackOnTop />
                      <Chat />
                    </ThemeProvider>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          
        </Provider>
      </>
  );
}

export default dynamic(() => Promise.resolve(CustomApp), {
  ssr: false,
});
