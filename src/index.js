// import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPictures } from "./js/fetchPictures";
import { renderGallery } from "./js/renderGallery";
// import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';

const searchForm = document.querySelector('.searchForm');
const submitButton = document.querySelector('.submitButton')
const gallery = document.querySelector('.gallery');
let searchInput = "";

submitButton.addEventListener('submit', (e) => {
    if (!searchInput.value.trim()) {
        gallery.innerHTML = "";
        return;
    }
    page = 1;
    fetchPictures(searchInput.value, page);
    gallery.innerHTML = renderGallery;

// czy renderGallery(data, gallery) ?

    lightbox.refresh();
});

