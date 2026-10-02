import { useState } from "react"

function TripForm({addTrip}) {
    const [destination, setDestination] = useState("")
    const [days, setDays] = useState("")
    const [cost, setCost] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        await addTrip({
            destination,
            days: Number(days),
            cost: Number(cost)
        })
        setDestination("")
        setDays("")
        setCost("")
    }

    return (
        <form className="trip-form" onSubmit={handleSubmit}>
            <input type="text" className="trip-input" placeholder="Cel" value={destination} onChange={(event) => setDestination(event.target.value)} />
            <input type="number" className="trip-input" placeholder="Liczba dni" value={days} onChange={(event) => setDays(event.target.value)} />
            <input type="number" className="trip-input" placeholder="Koszt" value={cost} onChange={(event) => setCost(event.target.value)} />
            <button type="submit" className="add-button">Dodaj podróż</button>
        </form>
    )
}

export default TripForm