import axios from 'axios';

const API_KEY = '19197868-48df692c0a14d7fda4172233f';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const { data } = await axios.get(
      `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
    );

    if (data.total === 0) {
      throw 'Images not found';
    }
    this.page += 1;

    return data.hits;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
