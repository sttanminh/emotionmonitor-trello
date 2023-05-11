import '@/styles/globals.css'
import '../Components/Slider.css'
import "../Components/TextField.css";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
