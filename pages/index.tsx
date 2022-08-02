import type { NextPage } from 'next'
import Head from 'next/head'
import { IoAppsOutline, IoSettingsOutline, IoChevronDown, IoArrowBackOutline, IoArrowForwardOutline, IoReloadOutline, IoStarOutline } from "react-icons/io5";
import { MdTab } from "react-icons/md";
import { FaGithub, FaEyeSlash } from "react-icons/fa";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimateOnChange } from '@nearform/react-animation';
import {reactLocalStorage} from 'reactjs-localstorage';

import Paths from './prefix.ts';

var history = [
  {
    'uri': 'https://google.com',
    'title': 'Coming Soon!'
  }
];

const toggleDrop: Function = (e) => {
  var el = document.getElementById('dropdown');
	
  var el2 = document.getElementsByClassName(styles["main-frame"])[0];
  var el3 = document.getElementById('apps');

  if (el3.classList.contains(styles['flex-vis'])) {
    var og = el3.style.animation+'';
    el3.style.animation = `${styles['cl']} 0.4s`;
    el3.style.display = "flex"

    setTimeout(function() {
      el3.style.display = 'none'
      el3.style.animation = og;
    }, 400)
  }
  el3.classList.toggle(styles['flex-vis']);
  el.classList.toggle(styles['apps-up']) 
  el2.classList.toggle(styles['apps-down'])
  el2.classList.toggle(styles['apps-up'])
}

const cancelEvent: Function = (e) => {
  e.preventDefault();
}

