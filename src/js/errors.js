import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function errors(er) {
  if (er === 'imagesNotFound') {
    iziToast.show({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topCenter',
      color: 'red',
    });

    return;
  }

  iziToast.show({
    title: 'Error',
    message: 'Error! Failed to upload images',
    position: 'topCenter',
    color: 'red',
  });
}
