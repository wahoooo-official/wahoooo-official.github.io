import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getStorage, ref, uploadBytes, getDownloadURL }
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

import { getFirestore, collection, addDoc }
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAs8HRI5wlch7XTT7kogsVP3a_JYxcvRVc",
  authDomain: "wahoooo-adminpannel.firebaseapp.com",
  databaseURL: "https://wahoooo-adminpannel-default-rtdb.firebaseio.com",
  projectId: "wahoooo-adminpannel",
  storageBucket: "wahoooo-adminpannel.firebasestorage.app",
  messagingSenderId: "720468566572",
  appId: "1:720468566572:web:1261affbc12458285ce789",
  measurementId: "G-KHYC04ZZKD"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nickname = document.getElementById("username").value;
  const email = document.getElementById("useremail").value;
  const file = document.getElementById("scratch-file").files[0];

  if (!file) {
    alert("Seleziona un file.");
    return;
  }

  const storageRef = ref(storage, "scratch/" + Date.now() + "_" + file.name);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "progetti"), {
    nickname,
    email,
    nomeFile: file.name,
    url,
    data: new Date()
  });

  alert("Progetto inviato con successo!");
  form.reset();
});
