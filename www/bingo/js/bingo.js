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

  var row = new Array(5).fill(0);
  var col = new Array(5).fill(0);
  var ltr = 0;
  var rtl = 0;

  function updateLines(cell, add){
    // - Every time someone selects (or deselects) a cell, update the total for
    //   - the row, which is floor(cellnum/5)
    //   - the column, which is cellnum%5
    //   - the diagonal, of which there are two, and which can be identified as Left to Right and RtL
    //     - determine which diagonal with row & column.
    //       - if rownum = colnum, you're on the LtR diagonal (0,0 / 1,1 / 2,2 / 3,3 / 4,4)
    //       - if rownum + colnum = 4, you're on the RtL diagonal (0,4 / 1,3 / 2,2 / 3,1 / 4,0)

    var rownum = Math.floor(cell / 5);
    var colnum = cell % 5;
    var isLtr = (rownum == colnum);
    var isRtl = (rownum + colnum === 4);
    var increment = (add ? 1 : -1);

    row[rownum] += increment;
    col[colnum] += increment;
    ltr += isLtr ? increment : 0;
    rtl += isRtl ? increment : 0;

    console.log(rownum, colnum, row[rownum], col[colnum]);
    console.log(ltr, rtl);
  }
  
  function highlight(line){
    
  }

  function removeListeners(){
    var $tds = $("tbody").find("td");
    $tds.each(function(i, el){
      $(el).off("click");
    })
  }

  function win(winMethod){
    removeListeners();
    //winFireworks();
    //highlight(winMethod);
    $("table").addClass("blink");
  }
  
  function checkWin(){
    if (ltr === 5) {
      win("ltr");
    }
    if (rtl === 5) {
      win("rtl");
    }
    for (var i = 0; i < 5; i++){
      if (row[i] === 5) {
        win(row[i]);
    }
      if (col[i] === 5) {
        win(row[i]);
      }
    }
  }

  function clicker(){
    $(this).toggleClass("chosen");
    updateLines($(this).attr("data-index"), $(this).hasClass("chosen"));
    checkWin();
  }

  function writeBoard(){
    var removed = "";
    var r = 0;

    var $tds = $("tbody").find("td");
    $tds.each(function(i, el){
      if(i!==12) { // if not the FREE square
        r = Math.floor(Math.random() * (buzzwords.length));
        removed = buzzwords.splice(r,1)[0];
        $(el).attr("data-word", removed);
        $(el).text(removed);
        $(el).click(clicker);
      } else { // if the FREE square
        $(el).addClass("chosen");
        updateLines(12, 1);
      } // finally, for all squares.
      $(el).attr("data-index", i);
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