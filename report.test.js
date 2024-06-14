import { test, expect } from "@jest/globals"
import { sortPages } from "./report.js"

test("can sort", () => {
    const pages = {
        "wagslane.dev": 32,
        "wagslane.dev/tags/golang": 1,
        "wagslane.dev/about": 24,
        "wagslane.dev/tags/writing": 3
    }
    expect(sortPages(pages)).toEqual([
        { url: "wagslane.dev", count: 32 },
        { url: "wagslane.dev/about", count: 24 },
        { url: "wagslane.dev/tags/writing", count: 3 },
        { url: "wagslane.dev/tags/golang", count: 1 }
    ])
})
