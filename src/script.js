import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { serviceSearchImg } from "./pixabay-api";


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentSearchQuery = '';

form.addEventListener('submit', handlerSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handlerSearch(evt) {
    evt.preventDefault()
    const { searchQuery } = evt.currentTarget.elements;
     if (currentSearchQuery !== searchQuery.value) {
    currentSearchQuery = searchQuery.value;
    gallery.innerHTML = '';
    currentPage = 1;
  }
    try {
    const data = await serviceSearchImg(currentSearchQuery, currentPage);
    if (data.totalHits > 0) {
      gallery.innerHTML += createMarkup(data.hits);
      currentPage++;
      if (data.totalHits > currentPage * 40) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
        Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    } else {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  } catch (error) {
    console.log("Error handling search:", error);
    Notify.failure('Sorry, there was an error handling the search. Please try again.');
  }
}

async function handleLoadMore() {
  loadMoreBtn.style.display = 'none';
  try {
    const data = await serviceSearchImg(currentSearchQuery, currentPage);
    if (data.totalHits > 0) {
      gallery.innerHTML += createMarkup(data.hits);
      currentPage++;
      if (data.totalHits > currentPage * 40) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
        Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    } else {
      Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log("Error handling load more:", error);
    Notify.failure('Sorry, there was an error loading more images. Please try again.');
  }
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
