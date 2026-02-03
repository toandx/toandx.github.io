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
            <a class="nav-link" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>  `;
    $(id).html(html);
  }
}
$(document).ready(function() {
    console.log('Document ready');
    commonView.renderNavbar('#topNav');
});