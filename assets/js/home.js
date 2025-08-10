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
  getNote() {
    let html = '<table>';
    html +='<tr><th>title</th><th>content</th></tr>';
    $.ajax({
        url: "https://demobackend-htic.onrender.com/api/note",       // Target JSP to handle the request
        type: "GET",
        success: function(response) {
            console.log('Data received:', response);
            for(let i = 0; i < response.length; ++i) {
                console.log('i '+JSON.stringify(response[i]));
                html +='<tr><td>'+response[i].title+'</td><td>'+response[i].content+'</td></tr>';
            }
            $('#helloTxt').html('Data received:'+ JSON.stringify(response));
        },
        error: function(error) {
            console.error('Error:', error);
            $('#helloTxt').html('Error:'+JSON.stringify(error));
        }
    });
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
    // $('#newTable').html(myTable.render());
    $('#newTable').html(myTable.getNote());
});
function sendPost() {
    $.ajax({
        url: "https://demobackend-htic.onrender.com/api/hello",       // Target JSP to handle the request
        type: "GET",
        success: function(response) {
            console.log('Data received:', response);
            $('#helloTxt').html('Data received:'+ JSON.stringify(response));
        },
        error: function(error) {
            console.error('Error:', error);
            $('#helloTxt').html('Error:'+JSON.stringify(error));
        }
    });
}