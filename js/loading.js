Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.round(difference_ms/one_day);
 }

$(document).ready(function(){
  var origin = new Date(2018, 0, 1);

  var first_day = new Date();
  first_day.setDate(1);

  var current_day = new Date();

  var last_day = new Date(current_day.getFullYear(), current_day.getMonth()+1, 0);
  last_day.setMonth(current_day.getMonth());

  var months_since = current_day.getMonth() - origin.getMonth();
  months_since += 1 + (12 * (current_day.getFullYear() - origin.getFullYear()));

  var full_length = Date.daysBetween(first_day, last_day);
  var progress = Date.daysBetween(first_day, current_day);

  var width = Math.floor((progress/full_length) * 100).toString() + "%";

  $(".progress").animate({width: width}, 1800);
  if (current_day.getDate() == last_day.getDate()) {
    $(".loading-text").text(months_since + " months!");
  } else {
    $(".loading-text").text((full_length-progress+1) + " sleeps");
  }

});
