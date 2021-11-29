fetch('data/products.json')
    .then(response => response.json())
    .then(json => {
        productsDOM.products = JSON.parse(json).map(product => {
            return new Product(product)
        })
        productsDOM.showProducts()
        cart.showLocalStorage()
    })

fetch('data/categories.json')
    .then(response => response.json())
    .then(json => {
        productsDOM.categories = JSON.parse(json).map(name => {
            return new Category(name)
        })
        productsDOM.showCategoryButtons()
    })

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})

class Product {
    #properties = ['id', 'title', 'desc', 'img', 'price', 'category']
    domEl

    constructor(data) {
        this.#properties.forEach(property => {
            this[property] = data[property]
        })
    }

    formatedPrice() {
        return formatter.format(this.price)
    }
}

class Category {

    constructor(name) {
        this.name = name
    }
}

class ProductsDOM {
    products = []
    categories = []

    constructor() {
        this.productContainerEl = document.querySelector('.js-productContainer')
        this.categoryContainerEl = document.querySelector('.js-productCategoryContainer')
    }

    showCategoryButtons() {
        let categoryButtonsHTML = this.categories.map(category => {
            return `<button type="button" class="product__category js-productCategory${category.name == 'all' ? ' is-active' : ''}" aria-label="${category.name}" data-name="${category.name}">${category.name}</button>`
        }).join('')

        this.categoryContainerEl.innerHTML = categoryButtonsHTML
        this.setCategoryButtonsClickEvent()
    }

    // access each category of each productCategory button and situations will happen when clicked each category
    setCategoryButtonsClickEvent() {
        const productCategoryEls = this.categoryContainerEl.querySelectorAll('.js-productCategory')
        productCategoryEls.forEach(productCategoryEl => {
            productCategoryEl.addEventListener('click', (event => {
                this.changeStyleOfActiveCategory(productCategoryEls, event)
                this.showActiveCategory(event)
            }))
        })
    }

    showActiveCategory(event) {
        const productEls = this.productContainerEl.querySelectorAll('.js-productItem')

        const clickedCategoryName = event.currentTarget.dataset.name
        if (clickedCategoryName === 'all') {
            productEls.forEach(productEl => productEl.style.display = 'grid')
            return
        }

        productEls.forEach(productEl => {
            const product = this.products.find(product => product.id == productEl.dataset.id)
            if (product.category != clickedCategoryName) {
                productEl.style.display = 'none'
            } else productEl.style.display = 'grid'
        })
    }

    // Style changing when is-active class is active/clicked the category want to view
    changeStyleOfActiveCategory(productCategoryEls, event) {
        productCategoryEls.forEach(category => {
            if (category == event.currentTarget) {
                category.classList.add('is-active')
            } else category.classList.remove('is-active')
        })
    }

    // show all products
    showProducts() {
        let productsHTML = this.products.map(product => {
            return `<div class="product__item js-productItem" data-id="${product.id}">
            <img class="product__item__image" src="${product.img}" alt="${product.title}">
            <div class="product__item__detail">
                <div class="product__item__detail__title">${product.title}</div>
                <div class="product__item__detail__desc">${product.desc}</div>
                <div class="product__item__detail__price js-productItemPrice">${product.formatedPrice()}</div>
            </div>
            <button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>
        </div>`
        }).join('')

        this.productContainerEl.innerHTML = productsHTML

        // access each product's button
        const productButtonEls = this.productContainerEl.querySelectorAll('.js-productItemButton')
        productButtonEls.forEach(productButtonEl => {
            // access parentElement to understand which product('s button) is clicked. This is also needed to show/hide product for other situations.
            const productEl = productButtonEl.parentElement

            // find the product in the array and clicked. 
            const product = this.products.find(product => product.id == productEl.dataset.id)

            //Match the product in JS and HTML
            product.domEl = new ProductDOM(product, productEl, productButtonEl)
            product.domEl.setClickEvent()
        })
    }
}

const productsDOM = new ProductsDOM()

class ProductDOM {

    constructor(product, productEl, buttonEl) {
        this.product = product
        this.productEl = productEl
        this.buttonEl = buttonEl
    }

    setClickEvent() {
        this.buttonEl.addEventListener('click', () => {
            this.transformAddToCartButtonIntoQuantityButton()
            this.addToCart()
            sweetAlert.showAlert('Your shopping cart updated!', 'update')
        })
    }

    addToCart() {
        cart.addProduct(this.product)
    }

    removeFromCart() {
        cart.removeProduct(this.product)
    }

    updateCartQuantity(operation) {
        cart.updateQuantity(this.product, operation)
    }

