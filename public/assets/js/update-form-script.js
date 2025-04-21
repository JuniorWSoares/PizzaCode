// Adiciona eventos de clique a todos os botões de atualização de pizza
document.querySelectorAll(".pizza-update-button").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    // Seleciona o card da pizza correspondente ao botão clicado
    const pizzaCard = ev.target.closest(".pizza-card")
    const updatedButton = ev.target.closest("button") // Botão de atualização clicado
    const deletedButton = pizzaCard.querySelector(".pizza-delete-button") // Botão de exclusão correspondente

    // Se o card já estiver destacado, recarrega a página
    if (pizzaCard.classList.contains("highlight")) {
      location.reload()
      return
    }

    // Remove o destaque de todos os cards de pizza
    document.querySelectorAll(".pizza-card").forEach((card) => {
      if (card.classList.contains("highlight")) {
        card.classList.remove("highlight")
        card.querySelector(".pizza-update-button").classList.remove("highlight")
        card.querySelector(".pizza-delete-button").classList.remove("highlight")
      }
    })

    // Destaca o card, o botão de atualização e o botão de exclusão
    pizzaCard.classList.toggle("highlight")
    updatedButton.classList.toggle("highlight")
    deletedButton.classList.toggle("highlight")

    // Esconde o formulário de tipo de pizza e exibe o formulário de atualização
    document.getElementById("pizza-type-form-container").setAttribute("hidden", true)
    document.getElementById("update-pizza-type-container").removeAttribute("hidden")

    // Preenche os campos do formulário de atualização com os dados da pizza
    const id = document.getElementById("id")
    const title = document.getElementById("updated-title")
    const description = document.getElementById("updated-description")

    id.value = btn.dataset.id
    title.value = btn.dataset.title
    description.value = btn.dataset.description

    // Desabilita o campo de ID para evitar alterações
    id.disabled = true

    // Define a ação do formulário para a rota de atualização da pizza
    document.getElementById("update-pizza-type-form").action = `/api/pizzas/update/${id.value}`
  })
})


// Adiciona eventos de clique a todos os botões de atualização de tamanho de pizza
document.querySelectorAll(".pizza-size-update-button").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    // Seleciona o card do tamanho da pizza correspondente ao botão clicado
    const pizzaSizeCard = ev.target.closest(".pizza-size-card")
    const updatedButton = ev.target.closest("button") // Botão de atualização clicado
    const deletedButton = pizzaSizeCard.querySelector(".pizza-delete-button") // Botão de exclusão correspondente

    // Se o card já estiver destacado, recarrega a página
    if (pizzaSizeCard.classList.contains("highlight")) {
      location.reload()
      return
    }

    // Remove o destaque de todos os cards de tamanho de pizza
    document.querySelectorAll(".pizza-size-card").forEach((card) => {
      if (card.classList.contains("highlight")) {
        card.classList.remove("highlight")
        card.querySelector(".pizza-size-update-button").classList.remove("highlight")
        card.querySelector(".pizza-delete-button").classList.remove("highlight")
      }
    })

    // Destaca o card, o botão de atualização e o botão de exclusão
    pizzaSizeCard.classList.toggle("highlight")
    deletedButton.classList.toggle("highlight")
    updatedButton.classList.toggle("highlight")

    // Esconde o formulário de tamanho de pizza e exibe o formulário de atualização
    document.getElementById("pizza-sized-form-container").setAttribute("hidden", true)
    document.getElementById("update-pizza-size-container").removeAttribute("hidden")

    // Preenche os campos do formulário de atualização com os dados do tamanho da pizza
    const size = document.getElementById("updated-size")
    const price = document.getElementById("updated-price")
    const id = document.getElementById("size-id")

    size.value = btn.dataset.size
    price.value = btn.dataset.price
    id.value = btn.dataset.id

    // Define a ação do formulário para a rota de atualização do tamanho da pizza
    document.getElementById("update-pizza-size-form").action = `/api/pizzas/update-size/${id.value}`
  })
})
