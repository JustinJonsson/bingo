$(document).ready(function(){

  var buzzwords = [
    "paradigm",
    "headwinds",
    "reorganization",
    "LatAm",
    "more with less",
    "strategic partnership",
    "trusted partner",
    "client-focused",
    "impactful",
    "upside",
    "one stop shop",
    "ecosystem",
    "uniquely positioned",
    "recession",
    "global",
    "pipeline",
    "differentiation",
    "challenging market conditions",
    "fragmentation",
    "a", "b", "c", "d", "e", "f", "g", "h"
  ];

  function writeBoard(){
    var boardSize = (5*5)-1;
    var chosenWords = [];
    var removed = "";
    var r = 0;

    for ( var i = 0; i <= boardSize; i++ ) {
      r = Math.floor(Math.random() * (buzzwords.length));
      removed = buzzwords.splice(r,1)[0];
      chosenWords.push(removed);
    }

    var tds = $("tbody").find("td");
    var $tds = $(tds);
    $tds.each(function(i, el){
      if(i!==12) {
        var $el = $(el);
        $el.attr("data-index", i);
        $el.attr("data-word", chosenWords[i]);
        $el.text(chosenWords[i]);
      }
    });
  }

  // programmatically register click events on all 24 (or 25) tds, rather than individually!

  $("#loginform").submit(function(e){
    var emailAddress = $("#emailform").val();
    writeBoard();
    $("#loginrow").addClass("animated slideOutLeft").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
      $("#loginrow").hide();
      $("#boardrow").show().addClass("animated slideInRight");
    });
    e.preventDefault(); // to prevent page refresh
  });

  function init(){
    $("#loginrow").show();
    $("#boardrow").hide();
    $("#emailform").focus().select();
  }

  init();
});