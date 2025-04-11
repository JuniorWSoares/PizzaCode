document.getElementById("user-icon").addEventListener("click", function() {
  document.getElementById("user-menu").classList.toggle("show");
})
  
document.getElementById("login-button").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("menu-options").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
})
  
document.getElementById("show-register").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.remove("hidden");
})
  
document.getElementById("show-login").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
})
  
window.onclick = function(event) {
  if (!event.target.matches('#user-icon') && !event.target.closest('.user-menu')) {
    document.getElementById("user-menu").classList.remove("show");
    document.getElementById("menu-options").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.add("hidden");
  }
}
  
function submitLogin() {
  alert("Bem vindo!");
}
  
function submitRegister() {
  alert("Cadastro realizado!");
}

// const cart = []
// const cartIcon = document.querySelector('.cart')
// const menuItens = document.querySelectorAll('menu-list')
// const cartContainer = document.createElement('div')
// cartContainer.classList.add(cart-container)
// document.body.appendChild('cartContainer')

// function UpdateCart () {
//   cartContainer.innerHTML = "<h2>Carrinho</h2>"
//   if (cartContainer === 0 ) {
//     cartContainer.innerHTML += "<p>O carrinho está vazio.</p>"
//   } else {
//     cart.forEach((item, index) => {
//         cartContainer.innerHTML += `
//             <div class="cart-item">
//                 <img src="${item.img}" alt="${item.name}" width="50">
//                 <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
//                 <button onclick="removeFromCart(${index})">Remover</button>
//             </div>`
//     })
//   }
// }

// window.removeFromCart = (index) => {
//   cart.splice(index, 1)
//   updateCart()
// }

// menuItems.forEach((item) => {
//   item.addEventListener("click", () => {
//     const name = item.querySelector("h3").textContent
//     const price = Math.floor(Math.random() * 30) + 10
//     const img = item.querySelector("img").src

//     cart.push({ name, price, img })
//     updateCart()
//   })
// })