import LoadMoreBtn from './js/load-more-btn';
import PicturesApiService from './js/pixabay-api';
import { renderCard } from './js/render-functions';
import errors from './js/errors';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  galleryItem: document.querySelector('.photo-card'),
  bottomText: document.querySelector('#bottomText'),
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

async function onSearch(e) {
  e.preventDefault();
  clearPictureGallery();
  picturesApiService.query = e.currentTarget.elements.query.value.trim();

  if (picturesApiService.query === '') {
    loadMoreBtn.hide();
    iziToast.show({
      title: 'Error',
      message: 'Please enter text!',
      position: 'topCenter',
      color: 'red',
    });
    return;
  }

  picturesApiService.resetPage();
  await fetchPictures();
}

async function onLoadMore() {
  await fetchPictures();
  scrollPage();
}

function appendPicturesMarkup(pictures) {
  const html = pictures.map(picture => {
    return renderCard(picture);
  });
  refs.gallery.insertAdjacentHTML('beforeend', html.join(''));

  const lightbox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}

function clearPictureGallery() {
  refs.gallery.innerHTML = '';
  bottomText.classList.add('hidden');
}

async function fetchPictures() {
  loadMoreBtn.disable();

  try {
    const { hits, totalHits } = await picturesApiService.fetchPictures();

    const displayedPicturesCount = refs.gallery.children.length;

    if (displayedPicturesCount >= totalHits) {
      loadMoreBtn.hide();
      bottomText.classList.remove('hidden');
      iziToast.show({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
        color: 'blue',
      });
      return;
    }
    appendPicturesMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();
  } catch (er) {
    errors(er);
    loadMoreBtn.hide();
  }
}

function scrollPage() {
  const card = document.querySelector('.photo-card');

  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
