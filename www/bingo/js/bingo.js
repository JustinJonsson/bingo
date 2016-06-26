$(document).ready(function(){

  var buzzwords = [
    "paradigm",
    "headwinds",
    "reorganization",
    "bleeding edge",
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
    "strengthening pipeline",
    "differentiation",
    "challenging market conditions",
    "fragmentation",
    "keep this brief",
    "ownership",
    "returning opportunity",
    "volatility",
    "value-added",
    "by the numbers",
    "consolidation",
    "turnkey",
    "world-class",
    "holistic",
    "uptick",
    "downturn"
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
    //registerWin();
  }
  
  function checkWin(){
    if (ltr === 5) {
      win("ltr");
    }
    else if (rtl === 5) {
      win("rtl");
    }
    for (var i = 0; i < 5; i++){
      if (row[i] === 5) {
        win(row[i]);
    }
      if (col[i] === 5) {
        win(col[i]);
      }
    }
  }

  function clicker(){
    $(this).toggleClass("chosen");
    updateLines($(this).attr("data-index"), $(this).hasClass("chosen"));
    checkWin();
  }

  function getEventName(eventId){
    var eventName = "";

    var toSend = {Action:'getEventName',Event:eventId};
    console.log(toSend);
    toSend = JSON.stringify(toSend);
    console.log(toSend);
    $.ajax({
        url:'http://corvidian.com:3000',
        type:'POST',
        data:toSend,
        contentType: "application/json"
    }).done(function(data){
      console.log('Data:', data);
      $("#header h3").text(data.eventName);
      $("#header").css("background-color", "rgb("+data.bannerColor+")");
      $("#header").css("border-bottom-color", "rgb("+data.bottomColor+")");
    });
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

  /*
  function registerUser(){
    var toSend = {Action:'regUser',Email:email,Event:eventName};
    console.log(toSend);
    toSend = JSON.stringify(toSend);
    console.log(toSend);
    $.ajax(
      {
        url:'http://corvidian.com:3000',
        type:'POST',
        data:toSend,
        contentType: "application/json",
        success:[writeBoard(), animDiv('#loginrow', '#boardrow')]
      }
    );
  }
  */

  function registerWin(){
    var theTime = new Date();
    var toSend = {Action:'regFinish',Email:email,Event:eventName,Time:theTime};
    console.log(toSend);
    toSend = JSON.stringify(toSend);
    console.log(toSend);
    $.ajax(
      {
        url:'http://corvidian.com:3000',
        type:'POST',
        data:toSend,
        contentType: "application/json"
      }
    );
  }

  function animDiv(outDiv, inDiv){
    $(outDiv).addClass("animated slideOutLeft").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
      $(outDiv).hide();
      $(inDiv).show().addClass("animated slideInRight");
    });
  }

  $("#loginform").submit(function(e){
    e.preventDefault(); // to prevent page refresh
    var eventId = $("#eventInput").val();
    email = $("#emailInput").val();
    getEventName(eventId);
    writeBoard();
    animDiv('#loginrow', '#boardrow');
  });

  function init(){
    $("#loginrow").show();
    $("#boardrow").hide();
    $("#emailInput").focus().select();
  }

  init();
});