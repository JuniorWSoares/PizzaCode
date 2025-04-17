document.getElementById("user-icon").addEventListener("click", function() {
  document.getElementById("user-menu").classList.toggle("show");
})
  
document.getElementById("login-button").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("menu-options").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
})
  
document.getElementById("show-register").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.remove("hidden");
})
  
document.getElementById("show-login").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
})
  
window.onclick = function(event) {
  if (!event.target.matches('#user-icon') && !event.target.closest('.user-menu')) {
    document.getElementById("user-menu").classList.remove("show");
    document.getElementById("menu-options").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.add("hidden");
  }
}