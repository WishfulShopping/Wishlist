
export default async (req, res) => {
  const fullUrl = 'https://' + req.headers.host;
  return res.status(200).send(`// ==UserScript==
// @name          Wishlist
// @namespace     *
// @description   Load wishlist
// @include       *
// @grant         GM_registerMenuCommand
// @require       ${fullUrl}/bookmarklet.js
// ==/UserScript==
  
  
  
  GM_registerMenuCommand ("Add To Wishlist", ()=>sendToMetascraper("${fullUrl}/api/url/add/cdc9e808e547d3e22f3f1ad19759ad63"))`);
}
