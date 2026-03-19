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
                <button onclick="unlock()">Unlock ₹49 🔥</button>
            </div>
        `;
    });
}

// OPEN POPUP
function unlock() {
    document.getElementById("paymentPopup").style.display = "block";
}

// CLOSE POPUP
function closePopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

// VERIFY PAYMENT
function verifyPayment() {
    alert("Contact unlocked 🎉");

    document.getElementById("matches").innerHTML += `
        <div class="card">
            <a href="https://wa.me/917990392626?text=Hi%20I%20paid%20₹49%20on%20SkillSwap">
                <button>Chat on WhatsApp 💬</button>
            </a>
        </div>
    `;

    closePopup();
}
}

// SHARE
function shareSite() {
    let text = "🔥 Try this website 👉 https://aarchi-27.github.io/skill-exchange/";
    window.location.href = "https://wa.me/?text=" + encodeURIComponent(text);
}

// FAKE USERS
setInterval(() => {
    let random = Math.floor(Math.random() * 10) + 10;
    document.getElementById("usersCount").innerText = "👥 " + random + " people using now";
}, 3000);

// LOAD
window.onload = function () {
    displayUsers();
};
