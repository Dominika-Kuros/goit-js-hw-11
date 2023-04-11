import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderGallery';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input.input');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');
let page = 1;
let perPage = 40;
let value = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  console.log(searchInput.value);

  if (!searchInput.value.trim()) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
    return;
  }

  const data = await fetchPictures(searchInput.value, page);
  gallery.innerHTML = renderGallery(data.hits);
  lightbox.refresh();

  if (data.totalHits >= 1) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  if (data.totalHits === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

searchForm.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
// ------------------------------------------------------------------------

// loadMoreButton.addEventListener(
//   'click',
//   () =>
//     function onLoadMoreBtn() {
//       page += 1;
//       fetchPictures(value, page, (perPage = 40))
//         .then(data => {
//           renderGallery(data.hits, gallery);
//           lightbox.refresh();
//           const totalPages = Math.ceil(data.totalHits / perPage);
//           if (page > totalPages) {
//             loadMore.classList.add('is-hidden');
//             Notiflix.Notify.failure(
//               "We're sorry, but you've reached the end of search results."
//             );
//           }
//           if (data.totalHits > perPage) {
//             loadMore.classList.remove('is-hidden');
//           }
//         })
//         .catch(error => console.log(error));
//     }
// );

// function loadImages(numImages = 40) {
//   let i = 0;
//   while (i < numImages) {
//     fetchPictures(searchInput.value, page).then(data => {
//       renderGallery(data.hits);
//       i++;
//       page++;
//     });
//   }
// }

// loadImages();

// window.addEventListener('scroll', () => {
//   console.log(window.scrollY); //scrolled from top
//   console.log(window.innerHeight); //visible part of screen
//   if (
//     window.scrollY + window.innerHeight >=
//     document.documentElement.scrollHeight
//   ) {
//     loadImages();
//   }
// });

// window.addEventListener('scroll', async () => {
//   if (
//     window.scrollY + window.innerHeight >=
//     document.documentElement.scrollHeight
//   ) {
//     const fetchScroll = await fetchPictures(data);
//     page++;
//     renderGallery(data.hits);
//     lightbox.refresh();
//     return fetchScroll;
//   }
// });

window.addEventListener(
  'scroll',
  debounce(() => {
    if (
      document.documentElement.scrollHeight - window.innerHeight <
      window.scrollY
    ) {
      page++;
      fetchPictures(searchInput.value, page, perPage)
        .then(data => {
          gallery.innerHTML = renderGallery(data.hits);
          lightbox.refresh();
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );

          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        })

        .catch(err => console.log(err));
    }
  }, 200)
);
