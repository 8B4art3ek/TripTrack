import TripCard from "./TripCard"

function TripList({ trips, deleteTrip, updateTrip }) {
    return (
        <div>
            <h2>Moje podróże</h2>
            <div className="trip-list">
                {trips.map(trip => (
                    <TripCard
                        key={trip._id}
                        trip={trip}
                        deleteTrip={deleteTrip}
                        updateTrip={updateTrip}
                    />
                ))}
            </div>
        </div>
    )
}

export default TripList