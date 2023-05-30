import Head from 'next/head'
import Layout from './layout';
import Rich from '../../components/Rich'

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Solana Data Explorer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
      <Rich/>
    </div>
  );
}
