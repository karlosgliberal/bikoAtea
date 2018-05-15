import Particle from 'particle-api-js';

const peticionParticle = route => {
  var particle = new Particle();
  var fnPr = particle.callFunction({
    deviceId: '330024001747343338333633',
    name: 'routest',
    argument: route,
    auth: '18ac8c8ca8c8fc6d0204c1042729b5f90040dc57'
  });
  fnPr.then(
    function(data) {
      console.log('Function called succesfully:', data);
    },
    function(err) {
      console.log('An error occurred:', err);
    }
  );
};
export default peticionParticle;
