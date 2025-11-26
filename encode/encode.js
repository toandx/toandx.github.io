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

$(document).ready(function() {
  // Solution 1: User hide MP 1, BM 2, 5,6
  hideMpDegree = new Map();
  hideMpDegree.set(1,[2,5,6]);
  hideMpDegree.set(2,[2,3,4]);
  console.log('test 1:',hideMpDegree.has(3),' ',hideMpDegree.has(1));
  console.log('test 2:',hideMpDegree.get(1).indexOf(2),' ',hideMpDegree.get(1).indexOf(4));
});