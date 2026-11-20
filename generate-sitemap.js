// Generate sitemap from shared episode data. Episode lastmod comes from datePublished.
const fs=require('node:fs');
const data=JSON.parse(fs.readFileSync('series-data.json','utf8'));
const staticUrls=['https://dramaloop.site/','https://dramaloop.site/series.html','https://dramaloop.site/about.html','https://dramaloop.site/privacy.html','https://dramaloop.site/disclaimer.html'];
const entries=staticUrls.map(url=>({url}));
for(const [slug,series] of Object.entries(data.series||{}))for(const [ep,item] of Object.entries(series.episodes||{})){entries.push({url:'https://dramaloop.site/watch.html?series='+encodeURIComponent(slug)+'&ep='+encodeURIComponent(ep),lastmod:item.datePublished||null});}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+entries.map(({url,lastmod})=>'  <url><loc>'+esc(url)+'</loc>'+(lastmod?'<lastmod>'+esc(lastmod)+'</lastmod>':'')+'</url>').join('\n')+'\n</urlset>\n';
fs.writeFileSync('sitemap.xml',xml);console.log('Generated sitemap with '+entries.length+' URLs.');
