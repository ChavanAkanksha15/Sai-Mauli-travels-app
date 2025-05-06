let seatsDiv = document.getElementById("seats");
let bookings = JSON.parse(localStorage.getItem("bookings")) || {}; // Retrieve bookings from localStorage

window.onload = () => {
    showSeats();  // Display the seats layout (Single + Double)
};

// Show Combined Seats (Single + Double)
function showSeats() {
    seatsDiv.innerHTML = "";  // Clear any existing seats

    const seatContainer = document.createElement("div");
    seatContainer.className = "seats";

    // Left column - Single Seats (V1 to V13)
    const singleColumn = document.createElement("div");
    singleColumn.className = "left-column";
    for (let i = 1; i <= 13; i++) {
        const vSeat = createSeat(`V${i}`, "seat");
        singleColumn.appendChild(vSeat);
    }

    // Right column - Double Seats (A/Bw, C/Dw, etc.)
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

            // Check if the seat is already booked
            if (bookings[label]) {
                labelDiv.classList.add("booked");
                labelDiv.innerHTML = `${label}<br>(${bookings[label].name})`;
            } else {
                labelDiv.classList.add("available");
            }

            labelDiv.onclick = () => handleBooking(labelDiv, label); // Add booking handler for double seats
            row.appendChild(labelDiv);
        });

        doubleColumn.appendChild(row);
    });

    seatContainer.appendChild(singleColumn);
    seatContainer.appendChild(doubleColumn);
    seatsDiv.appendChild(seatContainer);
}

// Create Seat (for Single and Double)
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

// Booking Handler
function handleBooking(div, label) {
    const name = prompt(`Enter name to book seat ${label}`);
    if (!name) return; // If no name is entered, do nothing

    // Store the booking in the bookings object and update localStorage
    bookings[label] = { name };
    localStorage.setItem("bookings", JSON.stringify(bookings));  // Persist bookings data in localStorage

    div.classList.remove("available");
    div.classList.add("booked");
    div.innerHTML = `${label}<br>(${name})`;
}

// Clear All Bookings
function clearAllBookings() {
    if (confirm("Clear all bookings?")) {
        bookings = {};  // Reset the bookings object
        localStorage.removeItem("bookings");  // Remove all bookings data from localStorage
        seatsDiv.innerHTML = "";  // Clear displayed seats
    }
}
// Show Bed Seats Layout
function showBedSeats() {
    seatsDiv.innerHTML = "";  // Clear any existing seats before rendering bed seats

    const bedLayout = document.createElement("div");
    bedLayout.className = "seats";

    // Left column - S1 to S6 (vertical bed seats)
    const sColumn = document.createElement("div");
    sColumn.className = "left-column";
    for (let i = 1; i <= 6; i++) {
        const sSeat = createSeat(`S${i}`, "seat bedSeat");
        sColumn.appendChild(sSeat);
    }

    // Right column - U1/2 to U11/12 (pair of bed seats)
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
