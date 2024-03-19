import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { doc, getFirestore, collection, getDocs, getAggregateFromServer ,sum,where,query} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"
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
const votedref = collection(db, "votedfor");
const userRef = collection(db,"users");

let username;
let email;
let phone;

const loadingScreen = document.getElementById('loading-screen');
loadingScreen.style.display = 'none';

function updateProfileMenu(userName,emailid,phn) {
    const menuElement = document.getElementById('profiledropdown').querySelector('.menu h3');
    const userprofilename = document.getElementById("username");
    const emailelement = document.getElementById("email");
    const numberelement = document.getElementById("phn");
    menuElement.textContent = userName;
    userprofilename.textContent = userName;
    emailelement.textContent = emailid;
    numberelement.textContent = phn;
  }

onAuthStateChanged(auth,(user)=>{

    const profiledrop = document.getElementById( 'profiledropdown' );
    loadingScreen.style.display = 'block';
  
    if (user) {
        loadingScreen.style.display = 'none';
        profiledrop.style.display='block';
        const userId = user.uid;
        fetchUserinfo(userId);

    }
    else{
        window.location.href = 'signup.html';
    }
  })

  async function fetchUserinfo(userId,email,phone) { 
  
    const q = query(collection(db,'users'), where("UID","==",userId)) // Access the user document based on ID
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    username = doc.data().Username;
    email = doc.data().Email;
    phone = doc.data().Phone;
    updateProfileMenu(username,email,phone);
  });
  retrieveVotedforData();
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


  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
    console.log('active');
  }
  
  const profile = document.getElementById("profile");
  
  profile.addEventListener( "click", menuToggle);

async function retrieveVotedforData(){
    const q = query(collection(db,'votedfor'),where("Username","==",username))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc)=> {
        const votedForData = doc.data();
        console.log(votedForData);
        const votedHistoryContainer = document.getElementById('voted-history')
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card2');

        // Username (optional)
        const userNameElement = document.createElement('h1');
        userNameElement.classList.add('name2');
        userNameElement.textContent = `Dear ${votedForData.Username}`; // Assuming username exists
        cardDiv.appendChild(userNameElement);

        // Voted For
        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');
        const descP = document.createElement('p');
        descP.textContent = 'You\'ve voted for';
        descDiv.appendChild(descP);
        cardDiv.appendChild(descDiv);

        // const avatarDiv = document.createElement('div');
        // avatarDiv.classList.add('avatar2');
        // const avatarImg = document.createElement('img');
        // avatarImg.src = 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'; // Placeholder image
        // avatarImg.alt = '';
        // avatarImg.classList.add('img');
        // avatarDiv.appendChild(avatarImg);
        // cardDiv.appendChild(avatarDiv);

        const voteDiv = document.createElement('div');
        voteDiv.classList.add('vote');
        const voteP = document.createElement('p');
        voteP.textContent = votedForData.contestant;
        voteDiv.appendChild(voteP);
        cardDiv.appendChild(voteDiv);

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        const timeP = document.createElement('p');
        timeP.textContent = votedForData.time;
        timeDiv.appendChild(timeP);
        cardDiv.appendChild(timeDiv);

        votedHistoryContainer.appendChild(cardDiv);
    })
}
