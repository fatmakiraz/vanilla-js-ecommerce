const featuredItemButtons = document.querySelectorAll('.js-featuredItemButton')

featuredItemButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productsWrapperEl = document.getElementById('products')
        const name = button.getAttribute('data-name')
        const categoryButtonEl = productsWrapperEl.querySelector(`.js-productCategory[data-name="${name}"]`)

        if(!categoryButtonEl){
            return
        }

        categoryButtonEl.dispatchEvent(new Event('click'))
        productsWrapperEl.scrollIntoView({behavior: 'smooth'})
    })
})