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
import cookieCutter from 'cookie-cutter';

const Route: NextPage = ( { config } ) => {
  var Router = useRouter();

  if (global.window) {

    var configP = global.window.localStorage['ill@proxy'];
    
  	var proxy = config.config[configP||config.proxy];
  
  	var prefix = proxy.prefix;
    
    var unp = decodeURIComponent(decodeURIComponent(Router.query.query||new URLSearchParams(Router.asPath.replace('/route', '')).get('query'))).trim().replace(/\s*/gi, '');
  
  	var proxied = decodeURIComponent(prefix + proxy.encodeUrl(unp));

    console.log(proxied)
    
  
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
}

export default Route;