document.getElementById('loginBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('username', username);
            window.location.href = 'index.html?page=success';
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Fetch error:', err);
        alert("Server not responding.");
    }
});

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
}

document.body.addEventListener('click', function (e) {
    if (!document.getElementById("sidebar").contains(e.target) && !document.querySelector(".menu-toggle").contains(e.target)) {
        document.getElementById("sidebar").classList.remove("active");
    }
});

const suggestions = [
    // Your suggestions list
];

function showSuggestions(value) {
    const list = document.getElementById("suggestionsList");
    list.innerHTML = "";

    if (value.trim() === "") return;

    const filtered = suggestions.filter(item => item.toLowerCase().includes(value.toLowerCase()));

    filtered.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.onclick = () => {
            document.getElementById("searchInput").value = item;
            list.innerHTML = "";
        };
        list.appendChild(li);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');

    if (page === 'success') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        const username = localStorage.getItem('username') || 'Guest';

        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('mainHeading').style.display = 'none'; // Hide heading

            // Inject the welcome message after login
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.innerHTML = `Hey, ${username}!<br> Something Valuable might just be a Click Away!`;
            }
        }, 2000);
    }
});