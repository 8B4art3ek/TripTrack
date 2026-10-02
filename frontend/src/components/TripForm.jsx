import { useState } from "react"

function TripForm({addTrip}) {
    const [destination, setDestination] = useState("")
    const [days, setDays] = useState("")
    const [cost, setCost] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        await addTrip({
            from,
            to,
            destination,
            days: Number(days),
            cost: Number(cost)
        })
        setFrom("")
        setTo("")
        setDestination("")
        setDays("")
        setCost("")
    }

    return (
        <form className="trip-form" onSubmit={handleSubmit}>
            <input type="text" className="trip-input" placeholder="Skąd" value={from} onChange={(event) => setFrom(event.target.value)} />
            <input type="text" className="trip-input" placeholder="Dokąd" value={to} onChange={(event) => setTo(event.target.value)} />
            <input type="text" className="trip-input" placeholder="Cel" value={destination} onChange={(event) => setDestination(event.target.value)} />
            <input type="number" className="trip-input" placeholder="Liczba dni" value={days} onChange={(event) => setDays(event.target.value)} />
            <input type="number" className="trip-input" placeholder="Koszt" value={cost} onChange={(event) => setCost(event.target.value)} />
            <button type="submit" className="add-button">Dodaj podróż</button>
        </form>
    )
}

export default TripForm