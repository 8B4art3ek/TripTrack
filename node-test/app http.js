// const fs = require("fs")
// console.log("TripTrack Node.js działa!")
// console.log(2 + 2)
// fs.readFile("trip.txt", "utf8", (error, data) => {
//     if (error){
//         console.log(error.message)
//     } else {
//         console.log(data)
//     }
// })

// const fs = require("fs").promises
// async function readTrip() {
//     try {
//         const data = await fs.readFile("trip.txt", "utf8")
//         console.log(data)
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// readTrip()

// const chalk = require("chalk")

// console.log(chalk.blue("TripTrack 🚀"))
// console.log(chalk.green("Node.js działa!"))

// const trip = require("./trip")
// console.log(trip)

// const {calculateTripCost, formatTrip} = require("./trip")
// console.log(calculateTripCost(300,200,100,400))
// console.log(formatTrip("Wiedeń", 3, 1000))

const http = require("http")
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {
            "content-type": "text/plain; charset=utf-8"
        })
        res.end("TripTrack API")
    } else if (req.url === "/trips" && req.method === "GET") {
        res.writeHead(200, {
            "content-type": "text/plain; charset=utf-8"
        })
        res.end("Lista podróży")
    } else if (req.url === "/trips" && req.method === "POST") {
        res.writeHead(200, {
            "content-type": "text/plain; charset=utf-8"
        })
        let body = ""
        req.on("data", chunk => {
            body += chunk
        })
        req.on("end", () => {
            const trip = JSON.parse(body)
            console.log(trip.destination)
            console.log(trip.days)
            console.log(trip.cost)
            res.end("Dodano podróż")
        })
    } else if (req.url === "/about") {
        res.writeHead(200, {
            "content-type": "text/plain; charset=utf-8"
        })
        res.end("TripTrack – API do zarządzania podróżami")
    } else {
        res.writeHead(404, {
            "content-type": "text/plain; charset=utf-8"
        })
        res.end("404 – Nie znaleziono strony")
    }
})

server.listen(3000, () => {
    console.log("Serwer działa na porcie 3000")
})