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
    var boardSize = 24;
    var chosenWords = [];
    var removed = "";
    var i = 0;

    while ( chosenWords.length <= boardSize ) {
      i = Math.floor(Math.random() * (buzzwords.length + 1));
      removed = buzzwords.splice(i,1)[0];
      chosenWords.push(removed);
    }
    //console.log(chosenWords, chosenWords.length);

    chosenWords.forEach(function(val, i, arr){
      console.log(i, val);
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