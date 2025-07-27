const slider = ({
    sliderInner,
    sliderItems,
    sliderWrapper,
    next,
    prev,
    container,
    numberOfSlides = 3,
    controls = false,
    slidesPerClick = 2
}) => {

    const parent = document.querySelector(container),
        slideInner = parent.querySelector(sliderInner),
        slides = parent.querySelectorAll(sliderItems),
        sliderWrapp = parent.querySelector(sliderWrapper);

    let nextBtn,
        prevBtn,
        width;

    parent.cssText = `
        display: block;
        margin: 0 auto;
        width: 100%;
        position: relative;
    `;
    slideInner.style.cssText = `
        width: 100%;
        position: relative;
        overflow-x: clip;
        overflow-y: visible;
    `;

    sliderWrapp.style.cssText = `
        transition: 0.4s all;
        height: 100%;
        display: flex;
    `;

    if (controls) {

        nextBtn = document.createElement('div');
        prevBtn = document.createElement('div');
        nextBtn.classList.add('slider-btn--next');
        prevBtn.classList.add('slider-btn--prev');  
        nextBtn.innerHTML = `<span>&gt;</span>`;
        prevBtn.innerHTML = `<span>&lt;</span>`;

        nextBtn.style.cssText = `
            position: absolute;
            top: 50%;
            right: -50px;
            transform: translateY(-50%);
            z-index: 100;
            width: 50px;
            height: 50px;
            border: 2px solid black;
            color: black;
            opacity: 0.9;
            text-align: center;
            font-size: 30px;
            transition: opacity .15s ease;
            cursor: pointer;
        `;

        prevBtn.style.cssText = `
            position: absolute;
            top: 50%;
            left: -50px;
            transform: translateY(-50%);
            z-index: 100;
            width: 50px;
            height: 50px;
            border: 2px solid black;
            color: black;
            opacity: 0.9;
            text-align: center;
            font-size: 30px;
            transition: opacity .15s ease;
            cursor: pointer;
        `;

        parent.appendChild(nextBtn);
        parent.appendChild(prevBtn);
    } else {
        nextBtn = parent.querySelector(next);
        prevBtn = parent.querySelector(prev);
    };

    width = Math.floor(Math.floor(+window.getComputedStyle(slideInner).width.replace(/\D/g, '')) / numberOfSlides);
    
    let offset = 0;
    
    slides.forEach(slide => {
        slide.style.width = width + 'px';
        slide.firstElementChild.style.cssText = `
        width: 100%;
        height: 100%;
        `;
    })

    sliderWrapp.style.width = (100 * slides.length) / numberOfSlides + '%';
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (offset < (slides.length - numberOfSlides) * width) {
            if (offset < (slides.length - (numberOfSlides + (slidesPerClick - 1))) * width) {
                offset += width * slidesPerClick;
            } else {
                offset += (slides.length - numberOfSlides) * width - offset;
            }
            sliderWrapp.style.transform = `translateX(-${offset}px)`;
        }
    })

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (offset > 0) {
            if (offset >= width * slidesPerClick) {
                offset -= width * slidesPerClick;
            } else {
                offset = 0;
            }
            sliderWrapp.style.transform = `translateX(-${offset}px)`;
        }
    })
}

export default slider;