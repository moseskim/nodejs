window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.user').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      console.log(event.target.innerHTML);
    });
  });
});
