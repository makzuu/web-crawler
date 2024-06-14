import { JSDOM } from "jsdom"

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

function getURLsFromHTML(htmlBody, baseUrl) {
    const urls = []
    const body = new JSDOM(htmlBody).window.document.body
    const anchors = body.querySelectorAll("a")
    
    for (const anchor of anchors) {
        const url = new URL(anchor.href, baseUrl)
        urls.push(url.href)
    }
    
    return urls
}

export {
    normalizeURL, getURLsFromHTML
}
