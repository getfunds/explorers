import React from 'react';
import Head from 'next/head';
import Token from '../../components/TokenList';
import Layout from './layout';

export default function Collections() {
  return (
    <div>
      <Head>
        <title>Token Data</title>
      </Head>
      <Layout>
      <Token />
      </Layout>
    </div>
  );
}
