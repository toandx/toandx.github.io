const commonConfig = {
  beUrl : 'https://demobackend-htic.onrender.com' //'http://localhost:8081'
}
const commonView = {
  renderNavbar: function(id) {
    html = `
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> ToanDX </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Links -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="demoDropdown" role="button" data-bs-toggle="dropdown"> Demo </a>
            <ul class="dropdown-menu" aria-labelledby="demoDropdown">
              <li class="nav-item">
                <a class="nav-link" href="/store">Store</a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="demoDropdown" role="button" data-bs-toggle="dropdown"> Tool </a>
            <ul class="dropdown-menu" aria-labelledby="demoDropdown">
              <li class="nav-item">
                <a class="nav-link" href="/encode">Encode</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/note">Note</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/trade">Trade</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <span id="txt-hello" class="nav-link" style="cursor:pointer"></span>
          </li>
          <li class="nav-item">
            <a id="btn-login" class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <span id="btn-logout" class="nav-link" style="cursor:pointer">Logout</span>
          </li>
        </ul>
      </div>
    </div>  `;
    $(id).html(html);
  },
  refreshNavbar: function() {
    jwt = sessionStorage.getItem('jwt');
    console.log('JWT: '+jwt);
    if (jwt == null) {
      $('#btn-login').show();
      $('#btn-logout').hide();
      $('#txt-hello').text('');
    } else {
      $('#btn-login').hide();
      $('#btn-logout').show();
      subject = this.base64ToUtf8(jwt.split('.')[1]);
      console.log('Subject '+JSON.parse(subject).sub);
      $('#txt-hello').text('Hello '+JSON.parse(subject).sub);
    }
  },
  base64ToUtf8: function(base64Str) {
    return decodeURIComponent(escape(atob(base64Str)));
  }
}
$(document).ready(function() {
    commonView.renderNavbar('#topNav');
    commonView.refreshNavbar();
    $("#btn-logout").click(function() { // Function need define after btn-logout is created in HTML. If not, btn-logout not found, event not work
      sessionStorage.removeItem('jwt');
      window.location.href = '/login';
    });
});