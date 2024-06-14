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

async function crawlPage(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log(`Error: could not fetch url: ${url}`)
            return
        }

        const contentType = response.headers.get("Content-Type")
        if (contentType === null || !contentType.includes("text/html")) {
            console.log(`Error: expecting \"text/html\" Content-Type got ${contentType}`)
        }

        console.log(await response.text())
    } catch (e) {
        console.log(`Error: ${e.message}`)
    }
}

export {
    normalizeURL, getURLsFromHTML, crawlPage
}
