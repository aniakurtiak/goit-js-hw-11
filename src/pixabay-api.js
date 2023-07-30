import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

 export async function serviceSearchImg(input, page = 1) {

    const API_KEY = "38534343-83a5af4ee16ad6e7691f4452e";
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: input,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40
    });
     
     try {
         const response = await axios.get(`${BASE_URL}?${searchParams}`);
         return response.data;
     } catch (error) {
         console.log("Error fetching data:", error);
         Notify.failure('Sorry, there was an error fetching data. Please try again.');
         return [];
     }

    
}
