/* eslint-disable react/display-name */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { Container } from 'react-bootstrap';

export default class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
          ></link>
          <Script
            src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
            crossOrigin="anonymous"
          ></Script>

          <Script
            src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
            crossOrigin="anonymous"
          ></Script>

          <Script
            src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossOrigin="anonymous"
          ></Script>
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />
        </Head>
        <body className=''>
          <Container fluid={true} className="w-100 m-0 p-0">
            <Main />
          </Container>
          <NextScript />
        </body>
      </Html>
    );
  }
}
