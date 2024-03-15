import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"
import { doc, setDoc,updateDoc,increment} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


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
const auth = getAuth(app);

// Get reference to individual divs
const cards = document.querySelectorAll('.card');
let selectedcard = null;
const loadingScreen = document.getElementById('loading-screen');
loadingScreen.style.display = 'none';

onAuthStateChanged(auth,(user)=>{

  const signoutbtn = document.getElementById( 'signoutbtn' );
  loadingScreen.style.display = 'block';

  if (user) {
      loadingScreen.style.display = 'none';
      signoutbtn.style.display='block';
  }
  else{
      window.location.href = 'signup.html';
  }
})

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
const voteddiv = document.getElementById('votedmsg')

function thanksforvote(){
  voteddiv.classList.add('msg')

  setTimeout(function(){
    voteddiv.classList.remove('msg');
  },5000);
}

function disablebtn(){
  votebtn.classList.add('disable')

  setTimeout(function(){
    votebtn.classList.remove('disable');
  },5000);
}

votebtn.addEventListener("click",castvote);

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
  thanksforvote();
  disablebtn();
}

const signOutUser = () => {
  auth.signOut().then(() => {
      // Sign-out successful.
      console.log('User signed out successfully');
      // You can redirect the user to another page or perform any other actions after sign-out
  }).catch((error) => {
      // An error happened.
      console.error('Sign-out error:', error);
  });
};

const signoutbtn = document.getElementById( 'signoutbtn' );

signoutbtn.addEventListener( 'click', signOutUser, false ) ;
