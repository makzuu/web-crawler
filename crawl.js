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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    if (!URL.canParse(currentURL)) {
        console.log(`Error: can not parse url: ${currentURL}`)
        return
    }
    if (new URL(currentURL).origin !== baseURL) {
        return
    }

    const normalizedUrl = normalizeURL(currentURL)
    if (pages[normalizedUrl] !== undefined) {
        pages[normalizedUrl]++
        return pages
    }
    pages[normalizedUrl] = 1
    const html = await fetchPage(currentURL)
    const urls = getURLsFromHTML(html, baseURL)
    for (const url of urls) {
        await crawlPage(baseURL, url, pages)
    }
    return pages
}

async function fetchPage(url) {
    let response = null
    try {
        response = await fetch(url)
    } catch (e) {
        console.log(`Error: ${e.message}`)
        return
    }

    if (!response.ok) {
        console.log(`Error: could not fetch url: ${url}`)
        return
    }

    const contentType = response.headers.get("Content-Type")
    if (contentType === null || !contentType.includes("text/html")) {
        console.log(`Error: expecting \"text/html\" Content-Type got ${contentType}`)
    }

    return response.text()
}

export {
    normalizeURL, getURLsFromHTML, crawlPage
}
