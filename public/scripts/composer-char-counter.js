$(document).ready(function() {
 
  $("#tweet-text").on("input", function(event) {
    //get value of text that user enters - use "this"
    $text = $(this).val();
    //get text.length and subtract this value from 140.
    $charsLeft = 140 - $text.length;

    //go to parent element (form) and find the respective counter
    //set the text to be equal the value calculated above
    $counter = $(this).closest("form").find(".counter")
    $counter.text($charsLeft);

    //if charsLeft < 0 going into -values
    //add a class to the counter that change the font color to red
    //else remove class to undo red.
    if ($charsLeft < 0) {
      $counter.addClass("fontRed");
    } else {
      $counter.removeClass("fontRed");
    }
    //fontred in css 

  });
});



// Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.

//Non j-query way to do it. 
 // $("#tweet-text").on('input', function() {
  //   //console.log(this.value.length);
  //   // console.log($("#tweet-text").val().length)
  //   const counter = $('.counter')[0] 
  //   const maxChar = 140
  //   counter.innerHTML= maxChar - ($("#tweet-text").val().length)
    
    
  //   if (counter.innerHTML < 0) {
  //     counter.style.color = "red"
  //   } 
  // });