if (typeof window !== "undefined") {
  if (!(localStorage.getItem('ill@history'))) localStorage.setItem('ill@history', '[]')
  
  function addToHistory(tab) {
      var h = document.getElementsByClassName(styles['historyapps'])[0];
      var newTab = document.createElement("div");
      var proxyFunc = `(e)=>{openApplication("proxy", tab.uri, Router);toggleTabs();};`

      h.appendChild(newTab);

      var ls = JSON.parse(localStorage.getItem('ill@history'));

      tab.time = new Date().getTime();

      if (tab.title=='Register SW') return;

      ls.splice(0,0,tab);

      console.log(ls)

      localStorage.setItem('ill@history', JSON.stringify(ls));
    }
      var urlbar = document.getElementById("urlbar");
      urlbar.onfocus = (e) => {
        urlbar.isfocus = true;
        urlbar.isblur = false;
      };
      urlbar.onblur = (e) => {
        urlbar.isblur = true;
        urlbar.isfocus = false;
      };
      urlbar.onpaste = (e) => {
        urlbar.innerHTML = urlbar.innerText;
      };
      urlbar.addEventListener("keyup", (e) => {
        if (urlbar.innerText.trim()) urlbar.setAttribute('val', 'true'); else urlbar.removeAttribute('val');
        if(e.keyCode === 13) {
          e.preventDefault();
            document.getElementById('urlbar').blur();
            document.getElementById('urlbar').innerHTML = (document.getElementById('urlbar').innerText);
            var uri = document.getElementById('urlbar').innerText;
            var removeHandler = uri.slice((Math.max(uri.lastIndexOf("://"))) + 3);
  		      var frame = document.getElementsByClassName(styles["main-frame"])[0].querySelector('iframe');
  		      if (!uri.startsWith("https://")&&!uri.startsWith('http://')) {
  			      uri = encodeURIComponent("https://google.com/search?q="+(decodeURIComponent(uri)));
  		      } else if(uri.startsWith("https://") || uri.startsWith("http://")) {
              if(uri.startsWith("https://")) {
                document.getElementById('urlbar').innerHTML = ""
                document.getElementById('urlbar').innerHTML = `<span class="${styles['marking']}">https://</span>${removeHandler}`
              } else if(uri.startsWith("http://")) {
                document.getElementById('urlbar').innerHTML = ""
                document.getElementById('urlbar').innerHTML = `<span class="${styles['marking']}">http://</span>${removeHandler}`
              }
						}
          history.push({"uri":decodeURI(uri)});
					frame.src = "/route?query="+encodeURIComponent(decodeURIComponent(uri));
        }
    })  
  
  var el = document.getElementsByClassName(styles['historyTab'])[0];
  el.style.display = "none";
  
  window.onload = function(e) {
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
    
    // Dropdown
    /*window.addEventListener('mouseout', function(e) {
      var y = e.clientY;
      var target = 1;
      var el = document.getElementById('dropdown');
      var a = document.getElementsByClassName(styles['main-frame'])[0];
      if (y < target) {
        if (a.classList.contains(styles['apps-up'])) toggleDrop()
      } else {
        
      }
    })*/
    
    /*window.addEventListener("mousemove", function(e) {
      var y = e.clientY;
      var target = 30;
      var el = document.getElementById('dropdown');
      var a = document.getElementsByClassName(styles['main-frame'])[0];
      if (y < target) {
        if (a.classList.contains(styles['apps-down'])) toggleDrop()
      } else {
        if (a.classList.contains(styles['apps-up'])) toggleDrop()
      }
    });*/
		
    // Clock
    //addEventListener('load', (e) => {
      setTimeout(function(){
        setInterval(function(){
          var clock = document.getElementById("clock");
          var x = new Date()
          var ampm = x.getHours() >= 12 ? ' PM' : ' AM';
          var t = x.getHours();
          if (t >= 12) t = t - 12;
          if (t == 0) t = 12;
      
          var minutes = x.getMinutes();
          if (minutes.toString().length==1) minutes = "0"+minutes;
      
          var x1 = t + ":" + minutes + ampm;
          clock.innerText = x1;
        }, 300);
      }, 2000);
    //})
  }

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

  var frame = document.getElementsByClassName(styles["main-frame"])[0].querySelector('iframe');

  addEventListener('load', (e) => {
    themeHandler();
    frame.onbeforeunload = function(e) {
      frame.loaded = false;
    }
    frame.onload = function(i) {
      frame.onload = function(e) {
        frame.loaded = true;
        var path = frame.contentWindow.location.pathname;
        
        if (Paths[path]) {
          var newPath = Paths[path];
    
          if (!urlbar.isfocus&&frame.loaded) {
            urlbar.setAttribute('val', 'ill://'+newPath)
            urlbar.innerHTML = `<span class="${styles.marking}">ill://</span>${newPath}`
          }
        } else {
          if (!urlbar.isfocus&&frame.loaded) {
            var toSet = path;
            
            if (toSet.startsWith('/service/')) {
              console.log(toSet);
              toSet = new URL(decodeURIComponent(atob(toSet.replace('/service/dip/', '').replace('/service/uv/', '').replace('/', ''))));

              console.log({url:toSet.href, name: frame.contentDocument.title});

              addToHistory({url:toSet.href, name: frame.contentDocument.title})
  
              urlbar.setAttribute('val', toSet.href);
              urlbar.innerHTML = `<span class="${styles.marking}">${toSet.protocol}//</span>${toSet.href.replace(toSet.protocol+'//', '')}`;
            }
          }
        }
    
        setTimeout(function() {
          var int = setInterval(function() {
            if (!frame.contentWindow) return;
            
            try {var path = frame.contentWindow.location.pathname;} catch(e) {return;}
            
            if (Paths[path]) {
              var newPath = Paths[path];
        
              if (!urlbar.isfocus&&frame.loaded) {
                urlbar.setAttribute('val', 'ill://'+newPath)
                urlbar.innerHTML = `<span class="${styles.marking}">ill://</span>${newPath}`
              }
            } else {
              if (!urlbar.isfocus&&frame.loaded) {
                var toSet = path;
                if (toSet.startsWith('/service/')) {
                  toSet = new URL(decodeURIComponent(atob(toSet.replace('/service/dip/', '').replace('/service/uv/', '').replace('/', ''))));
      
                  urlbar.setAttribute('val', toSet.href);
                  urlbar.innerHTML = `<span class="${styles.marking}">${toSet.protocol}//</span>${toSet.href.replace(toSet.protocol+'//', '')}`;
                }
              }
            }
          }, 500)
        }, 1000)
      }
    }
  })
}

