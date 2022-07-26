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
		name: "Roblox",
		type: "app",
		url: "https://roblox.com",
    action: "proxy",
		image: "/unnamed.jpg"
	},
	{
		name: "Now.gg",
		type: "app",
		url: "https://roblox.com",
    action: "proxy",
		image: "/app-store.png"
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