    transformAddToCartButtonIntoQuantityButton() {
        this.buttonEl.outerHTML = `<div class="product__quantity js-quantity">
        <button class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton" type="button" aria-label="Product Decrease">
        <svg class="icon icon-minus">
            <use xlink:href="#icon-minus"></use>
        </svg>
    </button>
    <input class="product__quantity__item product__quantity__item--input js-quantityInput" type="number" max="7" value="1">
    <button class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton" type="button" aria-label="Product Increase"><svg class="icon icon-plus">
            <use xlink:href="#icon-plus"></use>
        </svg></button>
    </div>`

        const quantityIncreaseButtonEl = this.productEl.querySelector('.js-quantityIncreaseButton')
        const quantityDecreaseButtonEl = this.productEl.querySelector('.js-quantityDecreaseButton')
        this.increaseQuantityButton(quantityIncreaseButtonEl)
        this.decreaseQuantityButton(quantityDecreaseButtonEl)
    }

    increaseQuantityButton(quantityIncreaseButtonEl) {
        quantityIncreaseButtonEl.addEventListener('click', () => {
            let currentValue = this.getQuantityInputValue()
            let maxValue = this.getQuantityInputLimit()
            if (maxValue && currentValue >= maxValue) {
                this.setQuantityInputValue(maxValue)
                sweetAlert.showAlert(`Only ${maxValue} left!`, 'warning')
            } else {
                this.setQuantityInputValue(currentValue + 1)
                this.updateCartQuantity(+1)
                sweetAlert.showAlert('Added to your cart!')
            }
        })
    }

    decreaseQuantityButton(quantityDecreaseButtonEl) {
        quantityDecreaseButtonEl.addEventListener('click', () => {
            let currentValue = this.getQuantityInputValue()
            if (currentValue == 1) {
                quantityDecreaseButtonEl.parentElement.outerHTML = '<button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>'
                this.buttonEl = this.productEl.querySelector('.js-productItemButton')
                this.setClickEvent()
                this.removeFromCart()
                sweetAlert.showAlert('Removed from your cart!', 'danger')
            } else {
                this.setQuantityInputValue(currentValue - 1)
                this.updateCartQuantity(-1)
                sweetAlert.showAlert('Number of products has been decreased!', 'warning')
            }
        })
    }

    getQuantityInputValue() {
        return parseInt(this.productEl.querySelector('.js-quantityInput').value)
    }

    getQuantityInputLimit() {
        return parseInt(this.productEl.querySelector('.js-quantityInput').getAttribute('max'))
    }

    setQuantityInputValue(value) {
        this.productEl.querySelector('.js-quantityInput').value = value
    }
}

// changes on DOM will happen when Cart situations happened
class CartDOM {

    constructor(cart) {
        this.cart = cart
        this.cartEmptyEl = document.querySelector('.js-cartEmpty')
        this.cartTotalEl = document.querySelector('.js-cartTotal')
        this.cartQuantityEl = document.querySelector('.js-cartQuantity')
        this.cartProductContainerEl = document.querySelector('.js-cartProductContainer')
    }

    renderCart() {
        const headerCartTitleEl = document.querySelector('.js-headerCartTitle')
        headerCartTitleEl.textContent = `Cart(${this.cart.totalCount()})`

        if (this.checkIsEmpty()) {
            return
        }
        this.showCartProducts()
        this.dispatchQuantityButton()

        this.cartTotalEl.innerHTML = `<div class="cart__total__title">Total Price: </div>
        <div class="cart__total__price">${formatter.format(this.cart.totalPrice())}</div>`

        this.cartQuantityEl.innerHTML = `<div class="cart__total__title">Product Quantity: </div>
        <div class="cart__total__quantity">${this.cart.totalQuantity()} products</div>`
    }

    checkIsEmpty() {
        if (this.cart.isEmpty()) {
            this.cartEmptyEl.style.display = 'block'
            this.cartTotalEl.innerHTML = ""
            this.cartQuantityEl.innerHTML = ""
            this.cartProductContainerEl.innerHTML = ""
            return true
        }
        // if cart has product cartEmpty class will be display:none
        this.cartEmptyEl.style.display = 'none'
        return false
    }

    showCartProducts() {
        this.cartProductContainerEl.innerHTML = this.cart.products.map(product => {
            return `<div class="cart__product js-cartProduct" data-id="${product.id}">
            <div class="cart__product-top-wrapper">
                    <figure>
                        <img src="${product.img}" alt="Product Image" class="cart__product__image">
                    </figure>
                    <div class="cart__product__content">
                    <div class="cart__product__content__title">${product.title}</div>
                    <div class="cart__product__content__desc">${product.desc}</div>
                    <div class="product__quantity">
                        <button type="button" aria-label="Product Decrease" class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton">
                            <svg class="icon icon-minus">
                                <use xlink:href="#icon-minus"></use>
                            </svg>
                        </button>
                        <input type="number" class="product__quantity__item product__quantity__item--input js-quantityInput" max="7" value="${product.quantity}">
                        <button type="button" aria-label="Product Increase" class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton"><svg class="icon icon-plus">
                                <use xlink:href="#icon-plus"></use>
                            </svg></button>
                    </div>
                </div>
            </div>
            <div class="cart__product__price js-cartProductPrice">${formatter.format(product.price)}</div>
        </div>`
        }).join('')
    }

