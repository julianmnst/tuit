<?php

use Slim\Http\Request;
use Slim\Http\Response;

require __DIR__ . '/../TwitterAPIExchange.php';

// Routes

$app->get('/', function (Request $request, Response $response, array $args) {
  // Sample log message
  $this->logger->info("Slim-Skeleton '/' route");

  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/tweets/[{name}]', function(Request $request, Response $response, array $args) {

  // If no username is provided, return error and instructions
  if (is_null($args['name'])) {
    $response->getBody()->write('
      Please enter a <strong>valid</strong> Twitter Username <br>
      For example: <a href="http://localhost:8080/tweets/realDonaldTrump">http://localhost:8080/tweets/<strong>realDonaldTrump</strong></a>
    ');

    return $response->withStatus(400);
  }

  // Twitter API configuration
  $settings = array(
    'oauth_access_token' => "22108512-lxIdVWtFHwMiIkH5sN7o8vkLZITEZnUc93nqttZBW",
    'oauth_access_token_secret' => "4KchGiAgD45jGVCLrkUxJFXf8LHP4QkBZP1sqYQoZB2bA",
    'consumer_key' => "C0cZJ3wFDryw01wJHYhLibbIO",
    'consumer_secret' => "6Uk2BoVke6MXOBg1Y5yKfSqKePzdafAu1xznUaJKbUTxZlaw0b"
  );

  $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

  $fields = '?screen_name='.$args['name'].'&count=10';

  $twitter = new TwitterAPIExchange($settings);

  $data = $twitter->setGetfield($fields)->buildOauth($url, "GET")->performRequest();

  $tweets = json_decode($data);

  $result = [];

  // Iterate over tweets and save and return the required information only
  foreach($tweets as $tweet){
    $t = [];

    $t['text'] = $tweet->text;
    $t['created_at'] = $tweet->created_at;

    if ($tweet->in_reply_to_user_id && $tweet->in_reply_to_screen_name) {
      $t['in_reply'] = array(
        'id' => $tweet->in_reply_to_user_id,
        'name' => $tweet->in_reply_to_screen_name
      );
    }

    array_push($result, $t);
  }

  return $response->withJson($result);
});