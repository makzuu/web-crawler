function printReport(pages) {
    console.log("--- REPORT START ---")
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        console.log(`Found ${page.count} internal links to ${page.url}`)
    }
    console.log("--- REPORT END ---")
}

function objToArray(pages) {
    const pagesArray = []
    for (const url in pages) {
        pagesArray.push({ url, count: pages[url] })
    }
    return pagesArray
}

function sortPages(pages) {
    const pagesArray = objToArray(pages)
    return pagesArray.toSorted((a, b) => b.count - a.count)
}

export { printReport, sortPages }
