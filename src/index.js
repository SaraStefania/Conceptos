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
    span[i].style.borderBottom = 'none'; 
    span[i].style.padding = '0';
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
         spanChildren[0].classList.add('correct-answer');
   

      } else {
        span[i].style.borderBottom = '1px solid black'; 
        span[i].style.padding = '1vh 4vh';
        originalContainer.appendChild(spanChildren[0]);
      }
    }
  }

  if (correctCount === span.length) {
    correctAlert()
    comprobarBtn.disabled = true;
  } else if (attempts >= maxAttempts) {
    incorrectAlert()
    comprobarBtn.disabled = true;
  }
});

const correctAlert = () => {
    const alert = `
      <div class="alert alert-success" role="alert">
      ¡Felicitaciones! Haz logrado organizar
      correctamente cada uno de los términos y así recordar la definición de la
      arquitectura multiprocesador. Sigue estudiando para ser cada vez mejor.
      </div>
    `;
    document.getElementById('alertContainer').innerHTML = alert;
  }
  const incorrectAlert = () => {
    const alert = `
      <div class="alert alert-danger" role="alert">
      Estudia una vez más la arquitectura procesador e inténtalo de nuevo.
      </div>
    `;
    document.getElementById('alertContainer').innerHTML = alert;
  }