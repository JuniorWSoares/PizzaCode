// Seleciona todos os elementos com a classe "card" e adiciona um evento de clique a cada um deles
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {

        // Seleciona a imagem dentro do card e alterna a classe "blur-img" para aplicar ou remover o efeito de desfoque
        const img = card.querySelector("img")
        img.classList.toggle("blur-img")

        // Seleciona o contêiner de pedido dentro do card
        const orderContainer = card.querySelector(".order-container")
        
        // Alterna as classes "hidden" e "visible" para exibir ou ocultar o contêiner de pedido
        orderContainer.classList.toggle("hidden")
        orderContainer.classList.toggle("visible")

        // Adiciona um evento de clique a todos os elementos <label> dentro do card
        card.querySelectorAll("label").forEach(label => {
            label.addEventListener("click", e => {
                // Impede que o clique no <label> propague para o card, evitando comportamentos indesejados
                e.stopPropagation()
            })
        })
    })
})