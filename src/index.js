const palabra = document.getElementsByClassName('palabra');
const span = document.getElementsByClassName('container-span');

for(i = 0; i < palabra.length; i++){
palabra[i].addEventListener('dragstart', (e) =>{
    e.dataTransfer.setData('text/plain', e.target.id)
})
}


