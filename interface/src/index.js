import peticionParticle from 'peticionParticle';
import './scss/style.scss';
import 'image.js';

document.querySelectorAll('.btn--efecto').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    peticionParticle(event.target.getAttribute('data-route'));
  });
});

