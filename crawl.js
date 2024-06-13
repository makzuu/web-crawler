function normalizeURL(url) {
    if (!URL.canParse(url)) {
        return null
    }

    const urlObj = new URL(url)

    if (urlObj.pathname.length === 1) {
        return urlObj.hostname
    }

    if (urlObj.pathname[urlObj.pathname.length - 1] === "/") {
        return urlObj.hostname + urlObj.pathname.slice(0, -1)
    }

    return urlObj.hostname + urlObj.pathname
}

export { normalizeURL }
