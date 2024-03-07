import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { doc, getFirestore, collection, getDocs, getAggregateFromServer ,sum} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

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
let perc;
let val;
// Get the progress bars container
const container = document.getElementById('progressBarsContainer');

// Get the vote count data from Firebase
const coll = collection(db, "votecount");
const querySnapshot = await getDocs(collection(db, "votecount"));
const snapshot = await getAggregateFromServer(coll, {
    totalcount: sum("count")
});

const peopleData = [
    { name: "Aishwarya", image: '/images/Aishwarya.webp'},
    { name: "Ankita", image: '/images/Ankita.webp'},
    { name: "Anurag", image: '/images/Anurag.webp'},
    { name: "Firoza", image: '/images/Firoza.webp'},
    { name: "Isha", image: '/images/Isha.webp'},
    { name: "Mannara", image: '/images/Mannara.webp'},
    { name: "Munawar", image: '/images/Munawar.webp'},
    { name: "Neil", image: '/images/Neil.webp'},
    { name: "Samarth", image: '/images/Samarth.webp'},
    { name: "Vicky", image: '/images/Vicky.webp'}
];

// Loop through the query snapshot and create progress bars
querySnapshot.forEach(async (doc) => {
    const count = doc.data().count;
    const perc = (count / snapshot.data().totalcount) * 100;

    // Create a progress bar element
    const progressBar = document.createElement('div');
    progressBar.classList.add('cont'); // Add the class 'cont' for styling

    // Set the percentage value as a data attribute
    progressBar.setAttribute('data-pct', perc.toFixed(1));

    // Create an SVG element and link it to the progress bar
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');

    // Create the background circle
    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('r', '90');
    bgCircle.setAttribute('cx', '100');
    bgCircle.setAttribute('cy', '100');
    bgCircle.setAttribute('fill', 'transparent');
    bgCircle.setAttribute('stroke', '#666');
    bgCircle.setAttribute('stroke-width', '1em');

    // Create the progress circle
    const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    progressCircle.classList.add('bar'); // Add the class 'bar' for styling
    progressCircle.setAttribute('r', '90');
    progressCircle.setAttribute('cx', '100');
    progressCircle.setAttribute('cy', '100');
    progressCircle.setAttribute('fill', 'transparent');
    progressCircle.setAttribute('stroke-linecap','round');
    progressCircle.setAttribute('stroke-dasharray', '565.48');
    progressCircle.setAttribute('stroke-dashoffset', '0');

    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'linear');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '100%');
    linearGradient.setAttribute('y2', '0%');

    // Create stop elements for the linear gradient
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#ffbd23');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#fd7201');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');

    image.setAttribute('src', peopleData[0].image); // Replace with your image path

    imageContainer.appendChild(image);
    progressBar.appendChild(imageContainer);
  
    // Optional: Add name of the person below the bar
    const name = document.createElement('p');
    name.textContent = peopleData[0].name; // Use document ID as name in this case
    
    
    progressBar.appendChild(name);

    // Append stop elements to linear gradient
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);

    // Append linear gradient to SVG element in progress bar
    svg.appendChild(linearGradient);

    // Append circles to the SVG element
    svg.appendChild(bgCircle);
    svg.appendChild(progressCircle);

    // Append the SVG element to the progress bar
    progressBar.appendChild(svg);

    // Append the progress bar to the container
    container.appendChild(progressBar);

    // Update the progress bar asynchronously
    await updateProgressBar(progressBar);
});

async function updateProgressBar(progressBar) {
    const $circle = $(progressBar).find('.bar'); // Select the circle element with class 'bar' inside each '.cont' element
    const r = $circle.attr('r');
    const c = Math.PI * (r * 2);

    const val = parseFloat($(progressBar).attr('data-pct')); // Get the percentage value from 'data-pct' attribute

    const pct = ((100 - val) / 100) * c;

    $circle.css({ strokeDashoffset: pct });
    $circle.addClass('animate');
    
    // Append the image in the middle of the progress bar
    // $(progressBar).append($img);

    
    // $(progressBar).attr('data-pct', val); // Update the 'data-pct' attribute of the current '.cont' element
}