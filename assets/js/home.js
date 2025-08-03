class MyTable {
  constructor(name) {
    this.name = name;
  }
  render() {
      let html = '<table>';
      html +='<tr><th>Name</th></tr>';
      html +='<tr><td>ToanDX</td></tr>';
      html +='</table>';
      return html;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
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
    const myTable = new MyTable('Toan');
    console.log(myTable.render());
    $('#newTable').html(myTable.render());
});
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