document.querySelectorAll(".pizza-update-button").forEach((btn)=>{
    btn.addEventListener("click", (ev) => {

        const pizzaCard = ev.target.closest(".pizza-card")
        const updatedButton = ev.target.closest("button")
        const deletedButton = pizzaCard.querySelector(".pizza-delete-button")

        if (pizzaCard.classList.contains("highlight")) {
            location.reload() 
            return
        }

        document.querySelectorAll(".pizza-card").forEach(card => {
            if(card.classList.contains("highlight")){
                card.classList.remove("highlight")
                card.querySelector(".pizza-update-button").classList.remove("highlight")
                card.querySelector(".pizza-delete-button").classList.remove("highlight")
            }
        })

        pizzaCard.classList.toggle("highlight")
        updatedButton.classList.toggle("highlight")
        deletedButton.classList.toggle("highlight")

        document.getElementById("pizza-type-form-container").setAttribute("hidden", true);
        document.getElementById("update-pizza-type-container").removeAttribute("hidden")

        const id = document.getElementById("id")
        const title = document.getElementById("updated-title")
        const description = document.getElementById("updated-description")

        id.value = btn.dataset.id
        title.value = btn.dataset.title
        description.value = btn.dataset.description

        id.disabled = true
        
        document.getElementById("update-pizza-type-form").action = `/api/pizzas/update/${id.value}`
    })
})

document.querySelectorAll(".pizza-size-update-button").forEach((btn)=>{
    btn.addEventListener("click", (ev) => {

        const pizzaSizeCard = ev.target.closest(".pizza-size-card")
        const updatedButton = ev.target.closest("button")
        const deletedButton = pizzaSizeCard.querySelector(".pizza-delete-button")

        if (pizzaSizeCard.classList.contains("highlight")) {
            location.reload() 
            return
        }

        document.querySelectorAll(".pizza-size-card").forEach(card => {
            if(card.classList.contains("highlight")){
                card.classList.remove("highlight")
                card.querySelector(".pizza-size-update-button").classList.remove("highlight")
                card.querySelector(".pizza-delete-button").classList.remove("highlight")
            }
        })

        pizzaSizeCard.classList.toggle("highlight")
        deletedButton.classList.toggle("highlight")
        updatedButton.classList.toggle("highlight")

        document.getElementById("pizza-sized-form-container").setAttribute("hidden", true)
        document.getElementById("update-pizza-size-container").removeAttribute("hidden")

        const size = document.getElementById("updated-size")
        const price = document.getElementById("updated-price")
        const id = document.getElementById("size-id")

        size.value = btn.dataset.size
        price.value = btn.dataset.price
        id.value = btn.dataset.id
        
        document.getElementById("update-pizza-size-form").action = `/api/pizzas/update-size/${id.value}`
    })
})