document.querySelectorAll(".order-clicked").forEach( order => {
    order.addEventListener("click", () => {
        const orderDetailsContainer = document.getElementById("order-details-container")
        const hiddenContainer = document.getElementById("hidden-container")
        orderDetailsContainer.classList.remove("empty")
        hiddenContainer.classList.remove("hidden")
    })
})