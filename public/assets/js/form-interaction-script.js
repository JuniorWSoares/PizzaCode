// Adiciona eventos de clique a todos os botões de atualização de pizza
document.querySelectorAll(".pizza-type-update-button").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    // Seleciona o card da pizza correspondente ao botão clicado
    const pizzaTypeCard = ev.target.closest(".pizza-type-card")
    const updatedButton = ev.target.closest("button") // Botão de atualização clicado
    const deletedButton = pizzaTypeCard.querySelector(".pizza-delete-button") // Botão de exclusão correspondente

    // Se o card já estiver destacado, recarrega a página
    if (pizzaTypeCard.classList.contains("highlight")) {
      location.reload()
      return
    }

    // Remove o destaque de todos os cards de pizza
    document.querySelectorAll(".pizza-type-card").forEach((card) => {
      if (card.classList.contains("highlight")) {
        card.classList.remove("highlight")
        card.querySelector(".pizza-type-update-button").classList.remove("highlight")
        card.querySelector(".pizza-delete-button").classList.remove("highlight")
      }
    })

    // Destaca o card, o botão de atualização e o botão de exclusão
    pizzaTypeCard.classList.toggle("highlight")
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
document.querySelectorAll(".pizza-sized-update-button").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    // Seleciona o card do tamanho da pizza correspondente ao botão clicado
    const pizzaSizedCard = ev.target.closest(".pizza-sized-card")
    const updatedButton = ev.target.closest("button") // Botão de atualização clicado
    const deletedButton = pizzaSizedCard.querySelector(".pizza-delete-button") // Botão de exclusão correspondente

    // Se o card já estiver destacado, recarrega a página
    if (pizzaSizedCard.classList.contains("highlight")) {
      location.reload()
      return
    }

    // Remove o destaque de todos os cards de tamanho de pizza
    document.querySelectorAll(".pizza-sized-card").forEach((card) => {
      if (card.classList.contains("highlight")) {
        card.classList.remove("highlight")
        card.querySelector(".pizza-sized-update-button").classList.remove("highlight")
        card.querySelector(".pizza-delete-button").classList.remove("highlight")
      }
    })

    // Destaca o card, o botão de atualização e o botão de exclusão
    pizzaSizedCard.classList.toggle("highlight")
    deletedButton.classList.toggle("highlight")
    updatedButton.classList.toggle("highlight")

    // Esconde o formulário de tamanho de pizza e exibe o formulário de atualização
    document.getElementById("pizza-sized-form-container").setAttribute("hidden", true)
    document.getElementById("update-pizza-sized-container").removeAttribute("hidden")

    // Preenche os campos do formulário de atualização com os dados do tamanho da pizza
    const size = document.getElementById("updated-size")
    const price = document.getElementById("updated-price")
    const id = document.getElementById("size-id")

    size.value = btn.dataset.size
    price.value = btn.dataset.price
    id.value = btn.dataset.id

    // Define a ação do formulário para a rota de atualização do tamanho da pizza
    document.getElementById("update-pizza-sized-form").action = `/api/pizzas/update-size/${id.value}`
  })
})