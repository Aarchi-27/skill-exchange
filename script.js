let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUser() {
    let name = document.getElementById("name").value;
    let have = document.getElementById("have").value.split(",").map(s => s.trim());
    let want = document.getElementById("want").value.split(",").map(s => s.trim());

    if (!name || !have[0] || !want[0]) {
        alert("Please fill all fields");
        return;
    }

    let user = { name, have, want };
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();
    displayMatches(findMatches(user));
}

function displayUsers() {
    let div = document.getElementById("users");
    div.innerHTML = "";

    users.forEach(u => {
        div.innerHTML += `
        <div class="card">
            <h3>${u.name}</h3>
            <p>Have: ${u.have.join(", ")}</p>
            <p>Want: ${u.want.join(", ")}</p>
        </div>`;
    });
}

function findMatches(currentUser) {
    return users.filter(u =>
        u !== currentUser &&
        u.have.some(skill => currentUser.want.includes(skill))
    );
}

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
            <p>Matching Skills: 🔒 Unlock to view</p>
            <button onclick="unlock()">Unlock ₹49 🔥</button>
        </div>`;
    });
}

function unlock() {
    document.getElementById("paymentPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

function verifyPayment() {
    alert("Contact unlocked 🎉");

    document.getElementById("matches").innerHTML += `
    <div class="card">
        <a href="https://wa.me/917990392626?text=Hi%20I%20paid%20₹49%20on%20SkillSwap">
            <button>Chat on WhatsApp 💬</button>
        </a>
    </div>`;

    closePopup();
}

function shareSite() {
    let text = "🔥 Try this website 👉 https://aarchi-27.github.io/skill-exchange/";
    window.location.href = "https://wa.me/?text=" + encodeURIComponent(text);
}

window.onload = function () {
    displayUsers();
};