    dispatchQuantityButton() {
        const cartProductEls = this.cartProductContainerEl.querySelectorAll('.js-cartProduct')
        cartProductEls.forEach(cartProductEl => {
            const quantityIncreaseButton = cartProductEl.querySelector('.js-quantityIncreaseButton')
            const quantityDecreaseButton = cartProductEl.querySelector('.js-quantityDecreaseButton')
            const productItem = document.querySelector(`.js-productItem[data-id="${cartProductEl.dataset.id}"]`)
            quantityDecreaseButton.addEventListener('click', () => {
                productItem.querySelector('.js-quantityDecreaseButton').dispatchEvent(new Event('click'))
            })
            quantityIncreaseButton.addEventListener('click', () => {
                productItem.querySelector('.js-quantityIncreaseButton').dispatchEvent(new Event('click'))
            })
        })
    }
}

// events of Cart
class Cart {
    products = []
    LOCAL_STORAGE_KEY = 'cart'

    constructor() {
        this.dom = new CartDOM(this)
    }

    //write situations for Cart

    addProduct(product) {
        product.quantity = 1
        this.products.push(product)
        this.dom.renderCart()
        this.saveLocalStorage()
    }

    removeProduct(product) {
        this.products.splice(this.findProductIndex(product), 1)
        this.dom.renderCart()
        this.saveLocalStorage()
    }

    findProductIndex(product) {
        return this.products.findIndex(_product => _product.id == product.id)
    }

    updateQuantity(product, operation) {
        product = this.products.find(_product => _product.id == product.id)
        product.quantity += operation
        this.dom.renderCart()
        this.saveLocalStorage()
    }

    isEmpty() {
        return !this.products.length
    }

    totalCount() {
        return this.products.length
    }

    totalQuantity() {
        return this.products.reduce((total, product) => {
            return total + product.quantity
        }, 0)
    }

    totalPrice() {
        return this.products.reduce((total, product) => {
            return total + (product.price * product.quantity)
        }, 0)
    }

    saveLocalStorage() {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.products.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        })))
    }

    showLocalStorage() {
        const storedProducts = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY))

        storedProducts.forEach(storedProduct => {
            const product = productsDOM.products.find(product => product.id == storedProduct.id)
            product.domEl.transformAddToCartButtonIntoQuantityButton()
            product.domEl.addToCart()

            if (storedProduct.quantity < 2) {
                return
            }

            product.domEl.setQuantityInputValue(storedProduct.quantity)
            this.updateQuantity(product, storedProduct.quantity - 1)
        })
    }
}

const cart = new Cart()

class SweetAlert {
    #status
    #icon

    //We want to code know icon according to status. That's why we define icon as null at the beginning
    set status(status) {
        const availableStatuses = ['success', 'warning', 'danger', 'update']
        if (availableStatuses.includes(status)) {
            this.#status = status
        } else this.#status = 'success'
    }

    get status() {
        return this.#status
    }

    set icon(icon) {
        if (!icon) {
            switch (this.status) {
                case 'warning':
                    icon = 'warning'
                    break

                case 'danger':
                    icon = 'remove'
                    break

                case 'update':
                    icon = 'update'
                    break

                default:
                    icon = 'tick'
                    break
            }
        }

        this.#icon = icon
    }

    get icon() {
        return this.#icon
    }

    showAlert(message, status = 'success', icon = null) {
        this.message = message
        this.status = status
        this.icon = icon

        let alertContainerEl = document.querySelector('.js-alertContainer')
        if (!alertContainerEl) {
            alertContainerEl = document.createElement('div')
            alertContainerEl.className = 'alert-container js-alertContainer'
            document.body.appendChild(alertContainerEl)
        }
        const alertEl = document.createElement('div')
        alertEl.className = `alert alert--${this.status} js-alert`
        alertEl.innerHTML = `<svg class="icon icon-${this.icon} alert__icon"><use xlink:href="#icon-${this.icon}"></use></svg>
        <div class="alert__message">${this.message}</div>`
        alertContainerEl.appendChild(alertEl)

        setTimeout(() => {
            alertContainerEl.removeChild(alertEl)

            if (!document.querySelector('.js-alert') && document.body.contains(alertContainerEl)) {
                document.body.removeChild(alertContainerEl)
            }
        }, 2000)

    }
}

const sweetAlert = new SweetAlert()