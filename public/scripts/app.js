$(document).ready(function () {
  
  
  // Takes an array (tweets) and for each element, createTweetElement
  // Prepends (newest first) to the tweets-container permanent element
  // Empties any elements from tweets-container first (live update)
  function renderTweets(tweets) {
    $("#tweets-container").empty();
    tweets.forEach(tweet => {
      $("#tweets-container").prepend(createTweetElement(tweet));
    })
  };

  // Takes an object (each element of the tweets array) and creates all elements
  // The parent for each individual tweet is an article 
  // 3 children tags - header, content, and footer -- each with their own content
  // Returns the parent article element (tweet)

  function createTweetElement(tweet) {
    // create an article tag that will be the parent tag
    // for the tweet -- all other tags will be children to the article
    let $tweet = $('<article>').addClass('tweet');

    // make header tag for user info: avatar, username, handle
    let $header = $('<header>');

    // children tag to the header
    $('<img>').attr("src", tweet.user.avatars.small).appendTo($header);
    $('<h3>').text(tweet.user.name).appendTo($header);
    $('<h4>').text(tweet.user.handle).appendTo($header);

    // attach the header to article
    $tweet.append($header);

    // the actual tweet - 1 div tag, then append to article 
    let $contentDiv = $('<div>').text(tweet.content.text);
    $tweet.append($contentDiv);

    // footer tag for date + hover items (i.e likes)
    let $footer = $('<footer>')

    // to make a block-level tag, a <div> is used to hold both the date (text)
    let creationTime = moment(tweet.created_at).format("YYYY-MM-DD HH:mm");
    let createdDate = (moment(creationTime).fromNow()); 

    let $heart = $('<img class="heart front" id="dislike">').attr("src", "/images/empty_heart.png");
    let $filledHeart = $('<img class="heart" id="like">').attr("src", "/images/filled_heart.png");

    let $flag = $('<img class="flag front" id="unflagged">').attr("src", "/images/empty_flag.png");
    let $filledflag = $('<img class="flag front" id="flagged">').attr("src", "/images/filled_flag.png");

    let $retweet = $('<img class="retweet front" id="emptyRetweet">').attr("src", "/images/empty_rt.png");
    let $filledretweet = $('<img class="retweet" id="filledRetweet">').attr("src", "/images/filled_rt.png");

    let $footerDiv = $('<div>').text(createdDate).append($heart);
    $filledHeart.appendTo($footerDiv);

    $flag.appendTo($footerDiv);
    $filledflag.appendTo($footerDiv);

    $retweet.appendTo($footerDiv);
    $filledretweet.appendTo($footerDiv);

    $footer.append($footerDiv);
    $tweet.append($footer);

    // returns article tag + all children 
    // this is for 1 tweet 
    return $tweet;
    }

    /// GET request for tweets array from database

    let loadTweets = function loadTweets() {
      $.ajax({
        url: "/tweets",
        method: "GET",
      }).done(function(tweets) {
          renderTweets(tweets);
        })  
    };

  /// Setting up the actual tweet-form 

  let tweetForm = $("#tweet-submission");
  let textArea = $("textarea");

  // Checks for characters beyond 140 chars or blank tweets first

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

  /// Compose button to show/hide the tweet-box area 

  $("#compose").on('click', function () {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideToggle(function () { $("textarea").focus()});
    } else if ($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideToggle("slow");
    }
  });

  $('#tweets-container').on('click', '.heart', function (event) {
      $(this).removeClass("front");
      $(this).siblings(".heart").addClass("front");
  });

  /// flag

  $('#tweets-container').on('click', '.flag', function (event) {
      $(this).removeClass("front");
      $(this).siblings(".flag").addClass("front");
  });

  /// retweet

  $('#tweets-container').on('click', '.retweet', function (event) {
      $(this).removeClass("front");
      $(this).siblings(".retweet").addClass("front");
  });

  /// Initial request for tweets first time loading the page
  loadTweets();

});