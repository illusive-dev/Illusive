import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextComponentType, NextPage, NextPageContext } from 'next'
import { IoChevronBack, IoHomeOutline } from 'react-icons/io5'
import styles from '../styles/404.module.css'

const ErrorPage: NextPage = () => {
  const Router = useRouter();

  const historyBack = () => {
    if (global.window) {
      window.history.back();
    }
  }
  
  return (
    <main>
      <div className={styles.main}>
      <Head>
        <title>Illusive | Not Found</title>
        <meta name="description" content="Illusive | Gateway to Evading Censorship" />
        <meta name="theme-color" content="#565656" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
        <div className={styles['main-box']}>
          <div className={styles.eyes}>
            <div className={styles['eye-1']}>200</div>
            <div className={styles['eyes-arrow']}>
            </div>
            <div className={styles['eye-2']}>404</div>
          </div>
          <div className={styles['mouth-over']}>
            <div className={styles['mouth']}><IoChevronBack className={styles['back-arrow']} onClick={historyBack} /><IoHomeOutline className={styles['home-mouth']} onClick={((e)=>Router.route('/'))}/></div>
          </div>
				</div>
      </div>
    </main>
  )
}

export default ErrorPage