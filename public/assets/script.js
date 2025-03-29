document.querySelectorAll(".pizza-update-button").forEach((btn)=>{
    btn.addEventListener("click", () => {
        document.getElementById("update-pizza-type-container").removeAttribute("hidden")

        const id = document.getElementById("id")
        const title = document.getElementById("title-update")
        const description = document.getElementById("description-update")

        id.value = btn.dataset.id
        title.value = btn.dataset.title
        description.value = btn.dataset.description

        
        document.getElementById("update-pizza-type-form").action = `/api/pizzas/update/${id.value}`
    })
})