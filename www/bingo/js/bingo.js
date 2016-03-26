$(document).ready(function(){

  $("#loginform").submit(function(e){
    $("#loginrow").hide();
    $("#boardrow").show();
  });

  function init(){
    $("#loginrow").show();
    $("#boardrow").hide();
  }
  
  init();
})