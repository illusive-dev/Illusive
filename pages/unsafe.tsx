import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextComponentType, NextPage, NextPageContext } from 'next'
import { IoChevronBack, IoAlertCircle } from 'react-icons/io5'
import styles from '../styles/Unsafe.module.css'

const ErrorPage: NextPage = () => {
  const Router = useRouter();

  console.log(Router)
  
  try {
    var error = JSON.parse(decodeURIComponent(Router.query['err']));
    console.log(error);
  } catch(e) {
    console.log(e)
    //console.log(Router.query['err'])
    var error = undefined;
  }

  function Return() {
    window.history.back
  }

  function Go() {
    location.href = Router.query['url']+"?safe"
  }

  setTimeout(function() {
    if (global.window&&error) {
      var root = window.document.querySelector('.'+styles.over);

      root.querySelector('h2').innerText = `Visiting (${new URL(error.threat.url).host}) May Harm Your Device`

      root.querySelector('p').innerHTML = `Illusive has blocked your access to this site for: <b>${error.threatType}</b>. If you wish, you can ignore this alert and continue to the target page.<br/><br/>[<a target="_blank" style="color:white;" href="https://developers.google.com/safe-browsing/v4/advisory">Safe Browsing by Google</a>]`
    };
  }, 1);
  
  return (
    <main>
      <div className={styles.main}>
        <Head>
          <title>Illusive | Error Unsafe</title>
          <meta name="description" content="Illusive | Gateway to Evading Censorship" />
          <meta name="theme-color" content="#565656" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:image" content="/favicon.ico" />
        </Head>
        <div className={styles.over}>
          <IoAlertCircle className={styles.icon}/>
          <h2>Visiting (example.com) May Harm Your Device</h2>
          <p>Illusive has blocked your access to this site for: <b>REASON</b>. If you wish, you can ignore this alert and continue to the target page.<br/><br/>[<a style={{color:'white'}} href="https://developers.google.com/safe-browsing/v4/advisory">Safe Browsing by Google</a>]</p>
          <div className={styles.bottom}>
            <button onClick={Return} className={styles.returnbtn}>Go Back</button>
            <button onClick={Go} className={styles.gobtn}>Continue</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage