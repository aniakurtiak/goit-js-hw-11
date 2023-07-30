import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { serviceSearchImg } from "./pixabay-api";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handlerSearch)

function handlerSearch(evt) {
    evt.preventDefault()
    const { searchQuery } = evt.currentTarget.elements;

    serviceSearchImg(searchQuery.value)
        .then(data => gallery.innerHTML = createMarkup(data.hits))
        .catch(error => console.log(error))
}

function createMarkup(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`).join('')
}
