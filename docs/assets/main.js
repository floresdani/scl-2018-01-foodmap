window.onload = (() => {
  const ppalView = document.getElementById('principalView');
  const splashView = document.getElementById('splash');
// Función de vista splash
  setTimeout(function hide() {
    ('splash');
    splashView.style.display = 'none';
    ppalView.style.display = 'block';
  }, 3000);

  initMap();
 });



