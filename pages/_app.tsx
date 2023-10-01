import '@/styles/globals.css'
import '../Components/style.css'
import Script from 'next/script';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}