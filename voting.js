function selected(element) {
  // Remove outline from all circles
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('selected');
  });

  // Add outline to the clicked circle
  element.classList.add('selected');
}