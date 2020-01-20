// ONLOAD //

const onLoad = () =>{
    showSlides()
  }

// CART //

const toggleCart = () => {
    let e = document.getElementById("cart");
    if (e.style.display === "flex") {
        e.style.display = "none";
    } else {
        e.style.display = "flex";
    }
}

// CART NUMBER //

let i = 0

const cartNumberHide = () => {
    let cartNumber = document.getElementById("cartNumber");

    if (cartNumber.value > 0) {
        cartNumber.style.display = "block";
    }
    else {
        cartNumber.style.display = "none";
    }
}

const addToCart = () => {
    i++;
    let cartNumber = document.getElementById("cartNumber");
    cartNumber.value = i;
    cartNumberHide()
} 

const removeFromCart = () => {
    i--;
    let cartNumber = document.getElementById("cartNumber");
    cartNumber.value = i;
    cartNumberHide()

}

const deleteAll = () => {
    let cartNumber = document.getElementById("cartNumber");
    i = 0
    cartNumber.value = i;
    cartNumberHide()

}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('remove')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let addToCartButtons = document.getElementsByClassName('addToCart')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}

const removeCartItem = (event) => {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    removeFromCart()
    updateCartTotal()
}

const addToCartClicked = (event) => {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('productTitle')[0].innerText
    let price = shopItem.getElementsByClassName('productPrice')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('productImg')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

const addItemToCart = (title, price, imageSrc) => {
    let cartContainer = document.createElement('div')
    cartContainer.classList.add('cartItem')
    let cartItems = document.getElementsByClassName('items')[0]
    let cartItemNames = cartItems.getElementsByClassName('nameItem')
    for (let i = 0; i < cartItemNames.length; i++) {
    }
    let cartContainerContents = `

    <img src="${imageSrc}" alt="">
    <div class="cartText">
        <button class="remove">Quitar</button>
        <p class="nameItem">${title}</p>
        <p class="priceItem">${price}</p>
    </div>
    `
    cartContainer.innerHTML = cartContainerContents
    cartItems.append(cartContainer)
    cartContainer.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
}

const updateCartTotal = () => {
    let cartItemContainer = document.getElementsByClassName('items')[0]
    let cartContainers = cartItemContainer.getElementsByClassName('cartItem')
    let total = 0
    for (let i = 0; i < cartContainers.length; i++) {
        let cartContainer = cartContainers[i]
        let priceElement = cartContainer.getElementsByClassName('priceItem')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        total = total + price
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('totalPrice')[0].innerText = '$' + total
}

// SLIDE //

let slideIndex = 0;

const showSlides = () => {
  let i;
  let slides = document.getElementsByClassName("slide");
  let circles = document.getElementsByClassName("circle");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < circles.length; i++) {
    circles[i].className = circles[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  circles[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); 
  
}

// ALERT //

const finilizeOrder = () => {
    alert('¡Gracias por su compra!')
    let cartItems = document.getElementsByClassName('items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    toggleCart()
    deleteAll()
}
