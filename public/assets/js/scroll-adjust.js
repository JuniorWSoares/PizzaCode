document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const targetId = this.getAttribute('href').substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
            const offset = 50 // Ajuste para parar 50px acima
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' // Rolagem suave
            })
        }
    })
})