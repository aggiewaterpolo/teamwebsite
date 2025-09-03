
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#menuBtn');
  const menu = document.querySelector('#menu');
  if(btn && menu){
    btn.addEventListener('click', () => menu.classList.toggle('open'));
  }
});
