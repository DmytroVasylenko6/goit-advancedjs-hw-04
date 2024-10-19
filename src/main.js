import LoadMoreBtn from './js/load-more-btn';
import PicturesApiService from './js/pixabay-api';
import { renderCard } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  galleryItem: document.querySelector('.photo-card'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageClick);

function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

const picturesApiService = new PicturesApiService();

function onSearch(e) {
  e.preventDefault();
  clearPictureGallery();
  picturesApiService.query = e.currentTarget.elements.query.value.trim();

  if (picturesApiService.query === '') {
    loadMoreBtn.hide();
    iziToast.show('Enter text!');
  }

  picturesApiService.resetPage();
  fetchPictures();
  loadMoreBtn.show();
}

function onLoadMore() {
  const startTime = performance.now();
  fetchPictures();
  const endTime = performance.now();
  const time = Math.floor(endTime - startTime) * 1000;
  scroll(time);
}

function appendPicturesMarkup(pictures) {
  const html = pictures.map(picture => {
    return renderCard(picture);
  });
  refs.gallery.insertAdjacentHTML('beforeend', html.join(''));

  new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function clearPictureGallery() {
  refs.gallery.innerHTML = '';
}

async function fetchPictures() {
  loadMoreBtn.disable();

  try {
    const pictures = await picturesApiService.fetchPictures();
    appendPicturesMarkup(pictures);
    loadMoreBtn.enable();
  } catch (er) {
    errors(er);
    loadMoreBtn.hide();
  }
}

function scroll(time) {
  let i = refs.gallery.clientHeight;
  setTimeout(() => {
    window.scrollTo({ top: i, behavior: 'smooth' });
  }, time);
}

function errors(er) {
  if (er === 'Images not found') {
    iziToast.show('Unfortunately nothing was found for this request');
    return;
  }

  iziToast.show('Error! Failed to upload images');
}
