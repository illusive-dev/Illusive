import type { NextComponentType, NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { IoAppsSharp, IoHomeOutline, IoSettingsOutline, IoFolder } from "react-icons/io5";
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Apps.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Close: Function = () => {
  if (global.window) {
    if (global.window.opener) global.window.close();
    global.window.history.go(-(global.window.history.length-1));
    global.window.history.location.replace('https://www.google.com/webhp')
  }
}

const aboutBlank: Function = (event) => {
  if (global.window) {
    var openWin = global.window.open('about:blank');

    openWin.document.write('<head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + global.window.location.href + '" frameborder="0"></iframe></body>');
    openWin.document.close();

    Close();
  }
}

if (global.window) {
  window.onload = function(e) {
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

  window.onload = (e)=>{
    themeHandler();
  }
}

const FilterDisplayApps = (apps, p) => {
	var applications = [];
	var shownSep = false;
	var i = 0;
	apps.forEach(app => {
		if (!shownSep) {
			shownSep = (app.type == "sep");
			return;
		}

		if (shownSep) {
			applications.push(app);
		}
	})

	if (!p)
		return apps;
	else
		return applications;
}

const GoToURL = (uri) => {
	if (!uri.startsWith("https://")) {
  	uri = encodeURIComponent("https://google.com/search?q="+(decodeURIComponent(uri)));
	} else if(uri.startsWith("https://") || uri.startsWith("http://")) {
		uri = "/route?query="+encodeURIComponent(decodeURIComponent(uri));
	}

	document.location = uri;
}

const getAppsFromPath = (apps, dir)=> {
	var applications = [];
	apps.map(app=>{
		if (app.type == "folder") {
			if (app.id == dir) {
				applications = app.contents;
			}
		}
	})
	
	return applications;
}

const Apps: NextPage = ({ apps }) => {
  const Router = useRouter();

	var AppPath = (Router.query.dir);
	var isPath = true
	if (typeof AppPath == "undefined") {
		AppPath = "All";
		var applications = apps;
	} else {
		isPath = false;
		var applications = getAppsFromPath(apps, AppPath);
	}

  const particlesInit = async (main) => {await loadFull(main)};

  const particlesLoaded = () => {};

  return (
    <div className={styles.main} data-theme="classic">
      <Head>
        <title>Illusive | Collections</title>
        <meta name="description" content="Illusive | Gateway to Evading Censorship" />
        <meta name="theme-color" content="#2467a5" />
        <link rel="icon" href="/favicon.ico" />
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
      
				<h1><a onClick={((e)=>{document.location.href = document.location.origin+"/collection"})}>Collection</a> / <mark>{AppPath}</mark></h1>
				<hr></hr>
        <div className={styles.apps}>
          {
            FilterDisplayApps(applications, isPath).map(app => {
							if (app.col=='false') return (<></>);
              return (
                <div key={app.id} className={styles.app} onClick={((e)=>{
									if (app.type == "folder") {
										document.location.href = location.origin + "/collection/?dir="+app.id;
									} else {
										GoToURL(app.url);
									}
								})}>
                  <img src={app.image} width="100px"/>
									<h2>{app.name}</h2>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  );
};

Apps.getInitialProps = async function( { req } ) {

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


export default Apps