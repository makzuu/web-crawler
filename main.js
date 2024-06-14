import { argv, exit } from "process"
import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

async function main() {
    if (argv.length !== 3) {
        console.log("Error: expecting one command line argument <baseUrl>, zero were given")
        exit(1)
    }
    const baseUrl = argv[2]

    const pages = await crawlPage(baseUrl)
    printReport(pages)
}

main()
