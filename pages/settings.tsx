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

  function GeneralTab(e) {
    document.getElementsByClassName(styles.settingsShow)[0].childNodes[0].innerText = 'Tab Cloak';
    const settingsTab = document.getElementById(styles.currentSettingTab);
    settingsTab.innerHTML = `<div class="${styles.themesOverlaySettings}">

      <div class="${styles.generalSetting}"><input id="tab-cloak-input" placeholder="Enter Title or Icon URL" class="${styles.settingInput}"><button class="${styles.settingButton}" id="tab-cloak-title">Title</button><button class="${styles.settingButton}" id="tab-cloak-icon">Icon</button><button class="${styles.settingButton}" id="tab-cloak-reset">Reset</button></div>
    </div>
    
    <hr class="${styles.hrshow}"><h2 class="${styles.h2show}">Custom Search Engine</h2>
    <div class="${styles.themesOverlaySettings}"><div class="${styles.generalSetting}"><input id="custom-search-input" placeholder="Enter Search URL" class="${styles.settingInput}"><button class="${styles.settingButton}" id="custom-search-save">Save</button><button class="${styles.settingButton}" id="custom-search-reset">Reset (Google)</button><br><h3><b>Current</b> https://google.com/search?q=</h3></div></div>
    `;

    var CloakInput = document.getElementById('tab-cloak-input');

    document.getElementById('tab-cloak-title').addEventListener('click', function(e) {
      parent.document.title = CloakInput.value;
      localStorage.setItem('ill@title', CloakInput.value);
    });

    document.getElementById('tab-cloak-icon').addEventListener('click', function(e) {
      parent.document.querySelector('link[rel="icon"]').href = CloakInput.value;
      localStorage.setItem('ill@icon', CloakInput.value);
    });

    document.getElementById('tab-cloak-reset').addEventListener('click', function(e) {
      parent.document.querySelector('link[rel="icon"]').href = '/favicon.ico';
      parent.document.title = 'Illusive'
      localStorage.removeItem('ill@icon');
      localStorage.removeItem('ill@title');
    });
  }

  function ThemesTab(e) {
    document.getElementsByClassName(styles.settingsShow)[0].childNodes[0].innerText = 'Theme';
    const themes = (e)=>{
      var theme = e.target.dataset.setting;
      localStorage.setItem("ill@theme", theme.toLowerCase());
      
      notify.show(`Theme Switched to ${theme}`, "success", 2000)
      console.log("Changed Theme To",theme);
      window.onload()
      if (top.window.theme) {
        return top.window.theme();
      }
      return top.window.location.reload();
    };

    var ClassicTheme = `
--setbox: #D9D9D9;
--bg-color: #181818;
--appBG: #232323;
--font-color: #a6a6a6;
--ui: #808080;
--clock-hover: #ebebeb;
--ql-dock: #000000;
--main: #232323;
--hr: #3C3C3C;
--dock: rgba(55, 55, 55, 0.25);
--dock-input: #171717;
--dockInner-s: rgba(55, 55, 55, 0.25);
--controls-btns: white;
--controls-btns-hover: #1a66ff;
--mark: #8F8F8F;
--caret: white;
--settings-bg: #333;
    `

    var custom = (localStorage['ill@css']||'').replace(/\[data\-theme\="custom"\]\s\{(.*?)/g, '$1').replace(/\n/g, '').replace(/\s/g, '').replace('}', '').split(';').join(';\n');
    
    const settingsTab = document.getElementById(styles.currentSettingTab);
    settingsTab.innerHTML = `<div class="${styles.themesOverlaySettings}"><img data-setting="classic" class="${styles.themesSettingOption}" src="/img/themes/classic.png"></img><img data-setting="hacker" class="${styles.themesSettingOption}" src="/img/themes/hacker.png"></img><img data-setting="light" class="${styles.themesSettingOption}" src="/img/themes/light.png"></img><img data-setting="summer" class="${styles.themesSettingOption}" src="/img/themes/summer.png"></img><img data-setting="ember" class="${styles.themesSettingOption}" src="/img/themes/ember.png"></img><img data-setting="mint" class="${styles.themesSettingOption}" src="/img/themes/mint.png"></img><img data-setting="fracital" class="${styles.themesSettingOption}" src="/img/themes/fracital.png"></img><img data-setting="terbium" class="${styles.themesSettingOption}" src="/img/themes/terb.png"></img><img data-setting="amber" class="${styles.themesSettingOption}" src="/img/themes/amber.png"></img></div></div><hr class="${styles.hrshow}"><h2 class="${styles.h2show}">Custom CSS</h2><div class="${styles.themesOverlaySettings}"><input id="custom-css-color" type="color" value="#000000" class="${styles.colorInput}"><input value="#000000" id="custom-css-box" class="${styles.settingInput}" style="width: 22%;margin-left: auto;"><textarea class="${styles.customTextArea}">${custom||ClassicTheme}</textarea><button id="saveBtn" class="${styles.settingButton}" style="width: 100%;">Save</button><button id="clearBtn" class="${styles.settingButton}" style="width: 100%;">Clear</button></div>`;

    document.querySelector('input[type="color"]').addEventListener('change', (e) => {
      var val = document.querySelector('input[type="color"]').value;

      console.log(val);

      document.querySelector('#custom-css-box').value = val;
    })

    document.querySelector('textarea').addEventListener('input', (e) => {
      var text = document.querySelector('textarea').value;

      var assign = `
[data-theme="custom"] {
  ${text}
}
      `

      if (window.style) {
        window.style.textContent = assign;
      }

      if (window.top.style) {
        window.top.style.textContent = assign;
      }
    })

    settingsTab.querySelector('#saveBtn').addEventListener('click', (e) => {
      var text = document.querySelector('textarea').value;

      var assign = `
[data-theme="custom"] {
  ${text}
}
      `

      localStorage.setItem('ill@css', assign)

      if (window.top.theme) window.top.theme();
      if (window.theme) window.theme();

      notify.show(`Custom CSS Set`, "success", 2000)
    })

    settingsTab.querySelector('#clearBtn').addEventListener('click', (e) => {
      localStorage.removeItem('ill@css')

      if (window.top.theme) window.top.theme();
      if (window.theme) window.theme();
    })
    
    const options = document.getElementById(styles.currentSettingTab).childNodes[0].childNodes;
    
    options.forEach(x=>{
      x.addEventListener("click", themes);
    });
  }

  function ProxyTab(e) {
    document.getElementsByClassName(styles.settingsShow)[0].childNodes[0].innerText = 'Main Proxy';
    const proxies = (e)=>{
      var proxy = e.target.dataset.setting;
      
      notify.show(`Proxy Switched to ${proxy}`, "success", 2000)
      
      localStorage.setItem("ill@proxy", proxy)
      console.log("Changed Proxy To", proxy);
      document.cookie = "proxy="+proxy;
    };
    const settingsTab = document.getElementById(styles.currentSettingTab);
    settingsTab.innerHTML = `<div class="${styles.themesOverlaySettings}"><img style="width:200px;height:200px;" data-setting="Ultraviolet" class="${styles.themesSettingOption}" src="/img/proxy/uv.png"></img><img style="width:180px;height:180px;" data-setting="Dynamic" class="${styles.themesSettingOption}" src="/img/proxy/dynamic.png"></img></div>`;
    const options = document.getElementById(styles.currentSettingTab).childNodes[0].childNodes;
    options.forEach(x=>{
      x.onclick = proxies;
    });
  }

  function SecurityTab(e) {
    
  }

  const settings = [
    {
      name: "General",
      handler: GeneralTab
    },
    {
      name: "Style",
      handler: ThemesTab
    },
    {
      name: "Security",
      handler: SecurityTab,
    },
    {
      name: "Proxy",
      handler: ProxyTab
    }
  ]
    // Setting Handlers

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
  
      const themes = (e)=>{
        var theme = e.target.innerText.toLowerCase();
        localStorage.setItem("ill@theme", theme)
        console.log("Changed Theme To",theme);
        themeHandler()
        if (top.window.onload) {
          return top.window.onload();
        }
        return top.window.location.reload();
      };
      
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
    }

  console.log(global.window);
  
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
					<h1>Settings</h1>
					<hr></hr>
	
					<div className={styles.items}>
            {
              settings.map(setting=>{
                return (
                  <div key={setting.name} className={styles.settitem} onClick={((e)=>{
                    var h2 = document.getElementsByClassName(styles.settingsShow)[0];
                    setting.handler();
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
							<div id={styles.currentSettingTab} className={styles.settingContainer}>
                <p>Customize the look, feel, and functionality of Illusive.</p>
              </div>
						</div>
            
					</div>
				</div>
			</main>
		</div>
	)
}

export default Tabs;