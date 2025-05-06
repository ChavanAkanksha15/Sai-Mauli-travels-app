let seatsDiv = document.getElementById("seats");
let bookings = JSON.parse(localStorage.getItem("bookings")) || {};

window.onload = () => {
    showSeats();
};

// Combined Seats View
function showSeats() {
    seatsDiv.innerHTML = "";

    const seatContainer = document.createElement("div");
    seatContainer.className = "seats";

    // Left column - V1 to V13
    const singleColumn = document.createElement("div");
    singleColumn.className = "left-column";
    for (let i = 1; i <= 13; i++) {
        const vSeat = createSeat(`V${i}`, "seat");
        singleColumn.appendChild(vSeat);
    }

    // Right column - Double Seats A, Bw, ..., 20w
    const doubleColumn = document.createElement("div");
    doubleColumn.className = "right-column";

    const doubleLabels = [
        ["A", "Bw"], ["C", "Dw"], ["E", "Fw"], ["1", "2w"],
        ["3", "4w"], ["5", "6w"], ["7", "8w"], ["9", "10w"],
        ["11", "12w"], ["13", "14w"], ["15", "16w"],
        ["17", "18w"], ["19", "20w"]
    ];

    doubleLabels.forEach(pair => {
        const row = document.createElement("div");
        row.className = "row-labels";

        pair.forEach(label => {
            const labelDiv = document.createElement("div");
            labelDiv.className = "double-label";
            labelDiv.textContent = label;
            row.appendChild(labelDiv);
        });

        doubleColumn.appendChild(row);
    });

    seatContainer.appendChild(singleColumn);
    seatContainer.appendChild(doubleColumn);
    seatsDiv.appendChild(seatContainer);
}

// Bed Seats Layout
function showBedSeats() {
    seatsDiv.innerHTML = "";

    const bedLayout = document.createElement("div");
    bedLayout.className = "seats";

    // Left - S1 to S6 (vertical)
    const sColumn = document.createElement("div");
    sColumn.className = "left-column";
    for (let i = 1; i <= 6; i++) {
        const sSeat = createSeat(`S${i}`, "seat bedSeat");
        sColumn.appendChild(sSeat);
    }

    // Right - U1/2 to U11/12 (2 columns)
    const uColumn = document.createElement("div");
    uColumn.className = "right-column";

    const uPairs = [
        ["U1", "2"], ["U3", "4"], ["U5", "6"],
        ["U7", "8"], ["U9", "10"], ["U11", "12"]
    ];

    uPairs.forEach(pair => {
        const row = document.createElement("div");
        row.className = "row-labels";

        pair.forEach(label => {
            const uSeat = createSeat(label, "seat bedSeat");
            row.appendChild(uSeat);
        });

        uColumn.appendChild(row);
    });

    bedLayout.appendChild(sColumn);
    bedLayout.appendChild(uColumn);
    seatsDiv.appendChild(bedLayout);
}

// Create Seat
function createSeat(label, className) {
    const div = document.createElement("div");
    div.className = className;

    if (bookings[label]) {
        div.classList.add("booked");
        div.innerHTML = `${label}<br>(${bookings[label].name})`;
    } else {
        div.classList.add("available");
        div.textContent = label;
    }

    div.onclick = () => handleBooking(div, label);
    return div;
}

// Booking Handler (no payment prompt)
function handleBooking(div, label) {
    const name = prompt(`Enter name to book seat ${label}`);
    if (!name) return;

    bookings[label] = { name };
    localStorage.setItem("bookings", JSON.stringify(bookings));
    div.classList.remove("available");
    div.classList.add("booked");
    div.innerHTML = `${label}<br>(${name})`;
}

// Clear Bookings
function clearAllBookings() {
    if (confirm("Clear all bookings?")) {
        bookings = {};
        localStorage.removeItem("bookings");
        seatsDiv.innerHTML = "";
    }
}
