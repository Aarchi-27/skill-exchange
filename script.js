let users = JSON.parse(localStorage.getItem("users")) || [];

// SAVE USER
function saveUser() {
    alert("Clicked ✅");
}
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        actualSave();
    }, 1500);
}
}

function actualSave() {
    let name = document.getElementById("name").value;
    let have = document.getElementById("have").value.split(",").map(s => s.trim());
    let want = document.getElementById("want").value.split(",").map(s => s.trim());

    if (!name || have.length === 0 || want.length === 0) {
        alert("Please fill all fields");
        return;
    }

    let user = { name, have, want };
    users.push(user);

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
            if (match) matches.push(u);
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
                <p style="color:yellow;">⚡ Instant contact after payment</p>
                <button onclick="unlock()">Unlock Now ₹49 🔥</button>
            </div>
        `;
    });
}

// POPUP OPEN
function unlock() {
    document.getElementById("paymentPopup").style.display = "block";
    reduceSlot();
}

// CLOSE POPUP
function closePopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

// VERIFY PAYMENT
function verifyPayment() {
    let file = document.getElementById("screenshot").files[0];

    if (!file) {
        alert("Please upload screenshot!");
        return;
    }

    alert("Payment verified 🎉");

    document.getElementById("matches").innerHTML += `
        <div class="card">
            <p>📞 Contact: 7990392626</p>
        </div>
    `;

    closePopup();
}

// SHARE BUTTON
function shareSite() {
    let text = "🔥 Try this website 👉 https://aarchi-27.github.io/skill-exchange/";
    document.getElementById("matches").innerHTML += `
    <div class="card">
        <a href="https://wa.me/917990392626?text=Hi%20I%20paid%20₹49">
        <p>📞 Contact will be shared via WhatsApp</p>
            <button>Chat on WhatsApp 💬</button>
        </a>
    </div>
`;
}

// URGENCY
let slots = 5;
function reduceSlot() {
    if (slots > 0) {
        slots--;
        document.getElementById("slots").innerText = "⚠️ Only " + slots + " slots left today!";
    }
}

// FAKE USERS
setInterval(() => {
    let random = Math.floor(Math.random() * 10) + 10;
    let el = document.getElementById("usersCount");
    if (el) el.innerText = "👥 " + random + " people using now";
}, 3000);

// LOAD
window.onload = function () {
    displayUsers();
};
