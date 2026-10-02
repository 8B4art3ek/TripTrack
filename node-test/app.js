const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const dns = require("dns")
const cors = require("cors")
require("dotenv").config()

dns.setServers(["8.8.8.8", "8.8.4.4"])

const app = express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db("triptrack")
const tripsCollection = db.collection("trips")

app.get("/", (req, res) => {
    res.send("TripTrack API")
})

app.get("/trips", async (req, res) => {
    try {
        const trips = await tripsCollection.find().toArray()
        res.json(trips)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Błąd serwera")
    }
})

app.get("/trips/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Nieprawidłowe ID podróży")
        }
        const trip = await tripsCollection.findOne({
            _id: new ObjectId(req.params.id)
        })
        if (!trip) {
            return res.status(404).send("Nie ma podróży o takim ID")
        }
        res.json(trip)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Błąd serwera")
    }
})

app.put("/trips/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Nieprawidłowe ID podróży")
        }
        if (!isValidTrip(req.body)) {
            return res.status(400).send("Nieprawidłowe dane")
        }
        const result = await tripsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        )
        if (result.matchedCount === 0) {
            return res.status(404).send("Nie ma podróży o takim ID")
        }
        res.json({
            message: "Podróż została zaktualizowana"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Błąd serwera")
    }
})

app.delete("/trips/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Nieprawidłowe ID podróży")
        }
        const result = await tripsCollection.deleteOne(
            { _id: new ObjectId(req.params.id) }
        )
        if (result.deletedCount === 0) {
            return res.status(404).send("Nie ma podróży o takim ID")
        }
        res.json({
            message: "Podróż została usunięta"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Błąd serwera")
    }
})

app.post("/trips", async (req, res) => {
    try {
        if (!isValidTrip(req.body)) {
            return res.status(400).send("Nieprawidłowe dane")
        }
        const result = await tripsCollection.insertOne(req.body)
        res.status(201).json({
            message: "Dodano podróż",
            trip: {
                ...req.body,
                _id: result.insertedId
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Błąd serwera")
    }
})

function isValidTrip(trip) {
    return (
        trip.from &&
        trip.to &&
        trip.destination &&
        trip.days > 0 &&
        trip.cost >= 0
    )
}

async function startServer() {
    try {
        await client.connect()

        console.log("Połączono z MongoDB")

        app.listen(3000, () => {
            console.log("Serwer Express działa na porcie 3000")
        })
    } catch (error) {
        console.log(error.message)
    }
}
startServer()