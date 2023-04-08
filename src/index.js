// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPictures } from "./js/fetchPictures";
import { renderGallery } from "./js/renderGallery";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchForm = document.querySelector('.search-form');
// const submitButton = document.querySelector('.submit-button')
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input.input');
// const lightbox = new SimpleLightbox('.gallery a');


searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(searchInput.value)

    if (!searchInput.value.trim()) {
        gallery.innerHTML = "";
        return;
    }
    let page = 1;
    const data = await fetchPictures(searchInput.value, page);
    gallery.innerHTML = renderGallery(data.hits);
    lightbox.refresh();
    Notiflix.Notify("Hooray! We found ${totalHits} images.");
});

