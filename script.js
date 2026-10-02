let editingTrip = null
let editingTripText = null
const button = document.querySelector("#changeButton")
const title = document.querySelector("#title")
const submitButton = document.querySelector("#submitButton")
const destinationInput = document.querySelector("#destination")
const daysInput = document.querySelector("#days")
const costInput = document.querySelector("#cost")

button.addEventListener("click", () => {
    title.textContent = "Kraków → Wiedeń → Berlin"
})

const tripList = document.querySelector("#tripList")
const tripForm = document.querySelector("#tripForm")
let trips = []

function createTripElement(trip) {
    const li = document.createElement("li")
    const deleteButton = document.createElement("button")
    const editButton = document.createElement("button")
    const tripText = document.createElement("span")

    li.dataset.tripId = trip.id

    tripText.textContent = `Kraków → ${trip.destination} | ${trip.days} dni | ${trip.cost} zł `
    deleteButton.textContent = "Usuń"
    editButton.textContent = "Edytuj"
    li.appendChild(tripText)
    li.appendChild(editButton)
    li.appendChild(deleteButton)
    return li
}

tripList.addEventListener("click", (event) => {
    if (event.target.textContent === "Usuń") {
        const li = event.target.parentElement
        const tripId = Number(li.dataset.tripId)
        tripList.removeChild(li)
        trips = trips.filter(item => item.id !== tripId)
    }
    if (event.target.textContent === "Edytuj") {
        const li = event.target.parentElement
        const tripId = Number(li.dataset.tripId)
        const trip = trips.find(item => item.id === tripId)
        editingTrip = trip
        editingTripText = li.firstChild
        destinationInput.value = trip.destination
        daysInput.value = trip.days
        costInput.value = trip.cost
        submitButton.textContent = "Zapisz zmiany"
    }
})

function validateTrip(destination, days, cost) {
    if (destination === "") {
        alert("Uzupełnij kierunek podróży!")
        return false
    }
    if (days <= 0) {
        alert("Wprowadź poprawną liczbe dni wieksza od 0")
        return false
    }
    if (cost < 0) {
        alert("Koszt podróży nie może być mniejszy od 0")
        return false
    }

    return true
}

tripForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const destination = destinationInput.value
    const days = Number(daysInput.value)
    const cost = Number(costInput.value)

    if (costInput.value === "") {
        alert("Wprowadź koszt podróży")
        return
    }

    if (!validateTrip(destination, days, cost)) {
        return
    }

    const trip = {
        id: Date.now(),
        destination: destination,
        days: days,
        cost: cost
    }

    if (editingTrip) {
        editingTrip.destination = destination
        editingTrip.days = days
        editingTrip.cost = cost
        editingTripText.textContent = `Kraków → ${trip.destination} | ${trip.days} dni | ${trip.cost} zł `
        editingTrip = null
        submitButton.textContent = "Dodaj podróż"
        tripForm.reset()
        return
    }

    trips.push(trip)

    const li = createTripElement(trip)
    tripList.appendChild(li)
    tripForm.reset()
})

// const buttons = document.querySelectorAll(".test-button")
// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         button.textContent = "Kliknięto"
//     })
// })

// const statusButton = document.querySelector("#statusButton")
// const tekst = document.querySelector("#status")
// statusButton.addEventListener("click", () => {
//     tekst.classList.toggle("active")
//     if (tekst.classList.contains("active")) {
//         tekst.textContent = "Aktywny"
//     } else {
//         tekst.textContent = "Nieaktywny"
//     }
// })

// const parent = document.querySelector("#parent")
// const child = document.querySelector("#child")
// parent.addEventListener("click", () => {
//     console.log("Kliknięto parent")
// })

// child.addEventListener("click", (event) => {
//     event.stopPropagation()
//     console.log("Kliknięto child")
// })

function renderTrips(tripsToRender) {
    tripList.innerHTML = ""
    tripsToRender.forEach(trip => {
        const li = createTripElement(trip)
        tripList.appendChild(li)
    })
}

const filterButtons = document.querySelectorAll(".filter-button")
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.filter === "cheap") {
            const filteredTrips = trips.filter(trip => trip.cost <= 500)
            renderTrips(filteredTrips)
        } else if (button.dataset.filter === "long") {
            const filteredTrips = trips.filter(trip => trip.days >= 5)
            renderTrips(filteredTrips)
        } else if (button.dataset.filter === "all") {
            renderTrips(trips)
        }
    })
})

// async function getPost() {
//     try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/posts/9999999")
//         if (!response.ok){
//             throw new Error(`HTTP error: ${response.status}`)
//         }
//         const data = await response.json()
//         console.log(data)
//         console.log(data.title)
//         console.log(data.body)
//     } catch (error) {
//         console.log(error.message)
//     }    
// }
// getPost()

const loadingText = document.querySelector("#loading")
const errorText = document.querySelector("#error")

async function getPosts() {
    loadingText.style.display = "block"
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        const posts = data.slice(0, 5)
        posts.forEach(post => {
            const li = document.createElement("li")
            li.textContent = `${post.id} – ${post.title} – ${post.body}`
            tripList.appendChild(li)
        })
    } catch (error) {
        console.log(error.message)
        errorText.textContent = "Nie udało się pobrać danych."
    } finally {
        loadingText.style.display = "none"
    }
}
getPosts()