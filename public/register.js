// register.js
const auth = firebase.auth();
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      registerMessage.textContent = "Registration successful. You can now log in.";
      registerMessage.style.color = "green";
      registerForm.reset();
    })
    .catch((error) => {
      registerMessage.textContent = error.message;
      registerMessage.style.color = "red";
    });
});
