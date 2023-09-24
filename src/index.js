const word = document.getElementsByClassName('palabra');
const span = document.getElementsByClassName('container-span');
const comprobarBtn = document.getElementById('comprobarBtn');

let originalContainer = null;


for (let i = 0; i < word.length; i++) {
  word[i].addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    originalContainer = e.target.parentNode; 
  });
}

for (let i = 0; i < span.length; i++) {
  span[i].addEventListener('dragover', (e) => {
    if (e.target.children.length === 0 ) {
        e.preventDefault();
      }
  });

  span[i].addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const source = document.getElementById(data);
    e.target.appendChild(source);
  });
}

comprobarBtn.addEventListener('click', () => {
    let correctCount = 0;

    for (let i = 0; i < span.length; i++) {
        const rightWord = span[i].getAttribute('data-word').toLowerCase();
        const spanChildren = span[i].children;

        if (spanChildren.length === 1) {
            const slurredWord = spanChildren[0].textContent.toLowerCase();
            
            if (slurredWord === rightWord ) {
               alert('correct')
            } else {
                originalContainer.appendChild(spanChildren[0]);
            }
        }
    }
});

