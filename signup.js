// signup.js
import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

const form = document.getElementById("signupForm");
const message = document.getElementById("message");
const passwordInput = document.getElementById("password");
const toggleIcon = document.getElementById("togglePassword");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const username = form.username.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      username: username
    });

    message.textContent = "Account created! Redirecting...";

    setTimeout(() => {
      window.location.href = "app2.html";
    }, 1000);

  } catch (error) {
    console.log(error.message);
    message.textContent = error.message;
  }
});
  toggleIcon.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Toggle between eye and eye-slash
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
  });
