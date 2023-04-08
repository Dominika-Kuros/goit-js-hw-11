import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPictures } from "./js/fetchPictures";
import { renderGallery } from "./js/renderGallery";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input.input');
const lightbox = new SimpleLightbox('.gallery a');
let page = 1;



searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(searchInput.value)

    if (!searchInput.value.trim()) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        gallery.innerHTML = "";
        return;
    }
    
    const data = await fetchPictures(searchInput.value, page);
    gallery.innerHTML = renderGallery(data.hits);
    lightbox.refresh();

    if(data.totalHits >= 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)}

    if(data.totalHits === 0) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    }

});


function loadImages(numImages = 40){
    let i=0;
while(i < numImages){
fetchPictures(searchInput.value, page)
    .then(response=>response.json())
    .then(data=>{renderGallery(data.hits)
i++;
    })   
}}

loadImages();

window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    loadImages();
    }
})



// window.addEventListener("scroll", async () => {
//     if (
//         window.scrollY + window.innerHeight >=
//         document.documentElement.scrollHeight
//     ) {
//         page++;
//         const data = await fetchPictures(searchInput.value, page);
//     gallery.innerHTML = renderGallery(data.hits);
//     lightbox.refresh();
//     }
//     });


    



//     window.addEventListener('scroll', debounce(() => {
//     if(document.documentElement.scrollHeight - window.innerHeight < window.scrollY){
        
//         page++;
//     fetchPictures(searchInput.value, page)
//     .then((data) => {
//         renderGallery(data.hits, gallery);
//         lightbox.refresh();
//         // Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");


//     const { height: cardHeight } = document
//     .querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();
        
//     window.scrollBy({
//     top: cardHeight * 2,
//         behavior: "smooth",})
//     })

//     .catch((err) => console.log(err))
//     }
// }, 200)
// );

