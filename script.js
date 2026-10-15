function showSignup() {
    document.getElementById("heading").innerText = "Sign Up";
    document.getElementById("name").hidden = false;

    document.querySelector(".box button").innerText = "Sign Up";

    document.getElementById("switchText").innerHTML =
        'Already registered? <a href="#" onclick="showLogin()">Login</a>';
}

function showLogin() {
    document.getElementById("heading").innerText = "Login";
    document.getElementById("name").hidden = true;

    document.querySelector(".box button").innerText = "Login";

    document.getElementById("switchText").innerHTML =
        'New user? <a href="#" onclick="showSignup()">Sign Up</a>';
}

function login() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let signup = document.getElementById("name").hidden === false;

    if (!email || !password || (signup && !name)) {
        document.getElementById("message").innerText =
            "Please fill in all details.";
        return;
    }

    if (signup) {
        if (users.some(user => user.email === email)) {
            document.getElementById("message").innerText =
                "Email already registered.";
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! Please login.");
        document.getElementById("name").value = "";
        document.getElementById("password").value = "";
        showLogin();
        return;
    }

    let user = users.find(
        user => user.email === email && user.password === password
    );

    if (user) {
        document.getElementById("loginBox").hidden = true;
        document.getElementById("products").hidden = false;
    } else {
        document.getElementById("message").innerText =
            "Invalid email or password.";
    }
}

function logout() {
    document.getElementById("products").hidden = true;
    document.getElementById("loginBox").hidden = false;

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("message").innerText = "";

    showLogin();
}