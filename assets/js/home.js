$(document).ready(function() {
    console.log('Document ready');
});
$("#testBtn").click(function() {
    alert("Click button");
    $(this).hide();
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