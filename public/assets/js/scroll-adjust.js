// Seleciona todos os links (<a>) que possuem um atributo "href" começando com "#" (links âncora)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  // Adiciona um evento de clique a cada link âncora
  anchor.addEventListener("click", function (e) {
    // Previne o comportamento padrão do clique no link (navegação direta para o destino)
    e.preventDefault();

    // Obtém o ID do elemento de destino a partir do atributo "href" do link
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    // Verifica se o elemento de destino existe na página
    if (targetElement) {
      const offset = 50; // Define um ajuste de 50px para parar acima do elemento
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY; // Calcula a posição do elemento em relação ao topo da página
      const offsetPosition = elementPosition - offset; // Aplica o ajuste de 50px

      // Faz a rolagem suave até a posição ajustada do elemento
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Define a rolagem como suave
      });
    }
  });
});
