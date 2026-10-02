import "./App.css"
import { useEffect, useState } from "react"
import TripForm from "./components/TripForm"
import TripList from "./components/TripList"

function App() {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/trips")
            .then(response => response.json())
            .then(data => setTrips(data))
            .catch(error => console.log(error))
    }, [])

    async function addTrip(trip) {
        try {
            const response = await fetch("http://localhost:3000/trips", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(trip)
            })
            const data = await response.json()
            setTrips(prevTrips => [...prevTrips, data.trip])
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteTrip(id) {
        try {
            const response = await fetch(`http://localhost:3000/trips/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Nie udało się usunąć podróży")
            }
            setTrips(prevTrips =>
                prevTrips.filter(trip => trip._id !== id)
            )
        } catch (error) {
            console.log(error)
        }
    }

    async function updateTrip(id, updatedTrip) {
        try {
            const response = await fetch(`http://localhost:3000/trips/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTrip)
            })
            if (!response.ok) {
                throw new Error("Nie udało się zaktualizować podróży")
            }
            setTrips(prevTrips => 
                prevTrips.map(trip => {
                    if (trip._id === id) {
                        return {
                            ...trip,
                            ...updatedTrip
                        }
                    }
                    return trip
                })
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="app">
            <h1>TripTrack</h1>
            <TripForm addTrip={addTrip}></TripForm>
            <TripList trips={trips} deleteTrip={deleteTrip} updateTrip={updateTrip}></TripList>
        </div>
    )
}

export default App