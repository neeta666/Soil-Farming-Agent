// /scripts/admin-login.js

import { app, auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const adminEmail = "admin@example.com";

document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (email === adminEmail) {
        window.location.href = "admin.html";
      } else {
        alert("Access denied. You are not the admin.");
        signOut(auth);
      }
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
