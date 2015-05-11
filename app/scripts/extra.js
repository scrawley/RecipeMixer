$(document).ready(function () {
    alert("im working");
    $("#page-results").hide();
    
    $("#mix_button").click(function(){
        $("#page-home").hide();
        $("#page-results").show();
    });
    
   $("#remix").click(function(){
        $("#page-home").show();
       $("#page-results").hide();
    });
});


     
    