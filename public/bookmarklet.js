

function sendToMetascraper(metaScraperServiceUrl) {
    window.metascraperCount = ++window.metascraperCount || 0;
    if ((window.metascraperDisable||window.metascraperCount>1) && confirm('Show this wishlist?')) {
        window.location=metaScraperServiceUrl;
        return;
    }
    const body = new FormData();
    body.append('url', window.location.toString());
    body.append('html', document.documentElement.outerHTML);
    [].slice.call(document.images).map(img=>{
        img.area = img.naturalHeight*img.naturalWidth;
        return img;
    }).filter(img=>{
        return img.area>10000;
    }).sort((a, b)=>{
        return b.area - a.area;
    }).slice(
        0, 20
    ).map(img=>{
        return img.src;
    }).forEach(e => body.append('images', e));

    fetch(metaScraperServiceUrl, {
        method: 'POST',
        body
    }).catch((e)=>{alert(e); window.location=metaScraperServiceUrl})
}
