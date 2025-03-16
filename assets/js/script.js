$(document).ready(function() {
    console.log('Document ready');
});
$("#testBtn").click(function() {
    alert("Click button");
    $(this).hide();
});