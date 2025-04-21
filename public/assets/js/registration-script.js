// Adiciona um evento de clique ao ícone do usuário
document.getElementById("user-icon").addEventListener("click", function() {
  // Alterna a classe "show" no menu do usuário para exibir ou ocultar o menu
  document.getElementById("user-menu").classList.toggle("show")
})

// Adiciona um evento de clique ao botão de login
document.getElementById("login-button").addEventListener("click", function(event) {
  event.preventDefault() // Impede o comportamento padrão do botão (recarregar a página)
  // Oculta as opções do menu principal
  document.getElementById("menu-options").classList.add("hidden")
  // Exibe o formulário de login
  document.getElementById("login-form-container").classList.remove("hidden")
})

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

const registerForm = document.getElementById("register-form")

// Adiciona um evento de envio ao formulário de registro
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault() // Impede o comportamento padrão do formulário (recarregar a página)

  const formData = new FormData(registerForm) // Captura os dados do formulário
  const data = Object.fromEntries(formData) // Converte os dados do formulário em um objeto

  try {
    // Envia os dados do formulário para o servidor via fetch
    const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Converte os dados para JSON
    })

    if (!response.ok) {
      // Caso a resposta não seja bem-sucedida (status HTTP >= 400)
      const errorData = await response.json() // Obtém os dados de erro retornados pelo servidor
      const email = document.getElementById("register-email") // Seleciona o campo de e-mail
      const phone = document.getElementById("phone") // Seleciona o campo de telefone
      const errorMessage = document.getElementById("register-message") // Seleciona o elemento para exibir mensagens de erro

      // Adiciona classes de erro aos campos de e-mail e telefone
      email.classList.add("error")
      phone.classList.add("error")

      // Exibe a mensagem de erro no elemento de erro
      errorMessage.textContent = errorData.error
      errorMessage.classList.add("error-message")

      // Remove as classes de erro e limpa a mensagem após 3 segundos
      setTimeout(() => {
        errorMessage.classList.remove("error-message")
        errorMessage.textContent = ""
        email.classList.remove("error")
        phone.classList.remove("error")
      }, 2000)

      return // Interrompe a execução caso haja erro
    }

    const successMessage = document.getElementById("register-message") // Seleciona o elemento para exibir mensagens de sucesso
    successMessage.textContent = "Cadastro realizado com sucesso!" // Exibe mensagem de sucesso
    successMessage.classList.add("success-message") // Adiciona classe de sucesso ao elemento de mensagem

    // Remove as classes de sucesso e limpa a mensagem após 3 segundos
    setTimeout(() => {
      successMessage.classList.remove("error-message")
      successMessage.textContent = "" 
      // Redireciona o usuário para a página inicial em caso de sucesso
      window.location.href = "/"
    }, 2000)

  } catch (error) {
    // Trata erros inesperados, como falhas de rede
    console.error("Erro ao enviar o formulário:", error)
  }
})

const loginForm = document.getElementById("login-form")

// Adiciona um evento de envio ao formulário de login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault() // Impede o comportamento padrão do formulário (recarregar a página)

  const formData = new FormData(loginForm) // Captura os dados do formulário
  const data = Object.fromEntries(formData) // Converte os dados do formulário em um objeto

  try {
    // Envia os dados do formulário para o servidor via fetch
    const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Converte os dados para JSON
    })

    if (!response.ok) {
      // Caso a resposta não seja bem-sucedida (status HTTP >= 400)
      const errorData = await response.json() // Obtém os dados de erro retornados pelo servidor
      const email = document.getElementById("login-email") // Seleciona o campo de e-mail
      const password = document.getElementById("login-password") // Seleciona o campo de senha
      const errorMessage = document.getElementById("login-message") // Seleciona o elemento para exibir mensagens de erro

      // Adiciona classes de erro aos campos de e-mail e telefone
      email.classList.add("error")
      password.classList.add("error")

      // Exibe a mensagem de erro no elemento de erro
      errorMessage.textContent = errorData.error
      errorMessage.classList.add("error-message")

      // Remove as classes de erro e limpa a mensagem após 3 segundos
      setTimeout(() => {
        errorMessage.classList.remove("error-message")
        errorMessage.textContent = ""
        email.classList.remove("error")
        password.classList.remove("error")
      }, 2000)

      return // Interrompe a execução caso haja erro
    }

    const successMessage = document.getElementById("login-message") // Seleciona o elemento para exibir mensagens de sucesso
    successMessage.textContent = "Login realizado com sucesso!" // Exibe mensagem de sucesso
    successMessage.classList.add("success-message") // Adiciona classe de sucesso ao elemento de mensagem

    // Remove as classes de sucesso e limpa a mensagem após 3 segundos
    setTimeout(() => {
      successMessage.classList.remove("error-message")
      successMessage.textContent = "" 
      // Redireciona o usuário para a página inicial em caso de sucesso
      window.location.href = "/"
    }, 2000)

  } catch (error) {
    // Trata erros inesperados, como falhas de rede
    console.error("Erro ao enviar o formulário:", error)
  }
})