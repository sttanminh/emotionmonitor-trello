import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://p.trellocdn.com/power-up.min.js"></script>
      </Head>
      <body>  
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
