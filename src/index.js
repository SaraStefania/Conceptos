const word = document.getElementsByClassName('palabra');
const span = document.getElementsByClassName('container-span');

for(i = 0; i < word.length; i++){
word[i].addEventListener('dragstart', (e) =>{
    e.dataTransfer.setData('text/plain', e.target.id)
})
}

for(i = 0; i < span.length; i++ ){
    span[i].addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    span[i].addEventListener('drop', (e) =>{
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const source = document.getElementById(data);
        e.target.appendChild(source);
    })
}

