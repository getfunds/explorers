import React from 'react';
import Head from 'next/head';
import Collection from '../../components/Collection';
import Layout from './layout';

export default function Collections() {
  return (
    <div>
      <Head>
        <title>Collections Data</title>
      </Head>
      <Layout>
      <Collection />
      </Layout>
    </div>
  );
}
