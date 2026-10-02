const trip = {
    destination: "Wiedeń",
    days: 3,
    cost: 500
}

function calculateTripCost(transport, hotel, food, attractions){
    return `Koszt: ${transport + hotel + food + attractions} zł`
}

function formatTrip(destination, days, cost) {
    return `Kraków → ${destination} | ${days} dni | ${cost} zł`
}

module.exports = {
    calculateTripCost,
    formatTrip
}
