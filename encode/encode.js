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