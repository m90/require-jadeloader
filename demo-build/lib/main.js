require({
  paths: {
    jadeloader: '../../jadeloader'
    , jade : '../../bower_components/jade/jade'
    , text : '../../bower_components/requirejs-text/text'
  }
}, ['jadeloader!views/welcome'], function(welcomeView){
  var main = document.getElementById('main');
  main.innerHTML = welcomeView({ world : 'World' });
});
