import { test, expect } from "@jest/globals"
import { normalizeURL } from "./crawl.js"

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
