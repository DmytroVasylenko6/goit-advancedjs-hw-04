export function renderCard(data) {
  const {
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    downloads,
    tags,
  } = data;

  return `<li class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
      <img class="images" src="${webformatURL}" alt="${tags}" height="200" />
    </a>
    <div class="stats">
        <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${likes}
        </p>
        <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${views}
        </p>
        <p class="stats-item">
            <i class="material-icons">comment</i>
            ${comments}
        </p>
        <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${downloads}
        </p>
    </div>
</li>`;
}
