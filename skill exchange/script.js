let users = JSON.parse(localStorage.getItem("users")) || [];

// SAVE USER
function saveUser() {
    let name = document.getElementById("name").value;
    let have = document.getElementById("have").value.split(",").map(s => s.trim());
    let want = document.getElementById("want").value.split(",").map(s => s.trim());

    if (!name || have.length === 0 || want.length === 0) {
        alert("Please fill all fields");
        return;
    }

    let user = { name, have, want };
    users.push(user);

    // SAVE TO STORAGE
    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();

    let matches = findMatches(user);
    displayMatches(matches);
}

// DISPLAY USERS
function displayUsers() {
    let div = document.getElementById("users");
    div.innerHTML = "";

    users.forEach(u => {
        div.innerHTML += `
            <div class="card">
                <h3>${u.name}</h3>
                <p>Have: ${u.have.join(", ")}</p>
                <p>Want: ${u.want.join(", ")}</p>
            </div>
        `;
    });
}

// FIND MATCHES
function findMatches(currentUser) {
    let matches = [];

    users.forEach(u => {
        if (u !== currentUser) {
            let match = u.have.some(skill => currentUser.want.includes(skill));
            if (match) {
                matches.push(u);
            }
        }
    });

    return matches;
}

// DISPLAY MATCHES
function displayMatches(matches) {
    let div = document.getElementById("matches");
    div.innerHTML = "";

    if (matches.length === 0) {
        div.innerHTML = "<p>No matches found</p>";
        return;
    }

    matches.forEach(u => {
        div.innerHTML += `
            <div class="card">
                <h3>${u.name}</h3>
                <p>Matching Skills: ${u.have.join(", ")}</p>
                <button onclick="unlock()">Unlock Contact 🔒</button>
            </div>
        `;
    });
}

function unlock() {
    document.getElementById("paymentPopup").style.display = "block";
    reduceSlot();
}
function confirmPayment() {
    alert("Payment received! Contact unlocked 🎉");

    // Show fake contact (for now)
    document.getElementById("matches").innerHTML += `
        <div class="card">
            <p>📞 Contact: 7990392626</p>
        </div>
        function saveUser() {
    alert("Working on mobile ✅");
}
    `;
}
// LOAD DATA ON START
window.onload = function () {
    displayUsers();

    function closePopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

function verifyPayment() {
    let file = document.getElementById("screenshot").files[0];

    if (!file) {
        alert("Please upload screenshot!");
        return;
    }

    alert("Payment verified 🎉 Contact unlocked!");

    document.getElementById("matches").innerHTML += `
        <div class="card">
            <p>📞 Contact: 7990392626</p>
        </div>
    `;

    closePopup();
}
function shareSite() {
    let text = "🔥 I found a website where you can exchange skills and earn! Try it 👉 https://aarchi-27.github.io/skill-exchange/";
    
    let url = "https://wa.me/qr/CDOBRBIQFLY2E1=" + encodeURIComponent(text);
    
    window.open(url, "_blank");
}
let slots = 5;

function reduceSlot() {
    if (slots > 0) {
        slots--;
        document.getElementById("slots").innerText = "⚠️ Only " + slots + " slots left today!";
    }
}
setInterval(() => {
    let random = Math.floor(Math.random() * 10) + 10;
    document.getElementById("usersCount").innerText = "👥 " + random + " people using now";
}, 3000);
};