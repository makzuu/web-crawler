import { argv, exit } from 'process'

function main() {
    if (argv.length !== 3) {
        console.log("Error: expecting one command line argument <baseUrl>, zero were given")
        exit(1)
    }
    const baseUrl = argv[2]
    console.log(`base url: ${baseUrl}`)
}

main()
