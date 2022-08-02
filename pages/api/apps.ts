import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const applications = [
	{
		name: "Settings",
		type: "app",
		url: "/settings",
    col: false,
		image: "/img/home/gear.png",
    size: 25,
	},
	{
		name: "History",
		type: "app",
		url: "/history",
    col: false,
		image: "/img/home/history.png",
    size: 25,
    filter: 'invert(0) brightness(10000000000000)',
	},
	{
		name: "Collection",
		type: "app",
		url: "/collection",
    col: false,
		filter: `invert(1)`,
		image: "/collection.png",
    size: 25,
	},
	{
		name: "Home",
		type: "app",
		url: "/home",
    col: false,
		image: "/img/home/home.svg",
    filter: 'invert(1)'
	},
	{
		type: "sep",
    col: false,
	},
  {
		name: "Webretro",
		type: "app",
		url: "https://webretro.jimmynuetron.repl.co/",
    action: "proxy",
		image: "/img/apps/arch.jpg"
	},
	{
		name: "Roblox",
		type: "app",
		url: "https://roblox.com",
    action: "proxy",
		image: "/img/apps/roblox.png"
	},
	{
		name: "Now.gg",
		type: "app",
		url: "https://now.gg",
    action: "proxy",
		image: "/img/apps/now.png"
	},
  {
    name: "Discord",
    type: "app",
    url: "https://discord.com",
    action: "proxy",
    image: "/img/apps/discord.png"
  },
  {
    name: "Youtube",
    type: "app",
    url: "https://youtube.com",
    action: "proxy",
    image: "/img/apps/youtube.png"
  },
  {
    name: "Spotify",
    type: "app",
    url: "https://open.spotify.com",
    action: "proxy",
    image: "/img/apps/spotify.png"
  },
  {
    name: "GeForce Now",
    type: "app",
    url: "https://play.geforcenow.com/mall/",
    action: "proxy",
    image: '/img/apps/gfn.png'
  },
	{
		name: "New Folder",
		type: "folder",
		id: "new",
		image: "/folder.png",
		contents: [
			{
				name: "Roblox",
				type: "app",
				url: "https://roblox.com",
		    action: "proxy",
				image: "/unnamed.jpg"
			},
		]
	},
]

export {
	applications
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(applications);
  //res.status(200).json([{name:'GeForce Now',url:'https://play.geforcenow.com/mall/',id:1},],)
}
