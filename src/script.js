import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { serviceSearchImg } from "./pixabay-api";

const form = document.querySelector('.search-form');


form.addEventListener('submit', handlerSearch)

function handlerSearch(evt) {
    evt.preventDefault()
    const { searchQuery } = evt.currentTarget.elements;
    console.log(searchQuery);

    serviceSearchImg(searchQuery.value)
}

