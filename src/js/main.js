import '../css/styles.css';
import $ from 'jquery';

$(document).ready(function() {
  const key = process.env.API_KEY;

  $('#buttons').click(function(event) {
    const input = $('#keyword').val();
    let request = new XMLHttpRequest();
    let {id} = event.target;
    let url;

    switch(id) {
    case "search":
      url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${input}&limit=5`;
      break;
    case "trending":
      url = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=5`;
      break;
    case "random":
      url = `https://api.giphy.com/v1/gifs/random?api_key=${key}&limit=5`;
      break;
    }

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        Array.isArray(response.data) ? 
          gifMapper(response):
          getRandom(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function gifMapper(response) {
      const data = response.data.map(myObj => `<img class="response" src="${myObj.images.original.url}">`).join('');
      $('.showGif').html(data);
    }
    function getRandom(response) {
      const data = `<img class="response" src="${response.data.images.original.url}">`;
      $('.showGif').html(data);
    }
  });
});


