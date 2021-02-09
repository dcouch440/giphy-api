import '../css/styles.css';
import $ from 'jquery';

class GiphyService {
  static getGif(currentId, query) {
    const key = process.env.API_KEY;
    let request = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
      let url;
      switch(currentId) {
      case "search":
        url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=5`;
        break;
      case "trending":
        url = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=5`;
        break;
      case "random":
        url = `https://api.giphy.com/v1/gifs/random?api_key=${key}&limit=5`;
        break;
      }
      
      request.onreadystatechange = function() {
        if (request.readyState !== 4) return;
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }
      };
      request.open("GET", url, true);
      request.send();
    });
      
  }
}
function gifMapper(response) {
  const data = response.data.map(myObj => `<img class="response" src="${myObj.images.original.url}">`).join('');
  $('.showGif').html(data);
}

function getRandom(response) {
  const data = `<img class="response" src="${response.data.images.original.url}">`;
  $('.showGif').html(data);
}

$(document).ready(function() {
  $('#buttons').click(function(event) {
    event.preventDefault();
    const input = $('#keyword').val();
    let {id} = event.target;
    GiphyService.getGif(id, input).then(response => {
      Array.isArray(response.data) ? 
        gifMapper(response):
        getRandom(response);
    }).catch(oopsie => {
      console.log(oopsie);
    });
  });
});


