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
        console.log(`error: ${err}`)
      }
    })
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
    };
  }

  const escape = function (str) {
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
    
  return $tweet
  };  

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
    } else if ($textLength > 140) {
      $message.text("⚠️ Message is too long, please respect text limit").slideDown();
    } else {
      $.post('/tweets', $serializedData, (response) => {
            //console.log(response)  //Check if this should be removed.
            loadtweets();
            $("#tweet-text").val("")
      })
      $message.hide();
    }
  
  });

});

// const serializedData = $(this).serialize();

    // $text = serializedData.trim();
    // $textLength = $text.length;
    
    // // console.log("text: ",$text);
    // // console.log(serializedData);

    // console.log($textLength);
    // if ($text === "text=" || $text === null) {
    //   // return alert("Message is empty, please type something to post");
    //   $message.text("⚠️ Your message is empty, try again").slideDown();

    // } else if ($textLength > 140) {
    //   // return alert("Message is too long, please respect text limit");
    //   $message.text("⚠️ Message is too long, please respect text limit").slideDown();
    // } else {
    //   // console.log("something")
    //   $.post('/tweets', serializedData, (response) => {
    //     console.log(response)  //Check if this should be removed.
    //     loadtweets();
    //     $("#tweet-text").val("")
    //   })
    // }