const slideItems = [{
        img: 'img/slider-1.jpeg',
        content: 'Sale of the year!'
    },
    {
        img: 'img/slider-2.jpeg',
        content: 'Discover new glasses for summer!'
    },
    {
        img: 'img/slider-3.jpeg',
        content: 'More than expected!'
    }
]

class Slide {
    constructor(img, content) {
        this.img = img
        this.content = content
    }
}

const slides = slideItems.map(slide => {
    return new Slide(slide.img, slide.content)
})

class Slider {
    constructor(slides) {
        this.slides = slides
        this.slideItemContainer = document.querySelector('.js-sliderItemContainer')
    }

    init() {
        let slideItemsHTML = this.slides.map((slide, slideIndex) => {
            let position = 'next'
            if (slideIndex === 0) {
                position = 'active'
            }
            if (slideIndex == this.slides.length - 1) {
                position = 'last'
            }
            if (this.slides.length <= 1) {
                position = 'active'
            }
            return `<a href="#" class="slider__item js-sliderItem ${position}">
            <img class="slider__item__image" src="${slide.img}" alt="Shopping">
            <div class="slider__item__content">
                ${slide.content}
            </div>
        </a>`
        }).join('')
        this.slideItemContainer.innerHTML = slideItemsHTML

        const buttonPrev = document.querySelector('.js-btnPrev')
        const buttonNext = document.querySelector('.js-btnNext')

        buttonNext.addEventListener('click', () => {
            this.changeSlider()
        })

        buttonPrev.addEventListener('click', () => {
            this.changeSlider('prev')
        })
    }

    changeSlider(type) {
        const active = document.querySelector('.active')
        const last = document.querySelector('.last')
        let next = active.nextElementSibling
        if (!next) {
            next = this.slideItemContainer.firstElementChild
        }

        active.classList.remove('active')
        last.classList.remove('last')
        next.classList.remove('next')

        if (type === 'prev') {
            active.classList.add('next')
            last.classList.add('active')
            next = last.previousElementSibling

            if (!next) {
                next = this.slideItemContainer.lastElementChild
            }
            next.classList.remove('next')
            next.classList.add('last')
            return
        }
        active.classList.add('last')
        last.classList.add('next')
        next.classList.add('active')
    }
}

const slider = new Slider(slides)
slider.init()