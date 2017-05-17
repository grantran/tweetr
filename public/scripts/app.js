$(document).ready(function () {
  // var data = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //       "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //       "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //     },
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // },
  // {
  //   "user": {
  //     "name": "Johann von Goethe",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //       "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //       "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //     },
  //     "handle": "@johann49"
  //   },
  //   "content": {
  //     "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //   },
  //   "created_at": 1461113796368
  // }
  // ];

  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      $("#tweets-container").append(createTweetElement(tweet));

    })
  };

  function createTweetElement(tweet) {
    // create an article tag that will be the parent tag
    // for the tweet -- all other tags will be children to the article
    var $tweet = $('<article>').addClass('tweet');

    // make header tag for user info: avatar, username, handle
    var $header = $('<header>');

    // children tag to the header
    $('<img>').attr("src", tweet.user.avatars.small).appendTo($header);
    $('<h3>').text(tweet.user.name).appendTo($header);
    $('<h4>').text(tweet.user.handle).appendTo($header);
    // attach the header to article
    $tweet.append($header);

    // the actual tweet - 1 div tag, then append to article 
    var $contentDiv = $('<div>').text(tweet.content.text);
    $tweet.append($contentDiv);


    // footer tag for date + hover items (i.e likes)
    var $footer = $('<footer>')

    // to make a block-level tag, a <div> is used to hold both the date (text)
    // and the <img> 
    var $heart = $('<img>').attr("src", "https://pbs.twimg.com/profile_images/590217295756144640/Ezn1xQBC_400x400.jpg");
    var $footerDiv = $('<div>').text(tweet.created_at).append($heart);
    $footer.append($footerDiv);
    $tweet.append($footer);

    // returns article tag + all children 
    // this is for 1 tweet 
    return $tweet;
  }

  // renderTweets(data);

  // stopDefault on form submission

  var tweetForm = $("#tweet-submission");

  tweetForm.submit(function (event) {
    event.preventDefault();

    $.ajax({
      url:"/tweets",
      method: "POST",
      data: tweetForm.serialize(),
      dataType: "json"
    })
  });

  // loadTweets

  var loadTweets = function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: tweets = []
      // dataType: "json", 
    }).done(function(tweets) {
      renderTweets(tweets);
    })
  };

  loadTweets();

});