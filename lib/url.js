
export function getLoadAlternativeImageUrl(id) {
    return `${window.location.pathname.replace('/list', '/api/alternative')}/${id}`;
}

export function getDeleteItemUrl(id) {
    return `${window.location.pathname.replace('/list', '/api/delete')}/${id}`
}

export function reloadPage() {
    window.location=window.location
}

export function isReadWriteUrl() {
    return window.location.pathname.match('list/([a-zA-Z0-9=]+)')[1].length == 32
}

export function getReadOnlyUrl() {
    const wishlist = window.location.pathname.match('list/([a-zA-Z0-9=]+)')[1];
    const readonly = wishlist.substring(0,16);
    return window.location.toString().replace(wishlist, readonly);
}

export function getBookmarkletUrl() {
    return window.location.pathname.replace('/list', '/api/url/add');
}

export function getDeleteUrl() {
    return window.location.pathname.replace('/list', '/api/clean');
}

export function isWishlistSelected(wishlistUrl) {
    const currentUrl = window.location.pathname+window.location.search;
    return currentUrl == wishlistUrl;
}
export function isListPage() {
    return window.location.pathname.match('list');
}
export function getDragAndDropSourceUrl() {
    return window.location.pathname;
}

export function getWishlistDataUrl() {
    return window.location.toString().replace('/list', '/api/hello');
}

export function getUrlParam() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}