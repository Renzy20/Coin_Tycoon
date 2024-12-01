const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const loginMode = document.getElementById('loginMode');
const registerMode = document.getElementById('registerMode');
const loginSubmit = document.getElementById('loginSubmit');
const registerSubmit = document.getElementById('registerSubmit');
const loginSuccess = document.getElementById('loginSuccess');
const welcomeMessage = document.getElementById('welcomeMessage');
const okayButton = document.getElementById('okayButton');
const invalidBttn = document.getElementById('invalidBttn');
const invalidMessage = document.getElementById('invalidMessage');
const invalidButton = document.getElementById('invalidButton');
const enterAccount = document.getElementById('enterAccount');
const invalidRegister = document.getElementById('invalidRegister');
const emptyRegisterAccount = document.getElementById('emptyRegisterAccount');
const emptyButton = document.getElementById('emptyButton');
const registerSuccess = document.getElementById('registerSuccess');
const successRegister = document.getElementById('successRegister');
const successButton = document.getElementById('successButton');
const usernameExists = document.getElementById('usernameExists');
const userExists = document.getElementById('userExists');
const userButton = document.getElementById('userButton');
const passNotMatch = document.getElementById('passNotMatch');
const pssNotMatch = document.getElementById('pssNotMatch');
const notMatchButton = document.getElementById('notMatchButton');
const emptyAccount = document.getElementById('emptyAccount');
const emptyMessage = document.getElementById('emptyMessage');
const emptyBttn = document.getElementById('emptyBttn');

// Open Mode
loginButton.addEventListener('click', () => {
    loginMode.style.display = 'flex';
});

registerButton.addEventListener('click', () => {
    registerMode.style.display = 'flex';
});

// Close Mode on outside click
window.addEventListener('click', (e) => {
    if(e.target === loginMode) loginMode.style.display = 'none';
    if(e.target === registerMode) registerMode.style.display = 'none';
});

// Store accounts in localStorage
const accountsKey = 'accounts';

// Register User
document.getElementById('registerSubmit').addEventListener('click', () => {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Reset all message states
    emptyRegisterAccount.textContent = '';
    invalidRegister.style.display = 'none';
    successRegister.style.display = 'none';
    usernameExists.style.display = 'none';
    registerMode.style.display = 'none';
    passNotMatch.style.display = 'none';

    if (!username || !password) {
        // alert('Please enter a username and password.');
        // Pop up empty register account
        emptyRegisterAccount.textContent = 'Please enter a username and password.';
        invalidRegister.style.display = 'flex';

        // Ensure the "Invalid" button closes the popup
        emptyButton.removeEventListener('click', emptyClickHandler);
        emptyButton.addEventListener('click', emptyClickHandler);
        return;
    }

    if (password !== confirmPassword) {
        // alert('Passwords do not match!');
        pssNotMatch.textContent = 'Password do not match!';
        passNotMatch.style.display = 'flex';

        notMatchButton.removeEventListener('click', passClickHandler);
        notMatchButton.addEventListener('click', passClickHandler);
        return;
    }

    const accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];

    // Check if username already exists
    if (accounts.some(account => account.username === username)) {
        // alert('Username already exists!');
        userExists.textContent = 'Username already exists!';
        usernameExists.style.display = 'flex';

        userButton.removeEventListener('click', userClickHandler);
        userButton.addEventListener('click', userClickHandler);
        return;
    }

    // Save new account
    accounts.push({ username, password });
    localStorage.setItem(accountsKey, JSON.stringify(accounts));

    // alert('Registration successful!');
    // Pop up Register Successful
    registerSuccess.textContent = 'Registration successful!';
    successRegister.style.display = 'flex';

    successButton.removeEventListener('click', successClickHandler);
    successButton.addEventListener('click', successClickHandler);
});

// Define handlers for closing the messages
const emptyClickHandler = () => {
    const invalidRegister = document.getElementById('invalidRegister');
    invalidRegister.style.display = 'none';
};

const successClickHandler = () => {
    successRegister.style.display = 'none';
    registerMode.style.display = 'none';
};

const userClickHandler = () => {
    usernameExists.style.display = 'none';
};

const passClickHandler = () => {
    passNotMatch.style.display = 'none';
};

// Login User
document.getElementById('loginSubmit').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        // alert('Please enter a username and password.');
        // Clear success message
        loginSuccess.style.display = 'none'

        // Pop up the empty account error
        emptyMessage.textContent = 'Please enter a username and password.';
        emptyAccount.style.display = 'flex';

        // Add event listener for "Invalid" button only once
        emptyBttn.removeEventListener('click', emtyClickHandler);
        emptyBttn.addEventListener('click', emtyClickHandler);
        return;
    }

    const accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];
    const user = accounts.find(account => account.username === username && account.password === password);

    if (user) {
        // // Clear invalid message
        // enterAccount.textContent = 'Wrong password!';
        // invalidBttn.style.display = 'none';

        // Show success message
        welcomeMessage.textContent = `Log in Successful! Welcome, ${username}`;
        loginSuccess.style.display = 'flex';

        // Add event listener for "Okay" button only once
        okayButton.removeEventListener('click', okayClickHandler); // Remove previous handler if it exists
        okayButton.addEventListener('click', okayClickHandler);

    } else {
        // Clear success message
        loginSuccess.style.display = 'none';

        // Show invalid message
        invalidMessage.textContent = 'Invalid username or password';
        invalidBttn.style.display = 'flex';

        // Add event listener for "Invalid" button only once
        invalidButton.removeEventListener('click', invalidClickHandler); // Remove previous handler if it exists
        invalidButton.addEventListener('click', invalidClickHandler);
    }
});

// Define the handlers outside the login logic to avoid duplicates
const okayClickHandler = () => {
    loginSuccess.style.display = 'none';
    window.location.href = 'MainGame.html'; // Redirect to game page
};

const invalidClickHandler = () => {
    invalidBttn.style.display = 'none';
};

const emtyClickHandler = () => {
    const emptyAccount = document.getElementById('emptyAccount');
    emptyAccount.style.display = 'none';
};

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
