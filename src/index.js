const word = document.getElementsByClassName('palabra');
const span = document.getElementsByClassName('container-span');
const comprobarBtn = document.getElementById('comprobarBtn');

let originalContainer = null;
let attempts = 0;
const maxAttempts = 2;
let wordsPlaced = 0;

for (let i = 0; i < word.length; i++) {
  word[i].addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    originalContainer = e.target.parentNode;
  });
}

for (let i = 0; i < span.length; i++) {
  span[i].addEventListener('dragover', (e) => {
    if (e.target.children.length === 0) {
      e.preventDefault();
    }
  });

  span[i].addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const source = document.getElementById(data);
    e.target.appendChild(source);
    wordsPlaced++;

    if (wordsPlaced === span.length) {
        attempts++;
        wordsPlaced = 0; 
    }
  });
}

comprobarBtn.addEventListener('click', () => {
  let correctCount = 0;

  for (let i = 0; i < span.length; i++) {
    const rightWord = span[i].getAttribute('data-word').toLowerCase();
    const spanChildren = span[i].children;

    if (spanChildren.length === 1) {
      const slurredWord = spanChildren[0].textContent.toLowerCase();

      if (slurredWord === rightWord) {
        correctCount++;
      } else {
        originalContainer.appendChild(spanChildren[0]);
      }
    }
  }

  if (correctCount === span.length) {
    alert('¡Todas las palabras son correctas!');
  } else if (attempts >= maxAttempts) {
    comprobarBtn.disabled = true;
  }
});
