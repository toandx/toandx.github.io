const beUrl = 'https://demobackend-htic.onrender.com/api';
// const beUrl = 'http://localhost:8081/api';
var noteData = [];
var selectedNote = null;
$("#btnPing").click(async function() {
  $.ajax({
        url: beUrl+"/hello",       // Target JSP to handle the request
        type: "GET",
        success: function(response) {
            console.log('Data received: '+ JSON.stringify(response));
            console.log('Ping OK');
        },
        error: function(error) {
            console.log('Wait for Backend prepare '+error);
        }
    });
});
$("#btnAdd").click(async function() {
  var titleVal = $("#title").val();
  var contentVal = $("#content").val();
  $.ajax({
        url: beUrl+"/note",       // Target JSP to handle the request
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ // Use JSON.stringify for Request Body
          title: titleVal,
          content: contentVal
        }),
        success: function(response) {
            console.log('Data received:'+ JSON.stringify(response));
            refresh();
        },
        error: function(error) {
            console.log('Error:'+JSON.stringify(error));
        }
    });
});
$(document).ready(function() {
  refresh();
});
function refresh() {
    let $listNote = $('#listNote');
    $listNote.empty();
    $("#title").val('');
    $("#content").val('');
    let html = '';
    $.ajax({
        url: beUrl+"/note",       // Target JSP to handle the request
        type: "GET",
        dataType: "json",
        success: function(data) {
            noteData = data;
            for(let note of noteData) {
                html = '<li class="list-group-item" onclick="selectNote('+note.id+')">'+note.title+'</li>';
                $listNote.append(html);
            }
        },
        error: function(error) {
            console.log('Error:'+JSON.stringify(error));
        }
    });    
}
function selectNote(id) {
    $.ajax({
        url: beUrl+"/noteId",       
        type: "GET",
        data: {
            id: id
        },
        success: function(data) {
            selectedNote = data;
            $("#title").val(selectedNote.title);
            $('#content').val(selectedNote.content);
        },
        error: function(error) {
            console.log('Error:'+JSON.stringify(error));
        }
    });    
}
$("#btnUpdate").click(async function() {
  var titleVal = $("#title").val();
  var contentVal = $("#content").val();
  $.ajax({
        url: beUrl+"/noteId",       // Target JSP to handle the request
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ // Use JSON.stringify for Request Body
          id: selectedNote.id,
          title: titleVal,
          content: contentVal
        }),
        success: function(response) {
            refresh();
        },
        error: function(error) {
            console.log('Error:'+JSON.stringify(error));
        }
    });
});
$("#btnDel").click(async function() {
  $.ajax({
        url: beUrl+"/noteId",       // Target JSP to handle the request
        type: "DELETE",
        data: {
            id: selectedNote.id
        },
        success: function(response) {
            refresh();
        },
        error: function(error) {
            console.log('Error:'+JSON.stringify(error));
        }
    });
});
$("#btnDelAll").click(async function() {
  $.ajax({
        url: beUrl+"/note",       // Target JSP to handle the request
        type: "DELETE",
        success: function(response) {
            refresh();
        },
        error: function(error) {
            console.log('Error:'+JSON.stringify(error));
        }
    });
});