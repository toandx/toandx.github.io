$("#btn-encode").click(function() {
  var input = $("#input").val();
  $("#output").val(utf8ToBase64(input));
});
$("#btn-decode").click(function() {
  var input = $("#input").val();
  $("#output").val(base64ToUtf8(input));
});
$("#btn-json").click(function() {
  var input = $("#input").val();
  $("#output").val(beautifyJSON(input));
});
$("#btn-sha512").click(async function() {
  var input = $("#input").val();
  const hash = await encodeSha512(input);
  $("#output").val(hash);
});
$("#btn-note").click(async function() {
  var input = $("#input").val();
  $.ajax({
        url: "https://demobackend-htic.onrender.com/api/note",       // Target JSP to handle the request
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
          title: "New note",
          content: input
        }),
        success: function(response) {
            alert('Data received:'+ JSON.stringify(response));
        },
        error: function(error) {
            alert('Error:'+JSON.stringify(error));
        }
    });
});
$("#btn-ping").click(async function() {
  $.ajax({
        url: "https://demobackend-htic.onrender.com/api/hello",       // Target JSP to handle the request
        type: "GET",
        success: function(response) {
            console.log('Data received: '+ JSON.stringify(response));
            alert('Ping OK');
        },
        error: function(error) {
            alert('Wait for Backend prepare '+error);
        }
    });
});
function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function base64ToUtf8(base64Str) {
  return decodeURIComponent(escape(atob(base64Str)));
}
function beautifyJSON(jsonString, spaces = 4) {
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, spaces);
  } catch (error) {
    return "Invalid JSON: " + error.message;
  }
}
async function encodeSha512(str) {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}