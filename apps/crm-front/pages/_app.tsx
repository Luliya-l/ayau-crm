import { AppType } from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'react-bootstrap';
import '../styles/styles.css';
import '../styles/kanban.css';
import '../styles/fonts.css';
import { wrapper } from "../store/store";
import {Provider} from 'react-redux';
import dynamic from 'next/dynamic';
import BackOnTop from '../components/utils/back-on-top';

const CustomApp: AppType = ({ Component, pageProps }: AppProps) => {
  const {store} = wrapper.useWrappedStore(pageProps);
  
  return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Provider store={store}>
          <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
          >
            <Component {...pageProps} />
            <BackOnTop />
          </ThemeProvider>
        </Provider>
      </>
  );
}

export default dynamic(() => Promise.resolve(CustomApp), {
  ssr: false,
});
