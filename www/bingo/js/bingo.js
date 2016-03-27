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
    "challenging market conditions"
  ];

  function createBoard(seed){
    var boardSize = 24;
    // here we can take an empty array, and until its size  = boardSize, add new elements from buzzwords, while
    // deleting them from buzzwords. That way we prevent duplicates.


  }


  $("#loginform").submit(function(e){
    var seed = $("#emailform").val();
    console.log(seed);
    createBoard(seed);
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