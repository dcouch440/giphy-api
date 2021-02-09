import GiphyService from './GiphyService.js';
import * as ui from './ui.js';
import '../css/styles.css';
import $ from 'jquery';

$(document).ready(function() {
  $('#buttons').click(function(event) {
    event.preventDefault();
    const input = $('#keyword').val();
    let {id} = event.target;

    GiphyService.getGif(id, input).then(response => {
      Array.isArray(response.data) ? 
        ui.gifMapper(response):
        ui.getRandom(response);
    }).catch(oopsie => {
      console.log(oopsie);
    });
  });
});


