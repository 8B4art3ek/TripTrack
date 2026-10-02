async function getResponse() {
    try {
        const response = await fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "destination": "Wiedeń",
                "days": 3,
                "cost": 500
            })
        })
        const data = await response.text()
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

getResponse()
