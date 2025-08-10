// login.js

// Get form and message element
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Firebase Auth reference
const auth = firebase.auth();

// Login form submission
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in using Firebase
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to user page
      window.location.href = 'user.html';
    })
    .catch((error) => {
      loginMessage.textContent = error.message;
      loginMessage.style.color = 'red';
    });
});
