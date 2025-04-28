document.addEventListener('DOMContentLoaded', () => {

    const alertContainer = document.getElementById('alert-container')
    const message = alertContainer.dataset.message
    const status = alertContainer.dataset.status

    switch (status) {
        case "401":

            if (message === "Usuário não autenticado") {
                history.pushState({}, "", "/") // Limpa o historico para não voltar para a página de erro
        
                const userMenu = document.getElementById("user-menu")
                const loginFormContainer = document.getElementById("login-form-container")
                const menuOptions = document.getElementById("menu-options")
        
                setTimeout(() => {
                    alertContainer.textContent = `${message}!  Você precisa estar logado para realizar o pedido.`
                    alertContainer.classList.add('active')
        
                    userMenu.classList.add("show")
                    menuOptions.classList.add("hidden")
                    loginFormContainer.classList.remove("hidden")
        
                     // Depois de 5 segundos, desfaz tudo
                    setTimeout(() => {
                        alertContainer.textContent = "";
                        alertContainer.classList.remove("active");
                    }, 5000) // desfaz após 5 segundos
                }, 500)
        
                return
            } 

            if (message === "Credenciais inválidas") { 

                history.pushState({}, "", "/") // Limpa o historico para não voltar para a página de erro
        
                const email = document.getElementById("login-email") // Seleciona o campo de e-mail
                const password = document.getElementById("login-password") // Seleciona o campo de senha
        
                const userMenu = document.getElementById("user-menu")
                const loginFormContainer = document.getElementById("login-form-container")
                const menuOptions = document.getElementById("menu-options")
        
                userMenu.classList.add("show")
                menuOptions.classList.add("hidden")
                loginFormContainer.classList.remove("hidden")
        
                // Adiciona classes de erro aos campos de e-mail e telefone
                email.classList.add("error")
                password.classList.add("error")
        
                // Exibe a mensagem de erro no elemento de erro
                alertContainer.textContent = `Erro ao fazer login. Verifique seus dados.`
                alertContainer.classList.add('active')
        
                // Remove as classes de erro e limpa a mensagem após 3 segundos
                setTimeout(() => {
                    email.classList.remove("error")
                    password.classList.remove("error")
                    
                    alertContainer.textContent = ""
                    alertContainer.classList.remove("active")
                }, 3000)
        
                return
            }
            break;
        case "403":

            if(message === "Acesso negado") {
                history.pushState({}, "", "/") // Limpa o historico para não voltar para a página de erro
            }

            break;
        case "404":
            if(message === "Pizza não encontrada"){
                history.pushState({}, "", "/admin#menu") // Limpa o historico para não voltar para a página de erro

                // Exibe a mensagem de erro no elemento de erro
                alertContainer.textContent = `${message}.`
                alertContainer.classList.add('active')

                const pizzaTypeId = document.getElementById('pizzaTypeId')
                pizzaTypeId.classList.add("error")

                // Remove as classes de erro e limpa a mensagem após 3 segundos
                setTimeout(() => {
                    alertContainer.textContent = ""
                    alertContainer.classList.remove("active")
                    pizzaTypeId.classList.remove("error")
                }, 3000)
            }
            break;
        case "409":
            
            if (message === "Email ou telefone já cadastrados"){
                history.pushState({}, "", "/") // Limpa o historico para não voltar para a página de erro

                const email = document.getElementById("register-email") // Seleciona o campo de e-mail
                const phone = document.getElementById("phone") // Seleciona o campo de senha
                
                const userMenu = document.getElementById("user-menu")
                const registerFormContainer = document.getElementById("register-form-container")
                const menuOptions = document.getElementById("menu-options")

                userMenu.classList.add("show")
                menuOptions.classList.add("hidden")
                registerFormContainer.classList.remove("hidden")
        
                // Adiciona classes de erro aos campos de e-mail e telefone
                email.classList.add("error")
                phone.classList.add("error")
        
                // Exibe a mensagem de erro no elemento de erro
                alertContainer.textContent = `${message}. Tente novamente!`
                alertContainer.classList.add('active')

                // Remove as classes de erro e limpa a mensagem após 5 segundos
                setTimeout(() => {
                    email.classList.remove("error")
                    phone.classList.remove("error")
                    
                    alertContainer.textContent = ""
                    alertContainer.classList.remove("active")
                }, 5000)
            }
            
            break;
    
        default:
            break;
    }
})