/// Displaying a character counter for text typed into the text area 
/// Will change to red when text exceeds 140 characters


$(document).ready(function() {
  $("textarea").on('keyup', function () {
    let $counter = $(this).siblings('.counter');
    let currentLength = $(this).val().length;
    let currentDisplay = 140 - currentLength;
    let spanValue = $counter.text();
    $counter.text(currentDisplay);
 
    if (spanValue <= 0 && $counter.hasClass('negative') === false) {
      $counter.addClass('negative');
      $counter.text(currentDisplay); 
    } else if (spanValue >= 0 && $counter.hasClass('negative') === true) {
      $counter.removeClass('negative');
      $counter.text(currentDisplay); 
    }
  });
});
