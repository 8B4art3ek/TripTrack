// //zadanie 1
// function calculateTripCost(transport, accomodation, food){
//     return transport+accomodation+food
// }

// //zadanie 2
// function getTripStatus(days){
//     if (days >= 1 && days <= 3){
//         return "short"
//     } else if (days >= 4 && days <= 7){
//         return "medium"
//     } else if (days >= 8 && days <= 14){
//         return "long"
//     } else if (days > 14){
//         return "very long"
//     }
// }

// //zadanie 3
// const cities = ["Kraków", "Wiedeń", "Praga", "Berlin", "Amsterdam"];
// for (let i = 0; i<cities.length; i++){
//     console.log(i+1, cities[i])
// }

// //zadanie 4
// const prices = [120, 450, 80, 300, 150];
// let suma = 0
// for (let i = 0; i<prices.length; i++){
//     suma += prices[i]
// }
// console.log(suma)



// //zadanie 5
// const trip = {
//     destination: "Praga",
//     days: 4,
//     budget: 1500
// }

// console.log(trip.destination)
// console.log(trip.days)
// console.log(trip.budget)

// trip.budget += 500

// //zadanie 6
// const age = 21;
// const hasTicket = true;
// if(age>=18 && hasTicket){
//     console.log("Możesz wejść")
// } else {
//     console.log("Nie możesz wejść")
// }


// //zad dodatkowe
// const trips = [
//     { destination: "Praga", days: 4, cost: 800 },
//     { destination: "Wiedeń", days: 3, cost: 600 },
//     { destination: "Berlin", days: 5, cost: 1000 },
//     { destination: "Budapeszt", days: 2, cost: 450 }
// ];
// //zad a
// for (let i = 0; i < trips.length; i++){
//     console.log(trips[i].destination)
// }
// //zad b
// let suma = 0
// for (let i = 0; i < trips.length; i++){
//     suma += trips[i].cost
// }
// console.log(suma)
// //zad c
// for (let i = 0; i < trips.length; i++){
//     if (trips[i].days >= 4){
//         console.log(trips[i].destination)
//     } 
// }
// //zad d
// let maxCost = 0
// let max = ''
// for (let i = 0; i < trips.length; i++){
//     if (trips[i].cost > maxCost){
//         maxCost = trips[i].cost
//         max = trips[i].destination
//     }
// }
// console.log(max)

// //zad a inny sposob
// const destinations = []
// for (let i = 0; i < trips.length; i++){
//     destinations.push(trips[i].destination)
// }
// console.log(destinations)

// //zadanie z .map()
// const costs = trips.map(trip => trip.cost)
// console.log(costs)

// //zad 1 .map()
// const wycieczki = trips.map(trip => `${trip.destination} - ${trip.days}`)
// console.log(wycieczki)

// //zad2 .map()
// const increasedCosts = trips.map(trip => trip.cost + trip.cost*0.2)
// console.log(increasedCosts)

// //zad z filter()
// const longTrips = trips.filter(trip => trip.days >= 4)
// console.log(longTrips)

// //1
// const mniejniz700 = trips.filter(trip => trip.cost < 700)
// console.log(mniejniz700)

// //2
// const min4dni = (trips.filter(trip => trip.days >= 4)).map(trip => trip.destination)
// console.log(min4dni)

// //zad find()
// const expensiveTrip = trips.find(trip => trip.cost === 1000)
// console.log(expensiveTrip)


// const prices = [120, 450, 80, 300, 150]
// //reduce()
// const sumofprices = prices.reduce((sum, price) => sum + price)
// console.log(sumofprices)

// const trips = [
//     { destination: "Praga", days: 4, cost: 800 },
//     { destination: "Wiedeń", days: 3, cost: 600 },
//     { destination: "Berlin", days: 5, cost: 1000 },
//     { destination: "Budapeszt", days: 2, cost: 450 }
// ];

// //zad 1
// const prices = trips.map(trip => trip.cost)
// console.log(prices)

// //zad 2
// const podroze700zl = trips.filter(trip => trip.cost >= 700)
// console.log(podroze700zl)

// //zad 3
// const wieden = trips.find(trip => trip.destination === "Wiedeń")
// console.log(wieden)

// //zad 4
// const koszt = trips.map(trip => trip.cost).reduce((sum, price) => sum + price)
// console.log(koszt)

// const min4dni = trips.filter(trip => trip.days >= 4).map(trip => trip.cost)
// console.log(min4dni)