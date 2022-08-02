import type { NextComponentType, NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { IoAppsSharp, IoHomeOutline, IoSettingsOutline, IoFolder } from "react-icons/io5";
import Image from 'next/image'
import Notifications, {notify} from 'react-notify-toast';
import { useState } from 'react'
import styles from '../styles/Tabs.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom/client';

const Tabs: NextPage = ({apps}) => {
  const Router = useRouter();

  if (global.window) window.Router = Router;

    // Themes

    if (global.window) {
      const themeHandler = ()=>{
        if (localStorage.getItem('ill@css')) {
          if (window.style) window.style.remove();
          
          var a = document.createElement('style');
          a.textContent = localStorage.getItem('ill@css');

          document.head.appendChild(a);
          
          var theme = 'custom';
          var docs = document.querySelectorAll("*");
          docs.forEach(el=>{
            el.setAttribute("data-theme", theme);
          })

          window.style = a;

          return;
        }
        if (localStorage.getItem("ill@theme")) {
          var theme = localStorage.getItem("ill@theme");
          var docs = document.querySelectorAll("*");
          docs.forEach(el=>{
            el.setAttribute("data-theme", theme);
          })
        }
      }

      window.theme = themeHandler;
      
      if (global.window) window.onload = (e)=>{
        themeHandler();
      }
      
      setTimeout(function() {
        if (localStorage.getItem('ill@title')) {
          document.title = localStorage.getItem('ill@title');
        } else {
          document.title = 'Illusive';
        }
      
        if (localStorage.getItem('ill@icon')) {
          document.querySelector('link[rel="icon"]').href = localStorage.getItem('ill@icon');
        } else {
          document.querySelector('link[rel="icon"]').href = '/favicon.ico';
        }
      }, 1)
  
      setTimeout(themeHandler, 1);

      var day = 1000*60*60*24;

      var History = JSON.parse(localStorage.getItem('ill@history'));

      History = History.filter(e=>(new Date().getTime()-parseInt(e.time))<day);
    
      function LoadHistory(url) {
        Router.replace('/route?query='+encodeURIComponent(url));
      }

      window.LoadHistory = LoadHistory;

      //  window.addEventListener('load', (e) => {
        
        setTimeout(function() {
          document.querySelector('.'+styles.settingsShow).innerHTML = History.map(e => {
            return `
              <div onclick='(e=>(${LoadHistory.toString()})("${e.url}"))()' class="${styles.historyItem}">
                <img src="https://www.google.com/s2/favicons?domain=${e.url}" />
                <p>${e.name}</p>
              </div>
            `
          }).join(''); 
        }, 1000)
      //})
    }
      
      
    	return (
    		<div className={styles.main} data-theme="classic">
          <Head>
            <title>Illusive | Settings</title>
            <meta name="description" content="Illusive | Gateway to Evading Censorship" />
            <meta name="theme-color" content="#565656" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:image" content="/favicon.ico" />
            <link rel="stylsheet" href="../styles/globals.css"/>
          </Head>
    
          <Notifications />
    			
    			<main className={styles.main}>
    				<div className={styles.settingstlist}>
    					<h1>History</h1>
    					<hr></hr>
    
    					<div className={styles.settingsShow}>
                
    					</div>
    				</div>
    			</main>
    		</div>
    	)
}

export default Tabs;