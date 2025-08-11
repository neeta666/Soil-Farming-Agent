// /scripts/user-auth.js

import { auth } from "/Soil-Farming-Agent/scripts/firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Form DOM elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showLoginBtn = document.getElementById("showLogin");
const showRegisterBtn = document.getElementById("showRegister");

// Show Login / Register toggle
showLoginBtn.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  showLoginBtn.classList.add("active");
  showRegisterBtn.classList.remove("active");
});

showRegisterBtn.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  showLoginBtn.classList.remove("active");
  showRegisterBtn.classList.add("active");
});

// Register Form Submit
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful!");
    registerForm.reset();
    window.location.href = "/Soil-Farming-Agent/pages/user.html";
  } catch (error) {
    alert("Registration failed: " + error.message);
  }
});

// Login Form Submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    loginForm.reset();
    window.location.href = "/Soil-Farming-Agent/pages/user.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});