const toggleTabs: Function = () => {
	var el = document.getElementsByClassName(styles['historyTab'])[0];
  var tabbyBTN = document.getElementById("tabby");

	if (el.id == "noactive") {
    tabbyBTN.style.fill = "#3479FF"
    el.style.display = "flex";
		el.id="active";
	} else if(el.id == "active"){
		el.id="noactive";
    el.style.display = "flex";
    tabbyBTN.style.fill = "white"
	}
}

// browser button for the right

const iframeback = () => {
  history.go(-1);
}

const iframefoward = () => {
  history.go(1);
}

const iframereload = () => {
  document.getElementById("frame").contentWindow.location.reload();
}

const Home: NextPage = ({ apps }) => {
  var Router = useRouter();
    
  const openApplication: Function = (action, e, Router) => {
    var frame = window.parent.document.getElementsByClassName(styles["main-frame"])[0].querySelector('iframe');
    if (action=='proxy') {
      history.push({"uri":e});
      frame.src = "/route?query="+encodeURIComponent(decodeURIComponent(e));
    }
    else if (action=='redirect') frame.src = e;
    else if (action=='home') {
      frame.src = "/home";
    } else if (action=='route') {
      Router.replace(e)
    }
    else frame.src = e;
  }
  
  if (global.window) global.window.Router = Router;
  
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

	const backup = console.warn;

	console.warn = function filterWarnings(msg) {
	  const supressedWarnings = ['warning text', 'other warning text'];
	
	  if (!supressedWarnings.some(entry => msg.includes(entry))) {
	    backup.apply(console, arguments);
	  }
	};
  
  return (
    <div className={styles.main} data-theme="classic">
      <Head>
        <title>Illusive</title>
        <meta name="description" content="Illusive | Gateway to Evading Censorship" />
        <meta name="theme-color" content="#565656" />
        <link rel="icon" href="/Illusive.png" />
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

				<div className={styles.historyTab} id="noactive">
					<h1>Tabs</h1>
					<div className={styles['historyapps']}>
						{
							history.map(tab=>{
                return (
									<div key={tab.title} className={styles['historyapp']} onClick={((e)=>{openApplication("proxy", tab.url, Router);toggleTabs();})}>
										<div className={styles['historyapptext']}>
                      <p>{tab.title}</p>
										</div>

                    <img src={"https://www.google.com/s2/favicons?domain="+tab.uri}></img>
									</div>
								)
							})
						}
					</div>
				</div>
				
        <div id="apps" className={styles["apps"]}>
          {
            apps.map(app => {
              if (app.col=='false') return (<></>);
              
              if (app.type == 'sep') {
                return (
                  <div key={app.type} className={styles.separator}></div>
                )
              }
							if (app.type == "app") {
                if (!app.action) {
  	              return (
  		                <a key={app.name} onClick={cancelEvent}>
  		  								<div key={app.name} className={`${styles.app} ${styles.normalLink}`} onClick={((e)=>openApplication(app.action, app.url, Router))}>
  		  									<img style={{filter: app.filter||'invert(0)', width: (app.size+'px')||'30px', height: (app.size+'px')||'30px'}} src={app.image} alt={app.name}></img>
  		  								</div>
  		                </a>
  								)
                }
	              return (
		                <a key={app.name} onClick={cancelEvent}>
		  								<div key={app.name} className={styles.app} onClick={((e)=>openApplication(app.action, app.url, Router))}>
		  									<img style={{filter: app.filter||'invert(0)', width: (app.size+'px')||'30px', height: (app.size+'px')||'30px'}} src={app.image} alt={app.name}></img>
		  								</div>
		                </a>
								)
							}
            })
          }
        </div>
				
        <div className={styles['apps-frame']}>
          <div id="dropdown" onClick={toggleDrop} className={`${styles['apps-dropdown']} dropdown`}>
            <IoChevronDown />
          </div>
					
          <div id="main-frame" className={`${styles["main-frame"]} ${styles["apps-down"]}`}>
            <iframe id="frame" src="/home" name="if"></iframe>
          </div>
        </div>
				
        <div className={styles['bottom-container']}>
					<div className={styles['bottom-left-menu']}>
						<MdTab id='tabby' className={`${styles['open-tabs']} ${styles['fillS']}`} onClick={((e)=>{toggleTabs()})} width="25" height="25" />
	        </div>
					
	        <div className={styles['user-form']}>
	          <img onClick={((e)=>{openApplication("home","/home",Router)})} src="/favicon.ico" className={`${styles['icon-ico']}`}></img>
	          <div contentEditable="true" className={styles['form-submit-main']} id="urlbar"></div>
	          <div id="clock" className={styles.clock}>10:00 PM</div>
	        </div>
					
	        <div className={styles['bottom-right-menu']}>
                <svg width="16" height="16" className={`${styles['main-nav-icon']} ${styles['fill']}`} viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.83331 0C2.61169 0 0 2.61166 0 5.83334V24.1667C0 27.3883 2.61169 30 5.83331 30H20C28.2842 30 35 23.2843 35 15C35 6.71573 28.2843 0 20 0H5.83331ZM20.0607 8.06067C20.6464 7.47488 20.6464 6.52512 20.0607 5.93933C19.4749 5.35355 18.5251 5.35355 17.9393 5.93933L9.93933 13.9393C9.35358 14.5251 9.35358 15.4749 9.93933 16.0607L17.9393 24.0607C18.5251 24.6465 19.4749 24.6465 20.0607 24.0607C20.6464 23.4749 20.6464 22.5251 20.0607 21.9393L13.1213 15L20.0607 8.06067Z" fill="#D9D9D9"/>
              </svg>
              <svg width="16" height="16" className={`${styles['main-nav-icon']} ${styles['fill']}`} viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15 0C6.71576 0 0 6.71573 0 15C0 23.2843 6.7157 30 15 30H29.1667C32.3883 30 35 27.3883 35 24.1667V5.83334C35 2.61166 32.3883 0 29.1667 0H15ZM15.9393 21.9393C15.3536 22.5251 15.3536 23.4749 15.9393 24.0607C16.5251 24.6465 17.4749 24.6465 18.0607 24.0607L26.0607 16.0607C26.6464 15.4749 26.6464 14.5251 26.0607 13.9393L18.0607 5.93933C17.4749 5.35355 16.5251 5.35355 15.9393 5.93933C15.3536 6.52512 15.3536 7.47488 15.9393 8.06067L22.8787 15L15.9393 21.9393Z" fill="#D9D9D9"/>
              </svg>
	            <IoReloadOutline id='reload-frame' className={`${styles['main-nav-icon']} ${styles['reload-btn']}`} onClick={iframereload} target="if" />
	            <svg width="16" height="16" className={`${styles['main-nav-icon']} ${styles['fill']} ${styles['star-btn']}`} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 12.6249C27.625 11.9999 27.125 11.2499 26.5 11.2499L19.375 10.2499L16.125 3.74992C16 3.49992 15.875 3.37492 15.625 3.24992C15 2.87492 14.25 3.12492 13.875 3.74992L10.75 10.2499L3.625 11.2499C3.25 11.2499 3 11.3749 2.875 11.6249C2.375 12.1249 2.375 12.8749 2.875 13.3749L8 18.3749L6.75 25.4999C6.75 25.7499 6.75 25.9999 6.875 26.2499C7.25 26.8749 8 27.1249 8.625 26.7499L15 23.3749L21.375 26.7499C21.5 26.8749 21.75 26.8749 22 26.8749C22.125 26.8749 22.125 26.8749 22.25 26.8749C22.875 26.7499 23.375 26.1249 23.25 25.3749L22 18.2499L27.125 13.2499C27.375 13.1249 27.5 12.8749 27.5 12.6249Z" fill="white"/>
              </svg>
	        </div>
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async function( { req } ) {

  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  
    const res = await fetch(baseUrl + '/api/apps')
    const json = await res.json();

    return {apps: json}
  } else if (global.window) {
  
    const res = await fetch(global.window.location.origin + '/api/apps')
    const json = await res.json();

    return {apps: json}
  }
}

export default Home