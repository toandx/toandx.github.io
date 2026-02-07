$("#btn-login").click(async function() {
  var user = $('#txt-user').val();
  var pass = $('#txt-pass').val();
  $.ajax({
        url: commonConfig.beUrl+"/auth/login",
        type: "POST",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        data:JSON.stringify({
          username:user,
          password:pass
        }),
        success: function(response) {
            console.log('Data received: '+ JSON.stringify(response));
            window.location.href = '/';
            sessionStorage.setItem('jwt',response.accessToken);
        },
        error: function(error) {
            console.log('Wait for Backend prepare '+error);
        }
    });
});

$("#btn-signup").click(async function() {
  var user = $('#txt-user').val();
  var pass = $('#txt-pass').val();
  $.ajax({
        url: commonConfig.beUrl+"/auth/register",
        type: "POST",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify({
          username:user,
          password:pass
        }),
        success: function(response) {
            alert('Create user successfully');
            console.log('Data received: '+ JSON.stringify(response));
            window.location.href = '/';
        },
        error: function(error) {
            console.log('Wait for Backend prepare '+JSON.stringify(error));
        }
    });
});