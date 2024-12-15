// Quiz Logic
let coinBalance = 0;
let questionCount = 0; // Count for total number of questions answered (tama o mali)
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const coinDisplay = document.getElementById("coin-balance");

// Function to generate random questions
function generateQuestion() {
    const num1 = Math.floor(Math.random() * (999 - 10) + 10);
    const num2 = Math.floor(Math.random() * (999 - 10) + 10);
    questionText.textContent = `${num1} + ${num2} = ?`;
    return num1 + num2;
}

let correctAnswer = generateQuestion();

// Function to show ad
function showAd() {
    console.log("Ad is being shown...");
    const adContainer = document.createElement("div");
    adContainer.innerHTML = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5513582615020224" crossorigin="anonymous"></script>
        <!-- Jimad -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-5513582615020224"
             data-ad-slot="3003742365"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
    // Append the ad to the page (ads-container)
    document.getElementById("ads-container").appendChild(adContainer);
}

submitBtn.addEventListener("click", () => {
    // Increment the question count regardless of whether the answer is correct or incorrect
    questionCount++;

    if (parseInt(answerInput.value) === correctAnswer) {
        coinBalance += 2;
        alert("Correct!");
    } else {
        alert("Wrong!");
    }

    coinDisplay.textContent = coinBalance;
    correctAnswer = generateQuestion();
    answerInput.value = "";

    // Show ad after every 7 questions
    if (questionCount % 7 === 0) {
        console.log("Showing ad after 7 questions...");
        showAd(); // Call the function to show the ad
    }
});
// User Icon Logic Login/Signup Form
// User Icon Logic Login/Signup Form

// Elements
const modal = document.getElementById("user-modal");
const closeModal = document.getElementById("close-modal");
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");

const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupBtn = document.getElementById("signup-btn");

const userIcon = document.getElementById("user-icon");
const headerBalance = document.getElementById("header-balance");

// Simulated Database
const users = JSON.parse(localStorage.getItem("users")) || [];

// Close Modal Function
function closeUserModal() {
    modal.style.display = "none";
}

// Show Modal when User Icon is Clicked
userIcon.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close Modal
closeModal.addEventListener("click", closeUserModal);

// Switch Between Login and Sign-Up Forms
showSignup.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
});

showLogin.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
});

// Close Modal When Clicking Outside the Content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeUserModal();
    }
});

// Sign-Up Logic
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    if (!email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    // Check if User Already Exists
    if (users.some((user) => user.email === email)) {
        alert("User already exists! Please login.");
        return;
    }

    // Add User to Database
    const newUser = { email, password, username: email.split("@")[0] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-Up Successful! Logging you in...");
    saveUserSession(newUser);
    closeUserModal();
    updateUserIcon();
});

// Login Logic
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    // Authenticate User
    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        alert("Login Successful!");
        saveUserSession(user);
        closeUserModal();
        updateUserIcon();
    } else {
        alert("Invalid email or password.");
    }
});

