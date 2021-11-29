//This file is not active since I updated the code with JS classes.

const products = [{
        id: 1,
        category: 'sunglasses',
        img: 'img/sg-1.jpg',
        title: 'Sweet Sunglasses',
        desc: 'Green sunshine of summer',
        price: 1409,
    },

    {
        id: 2,
        category: 'sunglasses',
        img: 'img/sg-2.jpg',
        title: 'Cute Sunglasses',
        desc: 'Nude lovers',
        price: 1412,
    },
    {
        id: 3,
        category: 'sunglasses',
        img: 'img/sg-3.jpg',
        title: 'Cool Sunglasses',
        desc: 'Ice brown thoughts',
        price: 1908,
    },

    {
        id: 4,
        category: 'sunglasses',
        img: 'img/sg-4.jpg',
        title: 'Classic Sunglasses',
        desc: 'The black dream of the beach',
        price: 1023,
    },

    {
        id: 5,
        category: 'sunglasses',
        img: 'img/sg-5.jpg',
        title: 'Modern Sunglasses',
        desc: 'Red and modern',
        price: 1905,
    },

    {
        id: 6,
        category: 'trousers',
        img: 'img/trousers-1.jpg',
        title: 'Sweet Trousers',
        desc: 'Pink mood of the day',
        price: 1409,
    },

    {
        id: 7,
        category: 'trousers',
        img: 'img/trousers-2.jpg',
        title: 'Cute Trousers',
        desc: 'Let black feelings go',
        price: 1412,
    },
    {
        id: 8,
        category: 'trousers',
        img: 'img/trousers-3.jpg',
        title: 'Cool Trousers',
        desc: 'Feel the Classicism',
        price: 1908,
    },

    {
        id: 9,
        category: 'trousers',
        img: 'img/trousers-4.jpg',
        title: 'Classic Trousers',
        desc: 'Dress up like Swedish for once',
        price: 1023,
    },

    {
        id: 10,
        category: 'trousers',
        img: 'img/trousers-cover.jpg',
        title: 'Modern Trousers',
        desc: 'Favourites of the years',
        price: 1905,
    },


    {
        id: 11,
        category: 'necklace',
        img: 'img/necklace-1.jpg',
        title: 'Cool Necklace',
        desc: 'Innocence of white',
        price: 1409,
    },

    {
        id: 12,
        category: 'necklace',
        img: 'img/necklace-2.jpg',
        title: 'Cute Necklace',
        desc: 'Blue feelings',
        price: 1412,
    },
    {
        id: 13,
        category: 'necklace',
        img: 'img/necklace-3.jpg',
        title: 'Cool Necklace',
        desc: 'Shine like a diamonds',
        price: 1908,
    },

    {
        id: 14,
        category: 'necklace',
        img: 'img/necklace-4.jpg',
        title: 'Classic Necklace',
        desc: 'Customize your gift',
        price: 1023,
    },

    {
        id: 15,
        category: 'necklace',
        img: 'img/necklace-cover.jpg',
        title: 'Chic Necklace',
        desc: 'Modern way of prettiness',
        price: 1905,
    }
]

const productContainer = document.querySelector('.js-productContainer')
const productCategoryContainer = document.querySelector('.js-productCategoryContainer')

window.addEventListener('DOMContentLoaded', (() => {
    showCategoryProducts(products)
    showCategoryButtons()
}))

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})

//Product Item Add To Cart Button Click Event
function addToCartClick(addToCartButton) {
    addToCartButton.addEventListener('click', () => {
        const productItem = addToCartButton.parentElement
        addToCartQuantityTransform(addToCartButton, productItem)
        addProductToCart(productItem)
        updateCartLength(1)
        sweetAlert('Shopping cart updated successfully!')
    })
}

let totalPrice = 0

function addProductToCart(productItem) {
    const cartEmpty = document.querySelector('.js-cartEmpty')
    if (cartEmpty) {
        cartEmpty.remove()
    }

    let productID = productItem.dataset.id
    const product = products.find(product => productID == product.id)
    const cartProductContainer = document.querySelector('.js-cartProductContainer')

    cartProductContainer.innerHTML += `<div class="cart__product js-cartProduct" data-id="${product.id}">
    <div class="cart__product-top-wrapper">
        <img src="${product.img}" alt="Product Image" class="cart__product__image">
        <div class="cart__product__content">
            <div class="cart__product__content__title">${product.title}</div>
            <div class="cart__product__content__desc">${product.desc}</div>
            <div class="product__quantity">
                <button type="button" aria-label="Product Decrease" class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton">
                    <svg class="icon icon-minus">
                        <use xlink:href="#icon-minus"></use>
                    </svg>
                </button>
                <input type="number" class="product__quantity__item product__quantity__item--input js-quantityInput" max="7" value="1">
                <button type="button" aria-label="Product Increase" class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton"><svg class="icon icon-plus">
                        <use xlink:href="#icon-plus"></use>
                    </svg></button>
            </div>
        </div>
    </div>
    <div class="cart__product__price js-cartProductPrice">${formatter.format(product.price)}</div>
</div>`

    const addedProducts = document.querySelectorAll('.js-cartProduct')
    addedProducts.forEach(addedProduct => {
        cartQuantityTransform(addedProduct)
    })
    totalPrice += product.price
    updateTotalPrice()
    totalQuantity++
    updateCartQuantity()
}

