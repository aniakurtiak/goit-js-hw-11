import axios from 'axios';

 export function serviceSearchImg(input) {

    const API_KEY = "38534343-83a5af4ee16ad6e7691f4452e";
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: input,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    
    });
     
     return axios.get(`${BASE_URL}?${searchParams}`)
         .then(response => response.data)
         .catch(error => {
             console.log("Sorry, there are no images matching your search query. Please try again.", error);
             return [];
         })
}
