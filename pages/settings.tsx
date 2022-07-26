import type { NextComponentType, NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { IoAppsSharp, IoHomeOutline, IoSettingsOutline, IoFolder } from "react-icons/io5";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Tabs.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Tabs: NextPage = ({apps}) => {
  const Router = useRouter();

  const settings = [
    {
      "name": "Themes"
    },
  ]

  if (typeof window !== "undefined") {
    // Setting Handlers

    // Themes
    const themes = (e)=>{
      var theme = e.target.innerText.toLowerCase();
      localStorage.setItem("theme", theme)
      console.log("Changed Theme To",theme);
      top.window.location.reload();
    };

    const options = document.getElementById(styles.settingTheme).childNodes[0].childNodes;
    options.forEach(x=>{
      x.addEventListener("click", themes);
    });

    const themeHandler = ()=>{
      if (localStorage.getItem("theme")) {
        var theme = localStorage.getItem("theme");
        var docs = document.querySelectorAll("*");
        docs.forEach(el=>{
          el.setAttribute("data-theme", theme);
        })
      }
    }

    window.onload = (e)=>{
      themeHandler();
    }
  }
	return (
		<div className={styles.main}>
      <Head>
        <title>Illusive | Frame Page</title>
        <meta name="description" content="Illusive | Gateway to Evading Censorship" />
        <meta name="theme-color" content="#565656" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
			
			<main className={styles.main}>
				<div className="settingstlist">
					<h1>Settings</h1>
					<hr></hr>
	
					<div className={styles.items}>
            {
              settings.map(setting=>{
                return (
                  <div key={setting.name} className={styles.settitem} onClick={((e)=>{
                    var h2 = document.getElementsByClassName(styles.settingsShow)[0];
                    h2.childNodes[0].innerText = setting.name;
                  })}>
      							<span id={styles['setbox']}></span>
                    <h2>{setting.name}</h2>
      						</div>
                )
              })
            }
					</div>

					<div className={styles.settingsShow}>
						<h2>Settings</h2>
            
						<div className={styles.settingContainers}>
							<div id={styles.settingTheme} className={styles.settingContainer}>
                <ul>
                  <li>Classic</li>
                  <li>Hacker</li>
                </ul>
              </div>
						</div>
            
					</div>
				</div>
			</main>
		</div>
	)
}

export default Tabs;