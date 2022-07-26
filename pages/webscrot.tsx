import type { NextPage } from 'next';
import Script from 'next/script';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import fetch from 'node-fetch';

const WebScrot: NextPage = ({ apps }) => {
  return (
    <div className={styles.main}>
      <Script src="/main.js" type="module"></Script>
    </div>
  )
}

export default WebScrot;