const pizzaSizedForm = document.getElementById("pizza-sized-form")

pizzaSizedForm.addEventListener("submit", async (event) => {
    event.preventDefault()  
    
    const formData = new FormData(pizzaSizedForm) 
    const data = Object.fromEntries(formData.entries()) 

    try {
        const response = await fetch("/api/pizzas/addSize", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = document.getElementById("pizza-error-message")
            const pizzaTypeId = document.getElementById("pizzaTypeId")
            pizzaTypeId.classList.add("error-input")
            errorMessage.textContent = errorData.error
            errorMessage.classList.add("error-message-input")

            setTimeout(() => {
                pizzaTypeId.classList.remove("error-input")
                errorMessage.textContent = ""
                errorMessage.classList.remove("error-message-input")
            }, 2000)

            return
        }

        window.location.reload()

    } catch (error) {
        // Trata erros inesperados, como falhas de rede
        console.error("Erro ao enviar o formulário:", error)
    }
    
    console.log(data) 
    
})