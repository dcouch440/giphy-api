import $ from 'jquery';

export function gifMapper(response) {
  const data = response.data.map(myObj => `<img class="response" src="${myObj.images.original.url}">`).join('');
  $('.showGif').html(data);
}
export function getRandom(response) {
  const data = `<img class="response" src="${response.data.images.original.url}">`;
  $('.showGif').html(data);
}
