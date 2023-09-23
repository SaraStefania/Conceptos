const palabra = document.getElementsByClassName('palabra');
const span = document.getElementsByClassName('container-span');

for(i = 0; i < palabra.length; i++){
palabra[i].addEventListener('dragstart', (e) =>{
    e.dataTransfer.setData('text/plain', e.target.id)
})
}
for(i = 0; i < span.length; i++ ){
    span[i].addEventListener("dragover", (ev) => {
        console.log("dragOver");
        ev.preventDefault();
      });
}

