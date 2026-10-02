import { useState } from "react"

function TripCard({ trip, deleteTrip, updateTrip }) {
    const [isEditing, setIsEditing] = useState(false)
    const [destination, setDestination] = useState(trip.destination)
    const [days, setDays] = useState(trip.days)
    const [cost, setCost] = useState(trip.cost)
    const [from, setFrom] = useState(trip.from)
    const [to, setTo] = useState(trip.to)
    async function handleUpdate() {
        try {
            await updateTrip(
                trip._id,
                {
                    from,
                    to,
                    destination,
                    days: Number(days),
                    cost: Number(cost)
                }
            )
            setIsEditing(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="trip-card">
            {isEditing ? (
                <div>
                    <input type="text" value={from} onChange={(event) => setFrom(event.target.value)} />
                    <input type="text" value={to} onChange={(event) => setTo(event.target.value)} />
                    <input type="text" value={destination} onChange={(event) => setDestination(event.target.value)} />
                    <input type="number" value={days} onChange={(event) => setDays(event.target.value)} />
                    <input type="number" value={cost} onChange={(event) => setCost(event.target.value)} />
                    <button onClick={handleUpdate}>Zapisz</button>
                    <button onClick={() => setIsEditing(false)}>Anuluj</button>
                </div>
            ) : (
                <div>
                    <h3>{trip.from} → {trip.to}</h3>
                    <h4>{trip.destination}</h4>
                    <p>Dni: {trip.days}</p>
                    <p>Koszt: {trip.cost} zł</p>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edytuj</button>
                    <button className="delete-button" onClick={() => deleteTrip(trip._id)}>Usuń</button>
                </div>
            )}
        </div>
    )
}

export default TripCard