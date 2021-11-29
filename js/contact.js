const contactButtons = document.querySelectorAll('.js-contactButton')
const contactContents = document.querySelectorAll('.js-contactContent')
const contactWrapper = document.querySelector('.js-contactWrapper')

window.addEventListener('DOMContentLoaded', () => {
    contactButtons.forEach(button => {
        button.addEventListener('click', (e => {
            const name = e.target.dataset.name
            contactButtons.forEach(button => {
                button.classList.remove('is-show')
                e.target.classList.add('is-show')
            })
        
            contactContents.forEach(content => {
                content.classList.remove('is-show')
                if (content.dataset.name == name) {
                    content.classList.add('is-show')
                }
            })
        }))
    })
})