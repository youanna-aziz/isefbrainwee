import { auth, db, storage } from './firebase-config.js';
import { onAuthStateChanged, signOut, updateProfile, deleteUser, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';

const displayName = document.getElementById('displayName');
const profilePic = document.getElementById('profilePic');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const profileForm = document.getElementById('profileForm');
const logoutBtn = document.getElementById('logoutBtn');
const deleteAccount = document.getElementById('deleteAccount');
const profileImageInput = document.getElementById('profileImageInput');
const changePassword = document.getElementById('changePassword');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    displayName.textContent = user.displayName || 'User';
    nameInput.value = user.displayName || '';
    emailInput.value = user.email;

    // تحميل صورة البروفايل من Storage
    try {
      const url = await getDownloadURL(ref(storage, `users/${user.uid}/profile.jpg`));
      profilePic.src = url;
    } catch (e) {
      console.log("No profile image found.");
    }
  } else {
    window.location.href = "login.html";
  }
});

// تغيير الاسم
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  const newName = nameInput.value;
  if (user) {
    await updateProfile(user, { displayName: newName });
    await setDoc(doc(db, "users", user.uid), {
      name: newName,
      email: user.email,
    });
    alert("Profile updated.");
  }
});

// تغيير صورة البروفايل
profileImageInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const user = auth.currentUser;
  const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  profilePic.src = url;
  alert("Profile picture updated!");
});

// تغيير كلمة السر
changePassword.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) {
    sendPasswordResetEmail(auth, user.email)
      .then(() => alert("Password reset email sent!"))
      .catch((error) => alert(error.message));
  }
});

// تسجيل الخروج
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// حذف الحساب
deleteAccount.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (confirm("Are you sure you want to delete your account?")) {
    try {
      await deleteUser(user);
      alert("Account deleted.");
      window.location.href = "signup.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
});
