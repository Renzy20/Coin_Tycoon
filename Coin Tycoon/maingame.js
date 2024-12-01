// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable specific key combinations
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' || // Disable F12
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Disable Ctrl+Shift+I (DevTools)
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Disable Ctrl+Shift+J (Console)
        (e.ctrlKey && e.key === 'U') // Disable Ctrl+U (View Source)
    ) {
        e.preventDefault();
    }
});

// Function to generate a unique key for each user's data based on their username
const getUserKey = (key) => `user_${user.username}_${key}`;

// Simulate user data (you can replace with actual user data from registration/login)
const user = {
    username: localStorage.getItem('username') || "Player1", // Default to "Player1" if no user is logged in
    avatar: localStorage.getItem('avatar') || "avatar.jpg", // Default avatar if no avatar saved
    lastUsernameChange: localStorage.getItem('lastUsernameChange') ? new Date(localStorage.getItem('lastUsernameChange')) : null,
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Initialize user data (load user data from localStorage if available, otherwise set defaults)
let balance = parseFloat(localStorage.getItem(getUserKey('balance'))) || 0;
let increment = parseFloat(localStorage.getItem('increment')) || 0.001;

// Update the balance display
const balanceDisplay = document.getElementById('balance');
balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

// Coin click event to increase balance
const coin = document.getElementById('tap-coin');
coin.addEventListener('click', () => {
    balance += increment;

    // Update the balance display
    balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

    // Save the new balance to localStorage for the current user
    localStorage.setItem(getUserKey('balance'), balance.toFixed(3));
});

// Upgrade buttons
const purchaseButton1 = document.getElementById('purchaseButton1');
const purchaseButton2 = document.getElementById('purchaseButton2');
const purchaseButton3 = document.getElementById('purchaseButton3');

// Upgrade purchase logic
purchaseButton1.addEventListener('click', () => purchaseUpgrade(0.001, 100));
purchaseButton2.addEventListener('click', () => purchaseUpgrade(0.010, 1000));
purchaseButton3.addEventListener('click', () => purchaseUpgrade(0.100, 10000));

function purchaseUpgrade(amount, cost) {
    if(balance >= cost) {
        balance -= cost;
        increment += amount;

        // Update the balance display
        balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

        // Save the new balance to local storage
        localStorage.setItem('balance', balance);
        localStorage.setItem('increment', increment);

        // alert(`Upgrade purchased! +$${balance.toFixed(3)} per click.`);
        // Pop up the cost purchase
        purchaseMessage1.textContent = `Upgrade purchased! +$${amount.toFixed(3)} per click.`;
        successPurchase.style.display = 'flex';

        // Click handler
        successButton.removeEventListener('click', purchaseClickHandler);
        successButton.addEventListener('click', purchaseClickHandler);
    } else {
        // alert('Not enough balance to purchase this upgrade!');
        // Pop up the not success purchase
        notSuccess.textContent = 'Not enough balance to purchase this upgrade!';
        notSuccessPurchase.style.display = 'flex';

        // Click Handler
        notSuccessButton.removeEventListener('click', notsuccessClickHandler);
        notSuccessButton.addEventListener('click', notsuccessClickHandler);
    }
}

const purchaseClickHandler = () => {
    const successPurchase = document.getElementById('successPurchase');
    successPurchase.style.display = 'none';
    firstBuy.style.display = 'none';
};

const notsuccessClickHandler = () => {
    const notSuccessPurchase = document.getElementById('notSuccessPurchase');
    notSuccessPurchase.style.display = 'none';
    firstBuy.style.display = 'none';
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DOM Elements
const usernameElement = document.getElementById('username');
const avatarElement = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');
const newUsernameInput = document.getElementById('newUsername');
const saveUsernameButton = document.getElementById('saveUsername');
const timeOnlineElement = document.getElementById('time-online');
const logoutButton = document.getElementById('logout');
const logoutContainer = document.getElementById('logoutContainer');
const logoutMessage = document.getElementById('logoutMessage');
const loButton = document.getElementById('loButton');
const userChangeLimit = document.getElementById('userChangeLimit');
const limitMessage = document.getElementById('limitMessage');
const daysButton = document.getElementById('daysButton');
const usernameUpdated = document.getElementById('usernameUpdated');
const userUpdateMessage = document.getElementById('userUpdateMessage');
const userUpdateButton = document.getElementById('userUpdateButton');
const validUsername = document.getElementById('validUsername');
const validMessage = document.getElementById('validMessage');
const validButton = document.getElementById('validButton');
const upgradeButton1 = document.getElementById('upgradeButton1');
const firstBuy = document.getElementById('firstBuy');
const upgradeButton2 = document.getElementById('upgradeButton2');
const secondBuy = document.getElementById('secondBuy');
const upgradeButton3 = document.getElementById('upgradeButton3');
const thirdBuy = document.getElementById('thirdBuy');
const successPurchase = document.getElementById('successPurchase');
const purchaseMessage1 = document.getElementById('purchaseMessage1');
const successButton = document.getElementById('successButton');
const notSuccessPurchase = document.getElementById('notSuccessPurchase');
const notSuccess = document.getElementById('notSuccess');
const notSuccessButton = document.getElementById('notSuccessButton');

// Display user data
usernameElement.textContent = user.username;
// avatarElement.src = 'path/to/static/avatar.jpg'; // Test with a static image URL

// // Initialize Avatar
// document.addEventListener('DOMContentLoaded', () => {
//     const savedAvatar = localStorage.getItem(getUserKey('avatar'));
//     console.log('Loaded saved avatar:', savedAvatar); // Debugging step
//     if (savedAvatar) {
//         avatarElement.src = savedAvatar; // Set the avatar to the saved image from localStorage
//     } else {
//         console.log('No saved avatar found.');
//     }
// });

// // Handle Avatar Change
// avatarElement.addEventListener('click', () => {
//     avatarInput.click();
// });

// // Handle Avatar Change (when file is selected)
// avatarInput.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         console.log('File selected:', file); // Debugging step
//         const reader = new FileReader();
//         reader.onload = () => {
//             const newAvatar = reader.result;
//             avatarElement.src = newAvatar;
//             localStorage.setItem(getUserKey('avatar'), newAvatar);
//         };
//         reader.readAsDataURL(file);
//     } else {
//         console.log('No file selected'); // Debugging step
//     }
// });

// // Optionally, hide the file input element (to avoid visual interference)
avatarInput.style.display = 'none'; // Hide the input element

// Handle Username Change
saveUsernameButton.addEventListener('click', () => {
    const newUsername = newUsernameInput.value.trim();
    const currentDate = new Date();

    // Check if username can be changed
    if (user.lastUsernameChange) {
        const daysSinceChange = Math.floor((currentDate - user.lastUsernameChange) / (1000 * 60 * 60 * 24));

        if (daysSinceChange < 60) {
            // alert(`You can only change your username every 60 days. Please try again in ${60 - daysSinceChange} days.`);
            // Pop up username change limit
            limitMessage.textContent = `You can only change your username every 60 days. Please try again in ${60 - daysSinceChange} days.`;
            userChangeLimit.style.display = 'flex';

            daysButton.removeEventListener('click', dayslimitClickHandler);
            daysButton.addEventListener('click', dayslimitClickHandler);
            return;
        }
    }

    if (newUsername) {
        // Save the new username
        usernameElement.textContent = newUsername;
        localStorage.setItem('username', newUsername);
        localStorage.setItem('lastUsernameChange', currentDate.toISOString());
        user.username = newUsername;
        user.lastUsernameChange = currentDate;

        // Update balance and other data for the new username
        balance = parseFloat(localStorage.getItem(getUserKey('balance'))) || 0.0;
        balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

        // alert('Username successfully updated!');
        // Pop up update message
        userUpdateMessage.textContent = 'Username successfully updated!';
        usernameUpdated.style.display = 'flex';

        userUpdateButton.removeEventListener('click', userupdateClickHandler);
        userUpdateButton.addEventListener('click', userupdateClickHandler);
    } else {
        // alert('Please enter a valid username');
        // Pop up the valid username
        validMessage.textContent = 'Please enter a valid username';
        validUsername.style.display = 'flex';

        validButton.removeEventListener('click', validusernameClickHandler);
        validButton.addEventListener('click', validusernameClickHandler);
    }
});

// Time Online Tracking
let secondsOnline = parseInt(localStorage.getItem(getUserKey('timeOnline'))) || 0;

const updateTimer = () => {
    secondsOnline++;
    timeOnlineElement.textContent = `Time online: ${secondsOnline} seconds`;
    localStorage.setItem(getUserKey('timeOnline'), secondsOnline); // Save the time online for the current user
};
const timerInterval = setInterval(updateTimer, 1000);

// Log out Button Functionality
logoutButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    // alert('You have logged out!');
    logoutMessage.textContent = 'You have logged out!';
    logoutContainer.style.display = 'flex';

    loButton.removeEventListener('click', logoutClickHandler);
    loButton.addEventListener('click', logoutClickHandler);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Button Functionality
const profileButton = document.getElementById('profileButton');
const profileMode = document.getElementById('profileMode');
const marketButton = document.getElementById('marketButton');
const marketMode = document.getElementById('marketMode');

// Open Profile Mode
marketButton.addEventListener('click', () => {
    marketMode.style.display = 'flex';
});

profileButton.addEventListener('click', () => {
    profileMode.style.display = 'flex';
});

// Close Mode when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === profileMode) profileMode.style.display = 'none';
    if (e.target === marketMode) marketMode.style.display = 'none';
    if (e.target === automineBuy) automineBuy.style.display = 'none';
});

