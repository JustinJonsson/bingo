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
    "keep this brief",
    "ownership", "c", "d", "e", "f", "g", "h"
  ];

  function checkWin(){
    var map = [];
    var cells = $("tbody").find(".chosen");
    cells.each(function(i, el){
      console.log($(cells[i]).attr("data-index"));
    });

    // put the indices into an array.
    // do magic w/ the indices
  }

  function clicker(){
    $(this).toggleClass("chosen");
    checkWin();
  }

  function writeBoard(){
    var removed = "";
    var r = 0;

    var tds = $("tbody").find("td");
    tds.each(function(i, el){
      if(i!==12) {
        r = Math.floor(Math.random() * (buzzwords.length));
        removed = buzzwords.splice(r,1)[0];
        $(el).attr("data-index", i);
        $(el).attr("data-word", removed);
        $(el).text(removed);
        $(el).click(clicker);
      } else {
        $(el).addClass("chosen");
      }
    });
  }

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