import { AppType } from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'react-bootstrap';
import '../styles/styles.css';
import '../styles/fonts.css';
import { wrapper } from "../store/store";
import {Provider} from 'react-redux';
import dynamic from 'next/dynamic';
import BackOnTop from '../components/utils/back-on-top';
import Chat from '../components/utils/chat';
import { registerLicense } from '@syncfusion/ej2-base';
import { useEffect } from 'react';

const CustomApp: AppType = ({ Component, pageProps }: AppProps) => {
  const {store} = wrapper.useWrappedStore(pageProps);
  useEffect(() => {
    registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQl5hTn5bdkJiWnlZcHA=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSX1RcUVrWXhfc3NRRmQ=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJjUX9ZcXddRGVY;MTQ4MzU4MUAzMjMxMmUzMTJlMzMzNUJnSDVJbXZqODU4NVB5QWV1aXJjMFVFMENtNWhhT2NJdy9ydXMrMFlObmM9;MTQ4MzU4MkAzMjMxMmUzMTJlMzMzNW9HWW1TTkZnOG1aOVR3YndRTmJHZ2xZdVFycjYzWm1FS2pXVkVZSDlDQjg9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUdkWXded3VRRGZfWA==;MTQ4MzU4NEAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9;MTQ4MzU4NUAzMjMxMmUzMTJlMzMzNVZRUERQZEljR1lVKzZoUk5GL1VsUkpKNi9ZUDVFVjBLaC9oQ3kxSDdleDA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJjUX9ZcXBWRWhV;MTQ4MzU4N0AzMjMxMmUzMTJlMzMzNUJSWWIrMGhjL0lqclFGNHM5MVl6SE1OSmVwZEpjc3VoTmptU1dnSHZISFE9;MTQ4MzU4OEAzMjMxMmUzMTJlMzMzNVlvcnFjdkY1Q0VVRHF6aWJ3SkFyZlE1WmZldGJHTnNHT1ZwM2FOcmpCQTQ9;MTQ4MzU4OUAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9');
  }, []);
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
            <Chat />
          </ThemeProvider>
        </Provider>
      </>
  );
}

export default dynamic(() => Promise.resolve(CustomApp), {
  ssr: false,
});
