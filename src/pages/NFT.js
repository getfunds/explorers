import React from 'react';
import Head from 'next/head';
import NFT from '../../components/AddressInput';
import Layout from './layout';

export default function Collections() {
  return (
    <div>
      <Head>
        <title>NFT Data</title>
      </Head>
      <Layout>
      <NFT />
      </Layout>
    </div>
  );
}
