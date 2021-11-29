const faqsWrapper = document.querySelectorAll('.js-faqsWrapper')

window.addEventListener('DOMContentLoaded', () => {
    faqsWrapper.forEach(question => {
        const faqsQuestion = question.querySelector('.js-faqsQuestion')
        faqsQuestion.addEventListener('click', () => {
            question.classList.toggle('is-show')
            faqsWrapper.forEach(item => {
                if (item !== question) {
                    item.classList.remove('is-show')
                }
            })
        })
    })
})