//When Clicked Add To Cart Button, Transform Into Quantity Inputs
function addToCartQuantityTransform(addToCartButtonElement, parentElement) {

    //Show Quantity Inputs
    addToCartButtonElement.outerHTML = `<div class="product__quantity js-quantity">
        <button type="button" aria-label="Product Decrease" class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton">
        <svg class="icon icon-minus">
            <use xlink:href="#icon-minus"></use>
        </svg>
    </button>
    <input type="number" class="product__quantity__item product__quantity__item--input js-quantityInput" max="7" value="1">
    <button type="button" aria-label="Product Increase" class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton"><svg class="icon icon-plus">
            <use xlink:href="#icon-plus"></use>
        </svg></button>
    </div>`

    const quantityIncreaseButton = parentElement.querySelector('.js-quantityIncreaseButton')
    const quantityDecreaseButton = parentElement.querySelector('.js-quantityDecreaseButton')

    //Click Increase Button
    quantityIncreaseButton.addEventListener('click', (() => {
        const quantityInput = quantityIncreaseButton.parentElement.querySelector('.js-quantityInput')

        totalQuantity++
        updateCartQuantity()
        let currentValue = parseInt(quantityInput.value)
        let maxValue = quantityInput.getAttribute('max')
        if (maxValue && currentValue >= maxValue) {
            quantityInput.value = maxValue
            sweetAlert(`Only ${maxValue} left!`, 'warning')
        } else {
            quantityInput.value = currentValue + 1
            updateCartProduct(1, parentElement.dataset.id)

            sweetAlert('Added to your cart successfully')
        }
    }))

    //Click Decrease Button
    quantityDecreaseButton.addEventListener('click', (() => {
        const quantityInput = quantityDecreaseButton.parentElement.querySelector('.js-quantityInput')

        totalQuantity--
        updateCartQuantity()
        let currentValue = parseInt(quantityInput.value)
        if (currentValue == 1) {
            parentElement.querySelector('.js-quantity').outerHTML = '<button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>'
            addToCartClick(parentElement.querySelector('.js-productItemButton'))

            document.querySelector(`.js-cartProduct[data-id="${parentElement.dataset.id}"]`).remove()
            const product = products.find(product => product.id == parentElement.dataset.id)
            totalPrice -= product.price

            updateTotalPrice()
            updateCartLength(-1)

            sweetAlert('Removed from your cart successfully', 'danger')
        } else {
            quantityInput.value = currentValue - 1

            updateCartProduct(-1, parentElement.dataset.id)

            sweetAlert('Number of products has been decreased ', 'warning')
        }
    }))
}

function updateCartProduct(operation, productID) {
    const cartProduct = document.querySelector(`.js-cartProduct[data-id="${productID}"]`)
    const cartInput = cartProduct.querySelector('.js-quantityInput')
    const cartProductPrice = cartProduct.querySelector('.js-cartProductPrice')
    const product = products.find(product => product.id == productID)

    cartInput.setAttribute('value', parseInt(cartInput.value) + operation)
    cartProductPrice.textContent = `$${cartInput.value * product.price}`

    totalPrice += product.price * operation
    updateTotalPrice()
}

let cartLength = 0

function updateCartLength(operation) {
    cartLength += operation
    const headerCartTitle = document.querySelector('.js-headerCartTitle')
    headerCartTitle.textContent = `Cart(${cartLength})`


    if (cartLength == 0) {
        document.querySelector('.js-cartProducts').innerHTML = ""
        document.querySelector('.js-cartProductContainer').innerHTML = `<div class="cart__empty js-cartEmpty">
        There is nothing added in your cart.
    </div>`
        return
    }

    document.querySelector('.js-cartProducts').innerHTML = `<div class="cart__total__title">Total Products: </div>
    <div class="cart__total__length">${cartLength} products</div>`
}

let totalQuantity = 0

