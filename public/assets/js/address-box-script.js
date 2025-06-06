const addressLink = document.getElementById("address-link")
if (addressLink) {
  addressLink.addEventListener("click", function(event) {
    event.preventDefault()
    // Oculta as opções do menu principal
    document.getElementById("menu-options").classList.add("hidden")
    // Exibe o formulário de login
    document.getElementById("address-saved-container").classList.remove("hidden")
  })
}

// Adiciona um evento global para cliques fora do menu do usuário
window.onclick = function(event) {
  // Verifica se o clique não foi no ícone do usuário ou dentro do menu do usuário
  if (!event.target.matches('#user-icon') && !event.target.closest('.user-menu')) {  
    document.getElementById("user-menu").classList.remove("show")
    document.getElementById("menu-options").classList.remove("hidden")
    document.getElementById("address-saved-container").classList.add("hidden")
  }
}