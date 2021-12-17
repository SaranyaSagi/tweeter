/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  //fetch data
  const loadtweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
  };
  loadtweets();
  
  const renderTweets = function(tweets) {
    //loops through tweets - for of loop
    //calls createTweetElement for each tweet
    //takes return value and appends it to the tweets container.
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    for (let tweet of tweets) {
      $tweetsContainer.prepend(createTweetElement(tweet));
    }
  };

  //prevent hack trough textbox code
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    
    let $tweet = (`<article>
      <header>
        <div class="topDiv">
          <div class="div1"> 
            <img src="${tweet.user.avatars}">
            <h2>${tweet.user.name}</h2>
          </div>
          <span>${tweet.user.handle}</span>
        </div>
        <br/>
        <div class="bodytext">${escape(tweet.content.text)}</div>
      </header>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <div class="options">
          <span><i class="fas fa-flag"></i></span>
          <span><i class="fas fa-retweet"></i></span>
          <span><i class="fas fa-heart"></i></span>
        </div>
      </footer>
    </article>`);
    
    return $tweet;
  };

  // Enable textarea automatically
  $(".new-tweet").find("textarea").focus();

  // Compose button functionality for enabling new tweet section.
  $("#composeButton").on("click", function(event) {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet").find("textarea").focus();
  });

  //access message and keep it hidden before submit is pressed
  $message = $("#message");
  $message.hide();

  $("#tweetForm").submit(function(event) {
    
    event.preventDefault();

    //---get data from form
    $textarea = $(this).closest("form").find("textarea");
    $counter = $(this).closest("form").find(".counter");
    $message = $("#message");

    $serializedData = $textarea.serialize();
    
    $text = $textarea.val().trim();
    $textLength = $text.length;

    if ($text === "" || $text === null) {

      $message.text("⚠️ Your message is empty, try again").slideDown();
      $textarea.focus();

    } else if ($textLength > 140) {

      $message.text("⚠️ Message is too long, please respect text limit").slideDown();
      $textarea.focus();

    } else {

      $.post('/tweets', $serializedData, () => {
        loadtweets();
        $("#tweet-text").val("");

      });
      // readjust text box and hide message alert since tweet is valid.
      $message.hide();
      $textarea.val("").focus();
      $counter.text("140");
    }
  
  });

  //Function that enables button to scroll to the top
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const rootElement = document.documentElement;

  function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  scrollToTopBtn.addEventListener("click", scrollToTop);
});

