import 'peticionParticle';
import './scss/style.scss';
import 'image.js';

var element = document.getElementById('azul');

function movida(){
  console.log('movida');
}

element.onclick = movida;
