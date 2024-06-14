import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "./crawl.js"

test("1 + 1 = 2", () => {
    expect(1 + 1).toBe(2)
})

test("valid url is formatted correctly", () => {
    const expected = "blog.boot.dev/path"
    const urls = [
        "https://blog.boot.dev/path/",
        "https://blog.boot.dev/path",
        "http://blog.boot.dev/path/",
        "http://blog.boot.dev/path",
    ]

    for (const url of urls) {
        expect(normalizeURL(url)).toBe(expected)
    }
})

test("invalid url returns null", () => {
    expect(normalizeURL("invalidUrl")).toBe(null)
})

test("can find all urls in html body", () => {
    const htmlBody = "\
        <html>\
            <body>\
                <a href=\"https://blog.boot.dev\"><span>Go to Boot.dev</span></a>\
            </body>\
        </html>"

    const urls = getURLsFromHTML(htmlBody, "https://blog.boot.dev")
    expect(urls).toHaveLength(1)
})

test("relative URLs are converted to absolute URLs", () => {
    const htmlBody = "\
        <html>\
            <body>\
                <a href=\"https://www.boot.dev\"><span>Go to Boot.dev</span></a>\
                <a href=\"/tracks/backend\"><span>Go to Boot.dev courses</span></a>\
            </body>\
        </html>"

    const urls = getURLsFromHTML(htmlBody, "https://www.boot.dev")
    expect(urls).toContain("https://www.boot.dev/tracks/backend")
})
