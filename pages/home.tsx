import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline, IoChevronDown } from "react-icons/io5";
import { FaGithub, FaEyeSlash } from "react-icons/fa";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Main.module.css'
import HomeStyles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimateOnChange } from '@nearform/react-animation';

const cancelEvent: Function = (e) => {
  e.preventDefault();
}

const openApplication: Function = (action, e, Router) => {
  
  var frame = window.parent.document.getElementsByClassName(HomeStyles["main-frame"])[0].querySelector('iframe');
  if (action=='proxy') {
    frame.src = "/route?query="+encodeURIComponent(decodeURIComponent(e));
  }
  else if (action=='redirect') frame.src = e;
  else if (action=='home') {
    frame.src = "/home";
  } else if (action=='route') {
    Router.replace(e)
    if (global.window.location.pathname=='/home') global.window.parent.document.querySelector('iframe#frame').onload();
  }
  else frame.src = e;
}

const Home: NextPage = ({ apps }) => {
  var Router = useRouter();

  const clickEvent: Function = (mode, e, event) => {
    cancelEvent(event);
  
    openApplication(mode, e, Router);
  }
    
  const Apps: Function = () => {
    if (global.window) {
      Router.replace('/apps')
    }
  }
  const Settings: Function = () => {
    if (global.window) {
      Router.replace('/options')
    }
  }
  const particlesInit: Function = async (main) => {await loadFull(main)};
  const particlesLoaded: Function = () => {};
	
	if (typeof window !== "undefined") {
    var contextElement = document.getElementById(styles["context-menu"]);
		window.addEventListener("contextmenu",function(event){
		  event.preventDefault();

			contextElement.style.top = event.clientY + "px";
		  contextElement.style.left = event.clientX + "px";
		  contextElement.classList.add(styles.active);
		});

    contextElement.addEventListener('mouseover', ()=>contextElement.over=true);
    contextElement.addEventListener('mouseout', ()=>contextElement.over=false);

    window.addEventListener('click', () => {
      if (contextElement.over) return;
      contextElement.classList.remove(styles.active);
    });

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
  
    window.onload = (e)=>{
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
      
      themeHandler();
    }

    themeHandler();
	}	
	return (
    <div className={styles.main} data-theme="classic">
      <Head>
        <title>Illusive | Frame Page</title>
        <meta name="description" content="Illusive | Gateway to Evading Censorship" />
        <meta name="theme-color" content="#565656" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
  		
      <main className={styles.main}>
				<div id={styles['context-menu']}>
	        <div className={styles.divider}></div>
	        <div className={styles.item}><i className={`${styles.uil} ${styles['uil-redo']}`}></i>Refresh</div>
	        <div className={styles.item}><i className="uil uil-share"></i>Share</div>
	        <div className={styles.divider}></div>
	        <div className={styles.item}><i className="uil uil-trash"></i>Delete</div>
	        <div className={styles.item}><i className="uil uil-setting"></i>Settings</div>
	   		</div>
				
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                resize: true,
              },
            },
            particles: {
              color: {
                value: "#ffff",
              },
              move: {
                direction: "right",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: 0.673,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 48,
              },
              opacity: {
                value: 0.6814501258678471,
                random: true,
                anim: {
                  enable: true,
                  speed: 0.24362316369040352,
                  opacity_min: 0.03248308849205381,
                  sync: false
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                anim: {
                  enable: true,
                  speed: 2.872463273808071,
                  size_min: 2.436231636904035,
                  sync: false
                },
                value: { min: 2, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />

        <Particles
          id="lightparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                resize: true,
              },
            },
            particles: {
              color: {
                value: "#222",
              },
              move: {
                direction: "right",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: 0.673,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 48,
              },
              opacity: {
                value: 0.6814501258678471,
                random: true,
                anim: {
                  enable: true,
                  speed: 0.24362316369040352,
                  opacity_min: 0.03248308849205381,
                  sync: false
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                anim: {
                  enable: true,
                  speed: 2.872463273808071,
                  size_min: 2.436231636904035,
                  sync: false
                },
                value: { min: 2, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />

        <div className={styles['main-se']}>
          <img src="/Illusive.png" className={styles.img} />
          <div className={styles['main-box']}>
            <a className={styles['box-icon']} onClick={((e)=>clickEvent("proxy", "https://twitter.com/TitaniumNetDev", e))}>
              <img className={styles['qlimg']} src="/img/home/twitter.png" />
            </a>
            <a className={styles['box-icon']} onClick={((e)=>clickEvent("proxy", "https://discord.gg/unblock", e))}>
              <img className={styles['qlimg']} src="/img/home/discord.png" style={{width:'25px',height:'25px'}}/>
            </a>
            <a className={styles['box-icon']} onClick={((e)=>clickEvent("route", "/settings", e))}>
              <img className={styles['qlimg']} src="/img/home/gear.png" style={{width:'25px',height:'25px'}}/>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home