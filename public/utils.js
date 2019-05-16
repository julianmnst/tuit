function parseLinks(tweet) {
  // Check for @ mentions
  var re = /(?:^|\W)@(\w+)(?!\w)/g, match, matches = [];
  while (match = re.exec(tweet)) {
    matches.push(match[1]);
  }

  matches.map(username => {
    let usrUrl = `https://twitter.com/${username}`;
    tweet = tweet.replace(`@${username}`, `<a target="_blank" href="${usrUrl}">@${username}</a>`)
  });

  // Check for # hashtags
  var reHt = /(?:^|\W)#(\w+)(?!\w)/g, matchHt, matchesHt = [];
  while (matchHt = reHt.exec(tweet)) {
    matchesHt.push(matchHt[1]);
  }

  matchesHt.map(hashtag => {
    let htUrl = `https://twitter.com/hashtag/${hashtag}?src=hash&lang=en`;
    tweet = tweet.replace(`#${hashtag}`, `<a target="_blank" href="${htUrl}">#${hashtag}</a>`)
  });

  // Check for t.co links
  var reLink = /(?:^|\W)https:\/\/t.co\/(\w+)(?!\w)/g, matchLink, matchesLink = [];
  while (matchLink = reLink.exec(tweet)) {
    matchesLink.push(matchLink[1]);
  }

  matchesLink.map(tColink => {
    let linkUrl = `https://t.co/${tColink}`;
    tweet = tweet.replace(`https://t.co/${tColink}`, `<a target="_blank" href="${linkUrl}">https://t.co/${tColink}</a>`)
  });
  return tweet
}