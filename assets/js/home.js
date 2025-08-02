$(document).ready(function() {
    console.log('Document ready');
    const table = basicTable();
    $('#newTable').html(table);
});
$("#testBtn").click(function() {
    alert("Click button");
    $(this).hide();
});
$("#genTable").click(function() {
    alert("Create table");
});
function basicTable() {
  let html = '<table>';
  html +='<tr>';
  html +='<th>Name</th>';
  html +='</tr>';
  html +='</table>';
  return html;
}