import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsSharp } from "react-icons/io5";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Route: NextPage = ( { config } ) => {
  var Router = useRouter();
  
	var proxy = config.config[config.proxy];
	var prefix = proxy.prefix;
	
	var proxied = prefix + proxy.encodeUrl(decodeURIComponent(Router.query.query||new URLSearchParams(Router.asPath.replace('/route', '')).get('query')));

  return (
    <>
      <Script id="proxiedscript">
        {`
          location.href = "${proxied}"
        `}
      </Script>
    </>
  )
}

export default Route;