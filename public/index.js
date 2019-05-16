const devUrl = 'http://localhost:8080/tweets/';
const devMode = true;
var baseUrl = 'https://tuit-fetcher.herokuapp.com/tweets/',
container = document.getElementById('container'),
username = document.getElementById('username'),
get_tweets = document.getElementById('get-tweets')

if (devMode) {
  baseUrl = devUrl;
}

function callAjax(url, callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function getTweets() {
  container.innerHTML = '';
  callAjax(baseUrl + username.value, function(response){
    var tweets = JSON.parse(response);
    tweets = tweets.map(function(tweet) {
      return '<div class="fade-in"><div class="hidden">'
      + tweet.text
      + '</div></div>';
    })
    container.innerHTML = tweets.join('')
    revealList(tweets, 200);
  });
}

get_tweets.addEventListener('click', function(e) {
  getTweets();
})

function revealList(list, interval) {
  let counter = 0;

  var intervalId = setInterval(loop, interval)

  function loop() {
    document.getElementsByClassName('hidden')[counter].classList.add('tweet');
    counter++;

    if (counter == (list.length)) {
      clearInterval(intervalId);
    }
  }
}