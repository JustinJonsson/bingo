$(document).ready(function(){

  $("#loginform").submit(function(e){
    console.log(e);
    $("#loginrow").hide();
    $("#boardrow").show();
    return false;
  });

  function init(){
    console.log("init");
    $("#loginrow").show();
    $("#boardrow").hide();
    $("#emailform").focus();
    $("#emailform").select();
  }

  init();
});