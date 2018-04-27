Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.round(difference_ms/one_day);
 }

$(document).ready(function(){
  var depart = new Date();
  depart.setDate(15);
  depart.setMonth(3);

  var now = new Date();

  var arrive = new Date();
  arrive.setDate(26);
  arrive.setMonth(4);

  var fullLength = Date.daysBetween(depart, arrive);
  var progress = Date.daysBetween(depart, now);

  var width = ((progress/fullLength) * 100).toString() + "%";
  console.log(width);

  $(".progress").animate({width: width}, 1800);
  $(".loading-text").text((fullLength-progress) + " sleeps")
});
