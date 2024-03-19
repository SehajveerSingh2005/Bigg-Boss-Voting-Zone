
const videoElements = document.querySelectorAll('video');  // Select all video elements

// Function to create and show the modal
function showVideoModal(videoElement) {
  // Create the modal elements (div and iframe)
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('video-modal');
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', videoElement.src);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', 'true');
    const title=document.createElement('p');
    title.textContent=videoElement.id;
    title.classList.add("title");
    title.innerHTML="Title: "+videoElement.id;
    iframe.appendChild(title);
  // Append the iframe to the modal div
  modalDiv.appendChild(iframe);

  // Add a click event listener to the modal div to close it
  modalDiv.addEventListener('click', function() {
    this.remove();
  });

  // Append the modal div to the body
  document.body.appendChild(modalDiv);
}

videoElements.forEach(video => {
  video.addEventListener('click', function() {
    showVideoModal(this);  // Use `this` to reference the clicked video element
  });
});