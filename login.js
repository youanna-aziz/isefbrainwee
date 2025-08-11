  import { auth } from './firebase-config.js';
  import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");

    // محاولة تسجيل الدخول
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // ✅ تسجيل دخول ناجح
        alert("Login successfully!");
        window.location.href = "app2.html"; // ← غيريها لو عايزة تروحي لصفحة تانية
      })
      .catch((error) => {
        // ❌ أخطاء ممكنة
        if (error.code === "auth/user-not-found") {
          alert("This email can't be found, sign up please!");
          window.location.href = "signup.html"; // ← صفحة التسجيل
        } else if (error.code === "auth/wrong-password") {
          alert("The password is incorrect.");
        } else if (error.code === "auth/too-many-requests") {
          alert("The account has been temporarily disabled due to many incorrect attempts. Try later.");
        } else {
          alert("Error!" + error.message);
        }
      });
  });
    toggleIcon.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Toggle between eye and eye-slash
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
  });