// Save User Session to LocalStorage
function saveUserSession(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

// Get Logged-In User
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

// Update User Icon in the Header
function updateUserIcon() {
    const user = getLoggedInUser();
    if (user) {
        headerBalance.textContent = `${user.username}`;
        userIcon.innerHTML = `<i class="fas fa-user-circle"></i> ${user.username}`;
    } else {
        // Default user icon when not logged in
        userIcon.innerHTML = `<i class="fas fa-user"></i>`;
        headerBalance.textContent = "";
    }
}

// Auto-Update User Icon on Page Load
document.addEventListener("DOMContentLoaded", () => {
    updateUserIcon();
});

/* Cash Out Modal */

// Simulated User Data After Login
const loggedInUser = {
    username: "Juan Dela Cruz", // Dynamic: Username ng user na naka-log in
    email: "juan.delacruz@example.com", // Dynamic: Email ng user na naka-log in
};

// Variables
const coinBalanceElement = document.getElementById('coin-balance');
const cashOutForm = document.getElementById('cash-out-form');
const closeCashOutModal = document.getElementById('close-cashout-modal');
const userCoinsDisplay = document.getElementById('user-coins');
const usdEquivalentDisplay = document.getElementById('usd-equivalent');
const amountInput = document.getElementById('amount');
const submitCashOutButton = document.getElementById('submit-cash-out');

// Default Coin Balance (In Points)
let userCoins = 0; // Default value kapag wala pang points
coinBalanceElement.textContent = userCoins;

// Show the Cash Out Form when Coin Balance is clicked
coinBalanceElement.addEventListener('click', () => {
    userCoinsDisplay.textContent = userCoins;
    let usdEquivalent = (userCoins / 1000).toFixed(2); // 1000 points = 1 USD
    usdEquivalentDisplay.textContent = usdEquivalent;
    cashOutForm.style.display = 'block'; // Show Cash Out Form
});

// Close Cash Out Modal
closeCashOutModal.addEventListener('click', () => {
    cashOutForm.style.display = 'none';
});

// Handle Cash Out Request
submitCashOutButton.addEventListener('click', (e) => {
    e.preventDefault();

    const cashOutAmount = parseInt(amountInput.value);
    const gcashName = document.getElementById('gcash-name').value;
    const gcashNumber = document.getElementById('gcash-number').value;
    
    // Validate the points entered by the user
    if (cashOutAmount < 2000 || cashOutAmount > 5000) {
        alert("Cash out amount must be between 2000 and 5000 points.");
        return;
    }

    // Deduct points and send email request
    if (userCoins >= cashOutAmount) {
        userCoins -= cashOutAmount;
        coinBalanceElement.textContent = userCoins; // Update balance

        // Notify Admin via Email
        sendCashOutRequestToEmail(loggedInUser.username, loggedInUser.email, cashOutAmount, gcashName, gcashNumber);

        // Notify User Success
        alert('Cash out request received! Please wait 1-3 days for processing.');
        
        // Close Cash Out Modal
        cashOutForm.style.display = 'none';
    } else {
        alert('Not enough points for cash out.');
    }
});

// Email Function
function sendCashOutRequestToEmail(username, email, amount, gcashName, gcashNumber) {
    const usdEquivalent = (amount / 1000).toFixed(2);

    // Example email content
    const emailContent = {
        to_email: 'cincojims17@gmail.com',
        subject: 'Cash Out Request',
        message: `User: ${username}
Email: ${email}
Requested Cash Out: ${amount} points
USD Equivalent: ${usdEquivalent} USD
G-Cash Name: ${gcashName}
G-Cash Number: ${gcashNumber}`
    };

    // Example of sending email with EmailJS or logging for testing
    console.log("Sending email with content:", emailContent);

    // If integrated with EmailJS:
    // emailjs.send("service_id", "template_id", emailContent)
    //    .then(response => console.log("Email sent!", response))
    //    .catch(error => console.error("Error sending email:", error));
}

/* For Notification Icon */
// Elements
const notificationIcon = document.getElementById('notification-icon');
const notificationBadge = document.getElementById('notification-badge');
const notificationDropdown = document.getElementById('notification-dropdown');
const notificationList = document.getElementById('notification-list');

// Simulated notifications (could come from API or localStorage)
let notifications = [];

// Function to display notifications in the dropdown
function displayNotifications() {
    notificationList.innerHTML = ''; // Clear previous notifications

    if (notifications.length === 0) {
        notificationDropdown.style.display = 'none';  // Hide dropdown if no notifications
        notificationBadge.style.display = 'none';     // Hide badge if no notifications
    } else {
        notifications.forEach((notification) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = notification.message;
            li.appendChild(p);
            notificationList.appendChild(li);
        });

        // Update badge count
        notificationBadge.textContent = notifications.length;
        notificationBadge.style.display = 'block';  // Show badge if there are notifications
        notificationDropdown.style.display = 'block'; // Show dropdown if there are notifications
    }
}

// Show the notification dropdown when icon is clicked
notificationIcon.addEventListener('click', () => {
    if (notificationDropdown.style.display === 'block') {
        notificationDropdown.style.display = 'none';
    } else {
        notificationDropdown.style.display = 'block';
    }
});

// Function to simulate successful cash-out and payment
function triggerNotification(type, message) {
    // Add new notification
    notifications.push({ type, message });

    // Display the updated notifications
    displayNotifications();
}

// Simulating cash-out success
function cashOutSuccess() {
    triggerNotification('cash-out', 'Your cash-out request was successful!');
}

// Simulating payment success
function paymentSuccess() {
    triggerNotification('payment', 'Your payment was successfully processed!');
}

// Call the functions to simulate events
// Only call these functions when there is an actual event (e.g., user action)
cashOutSuccess();
paymentSuccess();