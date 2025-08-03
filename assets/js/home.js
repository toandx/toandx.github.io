$(document).ready(function() {
    console.log('Document ready');
});
$("#testBtn").click(function() {
    alert("Click button");
    $(this).hide();
});
$("#send").click(function() {
    sendPost();
});
$("#genTable").click(function() {
    $('#newTable').html(basicTable());
});
function basicTable() {
  let html = '<table>';
  html +='<tr><th>Name</th></tr>';
  html +='<tr><td>ToanDX</td></tr>';
  html +='</table>';
  return html;
}
function sendPost() {
    $.ajax({
        url: "https://demobackend-htic.onrender.com/api/hello",       // Target JSP to handle the request
        type: "GET",
        success: function(response) {
        console.log('Data received:', response);
        },
        error: function(error) {
        console.error('Error:', error);
        }
    });
}