function updateCartQuantity() {
    const cartQuantity = document.querySelector('.js-cartQuantity')

    if (totalQuantity == 0) {
        cartQuantity.innerHTML = ""
        return
    }

    cartQuantity.innerHTML = `<div class="cart__total__title">Total Quantities: </div>
    <div class="cart__total__quantity">${totalQuantity} products</div>`
}

function updateTotalPrice() {
    const cartTotal = document.querySelector('.js-cartTotal')

    if (totalPrice == 0) {
        cartTotal.innerHTML = ""
        return
    }

    cartTotal.innerHTML = `<div class="cart__total__title">Total Price: </div>
    <div class="cart__total__price">${formatter.format(totalPrice)}</div>`
}

function cartQuantityTransform(addedProduct) {

    const quantityIncreaseButton = addedProduct.querySelector('.js-quantityIncreaseButton')
    const quantityDecreaseButton = addedProduct.querySelector('.js-quantityDecreaseButton')
    const productItem = document.querySelector(`.js-productItem[data-id="${addedProduct.dataset.id}"]`)

    quantityDecreaseButton.addEventListener('click', (() => {
        productItem.querySelector('.js-quantityDecreaseButton').dispatchEvent(new Event('click'))
    }))
    quantityIncreaseButton.addEventListener('click', (() => {
        productItem.querySelector('.js-quantityIncreaseButton').dispatchEvent(new Event('click'))
    }))
}

//Show Sweet Alert
function sweetAlert(message, status = 'success', icon = null) {
    if (!icon) {
        switch (status) {
            case 'warning':
                icon = 'warning'
                break

            case 'danger':
                icon = 'remove'
                break

            default:
                icon = 'tick'
                break
        }
    }

    let alertContainer = document.querySelector('.js-alertContainer')
    if (!alertContainer) {
        alertContainer = document.createElement('div')
        alertContainer.className = 'alert-container js-alertContainer'
        document.body.appendChild(alertContainer)
    }
    const alertDOM = document.createElement('div')
    alertDOM.className = `alert alert--${status} js-alert`
    alertDOM.innerHTML = `<svg class="icon icon-${icon} alert__icon"><use xlink:href="#icon-${icon}"></use></svg>
    <div class="alert__message">${message}</div>`
    alertContainer.appendChild(alertDOM)

    setTimeout(() => {
        alertContainer.removeChild(alertDOM)

        if (!document.querySelector('.js-alert') && document.body.contains(alertContainer)) {
            document.body.removeChild(alertContainer)
        }
    }, 2000)
}

// Show Home Page Products
function showCategoryProducts(categoryProducts) {
    let showProductsHTML = categoryProducts.map((product) => {
            return `<div class="product__item js-productItem" data-id="${product.id}">
            <img src="${product.img}" alt="${product.title}" class="product__item__image">
            <div class="product__item__detail">
                <div class="product__item__detail__title">${product.title}</div>
                <div class="product__item__detail__desc">${product.desc}</div>
                <div class="product__item__detail__price js-productItemPrice">${formatter.format(product.price)}</div>
            </div>
            <button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>
        </div>`
        })
        .join("")
    productContainer.innerHTML = showProductsHTML

    const productItemButtons = productContainer.querySelectorAll('.js-productItemButton')

    productItemButtons.forEach(productItemButton => {
        addToCartClick(productItemButton)
    })
}

function showCategoryButtons() {
    /*    const categories = products.reduce((values, product) => {
                if (!values.includes(product.category)) {
                    values.push(product.category)
                }
                return values
            },
            ['all']
        )
    */
    const categories = ['all']

    products.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category)
        }
    })

    const categoryButtonsHTML = categories
        .map((category) => {
            return `<button type="button" class="product__category js-productCategory${category == 'all' ? ' is-active' : ''}" aria-label="Product Category Button" data-id=${category}>${category}</button>`
        })
        .join("")
    productCategoryContainer.innerHTML = categoryButtonsHTML

    const productCategories = productCategoryContainer.querySelectorAll('.js-productCategory')

    productCategories.forEach((category) => {
        category.addEventListener('click', ((e) => {

            productCategories.forEach(category => {
                if (category == e.currentTarget) {
                    category.classList.add('is-active')
                } else {
                    category.classList.remove('is-active')
                }
            })

            const categoryId = e.currentTarget.dataset.id
            const categoryProducts = products.filter((categoryProducts) => {

                if (categoryProducts.category === categoryId) {
                    return categoryProducts
                }
            })

            if (categoryId === 'all') {
                showCategoryProducts(products)
            } else {
                showCategoryProducts(categoryProducts)
            }
        }))
    })
}