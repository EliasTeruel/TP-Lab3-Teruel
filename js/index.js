import { mostrarSpinnerConDelay } from "./spinner.js"

function loadComponent(componentId, componentPath) {
  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(componentId).innerHTML = data;
    })
    .catch(error => console.error('Error de carga de componente:', error));
}

function loadTemplate(templatePath) {
  return fetch(templatePath)
    .then(response => response.text())
    .catch(error => console.error('Error de carga de template:', error));
}


function loadProperties() {
  Promise.all([fetch('propiedades.json').then(response => response.json()), loadTemplate('./templates/propiedades.html')])
    .then(([data, template]) => {
      const container = document.getElementById('house-articles-container');
      container.innerHTML = '';

      data.forEach(property => {
        let propertyHtml = template
          .replace('{imagen}', property.imagen)
          .replace('{titulo}', property.titulo)
          .replace('{descripcion}', property.descripcion)
          .replace('{precio}', property.precio)
          .replace('{banios}', property.banios)
          .replace('{estacionamiento}', property.estacionamiento)
          .replace('{dormitorios}', property.dormitorios);

        container.innerHTML += propertyHtml;
      });
    })
    .catch(error => console.error('Error de carga de propiedades:', error));
}

function loadBlogPosts() {
  Promise.all([fetch('blogposts.json').then(response => response.json()), loadTemplate('./templates/blogpost.html')])
    .then(([data, template]) => {
      const container = document.getElementById('blog-posts-container');
      container.innerHTML = ''; // Limpia

      data.forEach(post => {
        let postHtml = template
          .replace('{imagen}', post.imagen)
          .replace('{titulo}', post.titulo)
          .replace('{fecha}', post.fecha)
          .replace('{autor}', post.autor)
          .replace('{detalle}', post.detalle);

        container.innerHTML += postHtml;
      });
    })
    .catch(error => console.error('Error de carga de blogposts:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', './templates/header.html');
  loadComponent('footer', './templates/footer.html');
  loadComponent('card1', './cards/card1.html');
  loadComponent('card2', './cards/card2.html');
  loadComponent('card3', './cards/card3.html');
  mostrarSpinnerConDelay(2);
  loadProperties();
  loadBlogPosts();
});