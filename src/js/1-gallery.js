import pictures from './picturesData.json';
import { createGalleryCardsTemplate } from './render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.js-gallery');

galleryEl.innerHTML = createGalleryCardsTemplate(pictures);

new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
