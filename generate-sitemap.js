// Generate sitemap.xml from the shared published episode data.
const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('series-data.json','utf8'));
const base = ['https://dramaloop.site/','https://dramaloop.site/series.html','https://dramaloop.site/about.html','https://dramaloop.site/privacy.html','https://dramaloop.site/disclaimer.html'];
const urls = [...base];
for (const [slug,series] of Object.entries(data.series)) for (const ep of Object.keys(series.episodes)) urls.push('https://dramaloop.site/watch.html?series='+slug+'&ep='+ep);
const today = new Date().toISOString().slice(0,10);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n'+urls.map(url=>'  <url><loc>'+url.replace(/&/g,'&amp;')+'</loc><lastmod>'+today+'</lastmod></url>').join('\\n')+'\\n</urlset>\\n';
fs.writeFileSync('sitemap.xml',xml);
console.log('Generated sitemap with '+urls.length+' URLs.');
