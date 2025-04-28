// Adiciona um evento de clique ao ícone do usuário
document.getElementById("user-icon").addEventListener("click", function() {
  // Alterna a classe "show" no menu do usuário para exibir ou ocultar o menu
  document.getElementById("user-menu").classList.toggle("show")
})

// Adiciona um evento de clique ao botão de login
const loginButton = document.getElementById("login-button")
if (loginButton) {
  loginButton.addEventListener("click", function(event) {
    event.preventDefault() // Impede o comportamento padrão do botão (recarregar a página)
    // Oculta as opções do menu principal
    document.getElementById("menu-options").classList.add("hidden")
    // Exibe o formulário de login
    document.getElementById("login-form-container").classList.remove("hidden")
  })
}

// Adiciona um evento de clique ao link "Cadastrar-se"
document.getElementById("show-register").addEventListener("click", function(event) {
  event.preventDefault() // Impede o comportamento padrão do link
  // Oculta o formulário de login
  document.getElementById("login-form-container").classList.add("hidden")
  // Exibe o formulário de cadastro
  document.getElementById("register-form-container").classList.remove("hidden")
})

// Adiciona um evento de clique ao link "Fazer login"
document.getElementById("show-login").addEventListener("click", function(event) {
  event.preventDefault() // Impede o comportamento padrão do link
  // Oculta o formulário de cadastro
  document.getElementById("register-form-container").classList.add("hidden")
  // Exibe o formulário de login
  document.getElementById("login-form-container").classList.remove("hidden")
})

// Adiciona um evento global para cliques fora do menu do usuário
window.onclick = function(event) {
  // Verifica se o clique não foi no ícone do usuário ou dentro do menu do usuário
  if (!event.target.matches('#user-icon') && !event.target.closest('.user-menu')) {
    // Oculta o menu do usuário
    document.getElementById("user-menu").classList.remove("show")
    // Exibe as opções do menu principal
    document.getElementById("menu-options").classList.remove("hidden")
    // Oculta o formulário de login
    document.getElementById("login-form-container").classList.add("hidden")
    // Oculta o formulário de cadastro
    document.getElementById("register-form-container").classList.add("hidden")
  }
}