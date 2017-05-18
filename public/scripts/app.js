$(document).ready(function () {

  function renderTweets(tweets) {
    $("#tweets-container").empty();
    tweets.forEach(tweet => {
      $("#tweets-container").prepend(createTweetElement(tweet));

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
    var createdDate = moment(tweet.created_at).format("YYYY-MM-DD HH:mm"); 

    var $heart = $('<img id="like">').attr("src", "/images/empty_heart.png");
    var $flag = $('<img id="flag">').attr("src", "/images/empty_flag.png");
    var $retweet = $('<img id="retweet">').attr("src", "/images/empty_rt.png");
    var $footerDiv = $('<div>').text(createdDate).append($heart);
    $flag.appendTo($footerDiv);
    $retweet.appendTo($footerDiv);
    $footer.append($footerDiv);
    $tweet.append($footer);

    // returns article tag + all children 
    // this is for 1 tweet 
    return $tweet;
  }

  // renderTweets(data);

  // stopDefault on form submission

  var tweetForm = $("#tweet-submission");
  var textArea = $("textarea");

  // $("#blank-tweet").fadeOut();
  // $("#too-many-char").fadeOut();

  tweetForm.submit(function (event) {
    event.preventDefault();
    if (textArea.val().length === 0) {
      $("#blank-tweet").fadeIn("slow").delay(1500).fadeOut(
        function () { $("textarea").focus()}
      ); 
    } else if (textArea.val().length > 140) {
      $("#too-many-char").fadeIn("slow").delay(1500).fadeOut(
        function () { $("textarea").focus()}
      );
    } else {
      $.ajax({
        url:"/tweets",
        method: "POST",
        data: tweetForm.serialize()
      }).done(function () {
        $("textarea").val("");
        $(".counter").text(140);
        loadTweets();
      })
    } 
  });

  var loadTweets = function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: tweets = []
    }).done(function(tweets) {
      renderTweets(tweets);
    })
  };

  loadTweets();
  // console.log(moment(1461113796368).format("MM/DD/YYYY"));

  //

  $("#compose").on('click', function () {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideToggle(function () { $("textarea").focus()});
    } else if ($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideToggle("slow");
    }
  });

});