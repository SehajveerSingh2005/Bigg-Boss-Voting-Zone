import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"
import { doc, setDoc,updateDoc,increment} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDXIajxTK_g31he872G4xnM-nlZ9cmfz6k",
  authDomain: "bigg-boss-voting-zone.firebaseapp.com",
  databaseURL: "https://bigg-boss-voting-zone-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bigg-boss-voting-zone",
  storageBucket: "bigg-boss-voting-zone.appspot.com",
  messagingSenderId: "798018597331",
  appId: "1:798018597331:web:bc3f21b7e43acdffd2ff26",
  measurementId: "G-NPR5T4V3E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get reference to individual divs
const cards = document.querySelectorAll('.card');
let selectedcard = null;

// Add click event listener to each individual to handle selection
cards.forEach((card) => {
  card.addEventListener('click', () => {
      if (selectedcard) {
          selectedcard.classList.remove('selected');
      }
      selectedcard = card;
      selectedcard.classList.add('selected');
  });
});

const votebtn = document.getElementById("votebtn")

document.getElementById("votebtn").addEventListener("click",castvote,{once:true});
const disableTarget = () => {
  votebtn.classList.add("disable")
}
document.getElementById("votebtn").addEventListener("click", disableTarget);

function castvote() {
  if (!selectedcard) {
      alert('Please select a contestant to vote.');
      return;
  }

  const cardId = selectedcard.id;
  const votecountRef = doc(db,"votecount",cardId)

  updateDoc(votecountRef,{
    count: increment(1)
  })
}
