let seatsDiv = document.getElementById("seats");
let bookings = JSON.parse(localStorage.getItem("bookings")) || {};

window.onload = () => {
    showSingleSeats(); // default view
};

// ------------------------------
// Seat Display Functions
// ------------------------------
function showSingleSeats() {
    seatsDiv.innerHTML = "";
    for (let i = 1; i <= 13; i++) {
        const seat = createSeat(`S${i}`, "singleSeat");
        seatsDiv.appendChild(seat);
    }
}

function showDoubleSeats() {
    seatsDiv.innerHTML = "";
    for (let i = 1; i <= 13; i++) {
        const row = document.createElement("div");
        row.className = "row";
        const d = createSeat(`D${i}`, "doubleSeat");
        const w = createSeat(`W${i}`, "windowSeat");
        row.appendChild(d);
        row.appendChild(w);
        seatsDiv.appendChild(row);
    }
}

function showBedSeats() {
    seatsDiv.innerHTML = "";

    const bedContainer = document.createElement("div");
    bedContainer.style.display = "flex";
    bedContainer.style.gap = "10px";
    bedContainer.style.justifyContent = "center";

    for (let col = 0; col < 3; col++) {
        const column = document.createElement("div");
        column.style.display = "flex";
        column.style.flexDirection = "column";
        column.style.gap = "10px";

        for (let i = 1; i <= 6; i++) {
            const bedNumber = col * 6 + i;
            const bed = createSeat(`B${bedNumber}`, "bedSeat");
            column.appendChild(bed);
        }

        bedContainer.appendChild(column);
    }

    seatsDiv.appendChild(bedContainer);
}

// ------------------------------
// Seat Creation
// ------------------------------
function createSeat(label, type) {
    const div = document.createElement("div");
    div.className = `seat ${type}`;

    if (bookings[label]) {
        const { name, paid } = bookings[label];
        div.classList.add("booked");
        div.innerHTML = `${label}<br>(${name})<br>${paid ? "✔ Paid" : "❌ Pending"}`;
    } else {
        div.classList.add("available");
        div.textContent = label;
    }

    div.onclick = () => handleBooking(div, label);
    return div;
}

// ------------------------------
// Booking Handler
// ------------------------------
function handleBooking(div, label) {
    if (bookings[label]) {
        alert(`Seat ${label} already booked by ${bookings[label].name} (${bookings[label].paid ? "Paid" : "Pending"})`);
        return;
    }

    const name = prompt(`Enter name to book seat ${label}`);
    if (!name) return;

    const paid = confirm("Is the payment received?");
    bookings[label] = { name, paid };

    localStorage.setItem("bookings", JSON.stringify(bookings));
    div.classList.remove("available");
    div.classList.add("booked");
    div.innerHTML = `${label}<br>(${name})<br>${paid ? "✔ Paid" : "❌ Pending"}`;
}

// ------------------------------
// Clear All Booking
// ------------------------------
function clearAllBookings() {
    if (confirm("Clear all bookings?")) {
        bookings = {};
        localStorage.removeItem("bookings");
        seatsDiv.innerHTML = "";
    }
}
