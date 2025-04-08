document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {

        const img = card.querySelector("img")
        img.classList.toggle("blur-img")

        const orderContainer = card.querySelector(".order-container")
        
        orderContainer.classList.toggle("hidden")
        orderContainer.classList.toggle("visible")

        card.querySelectorAll("label").forEach(label => {
            label.addEventListener("click", e => {
                e.stopPropagation()
            })
        })
    })
})