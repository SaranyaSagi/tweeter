/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {  

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    //loops through tweets - for of loop 
    //calls createTweetElement for each tweet
    //takes return value and appends it to the tweets container. 
    
    for (let tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    };
  }

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
        <div class="bodytext">${tweet.content.text}</div>
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

renderTweets(data);
});
