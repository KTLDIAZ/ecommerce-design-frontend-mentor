const menuElement = document.querySelector('.menu-icon')
const closeMenuElement = document.querySelector('.close-icon')
const navbar = document.querySelector('.navbar')
const overlay = document.querySelector('.overlay')
const cartButton = document.querySelector('.cart-icon')
const cartSection = document.querySelector('.cart')
const cartItems = document.querySelector('.cart-items')
const addTocartBtn = document.querySelector('.add-to-cart')
const plus = document.querySelector('#plus')
const minus = document.querySelector('#minus')
const quantityElement = document.querySelector('#quantity')
const noItemsPlaceHolder = document.querySelector('.no-items')
const cartFooter = document.querySelector('.cart-footer')
const cartLength = document.querySelector('.cart-length')
const thumbnails = document.querySelectorAll('.gallery-thumbnails img')

const handleMenu = (e) => {
  menuElement.classList.toggle('hidden')
  navbar.classList.toggle('hidden')
  overlay.classList.toggle('hidden')
}

const addToCart = ({ img = './images/image-product-1-thumbnail.jpg', title = 'Fall Limited Edition Sneakers', price = 0, quantity =  0 }) => {
  if(quantity <= 0) return

  if (cartItems.childElementCount > 0) {
    let quantity = Number(quantityElement.textContent)
    let cartItem = document.querySelector('.cart-item')
    let previousQuantity = Number(cartItem.children[1].children[1].children[0].textContent)
    cartItem.children[1].children[1].children[0].textContent = quantity + previousQuantity
    cartItem.children[1].children[1].children[1].textContent = (quantity + previousQuantity) * price
    return
  }
  
  const cartItem = `
  <img src="${img}">
  <div>
  <h4 class="product-title">${title}</h4>
  <p class="product-price">$${price} x <span>${quantity}</span> <span class="product-total">$${quantity * price}</span></p>
  </div>
  <button type="button" class="delete-item"><svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg></button>
  `;
  
  const newItem = document.createElement('li')
  newItem.className = 'cart-item'
  newItem.innerHTML = cartItem;
  cartItems.appendChild(newItem)
  noItemsPlaceHolder.classList.toggle('hidden')
  cartFooter.classList.toggle('hidden')
  cartLength.classList.toggle('hidden')
  
  const deleteBtn = document.querySelector('.delete-item')
  deleteBtn.addEventListener('click', (e) => {
    cartLength.classList.toggle('hidden')
    newItem.remove()
    if (cartItems.childElementCount === 0) {
      noItemsPlaceHolder.classList.toggle('hidden')
      cartFooter.classList.toggle('hidden')
    }
  })
}

menuElement.addEventListener('click', handleMenu)
closeMenuElement.addEventListener('click', handleMenu)
overlay.addEventListener('click', handleMenu)
cartButton.addEventListener('click', () => {
  cartSection.classList.toggle('hidden')
})

addTocartBtn.addEventListener('click', () => {
  const prodcut = {
    quantity: quantityElement.textContent,
    price: document.querySelector('.price').textContent.replace('$' ,'')
  }
  addToCart(prodcut)
})

plus.addEventListener('click', () => {
  let quantity = Number(quantityElement.textContent)
  quantityElement.textContent = ++quantity
})

minus.addEventListener('click', () => {
  let quantity = Number(quantityElement.textContent)

  if (quantity <= 0) return
  quantityElement.textContent = --quantity
})

thumbnails.forEach(t => t.addEventListener('click', (e) => {
  const currentThumbnail = document.querySelector('.selected-gallery-img') 
  const currentGalleryImg = document.querySelector('.current-img-gallery')
  
  currentGalleryImg.firstElementChild.src = e.target.dataset.img;

  currentThumbnail.classList.toggle('selected-gallery-img')

  e.target.parentElement.classList.toggle('selected-gallery-img')
}))