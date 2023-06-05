import { AppType } from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/styles.css';
import '../styles/kanban.css';
import '../styles/chat.css';
import '../styles/fonts.css';
import { ThemeProvider } from 'react-bootstrap';

import { wrapper } from "../store/store";
import {Provider} from 'react-redux';
import dynamic from 'next/dynamic';
import BackOnTop from '../components/utils/back-on-top';
import { registerLicense } from "@syncfusion/ej2-base";

const CustomApp: AppType = ({ Component, pageProps }: AppProps) => {
  registerLicense('Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR11lSH5TcEFiUHpedg==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTH5Vd0VjX3tfeXJWQA==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtTcERjWXlacX1SQWY=;MTk0OTQ3N0AzMjMxMmUzMjJlMzNva1JpaDBPRklNSmN0MmpSQytGK2J5M3p4ZC9rdDV3NlU4aHhralkyc2o0PQ==;MTk0OTQ3OEAzMjMxMmUzMjJlMzNLemVPanlEc0ZPZWk0dWtpTGJnMmFNcHhQQ0t5SzB0RUJxNy9SQzB6VzZRPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdkNiWX9YdHZVRWlV;MTk0OTQ4MEAzMjMxMmUzMjJlMzNOZG5QN2hLMkVFbFpDanJueXpIdXNsVGJnZ28yT3lHSUZQNDRrNXk3OC8wPQ==;MTk0OTQ4MUAzMjMxMmUzMjJlMzNXbFdITEVDM0I4K3J0Z0syVmMyTW1SVFlqSzYzK3lTNlpNelJ3Mmx1RnBRPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtTcERjWXlacnVVQmE=;MTk0OTQ4M0AzMjMxMmUzMjJlMzNVK2tkRUhVNk4rNjByNVYxNXJtZ2M1NllmcGNQdTI4S1VCYmxXRmpqaEdJPQ==;MTk0OTQ4NEAzMjMxMmUzMjJlMzNGdjBUdXk0cWJpbHNrc3ROYVMyUCtOOFhTQnUzRHIzYmVkM05udmlrS0tJPQ==;MTk0OTQ4NUAzMjMxMmUzMjJlMzNOZG5QN2hLMkVFbFpDanJueXpIdXNsVGJnZ28yT3lHSUZQNDRrNXk3OC8wPQ==');

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