// Upgrade Button Functionally
const upgradeButton = document.getElementById('upgradeButton');
const upgradeMode = document.getElementById('upgradeMode');

// Open Upgrade Mode
upgradeButton.addEventListener('click', () => {
    upgradeMode.style.display = 'flex';
});

// Close Upgrade Mode when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === upgradeMode) upgradeMode.style.display = 'none';
    if (e.target === firstBuy) firstBuy.style.display = 'none';
    if (e.target === secondBuy) secondBuy.style.display = 'none';
    if (e.target === thirdBuy) thirdBuy.style.display = 'none';
    if (e.target === logoutContainer) logoutContainer.style.display = 'none';
});

// Purchase Upgrade Container
upgradeButton1.addEventListener('click', () => {
    firstBuy.style.display = 'flex';
});

upgradeButton2.addEventListener('click', () => {
    secondBuy.style.display = 'flex';
});

upgradeButton3.addEventListener('click', () => {
    thirdBuy.style.display = 'flex';
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define the click handler
const logoutClickHandler = () => {
    logoutContainer.style.display = 'none';
    window.location.href = 'CoinGame.html';
};

const dayslimitClickHandler = () => {
    userChangeLimit.style.display = 'none';
};

const userupdateClickHandler = () => {
    usernameUpdated.style.display = 'none';
};

const validusernameClickHandler = () => {
    validUsername.style.display = 'none';
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const autoBuyBttn = document.getElementById('autoBuyBttn');
const automineBuy = document.getElementById('automineBuy');
const priceCost = document.getElementById('priceCost');

autoBuyBttn.addEventListener('click', () => {
    priceCost.textContent = 'Cost: $2000';
    automineBuy.style.display = 'flex';
});

// Initialize default value
const itemCost = 2000;
const automineIncrement = parseFloat(localStorage.getItem(getUserKey("autoIncrement"))) || 0.500;

// Check if automine is already purchased
let automineActive = localStorage.getItem(getUserKey("automineActive")) === "true";

// Automine Function
function startAutomine() {
    if (automineActive) {
        setInterval(() => {
            balance += automineIncrement;
            localStorage.setItem(getUserKey("balance"), balance.toFixed(3)); // Save updated balance
            updateUI();
        }, 1000); // Increment every second
    }
}

// Purchase Automine
const automineButton = document.getElementById("automineButton");
automineButton.addEventListener("click", () => {
    if (balance >= itemCost) {
        balance -= itemCost;
        automineActive = true; // Mark automine as active
        localStorage.setItem(getUserKey("automineActive"), "true"); // Save automine status
        localStorage.setItem(getUserKey("balance"), balance.toFixed(3)); // Save updated balance
        localStorage.setItem(getUserKey("autoIncrement"), automineIncrement); // Save automine increment value
        updateUI();
        startAutomine();
        alert("Automine purchased! You now earn $0.100 per second");
    } else {
        alert("Not enough money to purchase Automine!");
    }
});

// Function to update the UI
function updateUI() {
    balanceDisplay.innerText = `Balance: $${balance.toFixed(3)}`;
    automineButton.disabled = automineActive;
    automineButton.innerText = automineActive ? "Purchased" : "Purchase";
}

// Calculate and apply automine progress when coming back online
function applyOfflineAutomine() {
    const currentTimestamp = Date.now();
    const timeOffline = (currentTimestamp - lastOnlineTimestamp) / 1000; // Time offline in seconds
    const earnedOffline = timeOffline * automineIncrement;

    if (earnedOffline > 0) {
        balance += earnedOffline;
        localStorage.setItem(getUserKey("balance"), balance.toFixed(3)); // Save updated balance
        updateUI();
    }

    lastOnlineTimestamp = currentTimestamp;
    localStorage.setItem(getUserKey("lastOnlineTimestamp"), lastOnlineTimestamp.toString());
}

// Initialize the UI and automine
window.onload = () => {
    updateUI();
    if (automineActive) startAutomine();

    // Apply automine progress if the user was offline
    applyOfflineAutomine();
};